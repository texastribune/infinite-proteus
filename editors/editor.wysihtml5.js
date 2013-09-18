// custom texas tribune implementation of bootstrap-wysihtml5

/*globals $ */

(function(){
  "use strict";

  // TODO replace with the real function later.
  var setup_tt_wysihtml5 = function(){};

  // wysihtml5 configuration via the bootstrap-wysihtml5 library
  var wysihtml5ParserRules = {
        classes:{
          'DV-container': 1,  // document cloud?
          'article_detail': 1, // size
          'audio': 1,
          'basic': 1,  // ????
          'btn_neue': 1,
          'clear': 1,
          'correct': 1,  // custom
          'data': 1,
          'enlarge': 1,
          'even': 1,  // zebra stripes
          'first': 1,
          'float_left': 1,
          'float_right': 1,
          'halt': 1,
          'incorrect': 1,  // custom
          'last': 1,
          'lightbox': 1,
          'media': 1,
          'next': 1,
          'odd': 1,  // zebra stripes
          'pagedisplay': 1,  // ??
          'pager': 1,  // ??
          'pagesize': 1, // ??
          'photo_caption': 1,
          'photo_links': 1,
          'prev': 1,
          'question': 1,  // custom
          'tableholder': 1,
          'tablesorter': 1,  // custom
          'unprose': 1
        },
        tags: {
          a: {
            // set_attributes: {
            //   target: "_blank",
            //   rel: "nofollow"
            // },
            check_attributes: {
              href: "url", // important to avoid XSS
              target: "alt",
              title: "alt"
            }
          },
          b: {},
          br: {},
          button: {
            check_attributes: {
              id: "alt"
            }
          },
          cite: {},
          div: {},
          em: {},
          embed: {
            check_attributes: {
              allowfullscreen: "alt",
              allowscriptaccess: "alt",
              bgcolor: 1,
              height: 1,  // not sure why "number" doesn't work
              src: "src",
              type: 1,
              width: 1,  // not sure why "number" doesn't work
              wmode: "alt"
            }
          },
          form: {},
          h1: {},
          hr: {},
          i: {},
          iframe: {
            check_attributes: {
              frameborder: "number",
              height: "number",
              src: "src",
              width: "number"
            }
          },
          img: {
            check_attributes: {
              alt: "alt",
              height: "numbers",
              src: "url",
              title: "alt",
              width: "numbers"
            }
          },
          input: {},
          li: {},
          object: {
            check_attributes: {
              classid: 1,
              data: 1,
              height: "alt",
              type: 1,
              width: "alt"
            }
          },
          ol: {},
          p: {},
          param: {
            check_attributes: {
              name: "alt",
              value: 1
            }
          },
          span: {},
          strong: {},
          sub: {},
          sup: {},
          table: {},
          tbody: {},
          td: {},
          th: {},
          thead: {},
          tr: {},
          ul: {}
        }
      };
  window.infiniteProteus.addEditor({
    name: 'wysihtml5',
    css: ['assets/bootstrap-wysihtml5/bootstrap-wysihtml5-0.0.2.css'],
    js: ['assets/wysihtml5/wysihtml5-0.4.0pre.js',
         'assets/bootstrap-wysihtml5/bootstrap-wysihtml5-0.0.2.js'],
    init: function(){
      setup_tt_wysihtml5();
    },
    enable: function(textarea){
      var options = {
        // bootstrap-wysihtml options
        // html: true,
        image: false,
        // wysihtml options
        composerClassName: 'prose',
        style: false,
        stylesheets: window.EDITOR_CSS,
        parserRules: wysihtml5ParserRules,
        useLineBreaks: false
      };

      // fix: if you set set style=false, the wysiwyg will be dimensionless.
      // Grab the dimensions of the textarea before wysihtml5 hides it and re-
      // apply the dimensions.
      var $textarea = $(textarea),
          dim = {
            height: $textarea.height(),
            width: $textarea.width()
          };
      $textarea.wysihtml5(options);
      var el = $textarea.data('wysihtml5').editor.composer.iframe;
      $(el).height(dim.height).width(dim.width);

      return el;
    },
    disable: function(textarea){
      // HACK: I couldn't find the official way to remove the editor.
      $(textarea)
        .show()
        .removeData('wysihtml5')
        .siblings('.wysihtml5-sandbox, .wysihtml5-toolbar').remove();

    }
  });

})();
