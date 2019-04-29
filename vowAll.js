function vowAll(arr, callbackAll) {
  
    // object store of responses
    var objResolved = {};
  
    arr.forEach(function(obj, index) {
      
        // null "placeholder"
        objResolved[index] = null;
      
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
              
                // replace null with response, 
                // if response is 404/403 etc, replace null with undefined
                // optional request callback
                objResolved[index] = xhr.status == (obj.status || 200) ? (obj.callback ? obj.callback(xhr.responseText) : xhr.responseText) : undefined;
        
                var allResolved = true;
                
                // loop through all responses
                for (var key in objResolved) {
                    if (objResolved[key] === null) {
                      
                        // if any are unresolved, 
                        // prevent the callbackAll function from firing
                        allResolved = false;
                    }
                }
              
                // "Promise.all" callback when all requests have been resolved
                allResolved && callbackAll(objResolved);
            }
        };
        xhr.open(obj.method || "GET", obj.url, true);
        for (var key in obj.headers) {
            xhr.setRequestHeader(key, obj.headers[key]);
        }
        xhr.send(obj.body);
    });
}
