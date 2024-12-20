export interface LinkedListNodeInterface {
    value: number,
}

class LinkedListNode implements LinkedListNodeInterface {
    prev: LinkedListNode | null;
    next: LinkedListNode | null;
    value: number;
}

export class LinkedList {
    private head: LinkedListNode|null = null;
    private tail: LinkedListNode|null = null;

    isEmpty(): boolean {
        return this.head === null;
    }

    concat(list: LinkedList) {
        if (list.isEmpty()) {
            return;
        }
        if (this.head == null || this.tail == null) {
            this.head = list.head;
            this.tail = list.tail;
        } else {
            this.tail.next = list.head;
            list.head!.prev = this.tail;
            this.tail = list.tail;
        }
    }
}
