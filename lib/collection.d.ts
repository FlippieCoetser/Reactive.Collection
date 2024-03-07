interface CollectionEventDetail<T> {
    collection: iCollection<T>;
}
type CollectionEventListener<T> = (event: CustomEvent<CollectionEventDetail<T>>) => void;
export type iCollection<T> = T[] & {
    id: string;
    add(item: T): iCollection<T>;
    remove(item: T): iCollection<T>;
    addEventListener(type: string, listener: CollectionEventListener<T>, options?: boolean | AddEventListenerOptions): void;
    removeEventListener(type: string, listener: CollectionEventListener<T>, options?: boolean | EventListenerOptions): void;
};
export declare class Collection<T> extends EventTarget {
    private array;
    private static get UUID();
    static create<T>(array?: T[]): iCollection<T>;
    id: string;
    private proxy;
    private constructor();
    private onadd;
    private onupdate;
    private onremove;
    /**
     * Custom method added to an array
     */
    add(item: T): iCollection<T>;
    /**
     * Custom method added to an array
     */
    remove(item: T): iCollection<T>;
    /**
     * This override is required in order to dispatch the onremove event.
     */
    pop(): iCollection<T>;
}
export {};
