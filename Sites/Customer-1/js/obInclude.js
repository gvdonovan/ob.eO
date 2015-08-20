document.addEventListener("DOMContentLoaded", function (event) {
    window.OBWidget = {};
    OBWidget.createOBWidget = function (argObj) {
        var iframe = document.createElement('iframe');
        iframe.src = argObj.src;
        iframe.width = argObj.width;
        iframe.height = argObj.height;
        iframe.style.border = argObj.border;
        document.getElementById(argObj.includeId).appendChild(iframe);
        window.objRef = $("#" + argObj.includeId + " iframe")[0];
        console.log(objRef);

        function testServerFunc(event) {
            console.log("Server function called from inside iframe, msg: " + event.data);
            objRef.contentWindow.postMessage(argObj, "*");
        }
        window.addEventListener("message", testServerFunc, false);


        function containerReceiver(event) {
            console.log("Parent function called from inside iframe, msg: " + event.data);
            if (event.data === "Biff") {
                console.log("HERE");
            }
        }

        window.addEventListener("message", containerReceiver, false);
    };
    OBWidget.locationStr = location.origin
      + location.pathname.substr(0, location.pathname.lastIndexOf("/"));
    OBWidget.getUrlVars = function () {
        if (!window.location.search) {
            return ({});   // return empty object
        }
        var parms = {};
        var temp;
        var items = window.location.search.slice(1).split("&");   // remove leading ? and split
        for (var i = 0; i < items.length; i++) {
            temp = items[i].split("=");
            if (temp[0]) {
                if (temp.length < 2) {
                    temp.push("");
                }
                parms[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]);
            }
        }
        return (parms);
    };
});