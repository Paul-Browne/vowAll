function vowAll(arr, callbackAll) {
  var arrResolved = [];
  arr.forEach(function(obj, index){
    arrResolved.push(null);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        arrResolved[index] = xhr.status == (obj.status || 200) ? obj.callback ? obj.callback(xhr.responseText) : xhr.responseText : undefined;
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
