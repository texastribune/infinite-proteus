/*jshint loopfunc:false */
/*globals $, console */
// goes through all textareas and enables optional editors
(function(exports, $){
  "use strict";

  // CONFIGURATION

  // This is the class that gets set on the widget that represents the editor.
  var ACTIVE_CLASS = 'btn-primary';


  // Default Options
  var defaultOptions = {
    textareas: 'textarea',
    remember: true
  };

  // UTILS

  // Basic multi-script sequential loader, requires a callback. Similar to
  // $.getScript except takes an array of urls.
  //
  // @param array resources
  //   An array of strings for the urls of the scripts.
  // @param function callback
  //   The function to execute after all the scripts have loaded.
  $.getScripts = function(resources, callback) {
    var load = function(resources, callback){
      $.when($.getScript(resources.shift())).then(
        function(){
          if (resources.length){
            load(resources, callback);
          } else {
            callback();
          }
        }
      );
    };
    load(resources, callback);
  };

  // store the user's preferences for editors
  // todo feature detect localStorage among other things
  var storage = window.localStorage,
      storageKey = 'admin-user-editors',
      NONE = "none";  // should be truthy
  // load preferences from localStorage
  var loadPrefs = function(){
    var defaultPrefs = {},
        v = storage.getItem(storageKey);
    return v ? JSON.parse(v) : defaultPrefs;
  };
  // save preferences to localStorage
  var savePrefs = function(){
    storage.setItem(storageKey, JSON.stringify(prefs));
  };
  // attach listeners
  //
  // whatever widget is in charge of selecting the editor, it should have the
  // class: `prefs-selector`, and the jQuery data key: `_editor` should be a
  // reference to the editor object.
  var attachPrefs = function($widgetParent){
    // get the id of the textarea the nav controls, this will work for now.
    var key = $widgetParent.parent().find('textarea').attr('id');
    // use deferred events to be super flexible
    $widgetParent.on("click", ".prefs-selector", function(){
      var $this = $(this),
          name = $this.data('_editor').name,
          active = $this.hasClass(ACTIVE_CLASS);
      prefs[key] = active ? name : NONE;  // store NONE to signify don't use any editors
      savePrefs();
    });
  };


  // SUPER WYSIWYG BROTHERS

  var editors = [],  // collection of Editors to use
      $textareas,  // collection of textareas to use
      options,  // options used
      prefs;  // user preferences

  // Add markup
  var placeControls = function($control, $textarea){
    var $controlGroup = $textarea.closest('.control-group');
    var $container = $controlGroup.children('.btn-group');
    if (!$container.length){
      $container = $('<div class="btn-group"/>').prependTo($controlGroup);
      if (options.remember){
        attachPrefs($container);
      }
    }
    $container.append($control);
    return $control;
  };


  // Add an Editor.
  var addEditor = function(configuration){
    editors.push(configuration);
  };


  // Creates the function that does the work of adding an Editor to a textarea.
  var makeOnLoad = function(editor){
    return function(){
      // If editor needs to do some initialization, do it now.
      if (editor.init){
        editor.init();
      }

      $textareas.each(function(idx, textarea){
        var $textarea = $(textarea);

        // TODO set text() of button better
        var control = $("<button class='btn btn-mini prefs-selector' type=button></button>")
        .html(editor.button || editor.name)
        .data('_editor', editor);
        control.click(function(){
          var activeEditor = $textarea.data('editor-active');
          if (activeEditor){
            // console.log("disable", activeEditor.name)
            activeEditor.disable(textarea, $textarea.data('_ed'));
            control.removeClass(ACTIVE_CLASS).siblings().removeClass(ACTIVE_CLASS);
            $textarea.data('editor-active', '');
          }
          if (!activeEditor || editor.name != activeEditor.name){
            // console.log("enable", editor.name)
            $textarea.data('_ed', editor.enable(textarea));
            control.addClass(ACTIVE_CLASS);
            $textarea.data('editor-active', editor);
          }
        });

        placeControls(control, $textarea);

        // autoload editor
        var editorToAutoload = (prefs[textarea.id] || $textarea.data('editor') || NONE);
        if (editor.name.toUpperCase() == editorToAutoload.toUpperCase()){
          $textarea.data('_ed', editor.enable(textarea));
          control.addClass(ACTIVE_CLASS);
          $textarea.data('editor-active', editor);
        }
      });
    };
  };


  // Adds all the editors to all the textareas
  var init = function(opts){
    var j;

    options = $.extend({}, defaultOptions, opts || {});
    $textareas = $(options.textareas);
    if (!$textareas.length){ return; }

    editors.forEach(function(editor){
      editor.onLoad = makeOnLoad(editor);
      if (!editor.isInstalled()){
        console.log("installing", editor.name);
        if (editor.css){
          for (j = 0; j < editor.css.length; j++){
            $('head').append('<link rel="stylesheet" href="' + editor.css[j] + '" type="text/css">');
          }
        }
        if (editor.js){
          if (editor.js.length > 1) {
            $.getScripts(editor.js, editor.onLoad);
          }
          else {
            $.getScript(editor.js[0], editor.onLoad);
          }
        }
      } else {
        editor.onLoad();
      }
    });

    if (options.remember){
      prefs = loadPrefs();
    }
  };


  // exports
  exports.superTextareas = {
    addEditor: addEditor,
    init: init
  };
})(window, window.jQuery);
