function vowAll(arr, callbackAll) {
  
  // array store of responses
  var arrResolved = [];
  
  arr.forEach(function(obj, index){
    
    // null "placeholder"
    arrResolved.push(null);
    
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        
        // replace null with response, 
        // if response is 404/403 etc, replace null with undefined
        // optional request callback
        arrResolved[index] = xhr.status == (obj.status || 200) ? obj.callback ? obj.callback(xhr.responseText) : xhr.responseText : undefined;
        
        // "Promise.All" callback when all requests have been resolved
        !~arrResolved.indexOf(null) && callbackAll(arrResolved);
      }
    };
    xhr.open(obj.method || "GET", obj.url, true);
    for (var key in obj.headers) {
        xhr.setRequestHeader(key, obj.headers[key]);
    }
    xhr.send(obj.body);
  });
};
