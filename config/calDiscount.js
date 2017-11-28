module.exports = function (cb) {
    let dis = 0;

    // Applying Random discount
    let date = new Date();
    let day  = date.getDay();
    if( day === 0 || day === 3 || day === 6 || day === 2){
        dis = Math.floor((Math.random() * 10) + 1);
        // return discount
    }

    global.discount = dis;

};