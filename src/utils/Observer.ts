import invariant from 'tiny-invariant';

export type Observer<T> = (message: T) => void;

export class Observable<T> {
    private observers: Array<Observer<T>> = [];

    public notifyAll = (message: T) => {
        this.observers.forEach((observer) => observer(message));
    };

    public subscribe = (observer: Observer<T>) => {
        this.observers.push(observer);
    };

    public unsubscribe = (observer: Observer<T>) => {
        const index = this.observers.indexOf(observer);

        invariant(index !== -1, 'Could not unsubscribe, because observer does not exist in observers array.');

        this.observers.splice(index, 1);
    };
}
