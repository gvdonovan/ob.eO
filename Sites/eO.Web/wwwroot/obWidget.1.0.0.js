 window.OBWidget = (function() {
    var widget = {
        iframeRef : '',
        urlVars : {},
        initObj : {            
            nav: 'self',
            src: '//www.optimalblue.com',
            searchApi: '//localhost:51639/api/search/show/1/2/3',
            resultsApi: '//localhost:51639/api/search/results/1/2/3',
            width: '350px',
            height: '1000px',
            border: 'none',
            includeId: 'OBWidget',
            cssUrl: '',
            resultsUrl: '/results.html',
            search: true,
            bootstrap: true
        },
        argBag : {
            eventType : 'searchData'
        },
        locationStr : function() {
            return location.origin + location.pathname.substr(0,location.pathname.lastIndexOf('/'));
        },

        initOBWidget : function (nav, cssUrl, width, height, border, includeId, resultsUrl, searchApi, resultsApi, search, bootstrap) {
            var argArr = widget.utils.getFnParamNames(widget.initOBWidget);
            for (var key in argArr) {
                widget.initObj[argArr[key]] = arguments[key];
            }
            if(searchApi != null) {
                widget.initObj.src = searchApi;
            } else if(resultsApi != null) {
                widget.initObj.src = resultsApi;
            }
            console.log(widget.initObj['resultsApi']);
            widget.createOBWidget();
        },

        createOBWidget : function () {
            // create argument bag from query string
            widget.argBag = widget.utils.getUrlVars();
            // create iframe widget with customer arguments or defaults        
            var iframe = document.createElement('iframe');
            iframe.src = widget.initObj.src;
            iframe.width = widget.initObj.width;
            iframe.height = widget.initObj.height;
            iframe.style.border = widget.initObj.border;
            document.getElementById(widget.initObj.includeId).appendChild(iframe);
            widget.iframeRef = document
            .getElementById(widget.initObj.includeId)
            .getElementsByTagName('iframe')[0];
            console.log('OB Widget created: ' + widget.iframeRef);

            // listen for iframe init message
            window.addEventListener('message', widget.parentReceiver, false);
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
                        var initBag = {
                            eventType: 'obWidgetContract',
                            bag: widget.initObj
                        };
                        var initStr = JSON.stringify(initBag);
                        widget.iframeRef.contentWindow.postMessage(initStr, '*');
                        break;
                    case 'searchSubmitted':
                        console.log('searchSubmitted');
                        widget.argBag = data.bag;
                        console.log(widget.argBag);
                        widget.navigateResults();
                        break;
                    case 'searchResultsInit':
                        console.log('searchResultsInit');
                        var biff = {
                            eventType: 'searchData',
                            bag: widget.argBag
                        };
                        var msgStr = JSON.stringify(biff);
                        widget.iframeRef.contentWindow.postMessage(msgStr, '*');
                        break;
                    default:
                        break;
                }
            }            
        },

        navigateResults : function() {
            var locStr = widget.locationStr() + widget.initObj.resultsUrl + '?' + widget.utils.serialize(widget.argBag);
            console.log(widget.argBag);
            switch (widget.initObj.nav) {
                case 'tab':
                    window.open(locStr);
                    break;
                case 'self':
                    window.location.href = locStr;
                    break;
                default:                
                    window.location.href = locStr;
                    break;
            }
        },

        testRef : function() {
            console.log("test ref: " + document.getElementById(widget.initObj.includeId));
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