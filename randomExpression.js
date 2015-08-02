module.exports = {
    get:  function(){
        var ex1 = Math.floor((Math.random() * 9) + 1);
        var ex2 = Math.floor((Math.random() * 9) + 1);
        return ex1 + "+" + ex2 + "=";
    }
}
