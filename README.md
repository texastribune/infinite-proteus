infinite-proteus
================

An experiment in using any textarea editor

Usage
-----

Include the script:

    <script src="infinite-proteus.js"></script>
    
Add editors:

    proteus.addEditor(editor);
    
Where an editor is an object with this structure:

    name        : String
                  The name of the editor, e.g.: TinyMCE, wysihtml5, ACE, CodeMirror
    button      : String (optional)
                  The name of the editor to use for the UI. You might want to use 'MD' for the MarkDown editor,
                  Dillinger. *HTML is allowed.*
    isInstalled : bool Function
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
      var options = {
        textareas: 'textarea[data-use-proteus=1]'  // jquery selector that identifies which textareas to use.
      };
      proteus.init(options);
    </script>
