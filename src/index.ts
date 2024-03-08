import timeBetweenArrivalsJson from './Data/timeBetweenArrivals.json';
import checkoutTimeJson from './Data/checkoutTime.json';
import { exactNumberGenerator } from './Componentes/numberGenerator';
import { commulitveProbabilityGenerator } from './Componentes/commulitveProbabilityGenerator';
import { simulation } from './Componentes/simulation';


// --------- exact
// genrate exact numbers
let numbers = exactNumberGenerator(50)
let { table, outsideTableData } = simulation(numbers, timeBetweenArrivalsJson, checkoutTimeJson)
console.log(table)
// simulation columns
// print formated output

// --------- random
// genrate random numbers
// simulation columns
// print formated output