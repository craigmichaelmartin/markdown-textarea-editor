# `markdown-textarea-editor`

[![Build Status](https://travis-ci.org/craigmichaelmartin/markdown-textarea-editor.svg?branch=master)](https://travis-ci.org/craigmichaelmartin/markdown-textarea-editor)
[![Greenkeeper badge](https://badges.greenkeeper.io/craigmichaelmartin/markdown-textarea-editor.svg)](https://greenkeeper.io/)
[![codecov](https://codecov.io/gh/craigmichaelmartin/markdown-textarea-editor/branch/master/graph/badge.svg)](https://codecov.io/gh/craigmichaelmartin/markdown-textarea-editor)

## Installation

```bash
npm install --save markdown-textarea-editor
```

## What is `markdown-textarea-editor`?

`markdown-textarea-editor` is a vanilla markdown editor.

## Usage

#### Javascript

Call `markdownTextareaEditor` with the elements for the editor:

```javascript
  const markdownTextareaEditor = require('markdownTextareaEditor');
  markdownTextareaEditor({
    bodyViewButton,
    bodyEditButton,
    bodyViewMode,
    bodyEditContainer,
    toolbarActions,
    title,
    body,
    toggleBold,
    toggleItalics,
    toggleStrikethrough,
    toggleH2,
    toggleH3,
    toggleH4,
    addLink,
    addUnorderedList,
    addOrderedList,
    uploadAsset,
    uploadAssetText,
    uploadAssetForm,
    uploadAssetMessage
  }, {
    postAsset: ({data, success, error}) => {
      // your ajax post code
    }
  });
```

#### HTML/CSS/Font

For now, only the JavaScript is "in band". If you like the github pages example editor exactly as it is, you can just manually grab the HTML/CSS/Font from the docs directory and incorporate it into your project.

If a solution was desired for an "all in-band approach", ideally:

- the HTML should be true HTML rendered from the server (not injected in the client by js - non-streaming, additional parse time, slower to first interaction)
  - _Potential Solution_: perhaps there could be various server template engines' partial files (eg, on for mustache, jinja2, etc).
- the css and font icons should be incorporated into exists files and not extra files with potentially duplicate fonts.
  - _Potential Solution_: perhaps there could be less/sass/scss file versions with variables for the font icons/path, and the icon files only to be imported if necessary.

Also, the javascript is just a library at the moment. It would need to actually query the dom for the elements and pass them to the library function.

## TODO

- Add tests
- Remove bootstrap classes from the HTML
