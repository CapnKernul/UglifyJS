var jsp = require("./parse-js"),
    pro = require("./process"),
    slice = jsp.slice,
    member = jsp.member,
    PRECEDENCE = jsp.PRECEDENCE,
    OPERATORS = jsp.OPERATORS;

function astSqueeze_more(ast) {
        var w = pro.ast_walker(), walk = w.walk;
        return w.with_walkers({
                "call": function(expr, args) {
                        if (expr[0] == "dot" && expr[2] == "toString" && args.length == 0) {
                                // foo.toString()  ==>  foo+""
                                return [ "binary", "+", expr[1], [ "string", "" ]];
                        }
                }
        }, function() {
                return walk(ast);
        });
};

exports.astSqueeze_more = astSqueeze_more;
