import {BehaviorSubject} from 'rxjs'

/*
class Store {
    constructor() {
        // Create a new behaviorsubject, the reason is that a behavior subject stores its value
        this.state = new BehaviorSubject();

        // initialize the state
        this.state.next({
            posts: []
        });
    }

    set(key, value) {
        this.state.next({
            ...this.state.getValue(),
            [key]: value
        })
    }

    get(key) {
        return this.state.getValue()[key];
    }
}
*/

class Store {
    constructor() {
        const initialState = {
            posts: []
        };

        this.history = [initialState];
        this.callbacks = {};

        /**
         * We need to keep track of our callbacks so we can release them when we are done
         */
        let callbackIdx = 0;

        this.state = {
            subscribe: (cb) => {
                this.callbacks[callbackIdx] = cb;
                const thisone = callbackIdx;

                callbackIdx++;

                return {
                    unsubscribe: () => {
                        if(!this.callbacks[thisone]) return console.warn("Trying to unsubscribe to a subscription that doesnt exist");

                        console.log("removing subscription", thisone)

                        delete this.callbacks[thisone]
                    }
                };
            }
        }
    }

    set(key, value) {
        const newState = {
            ...this.history[this.history.length - 1],
            [key]: value
        };

        this.history.push(newState);

        Object.values(this.callbacks).forEach((cb) => {
            if(typeof cb === 'function') return cb(newState)
        })
    }

    get(key) {
        return this.history[this.history.length - 1][key];
    }
}

export default new Store();

