/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var markdownTextareaEditor = __webpack_require__(1);

var qs = document.querySelector.bind(document);

var body = qs('.js-bodyEditMode');
var bodyEditContainer = qs('.js-bodyEditContainer');
var title = qs('.js-title');
var bodyViewMode = qs('.js-bodyViewMode');
var bodyEditButton = qs('.js-bodyEditButton');
var bodyViewButton = qs('.js-bodyViewButton');
var uploadAssetForm = qs('.js-uploadAssetForm');
var uploadAsset = qs('.js-uploadAsset');
var uploadAssetText = qs('.js-uploadAssetText');
var uploadAssetMessage = qs('.js-uploadAssetMessage');
var addLink = qs('.js-addLink');
var toggleBold = qs('.js-toggleBold');
var toggleItalics = qs('.js-toggleItalics');
var toggleStrikethrough = qs('.js-toggleStrikethrough');
var addBigHeader = qs('.js-addBigHeader');
var addMediumHeader = qs('.js-addMediumHeader');
var addSmallHeader = qs('.js-addSmallHeader');
var addUnorderedList = qs('.js-addUnorderedList');
var addOrderedList = qs('.js-addOrderedList');
var toolbarActions = qs('.js-toolbarActions');

markdownTextareaEditor(
  {
    bodyViewButton: bodyViewButton,
    bodyEditButton: bodyEditButton,
    bodyViewMode: bodyViewMode,
    bodyEditContainer: bodyEditContainer,
    toolbarActions: toolbarActions,
    title: title,
    body: body,
    toggleBold: toggleBold,
    toggleItalics: toggleItalics,
    toggleStrikethrough: toggleStrikethrough,
    toggleH2: addBigHeader,
    toggleH3: addMediumHeader,
    toggleH4: addSmallHeader,
    addLink: addLink,
    addUnorderedList: addUnorderedList,
    addOrderedList: addOrderedList,
    uploadAsset: uploadAsset,
    uploadAssetText: uploadAssetText,
    uploadAssetForm: uploadAssetForm,
    uploadAssetMessage: uploadAssetMessage
  },
  {
    postAsset: function(obj) {
      obj.success({ Location: 'https://images.unsplash.com/photo-1551464885-21348ccc8b67' });
    }
  }
);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var markdownFunctions = __webpack_require__(2);
var md = __webpack_require__(4)();

var markdownTextareaEditor = function(elements, config) {
  var bodyViewButton = elements.bodyViewButton;
  var bodyEditButton = elements.bodyEditButton;
  var bodyViewMode = elements.bodyViewMode;
  var bodyEditContainer = elements.bodyEditContainer;
  var toolbarActions = elements.toolbarActions;
  var title = elements.title;
  var body = elements.body;
  var addLink = elements.addLink;
  var toggleBold = elements.toggleBold;
  var toggleItalics = elements.toggleItalics;
  var toggleStrikethrough = elements.toggleStrikethrough;
  var toggleH2 = elements.toggleH2;
  var toggleH3 = elements.toggleH3;
  var toggleH4 = elements.toggleH4;
  var addUnorderedList = elements.addUnorderedList;
  var addOrderedList = elements.addOrderedList;
  var uploadAsset = elements.uploadAsset;
  var uploadAssetText = elements.uploadAssetText;
  var uploadAssetForm = elements.uploadAssetForm;
  var uploadAssetMessage = elements.uploadAssetMessage;

  if (!body) {
    throw new Error('Missing required body element.');
  }

  title.addEventListener('keyup', function(e) {
    var ENTER = 13;
    if (e.which === ENTER || e.keyCode === ENTER) {
      body.focus();
    }
  });

  bodyViewButton.addEventListener('click', function() {
    var previewHtml = md.render('# ' + title.value + '\n' + body.value);
    bodyViewMode.innerHTML = previewHtml;
    bodyEditContainer.classList.add('u-displayNone');
    bodyViewMode.classList.remove('u-displayNone');
    bodyEditButton.classList.remove('is-active');
    bodyViewButton.classList.add('is-active');
    toolbarActions.classList.add('u-displayNone');
  });

  bodyEditButton.addEventListener('click', function() {
    bodyViewMode.classList.add('u-displayNone');
    bodyEditContainer.classList.remove('u-displayNone');
    bodyViewButton.classList.remove('is-active');
    bodyEditButton.classList.add('is-active');
    toolbarActions.classList.remove('u-displayNone');
  });

  var adjustBodySize = function() {
    body.style.height = 'auto';
    body.style.height = body.scrollHeight + 'px';
  };
  body.setAttribute(
    'style',
    'height:' + body.scrollHeight + 'px; overflow-y:hidden;'
  );
  body.addEventListener('input', adjustBodySize, false);

  body.addEventListener('keydown', function(e) {
    // Regular Key Presses
    if (e.keyCode === 9 || e.which === 9) {
      e.preventDefault();
      markdownFunctions.addTab(body);
    }

    // Ctrl-Key Presses
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      if (e.which === 66) {
        markdownFunctions.toggleBold(body);
      } else if (e.which === 83) {
        markdownFunctions.toggleStrikethrough(body);
      } else if (e.which === 73) {
        markdownFunctions.toggleItalics(body);
      } else if (e.which === 50) {
        markdownFunctions.toggleH2(body);
      } else if (e.which === 51) {
        markdownFunctions.toggleH3(body);
      } else if (e.which === 52) {
        markdownFunctions.toggleH4(body);
      } else if (e.which === 76) {
        markdownFunctions.addLink(body);
      } else if (e.which === 85) {
        markdownFunctions.addUnorderedList(body);
      } else if (e.which === 79) {
        markdownFunctions.addOrderedList(body);
      }
    }
  });

  toggleBold &&
    toggleBold.addEventListener('click', function() {
      markdownFunctions.toggleBold(body);
    });

  toggleItalics &&
    toggleItalics.addEventListener('click', function() {
      markdownFunctions.toggleItalics(body);
    });

  toggleStrikethrough &&
    toggleStrikethrough.addEventListener('click', function() {
      markdownFunctions.toggleStrikethrough(body);
    });

  toggleH2 &&
    toggleH2.addEventListener('click', function() {
      markdownFunctions.toggleH2(body);
    });

  toggleH3 &&
    toggleH3.addEventListener('click', function() {
      markdownFunctions.toggleH3(body);
    });

  toggleH4 &&
    toggleH4.addEventListener('click', function() {
      markdownFunctions.toggleH4(body);
    });

  addLink &&
    addLink.addEventListener('click', function() {
      markdownFunctions.addLink(body);
    });

  addUnorderedList &&
    addUnorderedList.addEventListener('click', function() {
      markdownFunctions.addUnorderedList(body);
    });

  addOrderedList &&
    addOrderedList.addEventListener('click', function() {
      markdownFunctions.addOrderedList(body);
    });

  uploadAsset &&
    uploadAsset.addEventListener('change', function() {
      if (config.postAsset) {
        if (uploadAssetText.innerHTML === '..loading..') {
          return;
        }
        uploadAssetText.innerHTML = '..loading..';
        var formData = new FormData(uploadAssetForm);
        config.postAsset({
          data: formData,
          success: function(response) {
            uploadAssetMessage.classList.add('u-displayNone');
            uploadAssetText.innerHTML = '';
            markdownFunctions.addImage(body, response.Location);
          },
          error: function() {
            uploadAssetMessage.classList.remove('u-displayNone');
            uploadAssetText.innerHTML = '';
          }
        });
      } else {
        markdownFunctions.addImage(body);
      }
    });
};

module.exports = markdownTextareaEditor;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var insertAtTheCaret = __webpack_require__(3).insertAtTheCaret;
var isNumeric = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
var adjustBodySize = function(body) {
  body.style.height = 'auto';
  body.style.height = body.scrollHeight + 'px';
};

var toggleBold = function(body) {
  insertAtTheCaret(body, { surround: '**' });
};

var toggleItalics = function(body) {
  insertAtTheCaret(body, { surround: '_' });
};

var toggleStrikethrough = function(body) {
  insertAtTheCaret(body, { surround: '~~' });
};

var toggleH1 = function(body) {
  insertAtTheCaret(body, {
    startLineChars: '# ',
    toggle: true,
    removeFirstX: function(line) {
      var val = 0;
      ['## ', '### ', '#### '].some(function(starter) {
        return line.indexOf(starter) === 0 && (val = starter.length);
      });
      return val;
    }
  });
};

var toggleH2 = function(body) {
  insertAtTheCaret(body, {
    startLineChars: '## ',
    toggle: true,
    removeFirstX: function(line) {
      var val = 0;
      ['# ', '### ', '#### '].some(function(starter) {
        return line.indexOf(starter) === 0 && (val = starter.length);
      });
      return val;
    }
  });
};

var toggleH3 = function(body) {
  insertAtTheCaret(body, {
    startLineChars: '### ',
    toggle: true,
    removeFirstX: function(line) {
      var val = 0;
      ['# ', '## ', '#### '].some(function(starter) {
        return line.indexOf(starter) === 0 && (val = starter.length);
      });
      return val;
    }
  });
};

var toggleH4 = function(body) {
  insertAtTheCaret(body, {
    startLineChars: '#### ',
    toggle: true,
    removeFirstX: function(line) {
      var val = 0;
      ['# ', '## ', '### '].some(function(starter) {
        return line.indexOf(starter) === 0 && (val = starter.length);
      });
      return val;
    }
  });
};

var addTab = function(body) {
  insertAtTheCaret(body, '    ');
};

var addImage = function(body, url) {
  var fn = function(highlighted) {
    return (
      '![' +
      (highlighted || 'Image Description') +
      '](' +
      (url || 'Image Url') +
      ')'
    );
  };
  insertAtTheCaret(body, fn);
  adjustBodySize(body);
};

var addLink = function(body) {
  var fn = function(highlighted) {
    return '[' + (highlighted || 'Link Text') + '](Link Url)';
  };
  insertAtTheCaret(body, fn);
};

var addUnorderedList = function(body) {
  insertAtTheCaret(body, {
    newLineChars: '- ',
    newline: true,
    prefix: function(preceding) {
      var indentSpace = 4;
      var currentLine = preceding.substring(preceding.lastIndexOf('\n') + 1);
      var firstWord = currentLine.trim().split(' ')[0];
      var indentNumber =
        firstWord === '-' ||
        (firstWord.indexOf('.') === firstWord.length - 1 &&
          isNumeric(firstWord.substring(0, firstWord.length - 1)))
          ? Math.floor(currentLine.search(/\S|$/) / 4) * 4 + indentSpace
          : 0;
      return (
        '\n' +
        Array.apply(null, { length: indentNumber })
          .map(function() {
            return ' ';
          })
          .join('')
      );
    }
  });
};

var addOrderedList = function(body) {
  insertAtTheCaret(body, {
    newLineChars: '1. ',
    newline: true,
    prefix: function(preceding) {
      var indentSpace = 4;
      var splits = preceding.split('\n');
      var prefix = '';
      var currentLine = splits.pop();
      if (currentLine) {
        prefix = '\n';
      } else {
        currentLine = splits.pop() || '';
      }
      var firstWord = currentLine.trim().split(' ')[0];
      var indentNumber =
        firstWord === '-' ||
        (firstWord.indexOf('.') === firstWord.length - 1 &&
          isNumeric(firstWord.substring(0, firstWord.length - 1)))
          ? Math.floor(currentLine.search(/\S|$/) / 4) * 4 + indentSpace
          : 0;
      return (
        prefix +
        Array.apply(null, { length: indentNumber })
          .map(function() {
            return ' ';
          })
          .join('')
      );
    }
  });
};

module.exports = {
  toggleBold: toggleBold,
  toggleItalics: toggleItalics,
  toggleStrikethrough: toggleStrikethrough,
  toggleH1: toggleH1,
  toggleH2: toggleH2,
  toggleH3: toggleH3,
  toggleH4: toggleH4,
  addTab: addTab,
  addImage: addImage,
  addLink: addLink,
  addUnorderedList: addUnorderedList,
  addOrderedList: addOrderedList
};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

var _workSurround = function(front, highlighted, back, caretStart, surround) {
  var prevWordIndex =
    Math.max(front.lastIndexOf(' '), front.lastIndexOf('\n')) + 1;
  var nextWordIndex = Math.min.apply(
    Math,
    [back.indexOf(' '), back.indexOf('\n'), back.length].filter(function(x) {
      return x !== -1;
    })
  );
  nextWordIndex = nextWordIndex === -1 ? 0 : nextWordIndex;
  var prevWord = front.substring(prevWordIndex);
  var nextWord = back.substring(0, nextWordIndex);
  if (
    prevWord.substring(0, surround.length) === surround &&
    nextWord.substring(nextWord.length - surround.length) === surround
  ) {
    front =
      front.substring(0, prevWordIndex) +
      front.substring(prevWordIndex + surround.length);
    back =
      back.substring(0, nextWordIndex - surround.length) +
      back.substring(nextWordIndex);
    return {
      value: front + highlighted + back,
      selectionStart: caretStart - surround.length,
      selectionEnd: caretStart - surround.length + highlighted.length
    };
  } else {
    front = front.substring(0, prevWordIndex) + surround + prevWord;
    back =
      back.substring(0, nextWordIndex) +
      surround +
      back.substring(nextWordIndex);
    return {
      value: front + highlighted + back,
      selectionStart: caretStart + surround.length,
      selectionEnd: caretStart + surround.length + highlighted.length
    };
  }
};

var _workNewLineChars = function(
  front,
  highlighted,
  back,
  caretStart,
  newLineChars,
  prefix
) {
  var prefixChars = prefix(front);
  return {
    value: front + prefixChars + newLineChars + highlighted + back,
    selectionStart: caretStart + prefixChars.length + newLineChars.length,
    selectionEnd:
      caretStart + prefixChars.length + newLineChars.length + highlighted.length
  };
};

var _workStartLineChars = function(
  front,
  highlighted,
  back,
  caretStart,
  startLineChars,
  removeFirstX
) {
  var currentLine = front.substring(front.lastIndexOf('\n') + 1);
  if (currentLine.substring(0, startLineChars.length) === startLineChars) {
    front =
      front.substring(0, front.lastIndexOf('\n') + 1) +
      front.substring(front.lastIndexOf('\n') + 1 + startLineChars.length);
    return {
      value: front + highlighted + back,
      selectionStart: caretStart - startLineChars.length,
      selectionEnd: caretStart - startLineChars.length + highlighted.length
    };
  } else {
    var removeFirstXLength = removeFirstX(
      front.substring(front.lastIndexOf('\n') + 1)
    );
    front =
      front.substring(0, front.lastIndexOf('\n') + 1) +
      startLineChars +
      front.substring(front.lastIndexOf('\n') + 1 + removeFirstXLength);
    var offset = startLineChars.length - removeFirstXLength;
    return {
      value: front + highlighted + back,
      selectionStart: caretStart + offset,
      selectionEnd: caretStart + offset + highlighted.length
    };
  }
};

var _workInsert = function(front, highlighted, back, caretStart, obj) {
  var text = typeof obj === 'function' ? obj(highlighted) : obj;

  return {
    value: front + text + back,
    selectionStart: caretStart + (typeof obj === 'string' ? text.length : 0),
    selectionEnd: caretStart + text.length
  };
};

var _work = function(textarea, obj) {
  var caretStart = textarea.selectionStart;
  var caretEnd = textarea.selectionEnd;
  var front = textarea.value.substring(0, caretStart);
  var highlighted = textarea.value.substring(caretStart, caretEnd);
  var back = textarea.value.substring(caretEnd, textarea.value.length);

  if (obj.surround) {
    return _workSurround(front, highlighted, back, caretStart, obj.surround);
  }
  if (obj.newLineChars) {
    return _workNewLineChars(
      front,
      highlighted,
      back,
      caretStart,
      obj.newLineChars,
      obj.prefix
    );
  }
  if (obj.startLineChars) {
    return _workStartLineChars(
      front,
      highlighted,
      back,
      caretStart,
      obj.startLineChars,
      obj.removeFirstX
    );
  }
  return _workInsert(front, highlighted, back, caretStart, obj);
};

var insertAtTheCaret = function(textarea, obj) {
  var r = _work(textarea, obj);
  textarea.value = r.value;
  textarea.selectionStart = r.selectionStart;
  textarea.selectionEnd = r.selectionEnd;
  textarea.focus();
};

