const url = 'https://jsonplaceholder.typicode.com/users';

let data = {
  name: 'Sammy'
}

let request = new Request(url, {
  method: 'POST',
  body: JSON.stringify(data),
  headers: new Headers({
    'Content-Type': 'application/json; charset=UTF-8'
  })
});

fetch(request)
  .then(function() {
  });