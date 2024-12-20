import { Stack } from "./stack.js";

class MyQueue {
    private readonly outputStack = new Stack();
    private readonly inputStack = new Stack();

    enqueue(value: number) {
        this.inputStack.push(value);
    }

    dequeue(): number|undefined {
        if (this.outputStack.size() === 0) {
            let val: number|undefined;
            while (val = this.inputStack.pop()) {
                this.outputStack.push(val);
            }
        }
        return this.outputStack.pop();
    }
}