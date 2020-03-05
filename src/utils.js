
// get current PST date object
export function getPSTDate() {
    var d = new Date();
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    return new Date(utc - 8 * 3600000);
}

// get time till PST midnight in epoch ms 
export function getPSTMidnightEpoch() {
    var now = getPSTDate();
    var ms = 0;
    ms += (23 - now.getHours()) * 3600000;
    ms += (59 - now.getMinutes()) * 60000;
    ms += (59 - now.getSeconds()) * 1000;
    ms += 1000 - now.getMilliseconds();
    return ms;
}

// get current PST date (e.g. 2-24-2020)
export function getDateString() {

    // get PST date
    var d = new Date();
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    var date = new Date(utc - 8 * 3600000);

    // return date string
    return (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear();
}

// get previous PST date (e.g. 2-23-2020)
export function getPreviousDateString() {

    // get PST date
    var d = new Date();
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    var date = new Date(utc - 32 * 3600000);

    // return date string
    return (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear();
}

// get current PST date and previous PST date
export function getAdjacentDateStrings() {

    // get PST date
    var d = new Date();
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    var date1 = new Date(utc - 8 * 3600000);
    var date2 = new Date(utc - 32 * 3600000);

    // return both date strings
    return [
        (date1.getMonth() + 1) + '-' + date1.getDate() + '-' + date1.getFullYear(),
        (date2.getMonth() + 1) + '-' + date2.getDate() + '-' + date2.getFullYear()
    ];
}

// get current date written out
export function getFormattedDateString() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    const dateComps = getDateString().split('-');
    return monthNames[dateComps[0] - 1] + ' ' + dateComps[1] + ', ' + dateComps[2];
};

// get date written out from hyphenated date
export function getFormattedDateStringFromDate(date) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    const dateComps = date.split('-');
    return monthNames[dateComps[0] - 1] + ' ' + dateComps[1] + ', ' + dateComps[2];
}

// format views count for large numbers
export function formatLargeNumber(views) {
    if (views === null || isNaN(views)) return '--';
    return views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// format US currency string
export function currencyFormat(value) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });
    return formatter.format(value);
}