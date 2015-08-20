document.addEventListener("DOMContentLoaded", function (event) {
  window.createOBWidget = function (argObj) {
    var iframe = document.createElement('iframe');
    iframe.src = argObj.src;
    iframe.width = argObj.width;
    iframe.height = argObj.height;
    iframe.style.border = argObj.border;
    document.getElementById(argObj.includeId).appendChild(iframe);
    window.objRef = $("#"+argObj.includeId+" iframe")[0];
    console.log(objRef);

    function testServerFunc(event) {
      console.log("Server function called from inside iframe, msg: " + event.data);
      objRef.contentWindow.postMessage(argObj, "*");
    }
    window.addEventListener("message", testServerFunc, false);    
  }
});