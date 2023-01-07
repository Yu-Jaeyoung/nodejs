function job1() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            reject('job1 fail!');
        }, 2000);
    });
}

function job2() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve('job2 resolved ok!');
        }, 2000);
    });
}

/*
job1().then(function (data) {
    console.log('data', data);
    job2().then(function (data) {
        console.log('data', data);
    })
})
*/

job1().then(function (data) {
    console.log('data', data);
    return job2();
}).catch(function (reason) {
    console.log('reason', reason)
    return Promise.reject(reason);
})
    .then(function (data) {
        console.log('data', data);
    })

