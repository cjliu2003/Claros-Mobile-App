// takes in a string such as 2022-09-06 and spits out September 6th, 2022
export const parseDate = (date) => {
    let year = date.substring(0, 4);
    let month = date.substring(5, 7);
    let day = parseInt(date.substring(8, 10));

    // handle day
    if (day === 1 || day === 21 || day === 31) {
        day = day + "st"
    } else if (day === 2 || day === 22) {
        day = day + "nd"
    } else if (day === 3 || day === 23) {
        day = day + "rd"
    } else {
        day = day + "th"
    }
    // handle month
    if (month === "01") {
        month = "January"
    } else if (month === "02") {
        month = "Febuary"
    } else if (month === "03") {
        month = "March"
    } else if (month === "04") {
        month = "April"
    } else if (month === "05") {
        month = "May"
    } else if (month === "06") {
        month = "June"
    } else if (month === "07") {
        month = "July"
    } else if (month === "08") {
        month = "August"
    } else if (month === "09") {
        month = "September"
    } else if (month === "10") {
        month = "October"
    } else if (month === "11") {
        month = "November"
    } else if (month === "12") {
        month = "December"
    }

    return (month + " " + day + ", " + year)
}