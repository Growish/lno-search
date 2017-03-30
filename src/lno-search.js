(function(funcName, baseObj) {
  "use strict";
  funcName = funcName || "docReady";
  baseObj = baseObj || window;
  var readyList = [];
  var readyFired = false;
  var readyEventHandlersInstalled = false;

  function ready() {
    if (!readyFired) {
      readyFired = true;
      for (var i = 0; i < readyList.length; i++) {
        readyList[i].fn.call(window, readyList[i].ctx);
      }
      readyList = [];
    }
  }

  function readyStateChange() {
    if ( document.readyState === "complete" ) {
      ready();
    }
  }

  baseObj[funcName] = function(callback, context) {
    if (typeof callback !== "function") {
      throw new TypeError("callback for docReady(fn) must be a function");
    }
    if (readyFired) {
      setTimeout(function() {callback(context);}, 1);
      return;
    } else {
      readyList.push({fn: callback, ctx: context});
    }
    if (document.readyState === "complete" || (!document.attachEvent && document.readyState === "interactive")) {
      setTimeout(ready, 1);
    } else if (!readyEventHandlersInstalled) {
      if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", ready, false);
        window.addEventListener("load", ready, false);
      } else {
        document.attachEvent("onreadystatechange", readyStateChange);
        window.attachEvent("onload", ready);
      }
      readyEventHandlersInstalled = true;
    }
  }
})("lnoDocReady", window);

var lnoSearch = (function() {

  var _network;
  var _button;

  var _buttonInitValue;
  var _timer;

  var _getData = function(filter) {
    var script = document.createElement('script');
    script.src = 'https://ulove.listanozzeonline.com/apiproxy/v1/search/?filter=' + filter + '&network=' + _network+ '&callback=lnoSearch.callback';
    document.getElementsByTagName('head')[0].appendChild(script);
    _timer = setTimeout(function () {
      _button.disabled = false;
      _button.value = _buttonInitValue;
      alert("Il servizio non è al momento disponibile, si prega di riprovare dopo.");
    }, 10000);
  };

  var _formSubmit = function(e) {
    e.preventDefault();
    var filter = document.getElementById("lno_filter").value;

    if(!_button)
      _button = document.getElementById("lno_send_btn");

    _button.disabled = true;
    _buttonInitValue = _button.value;
    _button.value = "un secondo...";

    _getData(filter);
  };

  var _appendItem = function(element) {

    var el = document.getElementById("lno_results");
    var div = document.createElement('div');

    if(typeof element == 'object') {
      var weddingDate = (element.weddingDate.split(" "))[0];
      weddingDate = (weddingDate.split("-"))[2] + "/" + (weddingDate.split("-"))[1] + "/" + (weddingDate.split("-"))[0];
      el.innerHTML += '<a class="lno_item" href="' + element.url + '" target="_blank">' + element.listName.toUpperCase() + ' (' + weddingDate + ')</a>';
    }
    else if(typeof element == 'string')
      el.innerHTML = '<div class="lno-no-result">' + element + '</span>';

  };

  var _cleanResults = function() {
    var el = document.getElementById("lno_results");
    el.innerHTML = '';
  };

  lnoDocReady(function () {
    var ele = document.getElementById("lno_form");
    if(ele.addEventListener) {
      ele.addEventListener("submit", _formSubmit, false);
    } else if(ele.attachEvent){
      ele.attachEvent('onsubmit', _formSubmit);
    }
  });


  return {
    callback: function(data) {
      clearTimeout(_timer);
      _button.disabled = false;
      _button.value = _buttonInitValue;

      _cleanResults();
      for(var e = 0; e <= data.length; e++) {
        _appendItem(data[e]);
      }

      if(data.length == 0) {
        _appendItem("NON CI SONO LISTE CON QUEL CRITERIO");
      }

    },
    init: function(nId) {
      _network = nId;
    },
    search: function(filter) {
      _getData(filter);
    }
  }
})();
