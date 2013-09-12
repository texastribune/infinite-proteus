// custom texas tribune implementation of a basic markdown editor

/*globals $, toMarkdown, Showdown */

(function(){
  "use strict";

  var converter;

  window.superTextareas.addEditor({
    name: 'Markdown',
    button: 'Md',
    isInstalled: function(){ return typeof toMarkdown !== "undefined"; },
    js: ['assets/showdown/showdown.js',
         'assets/to-markdown/to-markdown.js'],
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

})();
