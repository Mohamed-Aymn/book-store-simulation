import timeBetweenArrivalsJson from './Data/timeBetweenArrivals.json';
import checkoutTimeJson from './Data/checkoutTime.json';
import { exactNumberGenerator } from './Componentes/numberGenerator';
import { commulitveProbabilityGenerator } from './Componentes/commulitveProbabilityGenerator';


// --------- exact
// genrate exact numbers
// let numbersColumn = exactNumberGenerator(50)
let data = commulitveProbabilityGenerator(timeBetweenArrivalsJson)
console.log(data)
// simulation columns
// print formated output

// --------- random
// genrate random numbers
// simulation columns
// print formated output