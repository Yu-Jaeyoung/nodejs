import fs from "fs/promises";

console.log('시작');

async function run() {
    await fs.readFile('./readme2.txt')
        .then((data) => {
            console.log('1번', data.toString());
            return fs.readFile('./readme2.txt');
        })
        .then((data) => {
            console.log('1번', data.toString())
            return fs.readFile('./readme2.txt');
        })
        .then((data) => {
            console.log('1번', data.toString())
            return fs.readFile('./readme2.txt');
            })
        .catch((err) => {
            console.log(err);
        });
}