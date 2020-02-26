
// get current date (e.g. 2-24-2020)
export function getDateString() {

    // get PST date
    var d = new Date();
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    var date = new Date(utc - 8 * 3600000);

    // return date string
    return (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear();
}

// get current date and previous date
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

// format views count for large numbers
export function formatViewsCount(views) {
    return views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}