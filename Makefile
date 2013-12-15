all: compile

compile: nanoc_compile rjs_compile
	#

nanoc_compile:
	bundle exec nanoc compile

rjs_compile:
	node tools/r.js -o js/build.js


view: compile
	bundle exec nanoc view

clean:
	rm -rf output tmp
