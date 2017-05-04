module.exports = IParrot;

var fs = require("fs");
var path = require("path");
var jsext = require("jsext");

function IParrot (options) {
    var self = this;
    self.options = Object.assign(IParrot.DEFAULTOPTIONS, options) || {};
    self.cache = {};
}

IParrot.DEFAULTOPTIONS = {
    languages : ["EN","PT","FR","ES"],
    path : "./resources",
    filename : "messages.json"
};

IParrot.prototype.resetcache = function() {
    self.cache = {};
}

IParrot.prototype.text = function(t, lang) {
    var self = this;
    if(!t) return t;

    lang = lang || self.options.languages && self.options.languages.length && self.options.languages[0];
    if(typeof(t) == "object")
        return t[lang] || t[t.first()];

    var dic = self.dictionary(lang);
    return dic && dic[t] || t;
}

IParrot.prototype.dictionary = function(lang) {
    var self = this;
    if(!lang) return;

    if(self.cache[lang]) return self.cache[lang];

    var ifile = path.normalize(path.join(self.options.path, lang.toLowerCase(), self.options.filename));
    if(!jsext.fileExists(ifile)) {
        console.log("IPARROT : can not found the file", ifile);
        return;
    }

    var dic = jsext.loadJsonFile(ifile) || {};
    self.cache[lang] = dic;
    return self.cache[lang];
}