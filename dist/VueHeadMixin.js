(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.VueHeadMixin = mod.exports;
  }
})(this, function (module, exports) {
  'use strict';

  exports.__esModule = true;

  exports.default = function (_ref6) {
    var titleTemplate = _ref6.titleTemplate;

    return {
      created: function created() {
        if (this.$options.title) {
          this.setDocumentTitle(this.$options.title);
        }
      },


      methods: {
        setDocumentTitle: function setDocumentTitle(title) {
          var template = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : titleTemplate;

          if (template) title = template.replace('%s', title);

          if (this.$ssrContext) {
            this.$ssrContext.title = title;
          } else {
            window.document.title = title;
          }
        },
        setDocumentMeta: function setDocumentMeta(name, content) {
          var meta = void 0;
          if (name.constructor === Array) {
            meta = name;
          } else {
            meta = [{ name: name, content: content }];
          }

          if (this.$ssrContext) {
            this.$ssrContext.meta = generateMetaString(meta);
          } else {
            cleanMeta();
            insertMeta(meta);
          }
        }
      }
    };
  };

  function cleanMeta() {
    var head = document.querySelector('head');
    var metaEls = document.querySelectorAll('meta[vue-head-mixin]');

    for (var _iterator = metaEls, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var el = _ref;

      head.removeChild(el);
    }
  }

  function insertMeta(meta) {
    var head = document.querySelector('head');

    for (var _iterator2 = meta, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref3;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref3 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref3 = _i2.value;
      }

      var _ref2 = _ref3;
      var name = _ref2.name,
          content = _ref2.content;

      var el = document.createElement('meta');
      el.name = name;
      el.content = content;
      el.setAttribute('vue-head-mixin', '');
      head.appendChild(el);
    }
  }

  function encodeHTMLEntities(s) {
    return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function generateMetaString(meta) {
    var s = '';

    for (var _iterator3 = meta, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
      var _ref5;

      if (_isArray3) {
        if (_i3 >= _iterator3.length) break;
        _ref5 = _iterator3[_i3++];
      } else {
        _i3 = _iterator3.next();
        if (_i3.done) break;
        _ref5 = _i3.value;
      }

      var _ref4 = _ref5;
      var name = _ref4.name,
          content = _ref4.content;

      s += '<meta name="' + encodeHTMLEntities(name) + '" content="' + encodeHTMLEntities(content) + '" vue-head-mixin>';
    }

    return s;
  }

  module.exports = exports['default'];
});