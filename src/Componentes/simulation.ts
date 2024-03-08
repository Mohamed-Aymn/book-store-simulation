import { commulitveProbabilityGenerator } from "./commulitveProbabilityGenerator";

export const simulation = (numbers: number[], timeBetweenArrivals: number[][], checkoutTime: number[][]): { table, outsideTableData } => {

    // get the biggest number in terms of digits
    let numberOfDigitsOfLongestNumber = 0;
    numbers.forEach((number) => {
        let count = Math.floor(Math.log10(Math.abs(number))) + 1
        count > numberOfDigitsOfLongestNumber ? numberOfDigitsOfLongestNumber = count : null;
    })

    let timeBetweenArrivalsProbabilityList = commulitveProbabilityGenerator(timeBetweenArrivals)
    let checkoutTimeProbabilityList = commulitveProbabilityGenerator(checkoutTime)

    let table = [];
    let outsideTableData;
    let totalTimeCustomerWaitInQueue = 0;
    let totalCustomersNumber = 0;

    for (let i = 0; i < numbers.length; i++) {
        let record = {
            customerNumber: 0,
            timeBetweenArrivals: 0,
            arrivalTime: 0,
            waitingTimeInQueue: 0,
            checkoutTime: 0
        };

        let propability = numbers[i] / (10 ** numberOfDigitsOfLongestNumber)
        record.customerNumber = i + 1;

        /**
         **
         ** required attributes in the object record
         **
        */
        // time between arrivals
        timeBetweenArrivalsProbabilityList.forEach((j) => {
            if (propability > j[2]) {
                record.timeBetweenArrivals = j[0]
                return;
            }
        })

        // arrival time
        i === 0 ? record.arrivalTime = 0 : record.timeBetweenArrivals + table[i - 1].arrivalTime

        // checkout time 
        checkoutTimeProbabilityList.forEach((j) => {
            if (propability > j[2]) {
                record.checkoutTime = j[0]
                return;
            }
        })

        // waiting time in queue
        // i === 0 ? record.waitingTimeInQueue = 0 : record.waitingTimeInQueue = table[i - 1].checkoutTime - record.arrivalTime;

        // customers in queue
        // time in system
        // queue length
        // server utilization
        // service time

        table.push(record)

        totalTimeCustomerWaitInQueue += record.waitingTimeInQueue;
        totalCustomersNumber++;
    }

    /**
     **
     ** outside table data
     **
    */

    return { table, outsideTableData }
}