function timer(time) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(time);
        }, time);
    });
}


/*
console.log('start');
timer(1000).then(function (time) {
    console.log('time:' + time);
    return timer(time + 1000)
}).then(function (time) {
    console.log('time:' + time);
    return timer(time + 1000)
}).then(function (time) {
    console.log('time:' + time);
    console.log('end')
});*/
async function run() {
    console.log('start');
    let time = await timer(1000);
    console.log('time: ' + time);
    time = await timer(time + 1000);
    console.log('time: ' + time);
    await timer(time + 1000);
    time = await timer(time + 1000);
    console.log('time: ' + time);
    console.log('end');
    return time;
}

async function run2() {

    console.log('parent start');
    let time = await run();
    console.log('time: ' + time)
    console.log('parent end');
}

console.log('parent parent start');
run2().then(function () {
    console.log('parent parent end')
});