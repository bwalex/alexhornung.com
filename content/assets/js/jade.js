/**
 * @license Modified version for jade, Copyright (c) 2013, Alex Hornung
 *
 * Based on:
 * cs 0.4.3 Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/require-cs for details
 */

/*jslint */
/*global define, window, XMLHttpRequest, importScripts, Packages, java,
  process, require */

define(['jade-full'], function (Jade) {
    'use strict';
    var fs, getXhr,
        fetchText = function () {
            throw new Error('Environment unsupported.');
        },
        buildMap = {};

    if (typeof process !== "undefined" &&
               process.versions &&
               !!process.versions.node) {
        //Using special require.nodeRequire, something added by r.js.
        fs = require.nodeRequire('fs');
        fetchText = function (path, callback) {
            callback(fs.readFileSync(path, 'utf8'));
        };
    } else if ((typeof window !== "undefined" && window.navigator && window.document) || typeof importScripts !== "undefined") {
        // Browser action
        getXhr = function () {
            var xhr, i, progId;
            if (typeof XMLHttpRequest !== "undefined") {
                return new XMLHttpRequest();
            } else {
                // Don't bother with any IE6 compatibility
                throw new Error("getXhr(): XMLHttpRequest not available");
            }
        };

        fetchText = function (url, callback) {
            var xhr = getXhr();
            xhr.open('GET', url, true);
            xhr.onreadystatechange = function (evt) {
                //Do not explicitly handle errors, those should be
                //visible via console output in the browser.
                if (xhr.readyState === 4) {
                    callback(xhr.responseText);
                }
            };
            xhr.send(null);
        };
        // end browser.js adapters
    } else if (typeof Packages !== 'undefined') {
        //Why Java, why is this so awkward?
        fetchText = function (path, callback) {
            var stringBuffer, line,
                encoding = "utf-8",
                file = new java.io.File(path),
                lineSeparator = java.lang.System.getProperty("line.separator"),
                input = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(file), encoding)),
                content = '';
            try {
                stringBuffer = new java.lang.StringBuffer();
                line = input.readLine();

                // Byte Order Mark (BOM) - The Unicode Standard, version 3.0, page 324
                // http://www.unicode.org/faq/utf_bom.html

                // Note that when we use utf-8, the BOM should appear as "EF BB BF", but it doesn't due to this bug in the JDK:
                // http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=4508058
                if (line && line.length() && line.charAt(0) === 0xfeff) {
                    // Eat the BOM, since we've already found the encoding on this file,
                    // and we plan to concatenating this buffer with others; the BOM should
                    // only appear at the top of a file.
                    line = line.substring(1);
                }

                stringBuffer.append(line);

                while ((line = input.readLine()) !== null) {
                    stringBuffer.append(lineSeparator);
                    stringBuffer.append(line);
                }
                //Make sure we return a JavaScript string and not a Java string.
                content = String(stringBuffer.toString()); //String
            } finally {
                input.close();
            }
            callback(content);
        };
    }

    return {
        fetchText: fetchText,

        get: function () {
            return Jade;
        },

        write: function (pluginName, name, write) {
            if (buildMap.hasOwnProperty(name)) {
                var text = buildMap[name];
                write.asModule(pluginName+"!"+name, text);
            }
        },

        version: '0.1',

        load: function (name, parentRequire, load, config) {
            var fullName = /\.jade$/.test(name) ? name : name + '.jade';
            var path = parentRequire.toUrl(fullName);
            var text = "";
            fetchText(path, function (text) {

                var compiled;
                try {
                    if (config.isBuild) {
                        compiled = Jade.compile(text, {
                          compileDebug: false,
                          client: true,
                          filename: fullName,
                        });
                        text = "define(['jade-runtime'], function(jade) { return "+compiled+"});\n";
                        buildMap[name] = text;
                        load.fromText(name, text);

                        parentRequire([name], function (value) {
                            load(value);
                        });
                    } else {
                        compiled = Jade.compile(text, {compileDebug: false, client: false});
                        load(compiled);
                    }
                } catch (err) {
                    err.message = "In " + path + ", " + err.message;
                    throw err;
                }

            });
        }
    };
});
