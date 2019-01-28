# vowAll
vowAll: An ES5 friendly alternative to Promise.All in about 400 bytes

```javascript
vowAll([
  {
    method: "GET",
    status: 200,
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
    method: "GET",
    status: 200,
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
{
  0: Array(500),  // parsed response from "comments" endpoint
  1: {...},       // parsed response from "posts" endpoint
  2: Array(10)    // parsed response from "users" endpoint  
}
```
