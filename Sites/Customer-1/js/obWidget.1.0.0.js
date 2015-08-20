 window.OBWidget = {
    iframeRef       :   '',
    urlVars         :   {},
    initObj         :   {
        eventType   :   'obWidgetContract',
        nav         :   'self',
        src         :   '//localhost:62900/api/search/show/1/2/3',
        width       :   '350px',
        height      :   '1000px',
        border      :   'none',
        includeId   :   'OBWidget',
        cssUrl      :   '',
        resultsUrl   :   '/results.html'
    },
    argBag          :   {
        eventType   :   'searchData'
    },
    locationStr     :   function() {
        return location.origin + location.pathname.substr(0,location.pathname.lastIndexOf('/'));
    },
     
    initOBWidget    :   function(nav, cssUrl, width, height, border, includeId, resultsUrl) {
        for(var key in arguments) {
            console.log(arguments[key]);
            this.initObj[key] = arguments[key];
        }
        this.createOBWidget();
    },

    createOBWidget  :   function () {
        // create argument bag from query string
        this.argBag = OBWidget.utils.getUrlVars();
                
        // create iframe widget with customer arguments or defaults        
        var iframe = document.createElement('iframe');
        iframe.src = this.initObj.src;
        iframe.width = this.initObj.width;
        iframe.height = this.initObj.height;
        iframe.style.border = this.initObj.border;
        document.getElementById(this.initObj.includeId).appendChild(iframe);
        this.iframeRef = document
        .getElementById(this.initObj.includeId)
        .getElementsByTagName('iframe')[0];
        console.log('OB Widget created: ' + this.iframeRef);

        // listen for iframe init message
        window.addEventListener('message', this.parentReceiver, false);    
    },
     
    initializeArgs  :   function(custObj) {
        for(var key in this.initObj) {
            if(custObj[key]) {
                this.initObj[key] = custObj[key];
            }
        }
    },

    parentReceiver  :   function (event) {
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
                    var msgStr = JSON.stringify(this.initObj);
                    this.iframeRef.contentWindow.postMessage(msgStr, '*');
                    break;
                case 'searchSubmitted':
                    this.argBag = data.bag;
                    OBWidget.navigateResults();
                    break;
                case 'searchResultsInit':
                    var msgStr = JSON.stringify(this.argBag);
                    this.iframeRef.contentWindow.postMessage(msgStr, '*');
                    break;
                default:
                    break;
            }
        }            
    },
     
    navigateResults :   function() {
        var locStr = 
            this.locationStr() + this.initObj.resultsUrl + '?' + OBWidget.utils.serialize(this.argBag);
        switch (this.initObj.nav) {
            case 'tab':
                window.open(locStr);
                break;
            default:                
                window.location.href = locStr;
                break;
        }
    },
     
    testRef         : function() {
        console.log("test ref: " + document.getElementById(this.initObj.includeId));
    }

};


OBWidget.utils = {
    // Query String Utils
    serialize               :   function(obj) {
      var str = [];
      for(var p in obj)
        if (obj.hasOwnProperty(p)) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
      return str.join("&");
    },

    getUrlVars              :   function () {
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

    // Local Storage Utils
    setLocalStorage         :   function (varObj) {
        if (!OBWidget.supportsLocalStorage()) {
            return false;
        }
        localStorage.clear();
        for (var index in varObj) {
            localStorage[index] = varObj[index];
        }
        return true;
    },

    getLocalStorage         :   function () {
        var lsObj = {};
        for (var key in localStorage) {
            lsObj[key] = localStorage[key];
        }
        return lsObj;
    },

    supportsLocalStorage    :   function () {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    }
};