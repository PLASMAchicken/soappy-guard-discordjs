module.exports = () => {
    var date = new Date();
    var timestamp = '[' + (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + ':' + (date.getSeconds() < 10 ? '0' : '') + date.getSeconds() + ':' + (date.getMilliseconds() < 10 ? '0' : '') + (date.getMilliseconds() < 100 ? '0' : '') + date.getMilliseconds() + ']';
    return(timestamp);
}