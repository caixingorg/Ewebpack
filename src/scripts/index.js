// require.ensure(["./lib/jquery"], function(require) {
    var $ = require("./lib/jquery");
    console.log($(".header"))
    var a = [1,3,4,5,7,8]
    _.each(a,function(value){
    	console.log(value)
    })
// });


