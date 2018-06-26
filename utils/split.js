let config = require("../config/botconfig.json");

module.exports = (args, i) => {
    var argsmsg = args.join(" ");
    argsmsg = argsmsg.split(" | ")
    console.log(argsmsg)
    var argsmsgs = [''];
    for (var i = 0; i < argsmsg.length; i++) {
    argsmsgs[i] = argsmsg[i].split("=");
    console.log(argsmsgs[i]);
    }
    return argsmsgs;
}
