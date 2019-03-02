var markdownFunctions = require('markdown-functions');
var md = require('markdown-it')();

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
