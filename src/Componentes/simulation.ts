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
    let outsideTableData = {
        avgTimeBetweenArrivals: 0,
        avgTimeInQueue: 0,
        avgCheckoutTime: 0,
        avgQueueLength: 0,
        PropabilityOfWaiting: "",
        PropabilityOfServerBeingIdle: ""
    };
    let totalTimeInQueue = 0;
    let totalCustomersNumber = 0;
    let totalTimeBetweenArrivals = 0;
    let totalCheckoutTime = 0;
    let totalQueueLength = 0;
    let totalWaitingCustomers = 0;
    let totalIdleTimes = 0;

    for (let i = 0; i < numbers.length; i++) {
        let record = {
            customerNumber: 0,
            timeBetweenArrivals: 0,
            checkoutTime: 0,
            timeWaitInQueue: 0,
            queueLength: 0,
            idleTime: 0,
            totalServiceTime: 0,
            startTime: 0,
            endTime: 0,
            arrivalTime: 0
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
        // checkout time (service duration at the counter itself)
        checkoutTimeProbabilityList.forEach((j) => {
            if (propability > j[2]) {
                record.checkoutTime = j[0]
                return;
            }
        })
        // end time (time cutomser end communicationg with the counter man)
        i === 0 ? record.endTime = record.checkoutTime : record.endTime = record.checkoutTime + record.timeWaitInQueue;
        // arrival time
        i === 0 ? record.arrivalTime = 0 : record.arrivalTime = table[i - 1].arrivalTime + record.timeBetweenArrivals;
        // time wait in queue, queue length, and idle time
        if (i === 0) {
            record.timeWaitInQueue = 0
            record.queueLength = 0;
        }
        else {
            let timeDifference = table[i - 1].endTime - record.arrivalTime
            if (timeDifference > 0) {
                record.timeWaitInQueue = timeDifference;
                record.queueLength++;
            } else if (timeDifference <= 0) {
                record.timeWaitInQueue = 0;
                record.queueLength = 0;
                record.idleTime = timeDifference * -1;
            }
        }
        // start time (time customer starts communicating with the counter man)
        i === 0 ? record.startTime = 0 : record.startTime = record.arrivalTime + record.timeWaitInQueue;
        // idle time
        // total service time (wait + checkout)
        record.totalServiceTime = record.timeWaitInQueue + record.checkoutTime;
        table.push(record)

        // data for data outside table
        totalTimeInQueue = record.timeWaitInQueue;
        totalCheckoutTime = record.checkoutTime;
        totalQueueLength = record.queueLength;
        totalCustomersNumber++;
        totalTimeBetweenArrivals += record.timeBetweenArrivals;
        record.timeWaitInQueue > 0 ? totalWaitingCustomers++ : null;
        record.idleTime > 0 ? totalIdleTimes++ : null;
    }

    /**
     **
     ** outside table data
     **
    */
    outsideTableData.avgTimeBetweenArrivals = totalTimeBetweenArrivals / totalCustomersNumber;
    outsideTableData.avgTimeInQueue = totalTimeInQueue / totalCustomersNumber;
    outsideTableData.avgCheckoutTime = totalCheckoutTime / totalCheckoutTime // same as avg system time
    outsideTableData.avgQueueLength = totalQueueLength / totalCustomersNumber
    outsideTableData.PropabilityOfWaiting = totalWaitingCustomers / totalCustomersNumber * 100 + "%";
    outsideTableData.PropabilityOfServerBeingIdle = totalIdleTimes / totalCustomersNumber * 100 + "%";

    return { table, outsideTableData }
}