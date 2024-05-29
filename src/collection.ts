export type UUID = string;
interface CollectionEventDetail<T> {
  collection: iCollection<T>;
}

type CollectionEventListener<T> = (
  event: CustomEvent<CollectionEventDetail<T>>
) => void;

export type iCollection<T> = T[] & {
  id: string;
  add(item: T): iCollection<T>;
  remove(item: T): iCollection<T>;
  addEventListener(
    type: string,
    listener: CollectionEventListener<T>,
    options?: boolean | AddEventListenerOptions
  ): void;
  removeEventListener(
    type: string,
    listener: CollectionEventListener<T>,
    options?: boolean | EventListenerOptions
  ): void;
};

export class Collection<T> extends EventTarget {
  private static get UUID(): UUID {
    return crypto.randomUUID();
  }
  public static create<T>(array: T[] = []): iCollection<T> {
    let instance = new Collection(array);
    return instance.proxy;
  }

  public id: string;

  private proxy: iCollection<T>;
  private handlers: { [key: string | symbol]: (() => any) | string };

  private constructor(private array: T[]) {
    super();
    this.id = Collection.UUID;
    this.initializeHandlers();
    this.proxy = new Proxy(array, {
      get: this._get,
      set: this._set,
    }) as iCollection<T>;
  }

  private _get = (target, property) =>
    this.handlers[property]
      ? this.handlers[property]
      : Reflect.get(target, property);

  private _set = (target, property, value) =>
    typeof property !== "symbol" &&
    Number.isInteger(+property) &&
    +property >= 0
      ? this._setIndex(target, property, value)
      : Reflect.set(target, property, value);

  private _setIndex = (target, index, value) =>
    +index >= target.length
      ? this._add(target, index, value)
      : this._update(target, index, value);

  private _add = (target, property, value) =>
    Reflect.set(target, property, value) ? (this.onadd(), true) : false;

  private _update = (target, property, value) =>
    Reflect.set(target, property, value) ? (this.onupdate(), true) : false;

  private initializeHandlers = () => {
    this.handlers = {
      id: this.id,
      add: this.add.bind(this),
      remove: this.remove.bind(this),
      pop: this.pop.bind(this),
      addEventListener: this.addEventListener.bind(this),
      removeEventListener: this.removeEventListener.bind(this),
    };
  };

  private onadd = (): boolean =>
    this.dispatchEvent(
      new CustomEvent<CollectionEventDetail<T>>("onadd", {
        detail: { collection: this.proxy },
      })
    );

  private onupdate = (): boolean =>
    this.dispatchEvent(
      new CustomEvent<CollectionEventDetail<T>>("onupdate", {
        detail: { collection: this.proxy },
      })
    );

  private onremove = (): void => {
    this.dispatchEvent(
      new CustomEvent<CollectionEventDetail<T>>("onremove", {
        detail: { collection: this.proxy },
      })
    );
  };

  /**
   * Custom method added to an array
   */
  public add(item: T): iCollection<T> {
    this.array.push(item);
    this.onadd();
    return this.proxy;
  }
  /**
   * Custom method added to an array
   */
  public remove(item: T): iCollection<T> {
    const index = this.array.indexOf(item);
    if (index !== -1) {
      this.array.splice(index, 1);
      this.onremove();
    }
    return this.proxy;
  }

  /**
   * This override is required in order to dispatch the onremove event.
   */
  public pop(): iCollection<T> {
    this.array.pop();
    this.onremove();
    return this.proxy;
  }
}
