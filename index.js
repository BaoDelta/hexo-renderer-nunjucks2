var path = require("path");
var _ = require("lodash");
var nunjucks = require("nunjucks");

var nunjucksOptions = _.assign({
  autoescape: false
}, hexo.config.nunjucks);

var nunjucksEnv;

function renderer(data, locals) {
  if (!nunjucksEnv) {
    var templateDir = path.dirname(data.path);
    while (path.basename(templateDir) !== "layout") {
      templateDir = path.dirname(templateDir);
    }
    nunjucksEnv = nunjucks.configure(templateDir, nunjucksOptions);
  }
  return nunjucksEnv.renderString(data.text, locals);
}

_.forEach(["nunjucks", "tpl"], function(ext) {
  hexo.extend.renderer.register(ext, "html", renderer, true);
});
