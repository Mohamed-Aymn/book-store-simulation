import { commulitveProbabilityGenerator } from "./commulitveProbabilityGenerator";

export const simulation = (numbers: number[], timeBetweenArrivals: number[][], checkoutTime: number[][]): { table, data } => {

    // get the biggest number in terms of digits
    let numberOfDigitsOfLongestNumber = 0;
    numbers.forEach((number) => {
        let count = Math.floor(Math.log10(Math.abs(number))) + 1
        count > numberOfDigitsOfLongestNumber ? numberOfDigitsOfLongestNumber = count : null;
    })

    let timeBetweenArrivalsProbabilityList = commulitveProbabilityGenerator(timeBetweenArrivals)
    let checkoutTimeProbabilityList = commulitveProbabilityGenerator(checkoutTime)

    let table = [];
    let record;
    // ----------- for loop
    for (let i = 0; i < numbers.length; i++) {

        // --- required attributes in the object record

        // divide by the suitable number
        record.number = numbers[i] / (10 ** numberOfDigitsOfLongestNumber)

        // time between arrivals
        timeBetweenArrivalsProbabilityList.forEach((j) => {
            j[1] < record.number ? null : record.timeBetweenArrivals = j[0]
        })

        // arrival time
        i === 0 ? record.arrivalTime = 0 : record.timeBetweenArrivals + table[i - 1].arrivalTime

        // checkout time 
        checkoutTime.forEach((j) => {
            j[1] < record.number ? null : record.checkoutTime = j[0]
        })

        // customers in queue
        i === 0 ? record.customersInQueue = 0 : record.customersInQueue++;


        // time in system

        // queue length
        // server utilization
        // service time
        // --- to be used in conclusions

        table.push(record)
    }

    // data outside the table
    // 


    let data;
    // interarrival time
    // arrival time (privious arrival time + current interarrival time)
    // checkout time
    // time service begins ()

    return { table, data }
}