import readline from 'node:readline/promises';

const rl = readline.createInterface(
    {input: process.stdin, output: process.stdout });

function randBetween(min: number, max: number): number {
    return Math.round(Math.random() * (max - min - 1)) + min;
}

async function main() {
    const maxQuestions = Number(await rl.question('How many questions?: '));
    console.log(randBetween(1, maxQuestions + 1));
    rl.close();
}
main();