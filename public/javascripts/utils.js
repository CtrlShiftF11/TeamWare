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

function reformatDateForJira(dateVal) {
    //This function is NOT intended to operate on true JavaScript Date Objects!
    //This accepts a string value representing a date from a date picker widget and
    //transforms the format of MM/DD/YYYY into YYYY/MM/DD

    //console.log('type is ' + jQuery.type(dateVal));
    var dateParts = [];
    dateParts = dateVal.split('/');
    return dateParts[2] + '/' + dateParts[0] + '/' + dateParts[1];
}