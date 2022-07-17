import moment, { Moment } from "moment"
import { INTERCHANGES, INTERCHANGES_KEYS } from "./interchanges"

export default function(number: string, entryInterchange: INTERCHANGES_KEYS, exitInterchange: INTERCHANGES_KEYS, date: string): number {

    const momentDate: Moment = moment(date)
    const distance: number = INTERCHANGES[exitInterchange] - INTERCHANGES[entryInterchange]
    const vehicleNumber: any = number.split("-")[1]
    console.log(number)

    let baseRate: number = 20

    let perKmRate: number = 0.2
    if (isWeekend(momentDate)) {
        perKmRate *= 1.5
    }
    
    let distanceTraveled: number = distance * perKmRate
    
    let grossTax: number = baseRate + distanceTraveled

    let discount: number = 0
    if (isEven(vehicleNumber) && isMondayOrWednesday(momentDate)) {
        discount = grossTax * 0.1
    } else if (!isEven(vehicleNumber) && isTuesdayOrThursday(momentDate)) {
        discount = grossTax * 0.1
    }
    if (isNationalHoliday(momentDate)) {
        discount = grossTax * 0.5
    }

    let tax: number = grossTax - discount

    return tax
} 

function isWeekend(date: Moment): Boolean {
    return date.format("ddd") == "Sun" || date.format("ddd") == "Sat"
}

function isNationalHoliday(date: Moment): Boolean {
    return ["23 Mar", "14 Aug", "25 Dec"].indexOf(date.format("DD MMM")) != -1
}

function isMondayOrWednesday(date: Moment): Boolean {
    return date.format("ddd") == "Mon" || date.format("ddd") == "Wed"
}

function isTuesdayOrThursday(date: Moment): Boolean {
    return date.format("ddd") == "Tue" || date.format("ddd") == "Thu"
}

function isEven(n: number): Boolean {
    return n%2 == 0
}