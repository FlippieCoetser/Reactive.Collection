export class Collection extends EventTarget {
    array;
    static get UUID() {
        const array = new Uint8Array(16);
        window.crypto.getRandomValues(array);
        const uuid = Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("");
        return uuid;
    }
    static create(array = []) {
        let instance = new Collection(array);
        return instance.proxy;
    }
    id;
    proxy;
    constructor(array) {
        super();
        this.array = array;
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
                    case "dispatchEvent":
                        return this.dispatchEvent.bind(this);
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
                    }
                    else {
                        this.onupdate();
                    }
                    return true;
                }
                else {
                    Reflect.set(target, property, value);
                    return true;
                }
            },
        });
    }
    onadd = () => this.dispatchEvent(new CustomEvent("onadd", {
        detail: { collection: this.proxy },
    }));
    onupdate = () => this.dispatchEvent(new CustomEvent("onupdate", {
        detail: { collection: this.proxy },
    }));
    onremove = () => {
        this.dispatchEvent(new CustomEvent("onremove", {
            detail: { collection: this.proxy },
        }));
    };
    /**
     * Custom method added to an array
     */
    add(item) {
        this.array.push(item);
        this.onadd();
        return this.proxy;
    }
    /**
     * Custom method added to an array
     */
    remove(item) {
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
    pop() {
        this.array.pop();
        this.onremove();
        return this.proxy;
    }
}
