 window.OBWidget = (function() {
    var widget = {
        iframeRef : '',
        urlVars : {},
        initObj : {
            eventType : 'obWidgetContract',
            nav : 'self',
            src : '//localhost:62900/api/search/show/1/2/3',
            width : '350px',
            height : '1000px',
            border : 'none',
            includeId : 'OBWidget',
            cssUrl : '',
            resultsUrl : '/results.html',
            internalApiUrl : null,
            search : true,
            bootstrap : true
        },
        argBag : {
            eventType : 'searchData'
        },
        locationStr : function() {
            return location.origin + location.pathname.substr(0,location.pathname.lastIndexOf('/'));
        },

        initOBWidget : function (nav, cssUrl, width, height, border, includeId, resultsUrl, internalApiUrl, search) {
            var argArr = OBWidget.utils.getFnParamNames(OBWidget.initOBWidget);
            for (var key in argArr) {
                OBWidget.initObj[argArr[key]] = arguments[key];
                OBWidget.initObj.src = internalApiUrl != null ? internalApiUrl : OBWidget.initObj.src;
            }
            OBWidget.createOBWidget();
        },

        createOBWidget : function () {
            // create argument bag from query string
            OBWidget.argBag = OBWidget.utils.getUrlVars();

            // create iframe widget with customer arguments or defaults        
            var iframe = document.createElement('iframe');
            iframe.src = OBWidget.initObj.src;
            iframe.width = OBWidget.initObj.width;
            iframe.height = OBWidget.initObj.height;
            iframe.style.border = OBWidget.initObj.border;
            document.getElementById(OBWidget.initObj.includeId).appendChild(iframe);
            OBWidget.iframeRef = document
            .getElementById(OBWidget.initObj.includeId)
            .getElementsByTagName('iframe')[0];
            console.log('OB Widget created: ' + OBWidget.iframeRef);

            // listen for iframe init message
            window.addEventListener('message', OBWidget.parentReceiver, false);
        },

        parentReceiver : function (event) {
            console.log('Container receiver called from inside iframe, msg: ' + event.data);
            var message = null;
                try {
                    message = JSON.parse(event.data);
                } catch(e) {
                    // Need the try since the interpreter thinks this is always an object
                }

                var data = message;
            if(data.eventType) {
                switch(data.eventType) {                   
                    case 'OBWidgetInit':
                        console.log('OBWidgetInit');
                        var msgStr = JSON.stringify(OBWidget.initObj);
                        OBWidget.iframeRef.contentWindow.postMessage(msgStr, '*');
                        break;
                    case 'searchSubmitted':
                        console.log('searchSubmitted');
                        OBWidget.argBag = data.bag;
                        console.log(OBWidget.argBag);
                        OBWidget.navigateResults();
                        break;
                    case 'searchResultsInit':
                        console.log('searchResultsInit');
                        var biff = {
                            eventType: 'searchData',
                            bag: OBWidget.argBag
                        };
                        var msgStr = JSON.stringify(biff);
                        OBWidget.iframeRef.contentWindow.postMessage(msgStr, '*');
                        break;
                    default:
                        break;
                }
            }            
        },

        navigateResults : function() {
            var locStr = OBWidget.locationStr() + OBWidget.initObj.resultsUrl + '?' + OBWidget.utils.serialize(OBWidget.argBag);
            console.log(OBWidget.argBag);
            switch (OBWidget.initObj.nav) {
                case 'tab':
                    window.open(locStr);
                    break;
                default:                
                    window.location.href = locStr;
                    break;
            }
        },

        testRef : function() {
            console.log("test ref: " + document.getElementById(OBWidget.initObj.includeId));
        }

    };
    return widget;
})();


OBWidget.utils = (function() {
    var utils = {
        // Query String Utils
        serialize : function(obj) {
          var str = [];
          for(var p in obj)
            if (obj.hasOwnProperty(p)) {
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
          return str.join("&");
        },

        getUrlVars : function () {
            if (!window.location.search) {
                // return empty object
                return({});
            }
            var parms = {};
            var temp;
            // remove leading ? and split
            var items = window.location.search.slice(1).split('&');   
            for (var i = 0; i < items.length; i++) {
                temp = items[i].split('=');
                if (temp[0]) {
                    if (temp.length < 2) {
                        temp.push('');
                    }
                    parms[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]);        
                }
            }
            return(parms);
        },

        getFnParamNames : function (fn) {
            var fstr = fn.toString();
            return fstr.match(/\(.*?\)/)[0].replace(/[()]/gi,'').replace(/\s/gi,'').split(',');
        }

        //// Local Storage Utils
        //setLocalStorage         :   function (varObj) {
        //    if (!OBWidget.supportsLocalStorage()) {
        //        return false;
        //    }
        //    localStorage.clear();
        //    for (var index in varObj) {
        //        localStorage[index] = varObj[index];
        //    }
        //    return true;
        //},

        //getLocalStorage         :   function () {
        //    var lsObj = {};
        //    for (var key in localStorage) {
        //        lsObj[key] = localStorage[key];
        //    }
        //    return lsObj;
        //},

        //supportsLocalStorage    :   function () {
        //    try {
        //        return 'localStorage' in window && window['localStorage'] !== null;
        //    } catch (e) {
        //        return false;
        //    }
        //}
    };
    return utils;
})();