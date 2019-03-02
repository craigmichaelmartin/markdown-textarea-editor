var markdownTextareaEditor = require('../src/javascript/markdown-textarea-editor');

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
      obj.success({ Location: 'https://www.kujo.com/public/images/logo_with_words-6806cf2c04.png' });
    }
  }
);
