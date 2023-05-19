import {Receipt} from "../models/Receipt";
import logger from "../config/logger";

/*
Rules

These rules collectively define how many points should be awarded to a receipt.

    One point for every alphanumeric character in the retailer name.
    50 points if the total is a round dollar amount with no cents.
    25 points if the total is a multiple of 0.25.
    5 points for every two items on the receipt.
    If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer. The result is the number of points earned.
    6 points if the day in the purchase date is odd.
    10 points if the time of purchase is after 2:00pm and before 4:00pm.

*/

// there's not a particular need for this to be a class, but it's a good way to organize the code
export class PointsRules {
    retailNamePoints(receipt: Receipt): number {
        const testString = receipt.retailer.replace(/\W/g, '')
        logger.info(`Retailer name is ${testString}, retailNamePoints ${testString.length}`)
        // regex to filter out non-alphanumeric characters
        return testString.length
    }

    roundDollarAmountPoints(receipt: Receipt): number {
        logger.info(`Total is ${receipt.total}, roundDollarAmountPoints ${receipt.total.endsWith(".00")}`)
        return receipt.total.endsWith(".00") ? 50 : 0
    }

    quarterDollarAmountPoints(receipt: Receipt): number {
        logger.info(`Total is ${receipt.total}, quarterDollarAmountPoints ${Number(receipt.total) % .25 === 0}`)
        return Number(receipt.total) % .25 === 0 ? 25 : 0
    }

    twoItemsPoints(receipt: Receipt): number {
        logger.info(`There are ${receipt.items.length} items, twoItemsPoints ${Math.floor(receipt.items.length / 2) * 5}`)
        return Math.floor(receipt.items.length / 2) * 5
    }

    itemDescriptionPoints(receipt: Receipt): number {
        let points = 0
        receipt.items.forEach(item => {
            if (item.shortDescription.trim().length % 3 === 0) {
                logger.info(`Item ${item.shortDescription} is worth ${Math.ceil(Number(item.price) * 0.2)} points`)
                points += Math.ceil(Number(item.price) * 0.2)
            }
        })
        return points
    }

    oddDayPoints(receipt: Receipt): number {
        const date = new Date(receipt.purchaseDate)
        logger.info(`Purchase date is ${date}, oddDayPoints ${date.getUTCDate() % 2 === 1}`)
        // need to use utc date, otherwise we get the local date, which could be different from the date on the receipt
        return date.getUTCDate() % 2 === 1 ? 6 : 0
    }

    afternoonPoints(receipt: Receipt): number {
        // is it overkill to actually parse these as dates? probably, but it could future-proof us and doubles as error detection.
        const purchaseDate = new Date(receipt.purchaseDate);
        const time = new Date(purchaseDate.toDateString() + ' ' + receipt.purchaseTime);
        logger.info(`Purchase time is ${time}, afternoonPoints ${time.getHours() >= 14 && time.getHours() < 16}`)
        return time.getHours() >= 14 && time.getHours() < 16 ? 10 : 0
    }
}

export const pointsRules = new PointsRules()

export const activePointsRules: Array<(receipt: Receipt) => number>  = [
    pointsRules.retailNamePoints,
    pointsRules.roundDollarAmountPoints,
    pointsRules.quarterDollarAmountPoints,
    pointsRules.twoItemsPoints,
    pointsRules.itemDescriptionPoints,
    pointsRules.oddDayPoints,
    pointsRules.afternoonPoints
]