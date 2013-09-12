infinite-proteus
================

An experiment in using any textarea editor.

This is a JavaScript framework for


Usage
-----

Include the script:

    <script src="infinite-proteus.js"></script>

Add editors:

    proteus.addEditor(editor);

Where an editor is an Object with these options:

    name        : String
                  The name of the editor, e.g.: TinyMCE, wysihtml5, ACE, CodeMirror
    button      : String (optional)
                  The name of the editor to use for the UI. You might want to use 'MD' for the MarkDown editor,
                  Dillinger. *HTML is allowed.*
    isInstalled : bool Function (optional if `css` exists)
                  A function that returns a boolean that determines if the editor is installed or not.
    css         : Array (optional)
                  An array of additional CSS that needs to be loaded.
    js          : Array (optional)
                  An array of additional JavaScript that needs to be loaded.
    init        : void Function (optional)
                  A function that should be run immediately.
    enable      : void Function
                    @param element  The DOM Node for the source textarea element
                  The code that's needed to turn a textarea into the editor. For TinyMCE, this would look like:
                      tinyMCE.execCommand('mceAddControl', false, element.id);
    disable     : void Function
                    @param element  The DOM Node for the source textarea element
                  The code that's needed to revert back into a textarea. For TinyMCE, this would look like:
                      tinyMCE.execCommand('mceRemoveControl', false, element.id);


Initialize the script:

    <script>
      proteus.init(options);
    </script>

Options:

    textareas : String (default: 'textarea')
                jquery selector that identifies which textareas to use, e.g.: 'textarea[data-use-proteus=1]'
    remember  : Boolean (default: true)
                Remember the user's editor preferences. Uses localstorage.

Meaningful data attributes:

    data-editor : name of the editor that should be used

JQuery data created on each textarea:

    finiteEruptions : reference to the active editor

### Tips

If you need to hold onto a variable between an editor's `enable` and its `disable`, you're best bet is to store it
on the element itself as jquery data.

### Auto-selecting an editor

If the `data-editor` attribute and the editor's name happen to match, that editor's `.enable()` method is run
immediately, unless user preferences are enabled and the user prefers another editor.

### Remembering preferences

This script will remember the last editor used (including deciding not to an
editor) based on the textarea's id and the editor's name.

To clear preferences, hook up the `proteus.forget()` method.

### Widget

A widget will be created and placed near the textarea with buttons to switch between editors.

### Editors

* Markdown to HTML

https://github.com/coreyti/showdown port of the original

    var converter = new Showdown.converter();
    converter.makeHTML(markdownText);


* HTML To Markdown

https://github.com/domchristie/to-markdown last updated 7 months ago

    var md = toMarkdown(htmlText);

https://github.com/kates/html2markdown last updated 10 months ago

    var md = HTML2Markdown(htmlText);
