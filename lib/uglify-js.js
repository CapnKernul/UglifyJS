//convienence function(src, [options]);
function uglify(orig_code, options){
  options || (options = {});
  var jsp = uglify.parser;
  var pro = uglify.uglify;

  var ast = jsp.parse(orig_code, options.strict_semicolons); // parse code and get the initial AST
  ast = pro.astMangle(ast, options.mangle_options); // get a new AST with mangled names
  ast = pro.astSqueeze(ast, options.squeeze_options); // get an AST with compression optimizations
  var final_code = pro.genCode(ast, options.gen_options); // compressed code here
  return final_code;
};

uglify.parser = require("./parse-js");
uglify.uglify = require("./process");

module.exports = uglify