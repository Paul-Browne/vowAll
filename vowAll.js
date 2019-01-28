function vowAll(arr, callbackAll) {

  // initialize an object to store the responses
  var objResolved = {};

  // loop over all the ajax requests
  arr.forEach(function(obj, index){

    // Placeholder each request with a null response
    // until the response is resolved or rejected
    objResolved[index] = null;

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        if(xhr.status == 200){

          // Allow callbacks for each individual request
          if(obj.callback){
            objResolved[index] = obj.callback(xhr.responseText);
          }else{
            objResolved[index] = xhr.responseText;
          }
        }else{

          // Resolve rejected requests to undefined
          objResolved[index] = undefined;

        }

        // After each request is resolved
        // loop over the resolved object store
        var noNulls = true;
        for (var key in objResolved){
          if(objResolved[key] === null){
            noNulls = false;
          }else if(Object.keys(objResolved).length-1 == key && noNulls){

            // if all requests are resolved
            // call the "promise all" callback
            callbackAll(objResolved);
          }
        }

      }
    };
    xhr.open(obj.method, obj.url, true);
    for (var key in obj.headers) {
        xhr.setRequestHeader(key, obj.headers[key]);
    }
    xhr.send(obj.payload);
  });
};
