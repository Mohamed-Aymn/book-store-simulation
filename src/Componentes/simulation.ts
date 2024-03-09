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
        avgTimeBetweenArrivals: 0
    };
    let totalTimeCustomerWaitInQueue = 0;
    let totalCustomersNumber = 0;
    let totalTimeBetweenArrivals = 0;

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

        // totalTimeCustomerWaitInQueue += record.waitingTimeInQueue;
        totalCustomersNumber++;
        totalTimeBetweenArrivals += record.timeBetweenArrivals;
    }

    /**
     **
     ** outside table data
     **
    */
    outsideTableData.avgTimeBetweenArrivals = totalTimeBetweenArrivals / totalCustomersNumber;

    return { table, outsideTableData }
}