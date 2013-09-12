// custom texas tribune implementation of CodeMirror

/*globals $, CodeMirror */

(function(){
  "use strict";

  window.superTextareas.addEditor({
    name: 'CodeMirror',
    css: ['assets/codemirror/lib/codemirror.css'],
    js: ['assets/codemirror/codemirror-compressed.js'],
    enable: function(textarea){
      var $textarea = $(textarea),
          dim = {
            height: $textarea.height(),
            width: $textarea.width()
          };
      var options = {
        lineNumbers: true,
        tabSize: 2
      };
      var cm = CodeMirror.fromTextArea(textarea, options);
      cm.setSize(dim.width, dim.height);
      $textarea.data('_ed_cm', cm);
    },
    disable: function(textarea){
      var ed_ref = $(textarea).data('_ed_cm');
      ed_ref.save();
      ed_ref.toTextArea();
      $(textarea).removeData('_ed_cm');
    }
  });

})();
