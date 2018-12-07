const isValidDate = function(date) {
    if (Object.prototype.toString.call(date) === '[object Date]') {
        return isNaN(date.getTime()) ? false : true;
    } else {
        return false;
    }
}

export const formatMoney = function(number, places, symbol, thousand, decimal) {
    places = !isNaN(places = Math.abs(places)) ? places : 2;
    symbol = symbol !== undefined ? symbol : "";
    thousand = thousand || ",";
    decimal = decimal || ".";

    // number = +number; // 不转换也是没事的，比较时会转为number进行比较
    var negative = number < 0 ? "-" : "",
        i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;

    return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
}

export const formatDate = function(_time, partten="yyyy-MM-dd") {
    var time;

    if (typeof _time === 'number' || typeof _time === 'string') {
        time = new Date(_time);
    } else {
        time = _time;
    }

    var lengthNum = function (num) {
        return (+num).toString().length === 1 ? '0' + num : num;  
    };

    if (!isValidDate(time)) return '';

    var year = time.getFullYear(),
        month = time.getMonth()+1,
        day = time.getDate(),
        hour = time.getHours(),
        minute = time.getMinutes(),
        seconds = time.getSeconds();

    var res = partten.replace('yyyy', year)
        .replace('MM', lengthNum(month))
        .replace('dd', lengthNum(day))
        .replace('HH', lengthNum(hour))
        .replace('mm', lengthNum(minute))
        .replace('ss', lengthNum(seconds));

    return /NaN/i.test(res) ? '' : res;
}

export const formatPercent = function(number) {
    return number*100 + '%';
}