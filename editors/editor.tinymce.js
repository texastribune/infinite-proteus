// custom texas tribune implementation of tinymce

/*globals tinyMCE */

(function(){
  "use strict";

  // TODO replace with the real function later.
  window.setup_tt_tinymce = function(){};

  // tinymce configuration
  var tinymce_opts = {"theme_advanced_toolbar_location": "top",
      "theme_advanced_toolbar_align": "left",
      "content_css": window.EDITOR_CSS.join(", "),
      "setup": "setup_tt_tinymce",
      "theme_advanced_buttons1": "bold,italic,underline,strikethrough,justifyleft,justifycenter,justifyright,|,styleselect,blockquote,bullist,sub,sup,tablecontrols,tt_link,link,unlink,cleanup,code,search,replace,pasteword,help", "theme_advanced_buttons3": "",
      "theme": "advanced",
      "style_formats": [{"classes": "quote", "block": "p", "title": "Quote"}, {"classes": "cite", "block": "p", "title": "Quote Cite"}],
      "directionality": "ltr",
      "plugins": "table,paste,searchreplace",
      "strict_loading_mode": 1, "mode": "exact",
      "theme_advanced_buttons2": "",
      "extended_valid_elements": "@[id|class|style|title|dir<ltr?rtl|lang|xml::lang|onclick|ondblclick|onmousedown|onmouseup|onmouseover|onmousemove|onmouseout|onkeypress|onkeydown|onkeyup],blockquote,embed[*],iframe[src|width|height|frameborder],div[id],article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section"};
  // remove: elements, language, spellcheck
  tinymce_opts.mode = "none";

  window.superTextareas.addEditor({
    name: 'TinyMCE',
    js: ["assets/tiny_mce/tiny_mce.js"],
    init: function(){
      tinyMCE.baseURL = "assets/tiny_mce";
      tinyMCE.init(tinymce_opts);
    },
    enable: function(textarea){
      tinyMCE.execCommand('mceAddControl', false, textarea.id);
    },
    disable: function(textarea){
      // tinyMCE.triggerSave();
      tinyMCE.execCommand('mceRemoveControl', false, textarea.id);
    }
  });

})();
