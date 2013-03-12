// custom texas tribune implementation of a basic markdown editor

/*globals $, STATIC_URL, EDITOR_CSS, toMarkdown, Showdown */

(function(exports, superTextareas){
  "use strict";

  var converter;

  exports.superTextareas.addEditor({
    name: 'Markdown',
    button: 'Md',
    isInstalled: function(){ return typeof toMarkdown !== "undefined"; },
    js: [STATIC_URL + 'showdown/showdown.js',
         STATIC_URL + 'to-markdown/to-markdown.js'],
    init: function(){
      converter = new Showdown.converter();
    },
    enable: function(textarea){
      var $textarea = $(textarea),
          html = $textarea.val();
      $textarea.val(toMarkdown(html));
    },
    disable: function(textarea){
      var $textarea = $(textarea),
          markdown = $textarea.val();
      $textarea.val(converter.makeHtml(markdown));
    }
  });


})(window, superTextareas);
