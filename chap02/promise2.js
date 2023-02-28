fetch('https://jsonplaceholder.typicode.com/posts')
    .then(function (response) {
        return response.json();
    })
    .catch(function (reason) {
        console.log('reason', reason);
    })
    .then(function (data) {
        console.log('data', data);
    });