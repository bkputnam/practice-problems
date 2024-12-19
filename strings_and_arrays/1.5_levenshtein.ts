import exp from "constants";

function editDistance(a: string, b: string): number {
    return editDistanceHelper(a, b, new Memos())
}

function editDistanceHelper(a: string, b: string, memos: Memos): number {
    if (b.length === 0) {
        return a.length;
    }
    if (a.length === 0) {
        return b.length;
    }
    if (memos.has(a, b)) {
        return memos.get(a, b)!;
    }
    const tailA = a.substring(1);
    const tailB = b.substring(1);
    if (a.charAt(0) === b.charAt(0)) {
        return editDistanceHelper(tailA, tailB, memos);
    }
    
    return 1 + Math.min(
        editDistanceHelper(tailA, b, memos),
        editDistanceHelper(a, tailB, memos),
        editDistanceHelper(tailA, tailB, memos),
    );
}

class Memos {
    private readonly lookup = new Map<string, Map<string, number>>();

    has(a: string, b: string): boolean {
        const [shorter, longer] = this.shorterFirst(a, b);
        return this.lookup.has(shorter) &&
            this.lookup.get(shorter)!.has(longer);
    }

    get(a: string, b: string): number|undefined {
        const [shorter, longer] = this.shorterFirst(a, b);
        return this.lookup.get(shorter)?.get(longer);
    }

    set(a: string, b: string, value: number): void {
        const [shorter, longer] = this.shorterFirst(a, b);
        if (!this.lookup.has(shorter)) {
            this.lookup.set(shorter, new Map<string, number>());
        }
        this.lookup.get(shorter)!.set(longer, value);
    }

    private shorterFirst(a: string, b: string): [string, string] {
        if (a.length == b.length) {
            return a < b ? [a, b] : [b, a];
        }
        return a.length < b.length ? [a, b] : [b, a];
    }
}

function editDistance2(a: string, b: string): number {
    if (b.length === 0) {
        return a.length;
    }
    if (a.length === 0) {
        return b.length;
    }

    const aChars = a.split('');
    const bChars = b.split('');

    // The edit distance between the empty string and a prefix of b, is the
    // length of the prefix of b
    let currentRow = bChars.map((_, index) => index);
    currentRow.push(bChars.length);
    // This will be populated later
    let nextRow = currentRow.map(() => -1);
    let temp: number[];

    for (let aPrefixLen = 1; aPrefixLen < aChars.length + 1; aPrefixLen++) {
        // If the b prefix has length 0, edit dist is the length of the a prefix
        nextRow[0] = aPrefixLen;
        for (let bPrefixLen = 1; bPrefixLen < currentRow.length; bPrefixLen++) {
            const aChar = aChars[aPrefixLen - 1];
            const bChar = bChars[bPrefixLen - 1];

            if (aChar === bChar) {
                nextRow[bPrefixLen] = currentRow[bPrefixLen - 1];
            } else {
                nextRow[bPrefixLen] = 1 + Math.min(
                    currentRow[bPrefixLen],
                    currentRow[bPrefixLen - 1],
                    nextRow[bPrefixLen - 1]
                );
            }
        }
        temp = currentRow;
        currentRow = nextRow;
        nextRow = temp;
    }

    return currentRow[currentRow.length - 1];
}

const testCases: Array<[string, string, number]> = [
    ['a', 'a', 0],
    ['a', 'b', 1],
    ['a', 'ab', 1],
    ['a', '', 1],
    ['a', 'abcd', 3],
    ['monkey', 'chunky', 4],
    ['kitten', 'sittng', 3],
    ['Saturday', 'Sunday', 3],
];

for (const [a, b, expected] of testCases) {
    const actual = editDistance(a, b);
    if (actual === expected) {
        console.log(`SUCCESS: editDistance(${a}, ${b}) === ${expected}`);
    } else {
        console.error(
            `FAILURE: editDistance(${a}, ${b}) !== ${expected} (${actual})`);
    }
}
console.log();
for (const [a, b, expected] of testCases) {
    const actual = editDistance2(a, b);
    if (actual === expected) {
        console.log(`SUCCESS: editDistance(${a}, ${b}) === ${expected}`);
    } else {
        console.error(
            `FAILURE: editDistance(${a}, ${b}) !== ${expected} (${actual})`);
    }
}