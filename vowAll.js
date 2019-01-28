function vowAll(arr, callbackAll) {
  var objResolved = [];
  arr.forEach(function(obj, index){
    objResolved.push(null);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        objResolved[index] = xhr.status == (obj.status || 200) ? obj.callback ? obj.callback(xhr.responseText) : xhr.responseText : undefined;
        !~objResolved.indexOf(null) && callbackAll(objResolved);
      }
    };
    xhr.open(obj.method || "GET", obj.url, true);
    for (var key in obj.headers) {
        xhr.setRequestHeader(key, obj.headers[key]);
    }
    xhr.send(obj.body);
  });
};
