# vowAll
vowAll: An ES5 friendly alternative to Promises in about ~400bytes

```javascript
vowAll([
  {
    method: "GET",
    url: "https://example.com/endpoint-1",
    callback: function(response){
      return individualCallback(response);
    }
  },
  {
    method: "GET",
    url: "https://example.com/endpoint-2"
  }
], function(response){
  console.log(response)
})
```
