build: clean bootstrap-wysihtml5

clean:
	rm -rf bootstrap-wysihtml5
	rm -rf tinymce
	rm -rf wysihtml5

wysihtml5:
	mkdir -p wysihtml5
	cd wysihtml5 && wget https://raw.github.com/texastribune/wysihtml5/dev/dist/wysihtml5-0.4.0pre.js
	cd wysihtml5 && wget https://raw.github.com/texastribune/wysihtml5/dev/dist/wysihtml5-0.4.0pre.min.js

bootstrap-wysihtml5: wysihtml5
	mkdir -p bootstrap-wysihtml5
	cd bootstrap-wysihtml5 && wget https://raw.github.com/texastribune/bootstrap-wysihtml5/master/dist/bootstrap-wysihtml5-0.0.2.css
	cd bootstrap-wysihtml5 && wget https://raw.github.com/texastribune/bootstrap-wysihtml5/master/dist/bootstrap-wysihtml5-0.0.2.js
	cd bootstrap-wysihtml5 && wget https://raw.github.com/texastribune/bootstrap-wysihtml5/master/dist/bootstrap-wysihtml5-0.0.2.min.js

tiny_mce:
	mkdir -p tinymce
	cd ../vendor/tinymce && ant
	cp -r ../vendor/tinymce/jscripts/tiny_mce .


.PHONY: build clean
