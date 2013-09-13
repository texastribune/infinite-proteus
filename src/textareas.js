/*jshint loopfunc:false */
/*globals $, console */
// goes through all textareas and enables optional editors
(function(exports, $){
  "use strict";

  // CONFIGURATION

  // This is the class that gets set on the widget that represents the editor.
  var ACTIVE_CLASS = 'btn-primary',
      NAME = 'finiteEruptions';


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
  //
  // The raw data is stored in the `data` attribute as a key/value of the
  // textarea id/editor name.
  var Prefs = function () {
    this.NONE = "none";  // should be truthy
    // WISHLIST feature detect localStorage among other things
    this.storage = window.localStorage;  // storage backend
    this.storageKey = NAME;
    this.data = undefined;
    this.load();
  };
  // load preferences from localStorage
  Prefs.prototype.load = function () {
    var defaultPrefs = {},
        v = this.storage.getItem(this.storageKey);
    this.data = v ? JSON.parse(v) : defaultPrefs;
  };
  // save preferences to localStorage
  Prefs.prototype.save = function () {
    this.storage.setItem(this.storageKey, JSON.stringify(this.data));
  };
  // attach listeners
  //
  // whatever widget is in charge of selecting the editor, it should have the
  // class: `prefs-selector`, and the jQuery data (key: finiteEruptions) should
  // be a reference to the editor object.
  Prefs.prototype.attachTo = function ($widgetParent) {
    // get the id of the textarea the nav controls, this will work for now.
    var self = this,
        key = $widgetParent.parent().find('textarea').attr('id');
    // use deferred events to be super flexible
    $widgetParent.on("click." + NAME, ".prefs-selector", function(){
      var $this = $(this),
          name = $this.data(NAME).name,
          active = $this.hasClass(ACTIVE_CLASS);
      self.data[key] = active ? name : self.NONE;  // store NONE to signify don't use any editors
      self.save();
    });
  };
  // clear preferences
  Prefs.prototype.clear = function () {
    this.storage.removeItem(this.storageKey);
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
      $container = $('<div class="btn-group ' + NAME + '"/>').prependTo($controlGroup);
      if (options.remember){
        prefs.attachTo($container);
      }
    }
    $container.append($control);
    return $control;
  };


  // Add an Editor.
  var addEditor = function(configuration){
    editors.push(configuration);
  };

  // return true if the editor is not installed
  var editorIsNotInstalled = function (editor) {
    if (editor.isInstalled) {
      return !editor.isInstalled();
    }
    // TODO have a lazier way of seeing if the resource was already loaded.
    // Could detect if a resource exists but that won't work for javascript
    // since jQuery evals instead of injecting script tags. Just do it for css.
    if (editor.css && editor.css.length) {
      return !$("link[href*='" + editor.css[0] + "']").length;
    }
    return true;
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
        var $control = $("<button class='btn btn-mini prefs-selector' type=button></button>")
          .html(editor.button || editor.name)
          .data(NAME, editor)
          .on('click.' + NAME, function () {
            var activeEditor = $textarea.data(NAME);
            if (activeEditor){
              // console.log("disable", activeEditor.name)
              activeEditor.disable(textarea);
              $control.removeClass(ACTIVE_CLASS).siblings().removeClass(ACTIVE_CLASS);
              $textarea.data(NAME, '');
            }
            if (!activeEditor || editor.name != activeEditor.name){
              // console.log("enable", editor.name)
              editor.enable(textarea);
              $control.addClass(ACTIVE_CLASS);
              $textarea.data(NAME, editor);
            }
          });

        placeControls($control, $textarea);

        // autoload editor
        var editorToAutoload = (prefs[textarea.id] || $textarea.attr('data-editor') || prefs.NONE);
        if (editor.name.toUpperCase() == editorToAutoload.toUpperCase()){
          editor.enable(textarea);
          $control.addClass(ACTIVE_CLASS);
          $textarea.data(NAME, editor);
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
      if (editorIsNotInstalled(editor)){
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
      prefs = new Prefs();
    }
  };


  // tear down self
  var destroy = function() {
    // disable any active editors
    $textareas.each(function (idx, textarea) {
      var $textarea = $(textarea),
          activeEditor = $textarea.data(NAME);
      if (activeEditor) {
        activeEditor.disable(textarea);
      }
    });
    // turn off event listeners
    $textareas.off('.' + NAME);
    // remove UI
    $('.' + NAME).remove();
  };


  // exports
  exports.superTextareas = {
    addEditor: addEditor,
    init: init,
    forget: prefs && prefs.clear,
    destroy: destroy
  };
})(window, window.jQuery);