module.exports = {
  insertAtTheCaret: insertAtTheCaret,
  _work: _work
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var require;var require;!function(e){if(true)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).markdownit=e()}}(function(){return function o(i,a,c){function l(t,e){if(!a[t]){if(!i[t]){var r="function"==typeof require&&require;if(!e&&r)return require(t,!0);if(u)return u(t,!0);var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}var s=a[t]={exports:{}};i[t][0].call(s.exports,function(e){var r=i[t][1][e];return l(r||e)},s,s.exports,o,i,a,c)}return a[t].exports}for(var u="function"==typeof require&&require,e=0;e<c.length;e++)l(c[e]);return l}({1:[function(e,r,t){"use strict";r.exports=e("entities/maps/entities.json")},{"entities/maps/entities.json":52}],2:[function(e,r,t){"use strict";r.exports=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","meta","nav","noframes","ol","optgroup","option","p","param","section","source","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"]},{}],3:[function(e,r,t){"use strict";var n="<[A-Za-z][A-Za-z0-9\\-]*(?:\\s+[a-zA-Z_:][a-zA-Z0-9:._-]*(?:\\s*=\\s*(?:[^\"'=<>`\\x00-\\x20]+|'[^']*'|\"[^\"]*\"))?)*\\s*\\/?>",s="<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>",o=new RegExp("^(?:"+n+"|"+s+"|\x3c!----\x3e|\x3c!--(?:-?[^>-])(?:-?[^-])*--\x3e|<[?].*?[?]>|<![A-Z]+\\s+[^>]*>|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>)"),i=new RegExp("^(?:"+n+"|"+s+")");r.exports.HTML_TAG_RE=o,r.exports.HTML_OPEN_CLOSE_TAG_RE=i},{}],4:[function(e,r,t){"use strict";var n=Object.prototype.hasOwnProperty;function i(e,r){return n.call(e,r)}function a(e){return!(55296<=e&&e<=57343)&&(!(64976<=e&&e<=65007)&&(65535!=(65535&e)&&65534!=(65535&e)&&(!(0<=e&&e<=8)&&(11!==e&&(!(14<=e&&e<=31)&&(!(127<=e&&e<=159)&&!(1114111<e)))))))}function c(e){if(65535<e){var r=55296+((e-=65536)>>10),t=56320+(1023&e);return String.fromCharCode(r,t)}return String.fromCharCode(e)}var s=/\\([!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])/g,o=new RegExp(s.source+"|"+/&([a-z#][a-z0-9]{1,31});/gi.source,"gi"),l=/^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i,u=e("./entities");var p=/[&<>"]/,h=/[&<>"]/g,f={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function d(e){return f[e]}var m=/[.?*+^$[\]\\(){}|-]/g;var _=e("uc.micro/categories/P/regex");t.lib={},t.lib.mdurl=e("mdurl"),t.lib.ucmicro=e("uc.micro"),t.assign=function(t){return Array.prototype.slice.call(arguments,1).forEach(function(r){if(r){if("object"!=typeof r)throw new TypeError(r+"must be object");Object.keys(r).forEach(function(e){t[e]=r[e]})}}),t},t.isString=function(e){return"[object String]"===(r=e,Object.prototype.toString.call(r));var r},t.has=i,t.unescapeMd=function(e){return e.indexOf("\\")<0?e:e.replace(s,"$1")},t.unescapeAll=function(e){return e.indexOf("\\")<0&&e.indexOf("&")<0?e:e.replace(o,function(e,r,t){return r||(n=e,o=0,i(u,s=t)?u[s]:35===s.charCodeAt(0)&&l.test(s)&&a(o="x"===s[1].toLowerCase()?parseInt(s.slice(2),16):parseInt(s.slice(1),10))?c(o):n);var n,s,o})},t.isValidEntityCode=a,t.fromCodePoint=c,t.escapeHtml=function(e){return p.test(e)?e.replace(h,d):e},t.arrayReplaceAt=function(e,r,t){return[].concat(e.slice(0,r),t,e.slice(r+1))},t.isSpace=function(e){switch(e){case 9:case 32:return!0}return!1},t.isWhiteSpace=function(e){if(8192<=e&&e<=8202)return!0;switch(e){case 9:case 10:case 11:case 12:case 13:case 32:case 160:case 5760:case 8239:case 8287:case 12288:return!0}return!1},t.isMdAsciiPunct=function(e){switch(e){case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 41:case 42:case 43:case 44:case 45:case 46:case 47:case 58:case 59:case 60:case 61:case 62:case 63:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 124:case 125:case 126:return!0;default:return!1}},t.isPunctChar=function(e){return _.test(e)},t.escapeRE=function(e){return e.replace(m,"\\$&")},t.normalizeReference=function(e){return e.trim().replace(/\s+/g," ").toUpperCase()}},{"./entities":1,mdurl:58,"uc.micro":65,"uc.micro/categories/P/regex":63}],5:[function(e,r,t){"use strict";t.parseLinkLabel=e("./parse_link_label"),t.parseLinkDestination=e("./parse_link_destination"),t.parseLinkTitle=e("./parse_link_title")},{"./parse_link_destination":6,"./parse_link_label":7,"./parse_link_title":8}],6:[function(e,r,t){"use strict";var a=e("../common/utils").isSpace,c=e("../common/utils").unescapeAll;r.exports=function(e,r,t){var n,s,o=r,i={ok:!1,pos:0,lines:0,str:""};if(60===e.charCodeAt(r)){for(r++;r<t;){if(10===(n=e.charCodeAt(r))||a(n))return i;if(62===n)return i.pos=r+1,i.str=c(e.slice(o+1,r)),i.ok=!0,i;92===n&&r+1<t?r+=2:r++}return i}for(s=0;r<t&&32!==(n=e.charCodeAt(r))&&!(n<32||127===n);)if(92===n&&r+1<t)r+=2;else{if(40===n&&s++,41===n){if(0===s)break;s--}r++}return o===r||0!==s||(i.str=c(e.slice(o,r)),i.lines=0,i.pos=r,i.ok=!0),i}},{"../common/utils":4}],7:[function(e,r,t){"use strict";r.exports=function(e,r,t){var n,s,o,i,a=-1,c=e.posMax,l=e.pos;for(e.pos=r+1,n=1;e.pos<c;){if(93===(o=e.src.charCodeAt(e.pos))&&0===--n){s=!0;break}if(i=e.pos,e.md.inline.skipToken(e),91===o)if(i===e.pos-1)n++;else if(t)return e.pos=l,-1}return s&&(a=e.pos),e.pos=l,a}},{}],8:[function(e,r,t){"use strict";var c=e("../common/utils").unescapeAll;r.exports=function(e,r,t){var n,s,o=0,i=r,a={ok:!1,pos:0,lines:0,str:""};if(t<=r)return a;if(34!==(s=e.charCodeAt(r))&&39!==s&&40!==s)return a;for(r++,40===s&&(s=41);r<t;){if((n=e.charCodeAt(r))===s)return a.pos=r+1,a.lines=o,a.str=c(e.slice(i+1,r)),a.ok=!0,a;10===n?o++:92===n&&r+1<t&&(r++,10===e.charCodeAt(r)&&o++),r++}return a}},{"../common/utils":4}],9:[function(e,r,t){"use strict";var n=e("./common/utils"),s=e("./helpers"),o=e("./renderer"),i=e("./parser_core"),a=e("./parser_block"),c=e("./parser_inline"),l=e("linkify-it"),u=e("mdurl"),p=e("punycode"),h={default:e("./presets/default"),zero:e("./presets/zero"),commonmark:e("./presets/commonmark")},f=/^(vbscript|javascript|file|data):/,d=/^data:image\/(gif|png|jpeg|webp);/;function m(e){var r=e.trim().toLowerCase();return!f.test(r)||!!d.test(r)}var _=["http:","https:","mailto:"];function g(e){var r=u.parse(e,!0);if(r.hostname&&(!r.protocol||0<=_.indexOf(r.protocol)))try{r.hostname=p.toASCII(r.hostname)}catch(e){}return u.encode(u.format(r))}function b(e){var r=u.parse(e,!0);if(r.hostname&&(!r.protocol||0<=_.indexOf(r.protocol)))try{r.hostname=p.toUnicode(r.hostname)}catch(e){}return u.decode(u.format(r))}function k(e,r){if(!(this instanceof k))return new k(e,r);r||n.isString(e)||(r=e||{},e="default"),this.inline=new c,this.block=new a,this.core=new i,this.renderer=new o,this.linkify=new l,this.validateLink=m,this.normalizeLink=g,this.normalizeLinkText=b,this.utils=n,this.helpers=n.assign({},s),this.options={},this.configure(e),r&&this.set(r)}k.prototype.set=function(e){return n.assign(this.options,e),this},k.prototype.configure=function(r){var e,t=this;if(n.isString(r)&&!(r=h[e=r]))throw new Error('Wrong `markdown-it` preset "'+e+'", check name');if(!r)throw new Error("Wrong `markdown-it` preset, can't be empty");return r.options&&t.set(r.options),r.components&&Object.keys(r.components).forEach(function(e){r.components[e].rules&&t[e].ruler.enableOnly(r.components[e].rules),r.components[e].rules2&&t[e].ruler2.enableOnly(r.components[e].rules2)}),this},k.prototype.enable=function(r,e){var t=[];Array.isArray(r)||(r=[r]),["core","block","inline"].forEach(function(e){t=t.concat(this[e].ruler.enable(r,!0))},this),t=t.concat(this.inline.ruler2.enable(r,!0));var n=r.filter(function(e){return t.indexOf(e)<0});if(n.length&&!e)throw new Error("MarkdownIt. Failed to enable unknown rule(s): "+n);return this},k.prototype.disable=function(r,e){var t=[];Array.isArray(r)||(r=[r]),["core","block","inline"].forEach(function(e){t=t.concat(this[e].ruler.disable(r,!0))},this),t=t.concat(this.inline.ruler2.disable(r,!0));var n=r.filter(function(e){return t.indexOf(e)<0});if(n.length&&!e)throw new Error("MarkdownIt. Failed to disable unknown rule(s): "+n);return this},k.prototype.use=function(e){var r=[this].concat(Array.prototype.slice.call(arguments,1));return e.apply(e,r),this},k.prototype.parse=function(e,r){if("string"!=typeof e)throw new Error("Input data should be a String");var t=new this.core.State(e,this,r);return this.core.process(t),t.tokens},k.prototype.render=function(e,r){return r=r||{},this.renderer.render(this.parse(e,r),this.options,r)},k.prototype.parseInline=function(e,r){var t=new this.core.State(e,this,r);return t.inlineMode=!0,this.core.process(t),t.tokens},k.prototype.renderInline=function(e,r){return r=r||{},this.renderer.render(this.parseInline(e,r),this.options,r)},r.exports=k},{"./common/utils":4,"./helpers":5,"./parser_block":10,"./parser_core":11,"./parser_inline":12,"./presets/commonmark":13,"./presets/default":14,"./presets/zero":15,"./renderer":16,"linkify-it":53,mdurl:58,punycode:60}],10:[function(e,r,t){"use strict";var n=e("./ruler"),s=[["table",e("./rules_block/table"),["paragraph","reference"]],["code",e("./rules_block/code")],["fence",e("./rules_block/fence"),["paragraph","reference","blockquote","list"]],["blockquote",e("./rules_block/blockquote"),["paragraph","reference","blockquote","list"]],["hr",e("./rules_block/hr"),["paragraph","reference","blockquote","list"]],["list",e("./rules_block/list"),["paragraph","reference","blockquote"]],["reference",e("./rules_block/reference")],["heading",e("./rules_block/heading"),["paragraph","reference","blockquote"]],["lheading",e("./rules_block/lheading")],["html_block",e("./rules_block/html_block"),["paragraph","reference","blockquote"]],["paragraph",e("./rules_block/paragraph")]];function o(){this.ruler=new n;for(var e=0;e<s.length;e++)this.ruler.push(s[e][0],s[e][1],{alt:(s[e][2]||[]).slice()})}o.prototype.tokenize=function(e,r,t){for(var n,s=this.ruler.getRules(""),o=s.length,i=r,a=!1,c=e.md.options.maxNesting;i<t&&(e.line=i=e.skipEmptyLines(i),!(t<=i))&&!(e.sCount[i]<e.blkIndent);){if(e.level>=c){e.line=t;break}for(n=0;n<o&&!s[n](e,i,t,!1);n++);e.tight=!a,e.isEmpty(e.line-1)&&(a=!0),(i=e.line)<t&&e.isEmpty(i)&&(a=!0,i++,e.line=i)}},o.prototype.parse=function(e,r,t,n){var s;e&&(s=new this.State(e,r,t,n),this.tokenize(s,s.line,s.lineMax))},o.prototype.State=e("./rules_block/state_block"),r.exports=o},{"./ruler":17,"./rules_block/blockquote":18,"./rules_block/code":19,"./rules_block/fence":20,"./rules_block/heading":21,"./rules_block/hr":22,"./rules_block/html_block":23,"./rules_block/lheading":24,"./rules_block/list":25,"./rules_block/paragraph":26,"./rules_block/reference":27,"./rules_block/state_block":28,"./rules_block/table":29}],11:[function(e,r,t){"use strict";var n=e("./ruler"),s=[["normalize",e("./rules_core/normalize")],["block",e("./rules_core/block")],["inline",e("./rules_core/inline")],["linkify",e("./rules_core/linkify")],["replacements",e("./rules_core/replacements")],["smartquotes",e("./rules_core/smartquotes")]];function o(){this.ruler=new n;for(var e=0;e<s.length;e++)this.ruler.push(s[e][0],s[e][1])}o.prototype.process=function(e){var r,t,n;for(r=0,t=(n=this.ruler.getRules("")).length;r<t;r++)n[r](e)},o.prototype.State=e("./rules_core/state_core"),r.exports=o},{"./ruler":17,"./rules_core/block":30,"./rules_core/inline":31,"./rules_core/linkify":32,"./rules_core/normalize":33,"./rules_core/replacements":34,"./rules_core/smartquotes":35,"./rules_core/state_core":36}],12:[function(e,r,t){"use strict";var n=e("./ruler"),s=[["text",e("./rules_inline/text")],["newline",e("./rules_inline/newline")],["escape",e("./rules_inline/escape")],["backticks",e("./rules_inline/backticks")],["strikethrough",e("./rules_inline/strikethrough").tokenize],["emphasis",e("./rules_inline/emphasis").tokenize],["link",e("./rules_inline/link")],["image",e("./rules_inline/image")],["autolink",e("./rules_inline/autolink")],["html_inline",e("./rules_inline/html_inline")],["entity",e("./rules_inline/entity")]],o=[["balance_pairs",e("./rules_inline/balance_pairs")],["strikethrough",e("./rules_inline/strikethrough").postProcess],["emphasis",e("./rules_inline/emphasis").postProcess],["text_collapse",e("./rules_inline/text_collapse")]];function i(){var e;for(this.ruler=new n,e=0;e<s.length;e++)this.ruler.push(s[e][0],s[e][1]);for(this.ruler2=new n,e=0;e<o.length;e++)this.ruler2.push(o[e][0],o[e][1])}i.prototype.skipToken=function(e){var r,t,n=e.pos,s=this.ruler.getRules(""),o=s.length,i=e.md.options.maxNesting,a=e.cache;if(void 0===a[n]){if(e.level<i)for(t=0;t<o&&(e.level++,r=s[t](e,!0),e.level--,!r);t++);else e.pos=e.posMax;r||e.pos++,a[n]=e.pos}else e.pos=a[n]},i.prototype.tokenize=function(e){for(var r,t,n=this.ruler.getRules(""),s=n.length,o=e.posMax,i=e.md.options.maxNesting;e.pos<o;){if(e.level<i)for(t=0;t<s&&!(r=n[t](e,!1));t++);if(r){if(e.pos>=o)break}else e.pending+=e.src[e.pos++]}e.pending&&e.pushPending()},i.prototype.parse=function(e,r,t,n){var s,o,i,a=new this.State(e,r,t,n);for(this.tokenize(a),i=(o=this.ruler2.getRules("")).length,s=0;s<i;s++)o[s](a)},i.prototype.State=e("./rules_inline/state_inline"),r.exports=i},{"./ruler":17,"./rules_inline/autolink":37,"./rules_inline/backticks":38,"./rules_inline/balance_pairs":39,"./rules_inline/emphasis":40,"./rules_inline/entity":41,"./rules_inline/escape":42,"./rules_inline/html_inline":43,"./rules_inline/image":44,"./rules_inline/link":45,"./rules_inline/newline":46,"./rules_inline/state_inline":47,"./rules_inline/strikethrough":48,"./rules_inline/text":49,"./rules_inline/text_collapse":50}],13:[function(e,r,t){"use strict";r.exports={options:{html:!0,xhtmlOut:!0,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"\u201c\u201d\u2018\u2019",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline"]},block:{rules:["blockquote","code","fence","heading","hr","html_block","lheading","list","reference","paragraph"]},inline:{rules:["autolink","backticks","emphasis","entity","escape","html_inline","image","link","newline","text"],rules2:["balance_pairs","emphasis","text_collapse"]}}}},{}],14:[function(e,r,t){"use strict";r.exports={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"\u201c\u201d\u2018\u2019",highlight:null,maxNesting:100},components:{core:{},block:{},inline:{}}}},{}],15:[function(e,r,t){"use strict";r.exports={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"\u201c\u201d\u2018\u2019",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline"]},block:{rules:["paragraph"]},inline:{rules:["text"],rules2:["balance_pairs","text_collapse"]}}}},{}],16:[function(e,r,t){"use strict";var n=e("./common/utils").assign,h=e("./common/utils").unescapeAll,f=e("./common/utils").escapeHtml,s={};function o(){this.rules=n({},s)}s.code_inline=function(e,r,t,n,s){var o=e[r];return"<code"+s.renderAttrs(o)+">"+f(e[r].content)+"</code>"},s.code_block=function(e,r,t,n,s){var o=e[r];return"<pre"+s.renderAttrs(o)+"><code>"+f(e[r].content)+"</code></pre>\n"},s.fence=function(e,r,t,n,s){var o,i,a,c,l=e[r],u=l.info?h(l.info).trim():"",p="";return u&&(p=u.split(/\s+/g)[0]),0===(o=t.highlight&&t.highlight(l.content,p)||f(l.content)).indexOf("<pre")?o+"\n":u?(i=l.attrIndex("class"),a=l.attrs?l.attrs.slice():[],i<0?a.push(["class",t.langPrefix+p]):a[i][1]+=" "+t.langPrefix+p,c={attrs:a},"<pre><code"+s.renderAttrs(c)+">"+o+"</code></pre>\n"):"<pre><code"+s.renderAttrs(l)+">"+o+"</code></pre>\n"},s.image=function(e,r,t,n,s){var o=e[r];return o.attrs[o.attrIndex("alt")][1]=s.renderInlineAsText(o.children,t,n),s.renderToken(e,r,t)},s.hardbreak=function(e,r,t){return t.xhtmlOut?"<br />\n":"<br>\n"},s.softbreak=function(e,r,t){return t.breaks?t.xhtmlOut?"<br />\n":"<br>\n":"\n"},s.text=function(e,r){return f(e[r].content)},s.html_block=function(e,r){return e[r].content},s.html_inline=function(e,r){return e[r].content},o.prototype.renderAttrs=function(e){var r,t,n;if(!e.attrs)return"";for(n="",r=0,t=e.attrs.length;r<t;r++)n+=" "+f(e.attrs[r][0])+'="'+f(e.attrs[r][1])+'"';return n},o.prototype.renderToken=function(e,r,t){var n,s="",o=!1,i=e[r];return i.hidden?"":(i.block&&-1!==i.nesting&&r&&e[r-1].hidden&&(s+="\n"),s+=(-1===i.nesting?"</":"<")+i.tag,s+=this.renderAttrs(i),0===i.nesting&&t.xhtmlOut&&(s+=" /"),i.block&&(o=!0,1===i.nesting&&r+1<e.length&&("inline"===(n=e[r+1]).type||n.hidden?o=!1:-1===n.nesting&&n.tag===i.tag&&(o=!1))),s+=o?">\n":">")},o.prototype.renderInline=function(e,r,t){for(var n,s="",o=this.rules,i=0,a=e.length;i<a;i++)void 0!==o[n=e[i].type]?s+=o[n](e,i,r,t,this):s+=this.renderToken(e,i,r);return s},o.prototype.renderInlineAsText=function(e,r,t){for(var n="",s=0,o=e.length;s<o;s++)"text"===e[s].type?n+=e[s].content:"image"===e[s].type&&(n+=this.renderInlineAsText(e[s].children,r,t));return n},o.prototype.render=function(e,r,t){var n,s,o,i="",a=this.rules;for(n=0,s=e.length;n<s;n++)"inline"===(o=e[n].type)?i+=this.renderInline(e[n].children,r,t):void 0!==a[o]?i+=a[e[n].type](e,n,r,t,this):i+=this.renderToken(e,n,r,t);return i},r.exports=o},{"./common/utils":4}],17:[function(e,r,t){"use strict";function n(){this.__rules__=[],this.__cache__=null}n.prototype.__find__=function(e){for(var r=0;r<this.__rules__.length;r++)if(this.__rules__[r].name===e)return r;return-1},n.prototype.__compile__=function(){var t=this,r=[""];t.__rules__.forEach(function(e){e.enabled&&e.alt.forEach(function(e){r.indexOf(e)<0&&r.push(e)})}),t.__cache__={},r.forEach(function(r){t.__cache__[r]=[],t.__rules__.forEach(function(e){e.enabled&&(r&&e.alt.indexOf(r)<0||t.__cache__[r].push(e.fn))})})},n.prototype.at=function(e,r,t){var n=this.__find__(e),s=t||{};if(-1===n)throw new Error("Parser rule not found: "+e);this.__rules__[n].fn=r,this.__rules__[n].alt=s.alt||[],this.__cache__=null},n.prototype.before=function(e,r,t,n){var s=this.__find__(e),o=n||{};if(-1===s)throw new Error("Parser rule not found: "+e);this.__rules__.splice(s,0,{name:r,enabled:!0,fn:t,alt:o.alt||[]}),this.__cache__=null},n.prototype.after=function(e,r,t,n){var s=this.__find__(e),o=n||{};if(-1===s)throw new Error("Parser rule not found: "+e);this.__rules__.splice(s+1,0,{name:r,enabled:!0,fn:t,alt:o.alt||[]}),this.__cache__=null},n.prototype.push=function(e,r,t){var n=t||{};this.__rules__.push({name:e,enabled:!0,fn:r,alt:n.alt||[]}),this.__cache__=null},n.prototype.enable=function(e,t){Array.isArray(e)||(e=[e]);var n=[];return e.forEach(function(e){var r=this.__find__(e);if(r<0){if(t)return;throw new Error("Rules manager: invalid rule name "+e)}this.__rules__[r].enabled=!0,n.push(e)},this),this.__cache__=null,n},n.prototype.enableOnly=function(e,r){Array.isArray(e)||(e=[e]),this.__rules__.forEach(function(e){e.enabled=!1}),this.enable(e,r)},n.prototype.disable=function(e,t){Array.isArray(e)||(e=[e]);var n=[];return e.forEach(function(e){var r=this.__find__(e);if(r<0){if(t)return;throw new Error("Rules manager: invalid rule name "+e)}this.__rules__[r].enabled=!1,n.push(e)},this),this.__cache__=null,n},n.prototype.getRules=function(e){return null===this.__cache__&&this.__compile__(),this.__cache__[e]||[]},r.exports=n},{}],18:[function(e,r,t){"use strict";var E=e("../common/utils").isSpace;r.exports=function(e,r,t,n){var s,o,i,a,c,l,u,p,h,f,d,m,_,g,b,k,v,x,y,C,A=e.lineMax,w=e.bMarks[r]+e.tShift[r],D=e.eMarks[r];if(4<=e.sCount[r]-e.blkIndent)return!1;if(62!==e.src.charCodeAt(w++))return!1;if(n)return!0;for(a=h=e.sCount[r]+w-(e.bMarks[r]+e.tShift[r]),32===e.src.charCodeAt(w)?(w++,a++,h++,k=!(s=!1)):9===e.src.charCodeAt(w)?(k=!0,(e.bsCount[r]+h)%4==3?(w++,a++,h++,s=!1):s=!0):k=!1,f=[e.bMarks[r]],e.bMarks[r]=w;w<D&&(o=e.src.charCodeAt(w),E(o));)9===o?h+=4-(h+e.bsCount[r]+(s?1:0))%4:h++,w++;for(d=[e.bsCount[r]],e.bsCount[r]=e.sCount[r]+1+(k?1:0),l=D<=w,g=[e.sCount[r]],e.sCount[r]=h-a,b=[e.tShift[r]],e.tShift[r]=w-e.bMarks[r],x=e.md.block.ruler.getRules("blockquote"),_=e.parentType,C=!(e.parentType="blockquote"),p=r+1;p<t&&(e.sCount[p]<e.blkIndent&&(C=!0),w=e.bMarks[p]+e.tShift[p],!((D=e.eMarks[p])<=w));p++)if(62!==e.src.charCodeAt(w++)||C){if(l)break;for(v=!1,i=0,c=x.length;i<c;i++)if(x[i](e,p,t,!0)){v=!0;break}if(v){e.lineMax=p,0!==e.blkIndent&&(f.push(e.bMarks[p]),d.push(e.bsCount[p]),b.push(e.tShift[p]),g.push(e.sCount[p]),e.sCount[p]-=e.blkIndent);break}f.push(e.bMarks[p]),d.push(e.bsCount[p]),b.push(e.tShift[p]),g.push(e.sCount[p]),e.sCount[p]=-1}else{for(a=h=e.sCount[p]+w-(e.bMarks[p]+e.tShift[p]),32===e.src.charCodeAt(w)?(w++,a++,h++,k=!(s=!1)):9===e.src.charCodeAt(w)?(k=!0,(e.bsCount[p]+h)%4==3?(w++,a++,h++,s=!1):s=!0):k=!1,f.push(e.bMarks[p]),e.bMarks[p]=w;w<D&&(o=e.src.charCodeAt(w),E(o));)9===o?h+=4-(h+e.bsCount[p]+(s?1:0))%4:h++,w++;l=D<=w,d.push(e.bsCount[p]),e.bsCount[p]=e.sCount[p]+1+(k?1:0),g.push(e.sCount[p]),e.sCount[p]=h-a,b.push(e.tShift[p]),e.tShift[p]=w-e.bMarks[p]}for(m=e.blkIndent,e.blkIndent=0,(y=e.push("blockquote_open","blockquote",1)).markup=">",y.map=u=[r,0],e.md.block.tokenize(e,r,p),(y=e.push("blockquote_close","blockquote",-1)).markup=">",e.lineMax=A,e.parentType=_,u[1]=e.line,i=0;i<b.length;i++)e.bMarks[i+r]=f[i],e.tShift[i+r]=b[i],e.sCount[i+r]=g[i],e.bsCount[i+r]=d[i];return e.blkIndent=m,!0}},{"../common/utils":4}],19:[function(e,r,t){"use strict";r.exports=function(e,r,t){var n,s,o;if(e.sCount[r]-e.blkIndent<4)return!1;for(s=n=r+1;n<t;)if(e.isEmpty(n))n++;else{if(!(4<=e.sCount[n]-e.blkIndent))break;s=++n}return e.line=s,(o=e.push("code_block","code",0)).content=e.getLines(r,s,4+e.blkIndent,!0),o.map=[r,e.line],!0}},{}],20:[function(e,r,t){"use strict";r.exports=function(e,r,t,n){var s,o,i,a,c,l,u,p=!1,h=e.bMarks[r]+e.tShift[r],f=e.eMarks[r];if(4<=e.sCount[r]-e.blkIndent)return!1;if(f<h+3)return!1;if(126!==(s=e.src.charCodeAt(h))&&96!==s)return!1;if(c=h,(o=(h=e.skipChars(h,s))-c)<3)return!1;if(u=e.src.slice(c,h),0<=(i=e.src.slice(h,f)).indexOf(String.fromCharCode(s)))return!1;if(n)return!0;for(a=r;!(t<=++a)&&!((h=c=e.bMarks[a]+e.tShift[a])<(f=e.eMarks[a])&&e.sCount[a]<e.blkIndent);)if(e.src.charCodeAt(h)===s&&!(4<=e.sCount[a]-e.blkIndent||(h=e.skipChars(h,s))-c<o||(h=e.skipSpaces(h))<f)){p=!0;break}return o=e.sCount[r],e.line=a+(p?1:0),(l=e.push("fence","code",0)).info=i,l.content=e.getLines(r+1,a,o,!0),l.markup=u,l.map=[r,e.line],!0}},{}],21:[function(e,r,t){"use strict";var u=e("../common/utils").isSpace;r.exports=function(e,r,t,n){var s,o,i,a,c=e.bMarks[r]+e.tShift[r],l=e.eMarks[r];if(4<=e.sCount[r]-e.blkIndent)return!1;if(35!==(s=e.src.charCodeAt(c))||l<=c)return!1;for(o=1,s=e.src.charCodeAt(++c);35===s&&c<l&&o<=6;)o++,s=e.src.charCodeAt(++c);return!(6<o||c<l&&!u(s))&&(n||(l=e.skipSpacesBack(l,c),c<(i=e.skipCharsBack(l,35,c))&&u(e.src.charCodeAt(i-1))&&(l=i),e.line=r+1,(a=e.push("heading_open","h"+String(o),1)).markup="########".slice(0,o),a.map=[r,e.line],(a=e.push("inline","",0)).content=e.src.slice(c,l).trim(),a.map=[r,e.line],a.children=[],(a=e.push("heading_close","h"+String(o),-1)).markup="########".slice(0,o)),!0)}},{"../common/utils":4}],22:[function(e,r,t){"use strict";var u=e("../common/utils").isSpace;r.exports=function(e,r,t,n){var s,o,i,a,c=e.bMarks[r]+e.tShift[r],l=e.eMarks[r];if(4<=e.sCount[r]-e.blkIndent)return!1;if(42!==(s=e.src.charCodeAt(c++))&&45!==s&&95!==s)return!1;for(o=1;c<l;){if((i=e.src.charCodeAt(c++))!==s&&!u(i))return!1;i===s&&o++}return!(o<3)&&(n||(e.line=r+1,(a=e.push("hr","hr",0)).map=[r,e.line],a.markup=Array(o+1).join(String.fromCharCode(s))),!0)}},{"../common/utils":4}],23:[function(e,r,t){"use strict";var n=e("../common/html_blocks"),s=e("../common/html_re").HTML_OPEN_CLOSE_TAG_RE,u=[[/^<(script|pre|style)(?=(\s|>|$))/i,/<\/(script|pre|style)>/i,!0],[/^<!--/,/-->/,!0],[/^<\?/,/\?>/,!0],[/^<![A-Z]/,/>/,!0],[/^<!\[CDATA\[/,/\]\]>/,!0],[new RegExp("^</?("+n.join("|")+")(?=(\\s|/?>|$))","i"),/^$/,!0],[new RegExp(s.source+"\\s*$"),/^$/,!1]];r.exports=function(e,r,t,n){var s,o,i,a,c=e.bMarks[r]+e.tShift[r],l=e.eMarks[r];if(4<=e.sCount[r]-e.blkIndent)return!1;if(!e.md.options.html)return!1;if(60!==e.src.charCodeAt(c))return!1;for(a=e.src.slice(c,l),s=0;s<u.length&&!u[s][0].test(a);s++);if(s===u.length)return!1;if(n)return u[s][2];if(o=r+1,!u[s][1].test(a))for(;o<t&&!(e.sCount[o]<e.blkIndent);o++)if(c=e.bMarks[o]+e.tShift[o],l=e.eMarks[o],a=e.src.slice(c,l),u[s][1].test(a)){0!==a.length&&o++;break}return e.line=o,(i=e.push("html_block","",0)).map=[r,o],i.content=e.getLines(r,o,e.blkIndent,!0),!0}},{"../common/html_blocks":2,"../common/html_re":3}],24:[function(e,r,t){"use strict";r.exports=function(e,r,t){var n,s,o,i,a,c,l,u,p,h,f=r+1,d=e.md.block.ruler.getRules("paragraph");if(4<=e.sCount[r]-e.blkIndent)return!1;for(h=e.parentType,e.parentType="paragraph";f<t&&!e.isEmpty(f);f++)if(!(3<e.sCount[f]-e.blkIndent)){if(e.sCount[f]>=e.blkIndent&&(c=e.bMarks[f]+e.tShift[f])<(l=e.eMarks[f])&&(45===(p=e.src.charCodeAt(c))||61===p)&&(c=e.skipChars(c,p),l<=(c=e.skipSpaces(c)))){u=61===p?1:2;break}if(!(e.sCount[f]<0)){for(s=!1,o=0,i=d.length;o<i;o++)if(d[o](e,f,t,!0)){s=!0;break}if(s)break}}return!!u&&(n=e.getLines(r,f,e.blkIndent,!1).trim(),e.line=f+1,(a=e.push("heading_open","h"+String(u),1)).markup=String.fromCharCode(p),a.map=[r,e.line],(a=e.push("inline","",0)).content=n,a.map=[r,e.line-1],a.children=[],(a=e.push("heading_close","h"+String(u),-1)).markup=String.fromCharCode(p),e.parentType=h,!0)}},{}],25:[function(e,r,t){"use strict";var i=e("../common/utils").isSpace;function I(e,r){var t,n,s,o;return n=e.bMarks[r]+e.tShift[r],s=e.eMarks[r],42!==(t=e.src.charCodeAt(n++))&&45!==t&&43!==t?-1:n<s&&(o=e.src.charCodeAt(n),!i(o))?-1:n}function R(e,r){var t,n=e.bMarks[r]+e.tShift[r],s=n,o=e.eMarks[r];if(o<=s+1)return-1;if((t=e.src.charCodeAt(s++))<48||57<t)return-1;for(;;){if(o<=s)return-1;if(!(48<=(t=e.src.charCodeAt(s++))&&t<=57)){if(41===t||46===t)break;return-1}if(10<=s-n)return-1}return s<o&&(t=e.src.charCodeAt(s),!i(t))?-1:s}r.exports=function(e,r,t,n){var s,o,i,a,c,l,u,p,h,f,d,m,_,g,b,k,v,x,y,C,A,w,D,E,q,S,F,L,z=!1,T=!0;if(4<=e.sCount[r]-e.blkIndent)return!1;if(n&&"paragraph"===e.parentType&&e.tShift[r]>=e.blkIndent&&(z=!0),0<=(D=R(e,r))){if(u=!0,q=e.bMarks[r]+e.tShift[r],_=Number(e.src.substr(q,D-q-1)),z&&1!==_)return!1}else{if(!(0<=(D=I(e,r))))return!1;u=!1}if(z&&e.skipSpaces(D)>=e.eMarks[r])return!1;if(m=e.src.charCodeAt(D-1),n)return!0;for(d=e.tokens.length,u?(L=e.push("ordered_list_open","ol",1),1!==_&&(L.attrs=[["start",_]])):L=e.push("bullet_list_open","ul",1),L.map=f=[r,0],L.markup=String.fromCharCode(m),b=r,E=!1,F=e.md.block.ruler.getRules("list"),y=e.parentType,e.parentType="list";b<t;){for(w=D,g=e.eMarks[b],l=k=e.sCount[b]+D-(e.bMarks[r]+e.tShift[r]);w<g;){if(9===(s=e.src.charCodeAt(w)))k+=4-(k+e.bsCount[b])%4;else{if(32!==s)break;k++}w++}if(4<(c=g<=(o=w)?1:k-l)&&(c=1),a=l+c,(L=e.push("list_item_open","li",1)).markup=String.fromCharCode(m),L.map=p=[r,0],v=e.blkIndent,A=e.tight,C=e.tShift[r],x=e.sCount[r],e.blkIndent=a,e.tight=!0,e.tShift[r]=o-e.bMarks[r],e.sCount[r]=k,g<=o&&e.isEmpty(r+1)?e.line=Math.min(e.line+2,t):e.md.block.tokenize(e,r,t,!0),e.tight&&!E||(T=!1),E=1<e.line-r&&e.isEmpty(e.line-1),e.blkIndent=v,e.tShift[r]=C,e.sCount[r]=x,e.tight=A,(L=e.push("list_item_close","li",-1)).markup=String.fromCharCode(m),b=r=e.line,p[1]=b,o=e.bMarks[r],t<=b)break;if(e.sCount[b]<e.blkIndent)break;for(S=!1,i=0,h=F.length;i<h;i++)if(F[i](e,b,t,!0)){S=!0;break}if(S)break;if(u){if((D=R(e,b))<0)break}else if((D=I(e,b))<0)break;if(m!==e.src.charCodeAt(D-1))break}return(L=u?e.push("ordered_list_close","ol",-1):e.push("bullet_list_close","ul",-1)).markup=String.fromCharCode(m),f[1]=b,e.line=b,e.parentType=y,T&&function(e,r){var t,n,s=e.level+2;for(t=r+2,n=e.tokens.length-2;t<n;t++)e.tokens[t].level===s&&"paragraph_open"===e.tokens[t].type&&(e.tokens[t+2].hidden=!0,e.tokens[t].hidden=!0,t+=2)}(e,d),!0}},{"../common/utils":4}],26:[function(e,r,t){"use strict";r.exports=function(e,r){var t,n,s,o,i,a,c=r+1,l=e.md.block.ruler.getRules("paragraph"),u=e.lineMax;for(a=e.parentType,e.parentType="paragraph";c<u&&!e.isEmpty(c);c++)if(!(3<e.sCount[c]-e.blkIndent||e.sCount[c]<0)){for(n=!1,s=0,o=l.length;s<o;s++)if(l[s](e,c,u,!0)){n=!0;break}if(n)break}return t=e.getLines(r,c,e.blkIndent,!1).trim(),e.line=c,(i=e.push("paragraph_open","p",1)).map=[r,e.line],(i=e.push("inline","",0)).content=t,i.map=[r,e.line],i.children=[],i=e.push("paragraph_close","p",-1),e.parentType=a,!0}},{}],27:[function(e,r,t){"use strict";var A=e("../common/utils").normalizeReference,w=e("../common/utils").isSpace;r.exports=function(e,r,t,n){var s,o,i,a,c,l,u,p,h,f,d,m,_,g,b,k,v=0,x=e.bMarks[r]+e.tShift[r],y=e.eMarks[r],C=r+1;if(4<=e.sCount[r]-e.blkIndent)return!1;if(91!==e.src.charCodeAt(x))return!1;for(;++x<y;)if(93===e.src.charCodeAt(x)&&92!==e.src.charCodeAt(x-1)){if(x+1===y)return!1;if(58!==e.src.charCodeAt(x+1))return!1;break}for(a=e.lineMax,b=e.md.block.ruler.getRules("reference"),f=e.parentType,e.parentType="reference";C<a&&!e.isEmpty(C);C++)if(!(3<e.sCount[C]-e.blkIndent||e.sCount[C]<0)){for(g=!1,l=0,u=b.length;l<u;l++)if(b[l](e,C,a,!0)){g=!0;break}if(g)break}for(y=(_=e.getLines(r,C,e.blkIndent,!1).trim()).length,x=1;x<y;x++){if(91===(s=_.charCodeAt(x)))return!1;if(93===s){h=x;break}10===s?v++:92===s&&++x<y&&10===_.charCodeAt(x)&&v++}if(h<0||58!==_.charCodeAt(h+1))return!1;for(x=h+2;x<y;x++)if(10===(s=_.charCodeAt(x)))v++;else if(!w(s))break;if(!(d=e.md.helpers.parseLinkDestination(_,x,y)).ok)return!1;if(c=e.md.normalizeLink(d.str),!e.md.validateLink(c))return!1;for(x=d.pos,i=v+=d.lines,m=o=x;x<y;x++)if(10===(s=_.charCodeAt(x)))v++;else if(!w(s))break;for(d=e.md.helpers.parseLinkTitle(_,x,y),x<y&&m!==x&&d.ok?(k=d.str,x=d.pos,v+=d.lines):(k="",x=o,v=i);x<y&&(s=_.charCodeAt(x),w(s));)x++;if(x<y&&10!==_.charCodeAt(x)&&k)for(k="",x=o,v=i;x<y&&(s=_.charCodeAt(x),w(s));)x++;return!(x<y&&10!==_.charCodeAt(x))&&(!!(p=A(_.slice(1,h)))&&(n||(void 0===e.env.references&&(e.env.references={}),void 0===e.env.references[p]&&(e.env.references[p]={title:k,href:c}),e.parentType=f,e.line=r+v+1),!0))}},{"../common/utils":4}],28:[function(e,r,t){"use strict";var s=e("../token"),h=e("../common/utils").isSpace;function n(e,r,t,n){var s,o,i,a,c,l,u,p;for(this.src=e,this.md=r,this.env=t,this.tokens=n,this.bMarks=[],this.eMarks=[],this.tShift=[],this.sCount=[],this.bsCount=[],this.blkIndent=0,this.line=0,this.lineMax=0,this.tight=!1,this.ddIndent=-1,this.parentType="root",this.level=0,this.result="",p=!1,i=a=l=u=0,c=(o=this.src).length;a<c;a++){if(s=o.charCodeAt(a),!p){if(h(s)){l++,9===s?u+=4-u%4:u++;continue}p=!0}10!==s&&a!==c-1||(10!==s&&a++,this.bMarks.push(i),this.eMarks.push(a),this.tShift.push(l),this.sCount.push(u),this.bsCount.push(0),p=!1,u=l=0,i=a+1)}this.bMarks.push(o.length),this.eMarks.push(o.length),this.tShift.push(0),this.sCount.push(0),this.bsCount.push(0),this.lineMax=this.bMarks.length-1}n.prototype.push=function(e,r,t){var n=new s(e,r,t);return n.block=!0,t<0&&this.level--,n.level=this.level,0<t&&this.level++,this.tokens.push(n),n},n.prototype.isEmpty=function(e){return this.bMarks[e]+this.tShift[e]>=this.eMarks[e]},n.prototype.skipEmptyLines=function(e){for(var r=this.lineMax;e<r&&!(this.bMarks[e]+this.tShift[e]<this.eMarks[e]);e++);return e},n.prototype.skipSpaces=function(e){for(var r,t=this.src.length;e<t&&(r=this.src.charCodeAt(e),h(r));e++);return e},n.prototype.skipSpacesBack=function(e,r){if(e<=r)return e;for(;r<e;)if(!h(this.src.charCodeAt(--e)))return e+1;return e},n.prototype.skipChars=function(e,r){for(var t=this.src.length;e<t&&this.src.charCodeAt(e)===r;e++);return e},n.prototype.skipCharsBack=function(e,r,t){if(e<=t)return e;for(;t<e;)if(r!==this.src.charCodeAt(--e))return e+1;return e},n.prototype.getLines=function(e,r,t,n){var s,o,i,a,c,l,u,p=e;if(r<=e)return"";for(l=new Array(r-e),s=0;p<r;p++,s++){for(o=0,u=a=this.bMarks[p],c=p+1<r||n?this.eMarks[p]+1:this.eMarks[p];a<c&&o<t;){if(i=this.src.charCodeAt(a),h(i))9===i?o+=4-(o+this.bsCount[p])%4:o++;else{if(!(a-u<this.tShift[p]))break;o++}a++}l[s]=t<o?new Array(o-t+1).join(" ")+this.src.slice(a,c):this.src.slice(a,c)}return l.join("")},n.prototype.Token=s,r.exports=n},{"../common/utils":4,"../token":51}],29:[function(e,r,t){"use strict";var _=e("../common/utils").isSpace;function g(e,r){var t=e.bMarks[r]+e.blkIndent,n=e.eMarks[r];return e.src.substr(t,n-t)}function b(e){var r,t=[],n=0,s=e.length,o=0,i=0,a=!1,c=0;for(r=e.charCodeAt(n);n<s;)96===r?a?(a=!1,c=n):o%2==0&&(a=!0,c=n):124!==r||o%2!=0||a||(t.push(e.substring(i,n)),i=n+1),92===r?o++:o=0,++n===s&&a&&(a=!1,n=c+1),r=e.charCodeAt(n);return t.push(e.substring(i)),t}r.exports=function(e,r,t,n){var s,o,i,a,c,l,u,p,h,f,d,m;if(t<r+2)return!1;if(c=r+1,e.sCount[c]<e.blkIndent)return!1;if(4<=e.sCount[c]-e.blkIndent)return!1;if((i=e.bMarks[c]+e.tShift[c])>=e.eMarks[c])return!1;if(124!==(s=e.src.charCodeAt(i++))&&45!==s&&58!==s)return!1;for(;i<e.eMarks[c];){if(124!==(s=e.src.charCodeAt(i))&&45!==s&&58!==s&&!_(s))return!1;i++}for(l=(o=g(e,r+1)).split("|"),h=[],a=0;a<l.length;a++){if(!(f=l[a].trim())){if(0===a||a===l.length-1)continue;return!1}if(!/^:?-+:?$/.test(f))return!1;58===f.charCodeAt(f.length-1)?h.push(58===f.charCodeAt(0)?"center":"right"):58===f.charCodeAt(0)?h.push("left"):h.push("")}if(-1===(o=g(e,r).trim()).indexOf("|"))return!1;if(4<=e.sCount[r]-e.blkIndent)return!1;if((u=(l=b(o.replace(/^\||\|$/g,""))).length)>h.length)return!1;if(n)return!0;for((p=e.push("table_open","table",1)).map=d=[r,0],(p=e.push("thead_open","thead",1)).map=[r,r+1],(p=e.push("tr_open","tr",1)).map=[r,r+1],a=0;a<l.length;a++)(p=e.push("th_open","th",1)).map=[r,r+1],h[a]&&(p.attrs=[["style","text-align:"+h[a]]]),(p=e.push("inline","",0)).content=l[a].trim(),p.map=[r,r+1],p.children=[],p=e.push("th_close","th",-1);for(p=e.push("tr_close","tr",-1),p=e.push("thead_close","thead",-1),(p=e.push("tbody_open","tbody",1)).map=m=[r+2,0],c=r+2;c<t&&!(e.sCount[c]<e.blkIndent)&&-1!==(o=g(e,c).trim()).indexOf("|")&&!(4<=e.sCount[c]-e.blkIndent);c++){for(l=b(o.replace(/^\||\|$/g,"")),p=e.push("tr_open","tr",1),a=0;a<u;a++)p=e.push("td_open","td",1),h[a]&&(p.attrs=[["style","text-align:"+h[a]]]),(p=e.push("inline","",0)).content=l[a]?l[a].trim():"",p.children=[],p=e.push("td_close","td",-1);p=e.push("tr_close","tr",-1)}return p=e.push("tbody_close","tbody",-1),p=e.push("table_close","table",-1),d[1]=m[1]=c,e.line=c,!0}},{"../common/utils":4}],30:[function(e,r,t){"use strict";r.exports=function(e){var r;e.inlineMode?((r=new e.Token("inline","",0)).content=e.src,r.map=[0,1],r.children=[],e.tokens.push(r)):e.md.block.parse(e.src,e.md,e.env,e.tokens)}},{}],31:[function(e,r,t){"use strict";r.exports=function(e){var r,t,n,s=e.tokens;for(t=0,n=s.length;t<n;t++)"inline"===(r=s[t]).type&&e.md.inline.parse(r.content,e.md,e.env,r.children)}},{}],32:[function(e,r,t){"use strict";var x=e("../common/utils").arrayReplaceAt;r.exports=function(e){var r,t,n,s,o,i,a,c,l,u,p,h,f,d,m,_,g,b,k,v=e.tokens;if(e.md.options.linkify)for(t=0,n=v.length;t<n;t++)if("inline"===v[t].type&&e.md.linkify.pretest(v[t].content))for(f=0,r=(s=v[t].children).length-1;0<=r;r--)if("link_close"!==(i=s[r]).type){if("html_inline"===i.type&&(k=i.content,/^<a[>\s]/i.test(k)&&0<f&&f--,b=i.content,/^<\/a\s*>/i.test(b)&&f++),!(0<f)&&"text"===i.type&&e.md.linkify.test(i.content)){for(l=i.content,g=e.md.linkify.match(l),a=[],h=i.level,c=p=0;c<g.length;c++)d=g[c].url,m=e.md.normalizeLink(d),e.md.validateLink(m)&&(_=g[c].text,_=g[c].schema?"mailto:"!==g[c].schema||/^mailto:/i.test(_)?e.md.normalizeLinkText(_):e.md.normalizeLinkText("mailto:"+_).replace(/^mailto:/,""):e.md.normalizeLinkText("http://"+_).replace(/^http:\/\//,""),p<(u=g[c].index)&&((o=new e.Token("text","",0)).content=l.slice(p,u),o.level=h,a.push(o)),(o=new e.Token("link_open","a",1)).attrs=[["href",m]],o.level=h++,o.markup="linkify",o.info="auto",a.push(o),(o=new e.Token("text","",0)).content=_,o.level=h,a.push(o),(o=new e.Token("link_close","a",-1)).level=--h,o.markup="linkify",o.info="auto",a.push(o),p=g[c].lastIndex);p<l.length&&((o=new e.Token("text","",0)).content=l.slice(p),o.level=h,a.push(o)),v[t].children=s=x(s,r,a)}}else for(r--;s[r].level!==i.level&&"link_open"!==s[r].type;)r--}},{"../common/utils":4}],33:[function(e,r,t){"use strict";var n=/\r[\n\u0085]?|[\u2424\u2028\u0085]/g,s=/\u0000/g;r.exports=function(e){var r;r=(r=e.src.replace(n,"\n")).replace(s,"\ufffd"),e.src=r}},{}],34:[function(e,r,t){"use strict";var s=/\+-|\.\.|\?\?\?\?|!!!!|,,|--/,n=/\((c|tm|r|p)\)/i,o=/\((c|tm|r|p)\)/gi,i={c:"\xa9",r:"\xae",p:"\xa7",tm:"\u2122"};function a(e,r){return i[r.toLowerCase()]}function c(e){var r,t,n=0;for(r=e.length-1;0<=r;r--)"text"!==(t=e[r]).type||n||(t.content=t.content.replace(o,a)),"link_open"===t.type&&"auto"===t.info&&n--,"link_close"===t.type&&"auto"===t.info&&n++}function l(e){var r,t,n=0;for(r=e.length-1;0<=r;r--)"text"!==(t=e[r]).type||n||s.test(t.content)&&(t.content=t.content.replace(/\+-/g,"\xb1").replace(/\.{2,}/g,"\u2026").replace(/([?!])\u2026/g,"$1..").replace(/([?!]){4,}/g,"$1$1$1").replace(/,{2,}/g,",").replace(/(^|[^-])---([^-]|$)/gm,"$1\u2014$2").replace(/(^|\s)--(\s|$)/gm,"$1\u2013$2").replace(/(^|[^-\s])--([^-\s]|$)/gm,"$1\u2013$2")),"link_open"===t.type&&"auto"===t.info&&n--,"link_close"===t.type&&"auto"===t.info&&n++}r.exports=function(e){var r;if(e.md.options.typographer)for(r=e.tokens.length-1;0<=r;r--)"inline"===e.tokens[r].type&&(n.test(e.tokens[r].content)&&c(e.tokens[r].children),s.test(e.tokens[r].content)&&l(e.tokens[r].children))}},{}],35:[function(e,r,t){"use strict";var C=e("../common/utils").isWhiteSpace,A=e("../common/utils").isPunctChar,w=e("../common/utils").isMdAsciiPunct,n=/['"]/,D=/['"]/g,E="\u2019";function q(e,r,t){return e.substr(0,r)+t+e.substr(r+1)}function s(e,r){var t,n,s,o,i,a,c,l,u,p,h,f,d,m,_,g,b,k,v,x,y;for(v=[],t=0;t<e.length;t++){for(n=e[t],c=e[t].level,b=v.length-1;0<=b&&!(v[b].level<=c);b--);if(v.length=b+1,"text"===n.type){i=0,a=(s=n.content).length;e:for(;i<a&&(D.lastIndex=i,o=D.exec(s));){if(_=g=!0,i=o.index+1,k="'"===o[0],u=32,0<=o.index-1)u=s.charCodeAt(o.index-1);else for(b=t-1;0<=b&&("softbreak"!==e[b].type&&"hardbreak"!==e[b].type);b--)if("text"===e[b].type){u=e[b].content.charCodeAt(e[b].content.length-1);break}if(p=32,i<a)p=s.charCodeAt(i);else for(b=t+1;b<e.length&&("softbreak"!==e[b].type&&"hardbreak"!==e[b].type);b++)if("text"===e[b].type){p=e[b].content.charCodeAt(0);break}if(h=w(u)||A(String.fromCharCode(u)),f=w(p)||A(String.fromCharCode(p)),d=C(u),(m=C(p))?_=!1:f&&(d||h||(_=!1)),d?g=!1:h&&(m||f||(g=!1)),34===p&&'"'===o[0]&&48<=u&&u<=57&&(g=_=!1),_&&g&&(_=!1,g=f),_||g){if(g)for(b=v.length-1;0<=b&&(l=v[b],!(v[b].level<c));b--)if(l.single===k&&v[b].level===c){l=v[b],k?(x=r.md.options.quotes[2],y=r.md.options.quotes[3]):(x=r.md.options.quotes[0],y=r.md.options.quotes[1]),n.content=q(n.content,o.index,y),e[l.token].content=q(e[l.token].content,l.pos,x),i+=y.length-1,l.token===t&&(i+=x.length-1),a=(s=n.content).length,v.length=b;continue e}_?v.push({token:t,pos:o.index,single:k,level:c}):g&&k&&(n.content=q(n.content,o.index,E))}else k&&(n.content=q(n.content,o.index,E))}}}}r.exports=function(e){var r;if(e.md.options.typographer)for(r=e.tokens.length-1;0<=r;r--)"inline"===e.tokens[r].type&&n.test(e.tokens[r].content)&&s(e.tokens[r].children,e)}},{"../common/utils":4}],36:[function(e,r,t){"use strict";var n=e("../token");function s(e,r,t){this.src=e,this.env=t,this.tokens=[],this.inlineMode=!1,this.md=r}s.prototype.Token=n,r.exports=s},{"../token":51}],37:[function(e,r,t){"use strict";var l=/^<([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)>/,u=/^<([a-zA-Z][a-zA-Z0-9+.\-]{1,31}):([^<>\x00-\x20]*)>/;r.exports=function(e,r){var t,n,s,o,i,a,c=e.pos;return 60===e.src.charCodeAt(c)&&(!((t=e.src.slice(c)).indexOf(">")<0)&&(u.test(t)?(o=(n=t.match(u))[0].slice(1,-1),i=e.md.normalizeLink(o),!!e.md.validateLink(i)&&(r||((a=e.push("link_open","a",1)).attrs=[["href",i]],a.markup="autolink",a.info="auto",(a=e.push("text","",0)).content=e.md.normalizeLinkText(o),(a=e.push("link_close","a",-1)).markup="autolink",a.info="auto"),e.pos+=n[0].length,!0)):!!l.test(t)&&(o=(s=t.match(l))[0].slice(1,-1),i=e.md.normalizeLink("mailto:"+o),!!e.md.validateLink(i)&&(r||((a=e.push("link_open","a",1)).attrs=[["href",i]],a.markup="autolink",a.info="auto",(a=e.push("text","",0)).content=e.md.normalizeLinkText(o),(a=e.push("link_close","a",-1)).markup="autolink",a.info="auto"),e.pos+=s[0].length,!0))))}},{}],38:[function(e,r,t){"use strict";r.exports=function(e,r){var t,n,s,o,i,a,c=e.pos;if(96!==e.src.charCodeAt(c))return!1;for(t=c,c++,n=e.posMax;c<n&&96===e.src.charCodeAt(c);)c++;for(s=e.src.slice(t,c),o=i=c;-1!==(o=e.src.indexOf("`",i));){for(i=o+1;i<n&&96===e.src.charCodeAt(i);)i++;if(i-o===s.length)return r||((a=e.push("code_inline","code",0)).markup=s,a.content=e.src.slice(c,o).replace(/[ \n]+/g," ").trim()),e.pos=i,!0}return r||(e.pending+=s),e.pos+=s.length,!0}},{}],39:[function(e,r,t){"use strict";r.exports=function(e){var r,t,n,s,o=e.delimiters,i=e.delimiters.length;for(r=0;r<i;r++)if((n=o[r]).close)for(t=r-n.jump-1;0<=t;){if((s=o[t]).open&&s.marker===n.marker&&s.end<0&&s.level===n.level)if(!((s.close||n.open)&&void 0!==s.length&&void 0!==n.length&&(s.length+n.length)%3==0)){n.jump=r-t,n.open=!1,s.end=r,s.jump=0;break}t-=s.jump+1}}},{}],40:[function(e,r,t){"use strict";r.exports.tokenize=function(e,r){var t,n,s=e.pos,o=e.src.charCodeAt(s);if(r)return!1;if(95!==o&&42!==o)return!1;for(n=e.scanDelims(e.pos,42===o),t=0;t<n.length;t++)e.push("text","",0).content=String.fromCharCode(o),e.delimiters.push({marker:o,length:n.length,jump:t,token:e.tokens.length-1,level:e.level,end:-1,open:n.can_open,close:n.can_close});return e.pos+=n.length,!0},r.exports.postProcess=function(e){var r,t,n,s,o,i,a=e.delimiters;for(r=e.delimiters.length-1;0<=r;r--)95!==(t=a[r]).marker&&42!==t.marker||-1!==t.end&&(n=a[t.end],i=0<r&&a[r-1].end===t.end+1&&a[r-1].token===t.token-1&&a[t.end+1].token===n.token+1&&a[r-1].marker===t.marker,o=String.fromCharCode(t.marker),(s=e.tokens[t.token]).type=i?"strong_open":"em_open",s.tag=i?"strong":"em",s.nesting=1,s.markup=i?o+o:o,s.content="",(s=e.tokens[n.token]).type=i?"strong_close":"em_close",s.tag=i?"strong":"em",s.nesting=-1,s.markup=i?o+o:o,s.content="",i&&(e.tokens[a[r-1].token].content="",e.tokens[a[t.end+1].token].content="",r--))}},{}],41:[function(e,r,t){"use strict";var i=e("../common/entities"),a=e("../common/utils").has,c=e("../common/utils").isValidEntityCode,l=e("../common/utils").fromCodePoint,u=/^&#((?:x[a-f0-9]{1,8}|[0-9]{1,8}));/i,p=/^&([a-z][a-z0-9]{1,31});/i;r.exports=function(e,r){var t,n,s=e.pos,o=e.posMax;if(38!==e.src.charCodeAt(s))return!1;if(s+1<o)if(35===e.src.charCodeAt(s+1)){if(n=e.src.slice(s).match(u))return r||(t="x"===n[1][0].toLowerCase()?parseInt(n[1].slice(1),16):parseInt(n[1],10),e.pending+=c(t)?l(t):l(65533)),e.pos+=n[0].length,!0}else if((n=e.src.slice(s).match(p))&&a(i,n[1]))return r||(e.pending+=i[n[1]]),e.pos+=n[0].length,!0;return r||(e.pending+="&"),e.pos++,!0}},{"../common/entities":1,"../common/utils":4}],42:[function(e,r,t){"use strict";for(var o=e("../common/utils").isSpace,i=[],n=0;n<256;n++)i.push(0);"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(e){i[e.charCodeAt(0)]=1}),r.exports=function(e,r){var t,n=e.pos,s=e.posMax;if(92!==e.src.charCodeAt(n))return!1;if(++n<s){if((t=e.src.charCodeAt(n))<256&&0!==i[t])return r||(e.pending+=e.src[n]),e.pos+=2,!0;if(10===t){for(r||e.push("hardbreak","br",0),n++;n<s&&(t=e.src.charCodeAt(n),o(t));)n++;return e.pos=n,!0}}return r||(e.pending+="\\"),e.pos++,!0}},{"../common/utils":4}],43:[function(e,r,t){"use strict";var a=e("../common/html_re").HTML_TAG_RE;r.exports=function(e,r){var t,n,s,o,i=e.pos;return!!e.md.options.html&&(s=e.posMax,!(60!==e.src.charCodeAt(i)||s<=i+2)&&((33===(t=e.src.charCodeAt(i+1))||63===t||47===t||97<=(o=32|t)&&o<=122)&&(!!(n=e.src.slice(i).match(a))&&(r||(e.push("html_inline","",0).content=e.src.slice(i,i+n[0].length)),e.pos+=n[0].length,!0))))}},{"../common/html_re":3}],44:[function(e,r,t){"use strict";var b=e("../common/utils").normalizeReference,k=e("../common/utils").isSpace;r.exports=function(e,r){var t,n,s,o,i,a,c,l,u,p,h,f,d,m="",_=e.pos,g=e.posMax;if(33!==e.src.charCodeAt(e.pos))return!1;if(91!==e.src.charCodeAt(e.pos+1))return!1;if(a=e.pos+2,(i=e.md.helpers.parseLinkLabel(e,e.pos+1,!1))<0)return!1;if((c=i+1)<g&&40===e.src.charCodeAt(c)){for(c++;c<g&&(n=e.src.charCodeAt(c),k(n)||10===n);c++);if(g<=c)return!1;for(d=c,(u=e.md.helpers.parseLinkDestination(e.src,c,e.posMax)).ok&&(m=e.md.normalizeLink(u.str),e.md.validateLink(m)?c=u.pos:m=""),d=c;c<g&&(n=e.src.charCodeAt(c),k(n)||10===n);c++);if(u=e.md.helpers.parseLinkTitle(e.src,c,e.posMax),c<g&&d!==c&&u.ok)for(p=u.str,c=u.pos;c<g&&(n=e.src.charCodeAt(c),k(n)||10===n);c++);else p="";if(g<=c||41!==e.src.charCodeAt(c))return e.pos=_,!1;c++}else{if(void 0===e.env.references)return!1;if(c<g&&91===e.src.charCodeAt(c)?(d=c+1,0<=(c=e.md.helpers.parseLinkLabel(e,c))?o=e.src.slice(d,c++):c=i+1):c=i+1,o||(o=e.src.slice(a,i)),!(l=e.env.references[b(o)]))return e.pos=_,!1;m=l.href,p=l.title}return r||(s=e.src.slice(a,i),e.md.inline.parse(s,e.md,e.env,f=[]),(h=e.push("image","img",0)).attrs=t=[["src",m],["alt",""]],h.children=f,h.content=s,p&&t.push(["title",p])),e.pos=c,e.posMax=g,!0}},{"../common/utils":4}],45:[function(e,r,t){"use strict";var _=e("../common/utils").normalizeReference,g=e("../common/utils").isSpace;r.exports=function(e,r){var t,n,s,o,i,a,c,l,u,p="",h=e.pos,f=e.posMax,d=e.pos,m=!0;if(91!==e.src.charCodeAt(e.pos))return!1;if(i=e.pos+1,(o=e.md.helpers.parseLinkLabel(e,e.pos,!0))<0)return!1;if((a=o+1)<f&&40===e.src.charCodeAt(a)){for(m=!1,a++;a<f&&(n=e.src.charCodeAt(a),g(n)||10===n);a++);if(f<=a)return!1;for(d=a,(c=e.md.helpers.parseLinkDestination(e.src,a,e.posMax)).ok&&(p=e.md.normalizeLink(c.str),e.md.validateLink(p)?a=c.pos:p=""),d=a;a<f&&(n=e.src.charCodeAt(a),g(n)||10===n);a++);if(c=e.md.helpers.parseLinkTitle(e.src,a,e.posMax),a<f&&d!==a&&c.ok)for(u=c.str,a=c.pos;a<f&&(n=e.src.charCodeAt(a),g(n)||10===n);a++);else u="";(f<=a||41!==e.src.charCodeAt(a))&&(m=!0),a++}if(m){if(void 0===e.env.references)return!1;if(a<f&&91===e.src.charCodeAt(a)?(d=a+1,0<=(a=e.md.helpers.parseLinkLabel(e,a))?s=e.src.slice(d,a++):a=o+1):a=o+1,s||(s=e.src.slice(i,o)),!(l=e.env.references[_(s)]))return e.pos=h,!1;p=l.href,u=l.title}return r||(e.pos=i,e.posMax=o,e.push("link_open","a",1).attrs=t=[["href",p]],u&&t.push(["title",u]),e.md.inline.tokenize(e),e.push("link_close","a",-1)),e.pos=a,e.posMax=f,!0}},{"../common/utils":4}],46:[function(e,r,t){"use strict";var o=e("../common/utils").isSpace;r.exports=function(e,r){var t,n,s=e.pos;if(10!==e.src.charCodeAt(s))return!1;for(t=e.pending.length-1,n=e.posMax,r||(0<=t&&32===e.pending.charCodeAt(t)?1<=t&&32===e.pending.charCodeAt(t-1)?(e.pending=e.pending.replace(/ +$/,""),e.push("hardbreak","br",0)):(e.pending=e.pending.slice(0,-1),e.push("softbreak","br",0)):e.push("softbreak","br",0)),s++;s<n&&o(e.src.charCodeAt(s));)s++;return e.pos=s,!0}},{"../common/utils":4}],47:[function(e,r,t){"use strict";var s=e("../token"),_=e("../common/utils").isWhiteSpace,g=e("../common/utils").isPunctChar,b=e("../common/utils").isMdAsciiPunct;function n(e,r,t,n){this.src=e,this.env=t,this.md=r,this.tokens=n,this.pos=0,this.posMax=this.src.length,this.level=0,this.pending="",this.pendingLevel=0,this.cache={},this.delimiters=[]}n.prototype.pushPending=function(){var e=new s("text","",0);return e.content=this.pending,e.level=this.pendingLevel,this.tokens.push(e),this.pending="",e},n.prototype.push=function(e,r,t){this.pending&&this.pushPending();var n=new s(e,r,t);return t<0&&this.level--,n.level=this.level,0<t&&this.level++,this.pendingLevel=this.level,this.tokens.push(n),n},n.prototype.scanDelims=function(e,r){var t,n,s,o,i,a,c,l,u,p=e,h=!0,f=!0,d=this.posMax,m=this.src.charCodeAt(e);for(t=0<e?this.src.charCodeAt(e-1):32;p<d&&this.src.charCodeAt(p)===m;)p++;return s=p-e,n=p<d?this.src.charCodeAt(p):32,c=b(t)||g(String.fromCharCode(t)),u=b(n)||g(String.fromCharCode(n)),a=_(t),(l=_(n))?h=!1:u&&(a||c||(h=!1)),a?f=!1:c&&(l||u||(f=!1)),r?(o=h,i=f):(o=h&&(!f||c),i=f&&(!h||u)),{can_open:o,can_close:i,length:s}},n.prototype.Token=s,r.exports=n},{"../common/utils":4,"../token":51}],48:[function(e,r,t){"use strict";r.exports.tokenize=function(e,r){var t,n,s,o,i=e.pos,a=e.src.charCodeAt(i);if(r)return!1;if(126!==a)return!1;if(s=(n=e.scanDelims(e.pos,!0)).length,o=String.fromCharCode(a),s<2)return!1;for(s%2&&(e.push("text","",0).content=o,s--),t=0;t<s;t+=2)e.push("text","",0).content=o+o,e.delimiters.push({marker:a,jump:t,token:e.tokens.length-1,level:e.level,end:-1,open:n.can_open,close:n.can_close});return e.pos+=n.length,!0},r.exports.postProcess=function(e){var r,t,n,s,o,i=[],a=e.delimiters,c=e.delimiters.length;for(r=0;r<c;r++)126===(n=a[r]).marker&&-1!==n.end&&(s=a[n.end],(o=e.tokens[n.token]).type="s_open",o.tag="s",o.nesting=1,o.markup="~~",o.content="",(o=e.tokens[s.token]).type="s_close",o.tag="s",o.nesting=-1,o.markup="~~",o.content="","text"===e.tokens[s.token-1].type&&"~"===e.tokens[s.token-1].content&&i.push(s.token-1));for(;i.length;){for(t=(r=i.pop())+1;t<e.tokens.length&&"s_close"===e.tokens[t].type;)t++;r!==--t&&(o=e.tokens[t],e.tokens[t]=e.tokens[r],e.tokens[r]=o)}}},{}],49:[function(e,r,t){"use strict";function n(e){switch(e){case 10:case 33:case 35:case 36:case 37:case 38:case 42:case 43:case 45:case 58:case 60:case 61:case 62:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 125:case 126:return!0;default:return!1}}r.exports=function(e,r){for(var t=e.pos;t<e.posMax&&!n(e.src.charCodeAt(t));)t++;return t!==e.pos&&(r||(e.pending+=e.src.slice(e.pos,t)),e.pos=t,!0)}},{}],50:[function(e,r,t){"use strict";r.exports=function(e){var r,t,n=0,s=e.tokens,o=e.tokens.length;for(r=t=0;r<o;r++)n+=s[r].nesting,s[r].level=n,"text"===s[r].type&&r+1<o&&"text"===s[r+1].type?s[r+1].content=s[r].content+s[r+1].content:(r!==t&&(s[t]=s[r]),t++);r!==t&&(s.length=t)}},{}],51:[function(e,r,t){"use strict";function n(e,r,t){this.type=e,this.tag=r,this.attrs=null,this.map=null,this.nesting=t,this.level=0,this.children=null,this.content="",this.markup="",this.info="",this.meta=null,this.block=!1,this.hidden=!1}n.prototype.attrIndex=function(e){var r,t,n;if(!this.attrs)return-1;for(t=0,n=(r=this.attrs).length;t<n;t++)if(r[t][0]===e)return t;return-1},n.prototype.attrPush=function(e){this.attrs?this.attrs.push(e):this.attrs=[e]},n.prototype.attrSet=function(e,r){var t=this.attrIndex(e),n=[e,r];t<0?this.attrPush(n):this.attrs[t]=n},n.prototype.attrGet=function(e){var r=this.attrIndex(e),t=null;return 0<=r&&(t=this.attrs[r][1]),t},n.prototype.attrJoin=function(e,r){var t=this.attrIndex(e);t<0?this.attrPush([e,r]):this.attrs[t][1]=this.attrs[t][1]+" "+r},r.exports=n},{}],52:[function(e,r,t){r.exports={Aacute:"\xc1",aacute:"\xe1",Abreve:"\u0102",abreve:"\u0103",ac:"\u223e",acd:"\u223f",acE:"\u223e\u0333",Acirc:"\xc2",acirc:"\xe2",acute:"\xb4",Acy:"\u0410",acy:"\u0430",AElig:"\xc6",aelig:"\xe6",af:"\u2061",Afr:"\ud835\udd04",afr:"\ud835\udd1e",Agrave:"\xc0",agrave:"\xe0",alefsym:"\u2135",aleph:"\u2135",Alpha:"\u0391",alpha:"\u03b1",Amacr:"\u0100",amacr:"\u0101",amalg:"\u2a3f",amp:"&",AMP:"&",andand:"\u2a55",And:"\u2a53",and:"\u2227",andd:"\u2a5c",andslope:"\u2a58",andv:"\u2a5a",ang:"\u2220",ange:"\u29a4",angle:"\u2220",angmsdaa:"\u29a8",angmsdab:"\u29a9",angmsdac:"\u29aa",angmsdad:"\u29ab",angmsdae:"\u29ac",angmsdaf:"\u29ad",angmsdag:"\u29ae",angmsdah:"\u29af",angmsd:"\u2221",angrt:"\u221f",angrtvb:"\u22be",angrtvbd:"\u299d",angsph:"\u2222",angst:"\xc5",angzarr:"\u237c",Aogon:"\u0104",aogon:"\u0105",Aopf:"\ud835\udd38",aopf:"\ud835\udd52",apacir:"\u2a6f",ap:"\u2248",apE:"\u2a70",ape:"\u224a",apid:"\u224b",apos:"'",ApplyFunction:"\u2061",approx:"\u2248",approxeq:"\u224a",Aring:"\xc5",aring:"\xe5",Ascr:"\ud835\udc9c",ascr:"\ud835\udcb6",Assign:"\u2254",ast:"*",asymp:"\u2248",asympeq:"\u224d",Atilde:"\xc3",atilde:"\xe3",Auml:"\xc4",auml:"\xe4",awconint:"\u2233",awint:"\u2a11",backcong:"\u224c",backepsilon:"\u03f6",backprime:"\u2035",backsim:"\u223d",backsimeq:"\u22cd",Backslash:"\u2216",Barv:"\u2ae7",barvee:"\u22bd",barwed:"\u2305",Barwed:"\u2306",barwedge:"\u2305",bbrk:"\u23b5",bbrktbrk:"\u23b6",bcong:"\u224c",Bcy:"\u0411",bcy:"\u0431",bdquo:"\u201e",becaus:"\u2235",because:"\u2235",Because:"\u2235",bemptyv:"\u29b0",bepsi:"\u03f6",bernou:"\u212c",Bernoullis:"\u212c",Beta:"\u0392",beta:"\u03b2",beth:"\u2136",between:"\u226c",Bfr:"\ud835\udd05",bfr:"\ud835\udd1f",bigcap:"\u22c2",bigcirc:"\u25ef",bigcup:"\u22c3",bigodot:"\u2a00",bigoplus:"\u2a01",bigotimes:"\u2a02",bigsqcup:"\u2a06",bigstar:"\u2605",bigtriangledown:"\u25bd",bigtriangleup:"\u25b3",biguplus:"\u2a04",bigvee:"\u22c1",bigwedge:"\u22c0",bkarow:"\u290d",blacklozenge:"\u29eb",blacksquare:"\u25aa",blacktriangle:"\u25b4",blacktriangledown:"\u25be",blacktriangleleft:"\u25c2",blacktriangleright:"\u25b8",blank:"\u2423",blk12:"\u2592",blk14:"\u2591",blk34:"\u2593",block:"\u2588",bne:"=\u20e5",bnequiv:"\u2261\u20e5",bNot:"\u2aed",bnot:"\u2310",Bopf:"\ud835\udd39",bopf:"\ud835\udd53",bot:"\u22a5",bottom:"\u22a5",bowtie:"\u22c8",boxbox:"\u29c9",boxdl:"\u2510",boxdL:"\u2555",boxDl:"\u2556",boxDL:"\u2557",boxdr:"\u250c",boxdR:"\u2552",boxDr:"\u2553",boxDR:"\u2554",boxh:"\u2500",boxH:"\u2550",boxhd:"\u252c",boxHd:"\u2564",boxhD:"\u2565",boxHD:"\u2566",boxhu:"\u2534",boxHu:"\u2567",boxhU:"\u2568",boxHU:"\u2569",boxminus:"\u229f",boxplus:"\u229e",boxtimes:"\u22a0",boxul:"\u2518",boxuL:"\u255b",boxUl:"\u255c",boxUL:"\u255d",boxur:"\u2514",boxuR:"\u2558",boxUr:"\u2559",boxUR:"\u255a",boxv:"\u2502",boxV:"\u2551",boxvh:"\u253c",boxvH:"\u256a",boxVh:"\u256b",boxVH:"\u256c",boxvl:"\u2524",boxvL:"\u2561",boxVl:"\u2562",boxVL:"\u2563",boxvr:"\u251c",boxvR:"\u255e",boxVr:"\u255f",boxVR:"\u2560",bprime:"\u2035",breve:"\u02d8",Breve:"\u02d8",brvbar:"\xa6",bscr:"\ud835\udcb7",Bscr:"\u212c",bsemi:"\u204f",bsim:"\u223d",bsime:"\u22cd",bsolb:"\u29c5",bsol:"\\",bsolhsub:"\u27c8",bull:"\u2022",bullet:"\u2022",bump:"\u224e",bumpE:"\u2aae",bumpe:"\u224f",Bumpeq:"\u224e",bumpeq:"\u224f",Cacute:"\u0106",cacute:"\u0107",capand:"\u2a44",capbrcup:"\u2a49",capcap:"\u2a4b",cap:"\u2229",Cap:"\u22d2",capcup:"\u2a47",capdot:"\u2a40",CapitalDifferentialD:"\u2145",caps:"\u2229\ufe00",caret:"\u2041",caron:"\u02c7",Cayleys:"\u212d",ccaps:"\u2a4d",Ccaron:"\u010c",ccaron:"\u010d",Ccedil:"\xc7",ccedil:"\xe7",Ccirc:"\u0108",ccirc:"\u0109",Cconint:"\u2230",ccups:"\u2a4c",ccupssm:"\u2a50",Cdot:"\u010a",cdot:"\u010b",cedil:"\xb8",Cedilla:"\xb8",cemptyv:"\u29b2",cent:"\xa2",centerdot:"\xb7",CenterDot:"\xb7",cfr:"\ud835\udd20",Cfr:"\u212d",CHcy:"\u0427",chcy:"\u0447",check:"\u2713",checkmark:"\u2713",Chi:"\u03a7",chi:"\u03c7",circ:"\u02c6",circeq:"\u2257",circlearrowleft:"\u21ba",circlearrowright:"\u21bb",circledast:"\u229b",circledcirc:"\u229a",circleddash:"\u229d",CircleDot:"\u2299",circledR:"\xae",circledS:"\u24c8",CircleMinus:"\u2296",CirclePlus:"\u2295",CircleTimes:"\u2297",cir:"\u25cb",cirE:"\u29c3",cire:"\u2257",cirfnint:"\u2a10",cirmid:"\u2aef",cirscir:"\u29c2",ClockwiseContourIntegral:"\u2232",CloseCurlyDoubleQuote:"\u201d",CloseCurlyQuote:"\u2019",clubs:"\u2663",clubsuit:"\u2663",colon:":",Colon:"\u2237",Colone:"\u2a74",colone:"\u2254",coloneq:"\u2254",comma:",",commat:"@",comp:"\u2201",compfn:"\u2218",complement:"\u2201",complexes:"\u2102",cong:"\u2245",congdot:"\u2a6d",Congruent:"\u2261",conint:"\u222e",Conint:"\u222f",ContourIntegral:"\u222e",copf:"\ud835\udd54",Copf:"\u2102",coprod:"\u2210",Coproduct:"\u2210",copy:"\xa9",COPY:"\xa9",copysr:"\u2117",CounterClockwiseContourIntegral:"\u2233",crarr:"\u21b5",cross:"\u2717",Cross:"\u2a2f",Cscr:"\ud835\udc9e",cscr:"\ud835\udcb8",csub:"\u2acf",csube:"\u2ad1",csup:"\u2ad0",csupe:"\u2ad2",ctdot:"\u22ef",cudarrl:"\u2938",cudarrr:"\u2935",cuepr:"\u22de",cuesc:"\u22df",cularr:"\u21b6",cularrp:"\u293d",cupbrcap:"\u2a48",cupcap:"\u2a46",CupCap:"\u224d",cup:"\u222a",Cup:"\u22d3",cupcup:"\u2a4a",cupdot:"\u228d",cupor:"\u2a45",cups:"\u222a\ufe00",curarr:"\u21b7",curarrm:"\u293c",curlyeqprec:"\u22de",curlyeqsucc:"\u22df",curlyvee:"\u22ce",curlywedge:"\u22cf",curren:"\xa4",curvearrowleft:"\u21b6",curvearrowright:"\u21b7",cuvee:"\u22ce",cuwed:"\u22cf",cwconint:"\u2232",cwint:"\u2231",cylcty:"\u232d",dagger:"\u2020",Dagger:"\u2021",daleth:"\u2138",darr:"\u2193",Darr:"\u21a1",dArr:"\u21d3",dash:"\u2010",Dashv:"\u2ae4",dashv:"\u22a3",dbkarow:"\u290f",dblac:"\u02dd",Dcaron:"\u010e",dcaron:"\u010f",Dcy:"\u0414",dcy:"\u0434",ddagger:"\u2021",ddarr:"\u21ca",DD:"\u2145",dd:"\u2146",DDotrahd:"\u2911",ddotseq:"\u2a77",deg:"\xb0",Del:"\u2207",Delta:"\u0394",delta:"\u03b4",demptyv:"\u29b1",dfisht:"\u297f",Dfr:"\ud835\udd07",dfr:"\ud835\udd21",dHar:"\u2965",dharl:"\u21c3",dharr:"\u21c2",DiacriticalAcute:"\xb4",DiacriticalDot:"\u02d9",DiacriticalDoubleAcute:"\u02dd",DiacriticalGrave:"`",DiacriticalTilde:"\u02dc",diam:"\u22c4",diamond:"\u22c4",Diamond:"\u22c4",diamondsuit:"\u2666",diams:"\u2666",die:"\xa8",DifferentialD:"\u2146",digamma:"\u03dd",disin:"\u22f2",div:"\xf7",divide:"\xf7",divideontimes:"\u22c7",divonx:"\u22c7",DJcy:"\u0402",djcy:"\u0452",dlcorn:"\u231e",dlcrop:"\u230d",dollar:"$",Dopf:"\ud835\udd3b",dopf:"\ud835\udd55",Dot:"\xa8",dot:"\u02d9",DotDot:"\u20dc",doteq:"\u2250",doteqdot:"\u2251",DotEqual:"\u2250",dotminus:"\u2238",dotplus:"\u2214",dotsquare:"\u22a1",doublebarwedge:"\u2306",DoubleContourIntegral:"\u222f",DoubleDot:"\xa8",DoubleDownArrow:"\u21d3",DoubleLeftArrow:"\u21d0",DoubleLeftRightArrow:"\u21d4",DoubleLeftTee:"\u2ae4",DoubleLongLeftArrow:"\u27f8",DoubleLongLeftRightArrow:"\u27fa",DoubleLongRightArrow:"\u27f9",DoubleRightArrow:"\u21d2",DoubleRightTee:"\u22a8",DoubleUpArrow:"\u21d1",DoubleUpDownArrow:"\u21d5",DoubleVerticalBar:"\u2225",DownArrowBar:"\u2913",downarrow:"\u2193",DownArrow:"\u2193",Downarrow:"\u21d3",DownArrowUpArrow:"\u21f5",DownBreve:"\u0311",downdownarrows:"\u21ca",downharpoonleft:"\u21c3",downharpoonright:"\u21c2",DownLeftRightVector:"\u2950",DownLeftTeeVector:"\u295e",DownLeftVectorBar:"\u2956",DownLeftVector:"\u21bd",DownRightTeeVector:"\u295f",DownRightVectorBar:"\u2957",DownRightVector:"\u21c1",DownTeeArrow:"\u21a7",DownTee:"\u22a4",drbkarow:"\u2910",drcorn:"\u231f",drcrop:"\u230c",Dscr:"\ud835\udc9f",dscr:"\ud835\udcb9",DScy:"\u0405",dscy:"\u0455",dsol:"\u29f6",Dstrok:"\u0110",dstrok:"\u0111",dtdot:"\u22f1",dtri:"\u25bf",dtrif:"\u25be",duarr:"\u21f5",duhar:"\u296f",dwangle:"\u29a6",DZcy:"\u040f",dzcy:"\u045f",dzigrarr:"\u27ff",Eacute:"\xc9",eacute:"\xe9",easter:"\u2a6e",Ecaron:"\u011a",ecaron:"\u011b",Ecirc:"\xca",ecirc:"\xea",ecir:"\u2256",ecolon:"\u2255",Ecy:"\u042d",ecy:"\u044d",eDDot:"\u2a77",Edot:"\u0116",edot:"\u0117",eDot:"\u2251",ee:"\u2147",efDot:"\u2252",Efr:"\ud835\udd08",efr:"\ud835\udd22",eg:"\u2a9a",Egrave:"\xc8",egrave:"\xe8",egs:"\u2a96",egsdot:"\u2a98",el:"\u2a99",Element:"\u2208",elinters:"\u23e7",ell:"\u2113",els:"\u2a95",elsdot:"\u2a97",Emacr:"\u0112",emacr:"\u0113",empty:"\u2205",emptyset:"\u2205",EmptySmallSquare:"\u25fb",emptyv:"\u2205",EmptyVerySmallSquare:"\u25ab",emsp13:"\u2004",emsp14:"\u2005",emsp:"\u2003",ENG:"\u014a",eng:"\u014b",ensp:"\u2002",Eogon:"\u0118",eogon:"\u0119",Eopf:"\ud835\udd3c",eopf:"\ud835\udd56",epar:"\u22d5",eparsl:"\u29e3",eplus:"\u2a71",epsi:"\u03b5",Epsilon:"\u0395",epsilon:"\u03b5",epsiv:"\u03f5",eqcirc:"\u2256",eqcolon:"\u2255",eqsim:"\u2242",eqslantgtr:"\u2a96",eqslantless:"\u2a95",Equal:"\u2a75",equals:"=",EqualTilde:"\u2242",equest:"\u225f",Equilibrium:"\u21cc",equiv:"\u2261",equivDD:"\u2a78",eqvparsl:"\u29e5",erarr:"\u2971",erDot:"\u2253",escr:"\u212f",Escr:"\u2130",esdot:"\u2250",Esim:"\u2a73",esim:"\u2242",Eta:"\u0397",eta:"\u03b7",ETH:"\xd0",eth:"\xf0",Euml:"\xcb",euml:"\xeb",euro:"\u20ac",excl:"!",exist:"\u2203",Exists:"\u2203",expectation:"\u2130",exponentiale:"\u2147",ExponentialE:"\u2147",fallingdotseq:"\u2252",Fcy:"\u0424",fcy:"\u0444",female:"\u2640",ffilig:"\ufb03",fflig:"\ufb00",ffllig:"\ufb04",Ffr:"\ud835\udd09",ffr:"\ud835\udd23",filig:"\ufb01",FilledSmallSquare:"\u25fc",FilledVerySmallSquare:"\u25aa",fjlig:"fj",flat:"\u266d",fllig:"\ufb02",fltns:"\u25b1",fnof:"\u0192",Fopf:"\ud835\udd3d",fopf:"\ud835\udd57",forall:"\u2200",ForAll:"\u2200",fork:"\u22d4",forkv:"\u2ad9",Fouriertrf:"\u2131",fpartint:"\u2a0d",frac12:"\xbd",frac13:"\u2153",frac14:"\xbc",frac15:"\u2155",frac16:"\u2159",frac18:"\u215b",frac23:"\u2154",frac25:"\u2156",frac34:"\xbe",frac35:"\u2157",frac38:"\u215c",frac45:"\u2158",frac56:"\u215a",frac58:"\u215d",frac78:"\u215e",frasl:"\u2044",frown:"\u2322",fscr:"\ud835\udcbb",Fscr:"\u2131",gacute:"\u01f5",Gamma:"\u0393",gamma:"\u03b3",Gammad:"\u03dc",gammad:"\u03dd",gap:"\u2a86",Gbreve:"\u011e",gbreve:"\u011f",Gcedil:"\u0122",Gcirc:"\u011c",gcirc:"\u011d",Gcy:"\u0413",gcy:"\u0433",Gdot:"\u0120",gdot:"\u0121",ge:"\u2265",gE:"\u2267",gEl:"\u2a8c",gel:"\u22db",geq:"\u2265",geqq:"\u2267",geqslant:"\u2a7e",gescc:"\u2aa9",ges:"\u2a7e",gesdot:"\u2a80",gesdoto:"\u2a82",gesdotol:"\u2a84",gesl:"\u22db\ufe00",gesles:"\u2a94",Gfr:"\ud835\udd0a",gfr:"\ud835\udd24",gg:"\u226b",Gg:"\u22d9",ggg:"\u22d9",gimel:"\u2137",GJcy:"\u0403",gjcy:"\u0453",gla:"\u2aa5",gl:"\u2277",glE:"\u2a92",glj:"\u2aa4",gnap:"\u2a8a",gnapprox:"\u2a8a",gne:"\u2a88",gnE:"\u2269",gneq:"\u2a88",gneqq:"\u2269",gnsim:"\u22e7",Gopf:"\ud835\udd3e",gopf:"\ud835\udd58",grave:"`",GreaterEqual:"\u2265",GreaterEqualLess:"\u22db",GreaterFullEqual:"\u2267",GreaterGreater:"\u2aa2",GreaterLess:"\u2277",GreaterSlantEqual:"\u2a7e",GreaterTilde:"\u2273",Gscr:"\ud835\udca2",gscr:"\u210a",gsim:"\u2273",gsime:"\u2a8e",gsiml:"\u2a90",gtcc:"\u2aa7",gtcir:"\u2a7a",gt:">",GT:">",Gt:"\u226b",gtdot:"\u22d7",gtlPar:"\u2995",gtquest:"\u2a7c",gtrapprox:"\u2a86",gtrarr:"\u2978",gtrdot:"\u22d7",gtreqless:"\u22db",gtreqqless:"\u2a8c",gtrless:"\u2277",gtrsim:"\u2273",gvertneqq:"\u2269\ufe00",gvnE:"\u2269\ufe00",Hacek:"\u02c7",hairsp:"\u200a",half:"\xbd",hamilt:"\u210b",HARDcy:"\u042a",hardcy:"\u044a",harrcir:"\u2948",harr:"\u2194",hArr:"\u21d4",harrw:"\u21ad",Hat:"^",hbar:"\u210f",Hcirc:"\u0124",hcirc:"\u0125",hearts:"\u2665",heartsuit:"\u2665",hellip:"\u2026",hercon:"\u22b9",hfr:"\ud835\udd25",Hfr:"\u210c",HilbertSpace:"\u210b",hksearow:"\u2925",hkswarow:"\u2926",hoarr:"\u21ff",homtht:"\u223b",hookleftarrow:"\u21a9",hookrightarrow:"\u21aa",hopf:"\ud835\udd59",Hopf:"\u210d",horbar:"\u2015",HorizontalLine:"\u2500",hscr:"\ud835\udcbd",Hscr:"\u210b",hslash:"\u210f",Hstrok:"\u0126",hstrok:"\u0127",HumpDownHump:"\u224e",HumpEqual:"\u224f",hybull:"\u2043",hyphen:"\u2010",Iacute:"\xcd",iacute:"\xed",ic:"\u2063",Icirc:"\xce",icirc:"\xee",Icy:"\u0418",icy:"\u0438",Idot:"\u0130",IEcy:"\u0415",iecy:"\u0435",iexcl:"\xa1",iff:"\u21d4",ifr:"\ud835\udd26",Ifr:"\u2111",Igrave:"\xcc",igrave:"\xec",ii:"\u2148",iiiint:"\u2a0c",iiint:"\u222d",iinfin:"\u29dc",iiota:"\u2129",IJlig:"\u0132",ijlig:"\u0133",Imacr:"\u012a",imacr:"\u012b",image:"\u2111",ImaginaryI:"\u2148",imagline:"\u2110",imagpart:"\u2111",imath:"\u0131",Im:"\u2111",imof:"\u22b7",imped:"\u01b5",Implies:"\u21d2",incare:"\u2105",in:"\u2208",infin:"\u221e",infintie:"\u29dd",inodot:"\u0131",intcal:"\u22ba",int:"\u222b",Int:"\u222c",integers:"\u2124",Integral:"\u222b",intercal:"\u22ba",Intersection:"\u22c2",intlarhk:"\u2a17",intprod:"\u2a3c",InvisibleComma:"\u2063",InvisibleTimes:"\u2062",IOcy:"\u0401",iocy:"\u0451",Iogon:"\u012e",iogon:"\u012f",Iopf:"\ud835\udd40",iopf:"\ud835\udd5a",Iota:"\u0399",iota:"\u03b9",iprod:"\u2a3c",iquest:"\xbf",iscr:"\ud835\udcbe",Iscr:"\u2110",isin:"\u2208",isindot:"\u22f5",isinE:"\u22f9",isins:"\u22f4",isinsv:"\u22f3",isinv:"\u2208",it:"\u2062",Itilde:"\u0128",itilde:"\u0129",Iukcy:"\u0406",iukcy:"\u0456",Iuml:"\xcf",iuml:"\xef",Jcirc:"\u0134",jcirc:"\u0135",Jcy:"\u0419",jcy:"\u0439",Jfr:"\ud835\udd0d",jfr:"\ud835\udd27",jmath:"\u0237",Jopf:"\ud835\udd41",jopf:"\ud835\udd5b",Jscr:"\ud835\udca5",jscr:"\ud835\udcbf",Jsercy:"\u0408",jsercy:"\u0458",Jukcy:"\u0404",jukcy:"\u0454",Kappa:"\u039a",kappa:"\u03ba",kappav:"\u03f0",Kcedil:"\u0136",kcedil:"\u0137",Kcy:"\u041a",kcy:"\u043a",Kfr:"\ud835\udd0e",kfr:"\ud835\udd28",kgreen:"\u0138",KHcy:"\u0425",khcy:"\u0445",KJcy:"\u040c",kjcy:"\u045c",Kopf:"\ud835\udd42",kopf:"\ud835\udd5c",Kscr:"\ud835\udca6",kscr:"\ud835\udcc0",lAarr:"\u21da",Lacute:"\u0139",lacute:"\u013a",laemptyv:"\u29b4",lagran:"\u2112",Lambda:"\u039b",lambda:"\u03bb",lang:"\u27e8",Lang:"\u27ea",langd:"\u2991",langle:"\u27e8",lap:"\u2a85",Laplacetrf:"\u2112",laquo:"\xab",larrb:"\u21e4",larrbfs:"\u291f",larr:"\u2190",Larr:"\u219e",lArr:"\u21d0",larrfs:"\u291d",larrhk:"\u21a9",larrlp:"\u21ab",larrpl:"\u2939",larrsim:"\u2973",larrtl:"\u21a2",latail:"\u2919",lAtail:"\u291b",lat:"\u2aab",late:"\u2aad",lates:"\u2aad\ufe00",lbarr:"\u290c",lBarr:"\u290e",lbbrk:"\u2772",lbrace:"{",lbrack:"[",lbrke:"\u298b",lbrksld:"\u298f",lbrkslu:"\u298d",Lcaron:"\u013d",lcaron:"\u013e",Lcedil:"\u013b",lcedil:"\u013c",lceil:"\u2308",lcub:"{",Lcy:"\u041b",lcy:"\u043b",ldca:"\u2936",ldquo:"\u201c",ldquor:"\u201e",ldrdhar:"\u2967",ldrushar:"\u294b",ldsh:"\u21b2",le:"\u2264",lE:"\u2266",LeftAngleBracket:"\u27e8",LeftArrowBar:"\u21e4",leftarrow:"\u2190",LeftArrow:"\u2190",Leftarrow:"\u21d0",LeftArrowRightArrow:"\u21c6",leftarrowtail:"\u21a2",LeftCeiling:"\u2308",LeftDoubleBracket:"\u27e6",LeftDownTeeVector:"\u2961",LeftDownVectorBar:"\u2959",LeftDownVector:"\u21c3",LeftFloor:"\u230a",leftharpoondown:"\u21bd",leftharpoonup:"\u21bc",leftleftarrows:"\u21c7",leftrightarrow:"\u2194",LeftRightArrow:"\u2194",Leftrightarrow:"\u21d4",leftrightarrows:"\u21c6",leftrightharpoons:"\u21cb",leftrightsquigarrow:"\u21ad",LeftRightVector:"\u294e",LeftTeeArrow:"\u21a4",LeftTee:"\u22a3",LeftTeeVector:"\u295a",leftthreetimes:"\u22cb",LeftTriangleBar:"\u29cf",LeftTriangle:"\u22b2",LeftTriangleEqual:"\u22b4",LeftUpDownVector:"\u2951",LeftUpTeeVector:"\u2960",LeftUpVectorBar:"\u2958",LeftUpVector:"\u21bf",LeftVectorBar:"\u2952",LeftVector:"\u21bc",lEg:"\u2a8b",leg:"\u22da",leq:"\u2264",leqq:"\u2266",leqslant:"\u2a7d",lescc:"\u2aa8",les:"\u2a7d",lesdot:"\u2a7f",lesdoto:"\u2a81",lesdotor:"\u2a83",lesg:"\u22da\ufe00",lesges:"\u2a93",lessapprox:"\u2a85",lessdot:"\u22d6",lesseqgtr:"\u22da",lesseqqgtr:"\u2a8b",LessEqualGreater:"\u22da",LessFullEqual:"\u2266",LessGreater:"\u2276",lessgtr:"\u2276",LessLess:"\u2aa1",lesssim:"\u2272",LessSlantEqual:"\u2a7d",LessTilde:"\u2272",lfisht:"\u297c",lfloor:"\u230a",Lfr:"\ud835\udd0f",lfr:"\ud835\udd29",lg:"\u2276",lgE:"\u2a91",lHar:"\u2962",lhard:"\u21bd",lharu:"\u21bc",lharul:"\u296a",lhblk:"\u2584",LJcy:"\u0409",ljcy:"\u0459",llarr:"\u21c7",ll:"\u226a",Ll:"\u22d8",llcorner:"\u231e",Lleftarrow:"\u21da",llhard:"\u296b",lltri:"\u25fa",Lmidot:"\u013f",lmidot:"\u0140",lmoustache:"\u23b0",lmoust:"\u23b0",lnap:"\u2a89",lnapprox:"\u2a89",lne:"\u2a87",lnE:"\u2268",lneq:"\u2a87",lneqq:"\u2268",lnsim:"\u22e6",loang:"\u27ec",loarr:"\u21fd",lobrk:"\u27e6",longleftarrow:"\u27f5",LongLeftArrow:"\u27f5",Longleftarrow:"\u27f8",longleftrightarrow:"\u27f7",LongLeftRightArrow:"\u27f7",Longleftrightarrow:"\u27fa",longmapsto:"\u27fc",longrightarrow:"\u27f6",LongRightArrow:"\u27f6",Longrightarrow:"\u27f9",looparrowleft:"\u21ab",looparrowright:"\u21ac",lopar:"\u2985",Lopf:"\ud835\udd43",lopf:"\ud835\udd5d",loplus:"\u2a2d",lotimes:"\u2a34",lowast:"\u2217",lowbar:"_",LowerLeftArrow:"\u2199",LowerRightArrow:"\u2198",loz:"\u25ca",lozenge:"\u25ca",lozf:"\u29eb",lpar:"(",lparlt:"\u2993",lrarr:"\u21c6",lrcorner:"\u231f",lrhar:"\u21cb",lrhard:"\u296d",lrm:"\u200e",lrtri:"\u22bf",lsaquo:"\u2039",lscr:"\ud835\udcc1",Lscr:"\u2112",lsh:"\u21b0",Lsh:"\u21b0",lsim:"\u2272",lsime:"\u2a8d",lsimg:"\u2a8f",lsqb:"[",lsquo:"\u2018",lsquor:"\u201a",Lstrok:"\u0141",lstrok:"\u0142",ltcc:"\u2aa6",ltcir:"\u2a79",lt:"<",LT:"<",Lt:"\u226a",ltdot:"\u22d6",lthree:"\u22cb",ltimes:"\u22c9",ltlarr:"\u2976",ltquest:"\u2a7b",ltri:"\u25c3",ltrie:"\u22b4",ltrif:"\u25c2",ltrPar:"\u2996",lurdshar:"\u294a",luruhar:"\u2966",lvertneqq:"\u2268\ufe00",lvnE:"\u2268\ufe00",macr:"\xaf",male:"\u2642",malt:"\u2720",maltese:"\u2720",Map:"\u2905",map:"\u21a6",mapsto:"\u21a6",mapstodown:"\u21a7",mapstoleft:"\u21a4",mapstoup:"\u21a5",marker:"\u25ae",mcomma:"\u2a29",Mcy:"\u041c",mcy:"\u043c",mdash:"\u2014",mDDot:"\u223a",measuredangle:"\u2221",MediumSpace:"\u205f",Mellintrf:"\u2133",Mfr:"\ud835\udd10",mfr:"\ud835\udd2a",mho:"\u2127",micro:"\xb5",midast:"*",midcir:"\u2af0",mid:"\u2223",middot:"\xb7",minusb:"\u229f",minus:"\u2212",minusd:"\u2238",minusdu:"\u2a2a",MinusPlus:"\u2213",mlcp:"\u2adb",mldr:"\u2026",mnplus:"\u2213",models:"\u22a7",Mopf:"\ud835\udd44",mopf:"\ud835\udd5e",mp:"\u2213",mscr:"\ud835\udcc2",Mscr:"\u2133",mstpos:"\u223e",Mu:"\u039c",mu:"\u03bc",multimap:"\u22b8",mumap:"\u22b8",nabla:"\u2207",Nacute:"\u0143",nacute:"\u0144",nang:"\u2220\u20d2",nap:"\u2249",napE:"\u2a70\u0338",napid:"\u224b\u0338",napos:"\u0149",napprox:"\u2249",natural:"\u266e",naturals:"\u2115",natur:"\u266e",nbsp:"\xa0",nbump:"\u224e\u0338",nbumpe:"\u224f\u0338",ncap:"\u2a43",Ncaron:"\u0147",ncaron:"\u0148",Ncedil:"\u0145",ncedil:"\u0146",ncong:"\u2247",ncongdot:"\u2a6d\u0338",ncup:"\u2a42",Ncy:"\u041d",ncy:"\u043d",ndash:"\u2013",nearhk:"\u2924",nearr:"\u2197",neArr:"\u21d7",nearrow:"\u2197",ne:"\u2260",nedot:"\u2250\u0338",NegativeMediumSpace:"\u200b",NegativeThickSpace:"\u200b",NegativeThinSpace:"\u200b",NegativeVeryThinSpace:"\u200b",nequiv:"\u2262",nesear:"\u2928",nesim:"\u2242\u0338",NestedGreaterGreater:"\u226b",NestedLessLess:"\u226a",NewLine:"\n",nexist:"\u2204",nexists:"\u2204",Nfr:"\ud835\udd11",nfr:"\ud835\udd2b",ngE:"\u2267\u0338",nge:"\u2271",ngeq:"\u2271",ngeqq:"\u2267\u0338",ngeqslant:"\u2a7e\u0338",nges:"\u2a7e\u0338",nGg:"\u22d9\u0338",ngsim:"\u2275",nGt:"\u226b\u20d2",ngt:"\u226f",ngtr:"\u226f",nGtv:"\u226b\u0338",nharr:"\u21ae",nhArr:"\u21ce",nhpar:"\u2af2",ni:"\u220b",nis:"\u22fc",nisd:"\u22fa",niv:"\u220b",NJcy:"\u040a",njcy:"\u045a",nlarr:"\u219a",nlArr:"\u21cd",nldr:"\u2025",nlE:"\u2266\u0338",nle:"\u2270",nleftarrow:"\u219a",nLeftarrow:"\u21cd",nleftrightarrow:"\u21ae",nLeftrightarrow:"\u21ce",nleq:"\u2270",nleqq:"\u2266\u0338",nleqslant:"\u2a7d\u0338",nles:"\u2a7d\u0338",nless:"\u226e",nLl:"\u22d8\u0338",nlsim:"\u2274",nLt:"\u226a\u20d2",nlt:"\u226e",nltri:"\u22ea",nltrie:"\u22ec",nLtv:"\u226a\u0338",nmid:"\u2224",NoBreak:"\u2060",NonBreakingSpace:"\xa0",nopf:"\ud835\udd5f",Nopf:"\u2115",Not:"\u2aec",not:"\xac",NotCongruent:"\u2262",NotCupCap:"\u226d",NotDoubleVerticalBar:"\u2226",NotElement:"\u2209",NotEqual:"\u2260",NotEqualTilde:"\u2242\u0338",NotExists:"\u2204",NotGreater:"\u226f",NotGreaterEqual:"\u2271",NotGreaterFullEqual:"\u2267\u0338",NotGreaterGreater:"\u226b\u0338",NotGreaterLess:"\u2279",NotGreaterSlantEqual:"\u2a7e\u0338",NotGreaterTilde:"\u2275",NotHumpDownHump:"\u224e\u0338",NotHumpEqual:"\u224f\u0338",notin:"\u2209",notindot:"\u22f5\u0338",notinE:"\u22f9\u0338",notinva:"\u2209",notinvb:"\u22f7",notinvc:"\u22f6",NotLeftTriangleBar:"\u29cf\u0338",NotLeftTriangle:"\u22ea",NotLeftTriangleEqual:"\u22ec",NotLess:"\u226e",NotLessEqual:"\u2270",NotLessGreater:"\u2278",NotLessLess:"\u226a\u0338",NotLessSlantEqual:"\u2a7d\u0338",NotLessTilde:"\u2274",NotNestedGreaterGreater:"\u2aa2\u0338",NotNestedLessLess:"\u2aa1\u0338",notni:"\u220c",notniva:"\u220c",notnivb:"\u22fe",notnivc:"\u22fd",NotPrecedes:"\u2280",NotPrecedesEqual:"\u2aaf\u0338",NotPrecedesSlantEqual:"\u22e0",NotReverseElement:"\u220c",NotRightTriangleBar:"\u29d0\u0338",NotRightTriangle:"\u22eb",NotRightTriangleEqual:"\u22ed",NotSquareSubset:"\u228f\u0338",NotSquareSubsetEqual:"\u22e2",NotSquareSuperset:"\u2290\u0338",NotSquareSupersetEqual:"\u22e3",NotSubset:"\u2282\u20d2",NotSubsetEqual:"\u2288",NotSucceeds:"\u2281",NotSucceedsEqual:"\u2ab0\u0338",NotSucceedsSlantEqual:"\u22e1",NotSucceedsTilde:"\u227f\u0338",NotSuperset:"\u2283\u20d2",NotSupersetEqual:"\u2289",NotTilde:"\u2241",NotTildeEqual:"\u2244",NotTildeFullEqual:"\u2247",NotTildeTilde:"\u2249",NotVerticalBar:"\u2224",nparallel:"\u2226",npar:"\u2226",nparsl:"\u2afd\u20e5",npart:"\u2202\u0338",npolint:"\u2a14",npr:"\u2280",nprcue:"\u22e0",nprec:"\u2280",npreceq:"\u2aaf\u0338",npre:"\u2aaf\u0338",nrarrc:"\u2933\u0338",nrarr:"\u219b",nrArr:"\u21cf",nrarrw:"\u219d\u0338",nrightarrow:"\u219b",nRightarrow:"\u21cf",nrtri:"\u22eb",nrtrie:"\u22ed",nsc:"\u2281",nsccue:"\u22e1",nsce:"\u2ab0\u0338",Nscr:"\ud835\udca9",nscr:"\ud835\udcc3",nshortmid:"\u2224",nshortparallel:"\u2226",nsim:"\u2241",nsime:"\u2244",nsimeq:"\u2244",nsmid:"\u2224",nspar:"\u2226",nsqsube:"\u22e2",nsqsupe:"\u22e3",nsub:"\u2284",nsubE:"\u2ac5\u0338",nsube:"\u2288",nsubset:"\u2282\u20d2",nsubseteq:"\u2288",nsubseteqq:"\u2ac5\u0338",nsucc:"\u2281",nsucceq:"\u2ab0\u0338",nsup:"\u2285",nsupE:"\u2ac6\u0338",nsupe:"\u2289",nsupset:"\u2283\u20d2",nsupseteq:"\u2289",nsupseteqq:"\u2ac6\u0338",ntgl:"\u2279",Ntilde:"\xd1",ntilde:"\xf1",ntlg:"\u2278",ntriangleleft:"\u22ea",ntrianglelefteq:"\u22ec",ntriangleright:"\u22eb",ntrianglerighteq:"\u22ed",Nu:"\u039d",nu:"\u03bd",num:"#",numero:"\u2116",numsp:"\u2007",nvap:"\u224d\u20d2",nvdash:"\u22ac",nvDash:"\u22ad",nVdash:"\u22ae",nVDash:"\u22af",nvge:"\u2265\u20d2",nvgt:">\u20d2",nvHarr:"\u2904",nvinfin:"\u29de",nvlArr:"\u2902",nvle:"\u2264\u20d2",nvlt:"<\u20d2",nvltrie:"\u22b4\u20d2",nvrArr:"\u2903",nvrtrie:"\u22b5\u20d2",nvsim:"\u223c\u20d2",nwarhk:"\u2923",nwarr:"\u2196",nwArr:"\u21d6",nwarrow:"\u2196",nwnear:"\u2927",Oacute:"\xd3",oacute:"\xf3",oast:"\u229b",Ocirc:"\xd4",ocirc:"\xf4",ocir:"\u229a",Ocy:"\u041e",ocy:"\u043e",odash:"\u229d",Odblac:"\u0150",odblac:"\u0151",odiv:"\u2a38",odot:"\u2299",odsold:"\u29bc",OElig:"\u0152",oelig:"\u0153",ofcir:"\u29bf",Ofr:"\ud835\udd12",ofr:"\ud835\udd2c",ogon:"\u02db",Ograve:"\xd2",ograve:"\xf2",ogt:"\u29c1",ohbar:"\u29b5",ohm:"\u03a9",oint:"\u222e",olarr:"\u21ba",olcir:"\u29be",olcross:"\u29bb",oline:"\u203e",olt:"\u29c0",Omacr:"\u014c",omacr:"\u014d",Omega:"\u03a9",omega:"\u03c9",Omicron:"\u039f",omicron:"\u03bf",omid:"\u29b6",ominus:"\u2296",Oopf:"\ud835\udd46",oopf:"\ud835\udd60",opar:"\u29b7",OpenCurlyDoubleQuote:"\u201c",OpenCurlyQuote:"\u2018",operp:"\u29b9",oplus:"\u2295",orarr:"\u21bb",Or:"\u2a54",or:"\u2228",ord:"\u2a5d",order:"\u2134",orderof:"\u2134",ordf:"\xaa",ordm:"\xba",origof:"\u22b6",oror:"\u2a56",orslope:"\u2a57",orv:"\u2a5b",oS:"\u24c8",Oscr:"\ud835\udcaa",oscr:"\u2134",Oslash:"\xd8",oslash:"\xf8",osol:"\u2298",Otilde:"\xd5",otilde:"\xf5",otimesas:"\u2a36",Otimes:"\u2a37",otimes:"\u2297",Ouml:"\xd6",ouml:"\xf6",ovbar:"\u233d",OverBar:"\u203e",OverBrace:"\u23de",OverBracket:"\u23b4",OverParenthesis:"\u23dc",para:"\xb6",parallel:"\u2225",par:"\u2225",parsim:"\u2af3",parsl:"\u2afd",part:"\u2202",PartialD:"\u2202",Pcy:"\u041f",pcy:"\u043f",percnt:"%",period:".",permil:"\u2030",perp:"\u22a5",pertenk:"\u2031",Pfr:"\ud835\udd13",pfr:"\ud835\udd2d",Phi:"\u03a6",phi:"\u03c6",phiv:"\u03d5",phmmat:"\u2133",phone:"\u260e",Pi:"\u03a0",pi:"\u03c0",pitchfork:"\u22d4",piv:"\u03d6",planck:"\u210f",planckh:"\u210e",plankv:"\u210f",plusacir:"\u2a23",plusb:"\u229e",pluscir:"\u2a22",plus:"+",plusdo:"\u2214",plusdu:"\u2a25",pluse:"\u2a72",PlusMinus:"\xb1",plusmn:"\xb1",plussim:"\u2a26",plustwo:"\u2a27",pm:"\xb1",Poincareplane:"\u210c",pointint:"\u2a15",popf:"\ud835\udd61",Popf:"\u2119",pound:"\xa3",prap:"\u2ab7",Pr:"\u2abb",pr:"\u227a",prcue:"\u227c",precapprox:"\u2ab7",prec:"\u227a",preccurlyeq:"\u227c",Precedes:"\u227a",PrecedesEqual:"\u2aaf",PrecedesSlantEqual:"\u227c",PrecedesTilde:"\u227e",preceq:"\u2aaf",precnapprox:"\u2ab9",precneqq:"\u2ab5",precnsim:"\u22e8",pre:"\u2aaf",prE:"\u2ab3",precsim:"\u227e",prime:"\u2032",Prime:"\u2033",primes:"\u2119",prnap:"\u2ab9",prnE:"\u2ab5",prnsim:"\u22e8",prod:"\u220f",Product:"\u220f",profalar:"\u232e",profline:"\u2312",profsurf:"\u2313",prop:"\u221d",Proportional:"\u221d",Proportion:"\u2237",propto:"\u221d",prsim:"\u227e",prurel:"\u22b0",Pscr:"\ud835\udcab",pscr:"\ud835\udcc5",Psi:"\u03a8",psi:"\u03c8",puncsp:"\u2008",Qfr:"\ud835\udd14",qfr:"\ud835\udd2e",qint:"\u2a0c",qopf:"\ud835\udd62",Qopf:"\u211a",qprime:"\u2057",Qscr:"\ud835\udcac",qscr:"\ud835\udcc6",quaternions:"\u210d",quatint:"\u2a16",quest:"?",questeq:"\u225f",quot:'"',QUOT:'"',rAarr:"\u21db",race:"\u223d\u0331",Racute:"\u0154",racute:"\u0155",radic:"\u221a",raemptyv:"\u29b3",rang:"\u27e9",Rang:"\u27eb",rangd:"\u2992",range:"\u29a5",rangle:"\u27e9",raquo:"\xbb",rarrap:"\u2975",rarrb:"\u21e5",rarrbfs:"\u2920",rarrc:"\u2933",rarr:"\u2192",Rarr:"\u21a0",rArr:"\u21d2",rarrfs:"\u291e",rarrhk:"\u21aa",rarrlp:"\u21ac",rarrpl:"\u2945",rarrsim:"\u2974",Rarrtl:"\u2916",rarrtl:"\u21a3",rarrw:"\u219d",ratail:"\u291a",rAtail:"\u291c",ratio:"\u2236",rationals:"\u211a",rbarr:"\u290d",rBarr:"\u290f",RBarr:"\u2910",rbbrk:"\u2773",rbrace:"}",rbrack:"]",rbrke:"\u298c",rbrksld:"\u298e",rbrkslu:"\u2990",Rcaron:"\u0158",rcaron:"\u0159",Rcedil:"\u0156",rcedil:"\u0157",rceil:"\u2309",rcub:"}",Rcy:"\u0420",rcy:"\u0440",rdca:"\u2937",rdldhar:"\u2969",rdquo:"\u201d",rdquor:"\u201d",rdsh:"\u21b3",real:"\u211c",realine:"\u211b",realpart:"\u211c",reals:"\u211d",Re:"\u211c",rect:"\u25ad",reg:"\xae",REG:"\xae",ReverseElement:"\u220b",ReverseEquilibrium:"\u21cb",ReverseUpEquilibrium:"\u296f",rfisht:"\u297d",rfloor:"\u230b",rfr:"\ud835\udd2f",Rfr:"\u211c",rHar:"\u2964",rhard:"\u21c1",rharu:"\u21c0",rharul:"\u296c",Rho:"\u03a1",rho:"\u03c1",rhov:"\u03f1",RightAngleBracket:"\u27e9",RightArrowBar:"\u21e5",rightarrow:"\u2192",RightArrow:"\u2192",Rightarrow:"\u21d2",RightArrowLeftArrow:"\u21c4",rightarrowtail:"\u21a3",RightCeiling:"\u2309",RightDoubleBracket:"\u27e7",RightDownTeeVector:"\u295d",RightDownVectorBar:"\u2955",RightDownVector:"\u21c2",RightFloor:"\u230b",rightharpoondown:"\u21c1",rightharpoonup:"\u21c0",rightleftarrows:"\u21c4",rightleftharpoons:"\u21cc",rightrightarrows:"\u21c9",rightsquigarrow:"\u219d",RightTeeArrow:"\u21a6",RightTee:"\u22a2",RightTeeVector:"\u295b",rightthreetimes:"\u22cc",RightTriangleBar:"\u29d0",RightTriangle:"\u22b3",RightTriangleEqual:"\u22b5",RightUpDownVector:"\u294f",RightUpTeeVector:"\u295c",RightUpVectorBar:"\u2954",RightUpVector:"\u21be",RightVectorBar:"\u2953",RightVector:"\u21c0",ring:"\u02da",risingdotseq:"\u2253",rlarr:"\u21c4",rlhar:"\u21cc",rlm:"\u200f",rmoustache:"\u23b1",rmoust:"\u23b1",rnmid:"\u2aee",roang:"\u27ed",roarr:"\u21fe",robrk:"\u27e7",ropar:"\u2986",ropf:"\ud835\udd63",Ropf:"\u211d",roplus:"\u2a2e",rotimes:"\u2a35",RoundImplies:"\u2970",rpar:")",rpargt:"\u2994",rppolint:"\u2a12",rrarr:"\u21c9",Rrightarrow:"\u21db",rsaquo:"\u203a",rscr:"\ud835\udcc7",Rscr:"\u211b",rsh:"\u21b1",Rsh:"\u21b1",rsqb:"]",rsquo:"\u2019",rsquor:"\u2019",rthree:"\u22cc",rtimes:"\u22ca",rtri:"\u25b9",rtrie:"\u22b5",rtrif:"\u25b8",rtriltri:"\u29ce",RuleDelayed:"\u29f4",ruluhar:"\u2968",rx:"\u211e",Sacute:"\u015a",sacute:"\u015b",sbquo:"\u201a",scap:"\u2ab8",Scaron:"\u0160",scaron:"\u0161",Sc:"\u2abc",sc:"\u227b",sccue:"\u227d",sce:"\u2ab0",scE:"\u2ab4",Scedil:"\u015e",scedil:"\u015f",Scirc:"\u015c",scirc:"\u015d",scnap:"\u2aba",scnE:"\u2ab6",scnsim:"\u22e9",scpolint:"\u2a13",scsim:"\u227f",Scy:"\u0421",scy:"\u0441",sdotb:"\u22a1",sdot:"\u22c5",sdote:"\u2a66",searhk:"\u2925",searr:"\u2198",seArr:"\u21d8",searrow:"\u2198",sect:"\xa7",semi:";",seswar:"\u2929",setminus:"\u2216",setmn:"\u2216",sext:"\u2736",Sfr:"\ud835\udd16",sfr:"\ud835\udd30",sfrown:"\u2322",sharp:"\u266f",SHCHcy:"\u0429",shchcy:"\u0449",SHcy:"\u0428",shcy:"\u0448",ShortDownArrow:"\u2193",ShortLeftArrow:"\u2190",shortmid:"\u2223",shortparallel:"\u2225",ShortRightArrow:"\u2192",ShortUpArrow:"\u2191",shy:"\xad",Sigma:"\u03a3",sigma:"\u03c3",sigmaf:"\u03c2",sigmav:"\u03c2",sim:"\u223c",simdot:"\u2a6a",sime:"\u2243",simeq:"\u2243",simg:"\u2a9e",simgE:"\u2aa0",siml:"\u2a9d",simlE:"\u2a9f",simne:"\u2246",simplus:"\u2a24",simrarr:"\u2972",slarr:"\u2190",SmallCircle:"\u2218",smallsetminus:"\u2216",smashp:"\u2a33",smeparsl:"\u29e4",smid:"\u2223",smile:"\u2323",smt:"\u2aaa",smte:"\u2aac",smtes:"\u2aac\ufe00",SOFTcy:"\u042c",softcy:"\u044c",solbar:"\u233f",solb:"\u29c4",sol:"/",Sopf:"\ud835\udd4a",sopf:"\ud835\udd64",spades:"\u2660",spadesuit:"\u2660",spar:"\u2225",sqcap:"\u2293",sqcaps:"\u2293\ufe00",sqcup:"\u2294",sqcups:"\u2294\ufe00",Sqrt:"\u221a",sqsub:"\u228f",sqsube:"\u2291",sqsubset:"\u228f",sqsubseteq:"\u2291",sqsup:"\u2290",sqsupe:"\u2292",sqsupset:"\u2290",sqsupseteq:"\u2292",square:"\u25a1",Square:"\u25a1",SquareIntersection:"\u2293",SquareSubset:"\u228f",SquareSubsetEqual:"\u2291",SquareSuperset:"\u2290",SquareSupersetEqual:"\u2292",SquareUnion:"\u2294",squarf:"\u25aa",squ:"\u25a1",squf:"\u25aa",srarr:"\u2192",Sscr:"\ud835\udcae",sscr:"\ud835\udcc8",ssetmn:"\u2216",ssmile:"\u2323",sstarf:"\u22c6",Star:"\u22c6",star:"\u2606",starf:"\u2605",straightepsilon:"\u03f5",straightphi:"\u03d5",strns:"\xaf",sub:"\u2282",Sub:"\u22d0",subdot:"\u2abd",subE:"\u2ac5",sube:"\u2286",subedot:"\u2ac3",submult:"\u2ac1",subnE:"\u2acb",subne:"\u228a",subplus:"\u2abf",subrarr:"\u2979",subset:"\u2282",Subset:"\u22d0",subseteq:"\u2286",subseteqq:"\u2ac5",SubsetEqual:"\u2286",subsetneq:"\u228a",subsetneqq:"\u2acb",subsim:"\u2ac7",subsub:"\u2ad5",subsup:"\u2ad3",succapprox:"\u2ab8",succ:"\u227b",succcurlyeq:"\u227d",Succeeds:"\u227b",SucceedsEqual:"\u2ab0",SucceedsSlantEqual:"\u227d",SucceedsTilde:"\u227f",succeq:"\u2ab0",succnapprox:"\u2aba",succneqq:"\u2ab6",succnsim:"\u22e9",succsim:"\u227f",SuchThat:"\u220b",sum:"\u2211",Sum:"\u2211",sung:"\u266a",sup1:"\xb9",sup2:"\xb2",sup3:"\xb3",sup:"\u2283",Sup:"\u22d1",supdot:"\u2abe",supdsub:"\u2ad8",supE:"\u2ac6",supe:"\u2287",supedot:"\u2ac4",Superset:"\u2283",SupersetEqual:"\u2287",suphsol:"\u27c9",suphsub:"\u2ad7",suplarr:"\u297b",supmult:"\u2ac2",supnE:"\u2acc",supne:"\u228b",supplus:"\u2ac0",supset:"\u2283",Supset:"\u22d1",supseteq:"\u2287",supseteqq:"\u2ac6",supsetneq:"\u228b",supsetneqq:"\u2acc",supsim:"\u2ac8",supsub:"\u2ad4",supsup:"\u2ad6",swarhk:"\u2926",swarr:"\u2199",swArr:"\u21d9",swarrow:"\u2199",swnwar:"\u292a",szlig:"\xdf",Tab:"\t",target:"\u2316",Tau:"\u03a4",tau:"\u03c4",tbrk:"\u23b4",Tcaron:"\u0164",tcaron:"\u0165",Tcedil:"\u0162",tcedil:"\u0163",Tcy:"\u0422",tcy:"\u0442",tdot:"\u20db",telrec:"\u2315",Tfr:"\ud835\udd17",tfr:"\ud835\udd31",there4:"\u2234",therefore:"\u2234",Therefore:"\u2234",Theta:"\u0398",theta:"\u03b8",thetasym:"\u03d1",thetav:"\u03d1",thickapprox:"\u2248",thicksim:"\u223c",ThickSpace:"\u205f\u200a",ThinSpace:"\u2009",thinsp:"\u2009",thkap:"\u2248",thksim:"\u223c",THORN:"\xde",thorn:"\xfe",tilde:"\u02dc",Tilde:"\u223c",TildeEqual:"\u2243",TildeFullEqual:"\u2245",TildeTilde:"\u2248",timesbar:"\u2a31",timesb:"\u22a0",times:"\xd7",timesd:"\u2a30",tint:"\u222d",toea:"\u2928",topbot:"\u2336",topcir:"\u2af1",top:"\u22a4",Topf:"\ud835\udd4b",topf:"\ud835\udd65",topfork:"\u2ada",tosa:"\u2929",tprime:"\u2034",trade:"\u2122",TRADE:"\u2122",triangle:"\u25b5",triangledown:"\u25bf",triangleleft:"\u25c3",trianglelefteq:"\u22b4",triangleq:"\u225c",triangleright:"\u25b9",trianglerighteq:"\u22b5",tridot:"\u25ec",trie:"\u225c",triminus:"\u2a3a",TripleDot:"\u20db",triplus:"\u2a39",trisb:"\u29cd",tritime:"\u2a3b",trpezium:"\u23e2",Tscr:"\ud835\udcaf",tscr:"\ud835\udcc9",TScy:"\u0426",tscy:"\u0446",TSHcy:"\u040b",tshcy:"\u045b",Tstrok:"\u0166",tstrok:"\u0167",twixt:"\u226c",twoheadleftarrow:"\u219e",twoheadrightarrow:"\u21a0",Uacute:"\xda",uacute:"\xfa",uarr:"\u2191",Uarr:"\u219f",uArr:"\u21d1",Uarrocir:"\u2949",Ubrcy:"\u040e",ubrcy:"\u045e",Ubreve:"\u016c",ubreve:"\u016d",Ucirc:"\xdb",ucirc:"\xfb",Ucy:"\u0423",ucy:"\u0443",udarr:"\u21c5",Udblac:"\u0170",udblac:"\u0171",udhar:"\u296e",ufisht:"\u297e",Ufr:"\ud835\udd18",ufr:"\ud835\udd32",Ugrave:"\xd9",ugrave:"\xf9",uHar:"\u2963",uharl:"\u21bf",uharr:"\u21be",uhblk:"\u2580",ulcorn:"\u231c",ulcorner:"\u231c",ulcrop:"\u230f",ultri:"\u25f8",Umacr:"\u016a",umacr:"\u016b",uml:"\xa8",UnderBar:"_",UnderBrace:"\u23df",UnderBracket:"\u23b5",UnderParenthesis:"\u23dd",Union:"\u22c3",UnionPlus:"\u228e",Uogon:"\u0172",uogon:"\u0173",Uopf:"\ud835\udd4c",uopf:"\ud835\udd66",UpArrowBar:"\u2912",uparrow:"\u2191",UpArrow:"\u2191",Uparrow:"\u21d1",UpArrowDownArrow:"\u21c5",updownarrow:"\u2195",UpDownArrow:"\u2195",Updownarrow:"\u21d5",UpEquilibrium:"\u296e",upharpoonleft:"\u21bf",upharpoonright:"\u21be",uplus:"\u228e",UpperLeftArrow:"\u2196",UpperRightArrow:"\u2197",upsi:"\u03c5",Upsi:"\u03d2",upsih:"\u03d2",Upsilon:"\u03a5",upsilon:"\u03c5",UpTeeArrow:"\u21a5",UpTee:"\u22a5",upuparrows:"\u21c8",urcorn:"\u231d",urcorner:"\u231d",urcrop:"\u230e",Uring:"\u016e",uring:"\u016f",urtri:"\u25f9",Uscr:"\ud835\udcb0",uscr:"\ud835\udcca",utdot:"\u22f0",Utilde:"\u0168",utilde:"\u0169",utri:"\u25b5",utrif:"\u25b4",uuarr:"\u21c8",Uuml:"\xdc",uuml:"\xfc",uwangle:"\u29a7",vangrt:"\u299c",varepsilon:"\u03f5",varkappa:"\u03f0",varnothing:"\u2205",varphi:"\u03d5",varpi:"\u03d6",varpropto:"\u221d",varr:"\u2195",vArr:"\u21d5",varrho:"\u03f1",varsigma:"\u03c2",varsubsetneq:"\u228a\ufe00",varsubsetneqq:"\u2acb\ufe00",varsupsetneq:"\u228b\ufe00",varsupsetneqq:"\u2acc\ufe00",vartheta:"\u03d1",vartriangleleft:"\u22b2",vartriangleright:"\u22b3",vBar:"\u2ae8",Vbar:"\u2aeb",vBarv:"\u2ae9",Vcy:"\u0412",vcy:"\u0432",vdash:"\u22a2",vDash:"\u22a8",Vdash:"\u22a9",VDash:"\u22ab",Vdashl:"\u2ae6",veebar:"\u22bb",vee:"\u2228",Vee:"\u22c1",veeeq:"\u225a",vellip:"\u22ee",verbar:"|",Verbar:"\u2016",vert:"|",Vert:"\u2016",VerticalBar:"\u2223",VerticalLine:"|",VerticalSeparator:"\u2758",VerticalTilde:"\u2240",VeryThinSpace:"\u200a",Vfr:"\ud835\udd19",vfr:"\ud835\udd33",vltri:"\u22b2",vnsub:"\u2282\u20d2",vnsup:"\u2283\u20d2",Vopf:"\ud835\udd4d",vopf:"\ud835\udd67",vprop:"\u221d",vrtri:"\u22b3",Vscr:"\ud835\udcb1",vscr:"\ud835\udccb",vsubnE:"\u2acb\ufe00",vsubne:"\u228a\ufe00",vsupnE:"\u2acc\ufe00",vsupne:"\u228b\ufe00",Vvdash:"\u22aa",vzigzag:"\u299a",Wcirc:"\u0174",wcirc:"\u0175",wedbar:"\u2a5f",wedge:"\u2227",Wedge:"\u22c0",wedgeq:"\u2259",weierp:"\u2118",Wfr:"\ud835\udd1a",wfr:"\ud835\udd34",Wopf:"\ud835\udd4e",wopf:"\ud835\udd68",wp:"\u2118",wr:"\u2240",wreath:"\u2240",Wscr:"\ud835\udcb2",wscr:"\ud835\udccc",xcap:"\u22c2",xcirc:"\u25ef",xcup:"\u22c3",xdtri:"\u25bd",Xfr:"\ud835\udd1b",xfr:"\ud835\udd35",xharr:"\u27f7",xhArr:"\u27fa",Xi:"\u039e",xi:"\u03be",xlarr:"\u27f5",xlArr:"\u27f8",xmap:"\u27fc",xnis:"\u22fb",xodot:"\u2a00",Xopf:"\ud835\udd4f",xopf:"\ud835\udd69",xoplus:"\u2a01",xotime:"\u2a02",xrarr:"\u27f6",xrArr:"\u27f9",Xscr:"\ud835\udcb3",xscr:"\ud835\udccd",xsqcup:"\u2a06",xuplus:"\u2a04",xutri:"\u25b3",xvee:"\u22c1",xwedge:"\u22c0",Yacute:"\xdd",yacute:"\xfd",YAcy:"\u042f",yacy:"\u044f",Ycirc:"\u0176",ycirc:"\u0177",Ycy:"\u042b",ycy:"\u044b",yen:"\xa5",Yfr:"\ud835\udd1c",yfr:"\ud835\udd36",YIcy:"\u0407",yicy:"\u0457",Yopf:"\ud835\udd50",yopf:"\ud835\udd6a",Yscr:"\ud835\udcb4",yscr:"\ud835\udcce",YUcy:"\u042e",yucy:"\u044e",yuml:"\xff",Yuml:"\u0178",Zacute:"\u0179",zacute:"\u017a",Zcaron:"\u017d",zcaron:"\u017e",Zcy:"\u0417",zcy:"\u0437",Zdot:"\u017b",zdot:"\u017c",zeetrf:"\u2128",ZeroWidthSpace:"\u200b",Zeta:"\u0396",zeta:"\u03b6",zfr:"\ud835\udd37",Zfr:"\u2128",ZHcy:"\u0416",zhcy:"\u0436",zigrarr:"\u21dd",zopf:"\ud835\udd6b",Zopf:"\u2124",Zscr:"\ud835\udcb5",zscr:"\ud835\udccf",zwj:"\u200d",zwnj:"\u200c"}},{}],53:[function(c,e,r){"use strict";function n(t){return Array.prototype.slice.call(arguments,1).forEach(function(r){r&&Object.keys(r).forEach(function(e){t[e]=r[e]})}),t}function l(e){return Object.prototype.toString.call(e)}function u(e){return"[object Function]"===l(e)}function p(e){return e.replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")}var s={fuzzyLink:!0,fuzzyEmail:!0,fuzzyIP:!1};var o={"http:":{validate:function(e,r,t){var n=e.slice(r);return t.re.http||(t.re.http=new RegExp("^\\/\\/"+t.re.src_auth+t.re.src_host_port_strict+t.re.src_path,"i")),t.re.http.test(n)?n.match(t.re.http)[0].length:0}},"https:":"http:","ftp:":"http:","//":{validate:function(e,r,t){var n=e.slice(r);return t.re.no_http||(t.re.no_http=new RegExp("^"+t.re.src_auth+"(?:localhost|(?:(?:"+t.re.src_domain+")\\.)+"+t.re.src_domain_root+")"+t.re.src_port+t.re.src_host_terminator+t.re.src_path,"i")),t.re.no_http.test(n)?3<=r&&":"===e[r-3]?0:3<=r&&"/"===e[r-3]?0:n.match(t.re.no_http)[0].length:0}},"mailto:":{validate:function(e,r,t){var n=e.slice(r);return t.re.mailto||(t.re.mailto=new RegExp("^"+t.re.src_email_name+"@"+t.re.src_host_strict,"i")),t.re.mailto.test(n)?n.match(t.re.mailto)[0].length:0}}},h="a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]",i="biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|\u0440\u0444".split("|");function a(s){var r=s.re=c("./lib/re")(s.__opts__),e=s.__tlds__.slice();function t(e){return e.replace("%TLDS%",r.src_tlds)}s.onCompile(),s.__tlds_replaced__||e.push(h),e.push(r.src_xn),r.src_tlds=e.join("|"),r.email_fuzzy=RegExp(t(r.tpl_email_fuzzy),"i"),r.link_fuzzy=RegExp(t(r.tpl_link_fuzzy),"i"),r.link_no_ip_fuzzy=RegExp(t(r.tpl_link_no_ip_fuzzy),"i"),r.host_fuzzy_test=RegExp(t(r.tpl_host_fuzzy_test),"i");var o=[];function i(e,r){throw new Error('(LinkifyIt) Invalid schema "'+e+'": '+r)}s.__compiled__={},Object.keys(s.__schemas__).forEach(function(e){var r=s.__schemas__[e];if(null!==r){var n,t={validate:null,link:null};if(s.__compiled__[e]=t,"[object Object]"===l(r))return"[object RegExp]"===l(r.validate)?t.validate=(n=r.validate,function(e,r){var t=e.slice(r);return n.test(t)?t.match(n)[0].length:0}):u(r.validate)?t.validate=r.validate:i(e,r),void(u(r.normalize)?t.normalize=r.normalize:r.normalize?i(e,r):t.normalize=function(e,r){r.normalize(e)});if("[object String]"!==l(r))i(e,r);else o.push(e)}}),o.forEach(function(e){s.__compiled__[s.__schemas__[e]]&&(s.__compiled__[e].validate=s.__compiled__[s.__schemas__[e]].validate,s.__compiled__[e].normalize=s.__compiled__[s.__schemas__[e]].normalize)}),s.__compiled__[""]={validate:null,normalize:function(e,r){r.normalize(e)}};var n,a=Object.keys(s.__compiled__).filter(function(e){return 0<e.length&&s.__compiled__[e]}).map(p).join("|");s.re.schema_test=RegExp("(^|(?!_)(?:[><\uff5c]|"+r.src_ZPCc+"))("+a+")","i"),s.re.schema_search=RegExp("(^|(?!_)(?:[><\uff5c]|"+r.src_ZPCc+"))("+a+")","ig"),s.re.pretest=RegExp("("+s.re.schema_test.source+")|("+s.re.host_fuzzy_test.source+")|@","i"),(n=s).__index__=-1,n.__text_cache__=""}function f(e,r){var t=new function(e,r){var t=e.__index__,n=e.__last_index__,s=e.__text_cache__.slice(t,n);this.schema=e.__schema__.toLowerCase(),this.index=t+r,this.lastIndex=n+r,this.raw=s,this.text=s,this.url=s}(e,r);return e.__compiled__[t.schema].normalize(t,e),t}function d(e,r){if(!(this instanceof d))return new d(e,r);var t;r||(t=e,Object.keys(t||{}).reduce(function(e,r){return e||s.hasOwnProperty(r)},!1)&&(r=e,e={})),this.__opts__=n({},s,r),this.__index__=-1,this.__last_index__=-1,this.__schema__="",this.__text_cache__="",this.__schemas__=n({},o,e),this.__compiled__={},this.__tlds__=i,this.__tlds_replaced__=!1,this.re={},a(this)}d.prototype.add=function(e,r){return this.__schemas__[e]=r,a(this),this},d.prototype.set=function(e){return this.__opts__=n(this.__opts__,e),this},d.prototype.test=function(e){if(this.__text_cache__=e,this.__index__=-1,!e.length)return!1;var r,t,n,s,o,i,a,c;if(this.re.schema_test.test(e))for((a=this.re.schema_search).lastIndex=0;null!==(r=a.exec(e));)if(s=this.testSchemaAt(e,r[2],a.lastIndex)){this.__schema__=r[2],this.__index__=r.index+r[1].length,this.__last_index__=r.index+r[0].length+s;break}return this.__opts__.fuzzyLink&&this.__compiled__["http:"]&&0<=(c=e.search(this.re.host_fuzzy_test))&&(this.__index__<0||c<this.__index__)&&null!==(t=e.match(this.__opts__.fuzzyIP?this.re.link_fuzzy:this.re.link_no_ip_fuzzy))&&(o=t.index+t[1].length,(this.__index__<0||o<this.__index__)&&(this.__schema__="",this.__index__=o,this.__last_index__=t.index+t[0].length)),this.__opts__.fuzzyEmail&&this.__compiled__["mailto:"]&&0<=e.indexOf("@")&&null!==(n=e.match(this.re.email_fuzzy))&&(o=n.index+n[1].length,i=n.index+n[0].length,(this.__index__<0||o<this.__index__||o===this.__index__&&i>this.__last_index__)&&(this.__schema__="mailto:",this.__index__=o,this.__last_index__=i)),0<=this.__index__},d.prototype.pretest=function(e){return this.re.pretest.test(e)},d.prototype.testSchemaAt=function(e,r,t){return this.__compiled__[r.toLowerCase()]?this.__compiled__[r.toLowerCase()].validate(e,t,this):0},d.prototype.match=function(e){var r=0,t=[];0<=this.__index__&&this.__text_cache__===e&&(t.push(f(this,r)),r=this.__last_index__);for(var n=r?e.slice(r):e;this.test(n);)t.push(f(this,r)),n=n.slice(this.__last_index__),r+=this.__last_index__;return t.length?t:null},d.prototype.tlds=function(e,r){return e=Array.isArray(e)?e:[e],r?this.__tlds__=this.__tlds__.concat(e).sort().filter(function(e,r,t){return e!==t[r-1]}).reverse():(this.__tlds__=e.slice(),this.__tlds_replaced__=!0),a(this),this},d.prototype.normalize=function(e){e.schema||(e.url="http://"+e.url),"mailto:"!==e.schema||/^mailto:/i.test(e.url)||(e.url="mailto:"+e.url)},d.prototype.onCompile=function(){},e.exports=d},{"./lib/re":54}],54:[function(n,e,r){"use strict";e.exports=function(e){var r={};r.src_Any=n("uc.micro/properties/Any/regex").source,r.src_Cc=n("uc.micro/categories/Cc/regex").source,r.src_Z=n("uc.micro/categories/Z/regex").source,r.src_P=n("uc.micro/categories/P/regex").source,r.src_ZPCc=[r.src_Z,r.src_P,r.src_Cc].join("|"),r.src_ZCc=[r.src_Z,r.src_Cc].join("|");var t="[><\uff5c]";return r.src_pseudo_letter="(?:(?![><\uff5c]|"+r.src_ZPCc+")"+r.src_Any+")",r.src_ip4="(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)",r.src_auth="(?:(?:(?!"+r.src_ZCc+"|[@/\\[\\]()]).)+@)?",r.src_port="(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?",r.src_host_terminator="(?=$|[><\uff5c]|"+r.src_ZPCc+")(?!-|_|:\\d|\\.-|\\.(?!$|"+r.src_ZPCc+"))",r.src_path="(?:[/?#](?:(?!"+r.src_ZCc+"|"+t+"|[()[\\]{}.,\"'?!\\-]).|\\[(?:(?!"+r.src_ZCc+"|\\]).)*\\]|\\((?:(?!"+r.src_ZCc+"|[)]).)*\\)|\\{(?:(?!"+r.src_ZCc+'|[}]).)*\\}|\\"(?:(?!'+r.src_ZCc+'|["]).)+\\"|\\\'(?:(?!'+r.src_ZCc+"|[']).)+\\'|\\'(?="+r.src_pseudo_letter+"|[-]).|\\.{2,3}[a-zA-Z0-9%/]|\\.(?!"+r.src_ZCc+"|[.]).|"+(e&&e["---"]?"\\-(?!--(?:[^-]|$))(?:-*)|":"\\-+|")+"\\,(?!"+r.src_ZCc+").|\\!(?!"+r.src_ZCc+"|[!]).|\\?(?!"+r.src_ZCc+"|[?]).)+|\\/)?",r.src_email_name='[\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]+',r.src_xn="xn--[a-z0-9\\-]{1,59}",r.src_domain_root="(?:"+r.src_xn+"|"+r.src_pseudo_letter+"{1,63})",r.src_domain="(?:"+r.src_xn+"|(?:"+r.src_pseudo_letter+")|(?:"+r.src_pseudo_letter+"(?:-(?!-)|"+r.src_pseudo_letter+"){0,61}"+r.src_pseudo_letter+"))",r.src_host="(?:(?:(?:(?:"+r.src_domain+")\\.)*"+r.src_domain+"))",r.tpl_host_fuzzy="(?:"+r.src_ip4+"|(?:(?:(?:"+r.src_domain+")\\.)+(?:%TLDS%)))",r.tpl_host_no_ip_fuzzy="(?:(?:(?:"+r.src_domain+")\\.)+(?:%TLDS%))",r.src_host_strict=r.src_host+r.src_host_terminator,r.tpl_host_fuzzy_strict=r.tpl_host_fuzzy+r.src_host_terminator,r.src_host_port_strict=r.src_host+r.src_port+r.src_host_terminator,r.tpl_host_port_fuzzy_strict=r.tpl_host_fuzzy+r.src_port+r.src_host_terminator,r.tpl_host_port_no_ip_fuzzy_strict=r.tpl_host_no_ip_fuzzy+r.src_port+r.src_host_terminator,r.tpl_host_fuzzy_test="localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:"+r.src_ZPCc+"|>|$))",r.tpl_email_fuzzy="(^|[><\uff5c]|\\(|"+r.src_ZCc+")("+r.src_email_name+"@"+r.tpl_host_fuzzy_strict+")",r.tpl_link_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|\uff5c]|"+r.src_ZPCc+"))((?![$+<=>^`|\uff5c])"+r.tpl_host_port_fuzzy_strict+r.src_path+")",r.tpl_link_no_ip_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|\uff5c]|"+r.src_ZPCc+"))((?![$+<=>^`|\uff5c])"+r.tpl_host_port_no_ip_fuzzy_strict+r.src_path+")",r}},{"uc.micro/categories/Cc/regex":61,"uc.micro/categories/P/regex":63,"uc.micro/categories/Z/regex":64,"uc.micro/properties/Any/regex":66}],55:[function(e,r,t){"use strict";var s={};function n(e,r){var l;return"string"!=typeof r&&(r=n.defaultChars),l=function(e){var r,t,n=s[e];if(n)return n;for(n=s[e]=[],r=0;r<128;r++)t=String.fromCharCode(r),n.push(t);for(r=0;r<e.length;r++)n[t=e.charCodeAt(r)]="%"+("0"+t.toString(16).toUpperCase()).slice(-2);return n}(r),e.replace(/(%[a-f0-9]{2})+/gi,function(e){var r,t,n,s,o,i,a,c="";for(r=0,t=e.length;r<t;r+=3)(n=parseInt(e.slice(r+1,r+3),16))<128?c+=l[n]:192==(224&n)&&r+3<t&&128==(192&(s=parseInt(e.slice(r+4,r+6),16)))?(c+=(a=n<<6&1984|63&s)<128?"\ufffd\ufffd":String.fromCharCode(a),r+=3):224==(240&n)&&r+6<t&&(s=parseInt(e.slice(r+4,r+6),16),o=parseInt(e.slice(r+7,r+9),16),128==(192&s)&&128==(192&o))?(c+=(a=n<<12&61440|s<<6&4032|63&o)<2048||55296<=a&&a<=57343?"\ufffd\ufffd\ufffd":String.fromCharCode(a),r+=6):240==(248&n)&&r+9<t&&(s=parseInt(e.slice(r+4,r+6),16),o=parseInt(e.slice(r+7,r+9),16),i=parseInt(e.slice(r+10,r+12),16),128==(192&s)&&128==(192&o)&&128==(192&i))?((a=n<<18&1835008|s<<12&258048|o<<6&4032|63&i)<65536||1114111<a?c+="\ufffd\ufffd\ufffd\ufffd":(a-=65536,c+=String.fromCharCode(55296+(a>>10),56320+(1023&a))),r+=9):c+="\ufffd";return c})}n.defaultChars=";/?:@&=+$,#",n.componentChars="",r.exports=n},{}],56:[function(e,r,t){"use strict";var l={};function u(e,r,t){var n,s,o,i,a,c="";for("string"!=typeof r&&(t=r,r=u.defaultChars),void 0===t&&(t=!0),a=function(e){var r,t,n=l[e];if(n)return n;for(n=l[e]=[],r=0;r<128;r++)t=String.fromCharCode(r),/^[0-9a-z]$/i.test(t)?n.push(t):n.push("%"+("0"+r.toString(16).toUpperCase()).slice(-2));for(r=0;r<e.length;r++)n[e.charCodeAt(r)]=e[r];return n}(r),n=0,s=e.length;n<s;n++)if(o=e.charCodeAt(n),t&&37===o&&n+2<s&&/^[0-9a-f]{2}$/i.test(e.slice(n+1,n+3)))c+=e.slice(n,n+3),n+=2;else if(o<128)c+=a[o];else if(55296<=o&&o<=57343){if(55296<=o&&o<=56319&&n+1<s&&56320<=(i=e.charCodeAt(n+1))&&i<=57343){c+=encodeURIComponent(e[n]+e[n+1]),n++;continue}c+="%EF%BF%BD"}else c+=encodeURIComponent(e[n]);return c}u.defaultChars=";/?:@&=+$,-_.!~*'()#",u.componentChars="-_.!~*'()",r.exports=u},{}],57:[function(e,r,t){"use strict";r.exports=function(e){var r="";return r+=e.protocol||"",r+=e.slashes?"//":"",r+=e.auth?e.auth+"@":"",e.hostname&&-1!==e.hostname.indexOf(":")?r+="["+e.hostname+"]":r+=e.hostname||"",r+=e.port?":"+e.port:"",r+=e.pathname||"",r+=e.search||"",r+=e.hash||""}},{}],58:[function(e,r,t){"use strict";r.exports.encode=e("./encode"),r.exports.decode=e("./decode"),r.exports.format=e("./format"),r.exports.parse=e("./parse")},{"./decode":55,"./encode":56,"./format":57,"./parse":59}],59:[function(e,r,t){"use strict";function n(){this.protocol=null,this.slashes=null,this.auth=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.pathname=null}var w=/^([a-z0-9.+-]+:)/i,s=/:[0-9]*$/,D=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,o=["{","}","|","\\","^","`"].concat(["<",">",'"',"`"," ","\r","\n","\t"]),i=["'"].concat(o),E=["%","/","?",";","#"].concat(i),q=["/","?","#"],S=/^[+a-z0-9A-Z_-]{0,63}$/,F=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,L={javascript:!0,"javascript:":!0},z={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0};n.prototype.parse=function(e,r){var t,n,s,o,i,a=e;if(a=a.trim(),!r&&1===e.split("#").length){var c=D.exec(a);if(c)return this.pathname=c[1],c[2]&&(this.search=c[2]),this}var l=w.exec(a);if(l&&(s=(l=l[0]).toLowerCase(),this.protocol=l,a=a.substr(l.length)),(r||l||a.match(/^\/\/[^@\/]+@[^@\/]+/))&&(!(i="//"===a.substr(0,2))||l&&L[l]||(a=a.substr(2),this.slashes=!0)),!L[l]&&(i||l&&!z[l])){var u,p,h=-1;for(t=0;t<q.length;t++)-1!==(o=a.indexOf(q[t]))&&(-1===h||o<h)&&(h=o);for(-1!==(p=-1===h?a.lastIndexOf("@"):a.lastIndexOf("@",h))&&(u=a.slice(0,p),a=a.slice(p+1),this.auth=u),h=-1,t=0;t<E.length;t++)-1!==(o=a.indexOf(E[t]))&&(-1===h||o<h)&&(h=o);-1===h&&(h=a.length),":"===a[h-1]&&h--;var f=a.slice(0,h);a=a.slice(h),this.parseHost(f),this.hostname=this.hostname||"";var d="["===this.hostname[0]&&"]"===this.hostname[this.hostname.length-1];if(!d){var m=this.hostname.split(/\./);for(t=0,n=m.length;t<n;t++){var _=m[t];if(_&&!_.match(S)){for(var g="",b=0,k=_.length;b<k;b++)127<_.charCodeAt(b)?g+="x":g+=_[b];if(!g.match(S)){var v=m.slice(0,t),x=m.slice(t+1),y=_.match(F);y&&(v.push(y[1]),x.unshift(y[2])),x.length&&(a=x.join(".")+a),this.hostname=v.join(".");break}}}}255<this.hostname.length&&(this.hostname=""),d&&(this.hostname=this.hostname.substr(1,this.hostname.length-2))}var C=a.indexOf("#");-1!==C&&(this.hash=a.substr(C),a=a.slice(0,C));var A=a.indexOf("?");return-1!==A&&(this.search=a.substr(A),a=a.slice(0,A)),a&&(this.pathname=a),z[s]&&this.hostname&&!this.pathname&&(this.pathname=""),this},n.prototype.parseHost=function(e){var r=s.exec(e);r&&(":"!==(r=r[0])&&(this.port=r.substr(1)),e=e.substr(0,e.length-r.length)),e&&(this.hostname=e)},r.exports=function(e,r){if(e&&e instanceof n)return e;var t=new n;return t.parse(e,r),t}},{}],60:[function(e,z,T){(function(L){!function(e){var r="object"==typeof T&&T&&!T.nodeType&&T,t="object"==typeof z&&z&&!z.nodeType&&z,n="object"==typeof L&&L;n.global!==n&&n.window!==n&&n.self!==n||(e=n);var s,o,g=2147483647,b=36,k=1,v=26,i=38,a=700,x=72,y=128,C="-",c=/^xn--/,l=/[^\x20-\x7E]/,u=/[\x2E\u3002\uFF0E\uFF61]/g,p={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},h=b-k,A=Math.floor,w=String.fromCharCode;function D(e){throw new RangeError(p[e])}function f(e,r){for(var t=e.length,n=[];t--;)n[t]=r(e[t]);return n}function d(e,r){var t=e.split("@"),n="";return 1<t.length&&(n=t[0]+"@",e=t[1]),n+f((e=e.replace(u,".")).split("."),r).join(".")}function E(e){for(var r,t,n=[],s=0,o=e.length;s<o;)55296<=(r=e.charCodeAt(s++))&&r<=56319&&s<o?56320==(64512&(t=e.charCodeAt(s++)))?n.push(((1023&r)<<10)+(1023&t)+65536):(n.push(r),s--):n.push(r);return n}function q(e){return f(e,function(e){var r="";return 65535<e&&(r+=w((e-=65536)>>>10&1023|55296),e=56320|1023&e),r+=w(e)}).join("")}function S(e,r){return e+22+75*(e<26)-((0!=r)<<5)}function F(e,r,t){var n=0;for(e=t?A(e/a):e>>1,e+=A(e/r);h*v>>1<e;n+=b)e=A(e/h);return A(n+(h+1)*e/(e+i))}function m(e){var r,t,n,s,o,i,a,c,l,u,p,h=[],f=e.length,d=0,m=y,_=x;for((t=e.lastIndexOf(C))<0&&(t=0),n=0;n<t;++n)128<=e.charCodeAt(n)&&D("not-basic"),h.push(e.charCodeAt(n));for(s=0<t?t+1:0;s<f;){for(o=d,i=1,a=b;f<=s&&D("invalid-input"),p=e.charCodeAt(s++),(b<=(c=p-48<10?p-22:p-65<26?p-65:p-97<26?p-97:b)||c>A((g-d)/i))&&D("overflow"),d+=c*i,!(c<(l=a<=_?k:_+v<=a?v:a-_));a+=b)i>A(g/(u=b-l))&&D("overflow"),i*=u;_=F(d-o,r=h.length+1,0==o),A(d/r)>g-m&&D("overflow"),m+=A(d/r),d%=r,h.splice(d++,0,m)}return q(h)}function _(e){var r,t,n,s,o,i,a,c,l,u,p,h,f,d,m,_=[];for(h=(e=E(e)).length,r=y,o=x,i=t=0;i<h;++i)(p=e[i])<128&&_.push(w(p));for(n=s=_.length,s&&_.push(C);n<h;){for(a=g,i=0;i<h;++i)r<=(p=e[i])&&p<a&&(a=p);for(a-r>A((g-t)/(f=n+1))&&D("overflow"),t+=(a-r)*f,r=a,i=0;i<h;++i)if((p=e[i])<r&&++t>g&&D("overflow"),p==r){for(c=t,l=b;!(c<(u=l<=o?k:o+v<=l?v:l-o));l+=b)m=c-u,d=b-u,_.push(w(S(u+m%d,0))),c=A(m/d);_.push(w(S(c,0))),o=F(t,f,n==s),t=0,++n}++t,++r}return _.join("")}if(s={version:"1.4.1",ucs2:{decode:E,encode:q},decode:m,encode:_,toASCII:function(e){return d(e,function(e){return l.test(e)?"xn--"+_(e):e})},toUnicode:function(e){return d(e,function(e){return c.test(e)?m(e.slice(4).toLowerCase()):e})}},r&&t)if(z.exports==r)t.exports=s;else for(o in s)s.hasOwnProperty(o)&&(r[o]=s[o]);else e.punycode=s}(this)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],61:[function(e,r,t){r.exports=/[\0-\x1F\x7F-\x9F]/},{}],62:[function(e,r,t){r.exports=/[\xAD\u0600-\u0605\u061C\u06DD\u070F\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804\uDCBD|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/},{}],63:[function(e,r,t){r.exports=/[!-#%-\*,-/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E49\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD806[\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2]|\uD807[\uDC41-\uDC45\uDC70\uDC71]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/},{}],64:[function(e,r,t){r.exports=/[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/},{}],65:[function(e,r,t){"use strict";t.Any=e("./properties/Any/regex"),t.Cc=e("./categories/Cc/regex"),t.Cf=e("./categories/Cf/regex"),t.P=e("./categories/P/regex"),t.Z=e("./categories/Z/regex")},{"./categories/Cc/regex":61,"./categories/Cf/regex":62,"./categories/P/regex":63,"./categories/Z/regex":64,"./properties/Any/regex":66}],66:[function(e,r,t){r.exports=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/},{}],67:[function(e,r,t){"use strict";r.exports=e("./lib/")},{"./lib/":9}]},{},[67])(67)});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })
/******/ ]);