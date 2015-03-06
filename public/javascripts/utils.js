function getUrlParam(name, url) {
    console.log(name);
    console.log(url);
    if (!url) {
        url = window.location.href;
    }
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
    if (!results) {
        return undefined;
    }
    return results[1] || undefined;
}

function reformatDateForInput(dateVal) {
    var yearVal = dateVal.getUTCFullYear().toString();
    var monthVal = (dateVal.getUTCMonth() + 1).toString();
    if (monthVal.length == 1) {
        monthVal = '0' + monthVal;
    }
    var dateVal = (dateVal.getUTCDate()).toString();
    if (dateVal.length == 1) {
        dateVal = '0' + dateVal;
    }
    return monthVal + '/' + dateVal + '/' + yearVal;
}