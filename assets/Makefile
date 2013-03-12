build: clean all

all: bootstrap-wysihtml5 showdown tiny_mce to-markdown

clean:
	rm -rf bootstrap-wysihtml5
	rm -rf showdown
	rm -rf tiny_mce
	rm -rf to-markdown
	rm -rf wysihtml5

# assets: (alphabetical order)

bootstrap-wysihtml5: wysihtml5
	mkdir -p bootstrap-wysihtml5
	cd bootstrap-wysihtml5 && wget https://raw.github.com/texastribune/bootstrap-wysihtml5/master/dist/bootstrap-wysihtml5-0.0.2.css
	cd bootstrap-wysihtml5 && wget https://raw.github.com/texastribune/bootstrap-wysihtml5/master/dist/bootstrap-wysihtml5-0.0.2.js
	cd bootstrap-wysihtml5 && wget https://raw.github.com/texastribune/bootstrap-wysihtml5/master/dist/bootstrap-wysihtml5-0.0.2.min.js

showdown:
	mkdir -p showdown
	cd showdown && wget https://raw.github.com/coreyti/showdown/master/compressed/showdown.js

tiny_mce:
	cd ../vendor/tinymce && ant
	cp -r ../vendor/tinymce/jscripts/tiny_mce .

to-markdown:
	mkdir -p to-markdown
	cd to-markdown && wget https://raw.github.com/domchristie/to-markdown/master/src/to-markdown.js

wysihtml5:
	mkdir -p wysihtml5
	cd wysihtml5 && wget https://raw.github.com/texastribune/wysihtml5/dev/dist/wysihtml5-0.4.0pre.js
	cd wysihtml5 && wget https://raw.github.com/texastribune/wysihtml5/dev/dist/wysihtml5-0.4.0pre.min.js


.PHONY: build clean
