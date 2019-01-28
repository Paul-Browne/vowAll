# vowAll
vowAll: An ES5 friendly alternative to Promise.All in about 400 bytes

```javascript
vowAll([
  {
    method: "GET",  (optional, default: "GET")
    status: 200,    (optional, default: 200)
    url: "https://jsonplaceholder.typicode.com/comments",
    callback: function(response){   // callback for individual requests (optional)
      return JSON.parse(response);
    }
  },
  {
    method: "POST",
    status: 201,
    url: "https://jsonplaceholder.typicode.com/posts",
    body: JSON.stringify({
      title: 'foo',
      body: 'bar',
      userId: 1
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    callback: function(response){
      return JSON.parse(response);
    }
  },
  {
    url: "https://jsonplaceholder.typicode.com/users",
    callback: function(response){
      return JSON.parse(response);
    }
  },
], function(response){
  console.log(response);
})
```

```javascript
// console log will return
[
  Array(500),  // parsed response from "comments" endpoint
  {...},       // parsed response from "posts" endpoint
  Array(10)    // parsed response from "users" endpoint  
]
```
