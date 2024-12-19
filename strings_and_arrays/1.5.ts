import exp from "constants";

function isEditDistanceLtOne(a: string, b: string): boolean {
    if (a === b) {
        return true;
    } else if (a.length === b.length) {
        return isOneReplaceAway(a, b);
    } else if (b.length === a.length + 1) {
        return isOneAddAway(a, b);
    } else if (b.length === a.length - 1) {
        return isOneRemoveAway(a, b);
    } else {
        return false;
    }
}

function isOneReplaceAway(a: string, b: string): boolean {
    let foundDifference = false;
    for (let i = 0; i < a.length; i++) {
        if (a.charAt(i) !== b.charAt(i)) {
            if (!foundDifference) {
                foundDifference = true;
            } else {
                return false;
            }
        }
    }
    return foundDifference;
}

function isOneAddAway(a: string, b: string): boolean {
    if (b.length !== a.length + 1) {
        throw new Error(`isOneAddAway called with wrong length strings`);
    }

    let foundInsertion = false;
    for (let i = 0; i < b.length; i++) {
        if (!foundInsertion) {
            const aChar = a.charAt(i);
            const bChar = b.charAt(i);

            if (aChar !== bChar) {
                if (aChar === b.charAt(i + 1)) {
                    foundInsertion = true;
                } else {
                    return false;
                }
            }
        } else {
            const aChar = a.charAt(i - 1);
            const bChar = b.charAt(i);
            if (aChar !== bChar) {
                return false;
            }
        }
    }
    return foundInsertion;
}

function isOneRemoveAway(a: string, b: string): boolean {
    return isOneAddAway(b, a);
}

function test_isOneReplaceAway() {
    const testCases: Array<[string, string, boolean]> = [
        ['a', 'b', true],
        ['a', 'a', false],
        ['a', 'ab', false],
        ['monkey', 'monkay', true],
        ['monkey', 'bonkey', true],
        ['monkey', 'monked', true],
    ];
    for (const [a, b, expected] of testCases) {
        const actual = isOneReplaceAway(a, b);
        if (actual === expected) {
            console.log(`SUCCESS: isOneReplaceAway(${a}, ${b}): (${actual})`);
        } else{
            console.error(
                `FAILURE: isOneReplaceAway(${a}, ${b}) !== ${expected}`);
        }
    }
}

function test_isOneAddAway() {
    const testCases: Array<[string, string, boolean]> = [
        ['a', 'ab', true],
        ['monkey', 'moankey', true],
        ['monkey', 'monkeys', true],
        ['monkey', 'mankeys', false],
        ['monkey', 'bonbons', false],
    ];
    for (const [a, b, expected] of testCases) {
        const actual = isOneAddAway(a, b);
        if (actual === expected) {
            console.log(`SUCCESS: isOneReplaceAway(${a}, ${b}): (${actual})`);
        } else{
            console.error(
                `FAILURE: isOneReplaceAway(${a}, ${b}) !== ${expected}`);
        }
    }
}

function test_isOneRemoveAway() {
    const testCases: Array<[string, string, boolean]> = [
        ['a', 'ab', true],
        ['monkey', 'moankey', true],
        ['monkey', 'monkeys', true],
        ['monkey', 'mankeys', false],
        ['monkey', 'bonbons', false],
    ];
    for (const [b, a, expected] of testCases) {
        const actual = isOneRemoveAway(a, b);
        if (actual === expected) {
            console.log(`SUCCESS: isOneReplaceAway(${a}, ${b}): (${actual})`);
        } else{
            console.error(
                `FAILURE: isOneReplaceAway(${a}, ${b}) !== ${expected}`);
        }
    }
}

function test() {
    test_isOneReplaceAway();
    console.log();
    test_isOneAddAway();
    console.log();
    test_isOneRemoveAway();
}
test();