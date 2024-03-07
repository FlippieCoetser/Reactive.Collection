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
  private static get UUID(): string {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    const uuid = Array.from(array, (byte) =>
      byte.toString(16).padStart(2, "0")
    ).join("");
    return uuid;
  }
  public static create<T>(array: T[] = []): iCollection<T> {
    let instance = new Collection(array);
    return instance.proxy;
  }

  public id: string;

  private proxy: iCollection<T>;

  private constructor(private array: T[]) {
    super();
    this.id = Collection.UUID;
    this.proxy = new Proxy(array, {
      get: (target, property) => {
        switch (property) {
          case "id":
            return this.id;
          case "add":
            return this.add.bind(this);
          case "remove":
            return this.remove.bind(this);
          case "pop":
            return this.pop.bind(this);
          case "addEventListener":
            return this.addEventListener.bind(this);
          case "removeEventListener":
            return this.removeEventListener.bind(this);
          default:
            return Reflect.get(target, property);
        }
      },
      set: (target, property, value) => {
        const index = Number(property);

        let isAddition = false;

        if (!isNaN(index) && isFinite(index)) {
          isAddition = index >= target.length;

          Reflect.set(target, property, value);

          if (isAddition) {
            this.onadd();
          } else {
            this.onupdate();
          }

          return true;
        } else {
          Reflect.set(target, property, value);
          return true;
        }
      },
    }) as iCollection<T>;
  }

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
