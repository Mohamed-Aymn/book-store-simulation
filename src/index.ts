import timeBetweenArrivalsJson from './Data/timeBetweenArrivals.json';
import checkoutTimeJson from './Data/checkoutTime.json';
import { exactNumberGenerator, randomNumberGenerator } from './Componentes/numberGenerator';
import { simulation } from './Componentes/simulation';
import { formattedObjectPrint, formattedTablePrint } from './utils/formatedPrint';


let simulationNumber = 50;
let generatedNumbers = randomNumberGenerator(simulationNumber)
// let generatedNumbers = exactNumberGenerator(simulationNumber)

let { table, outsideTableData } = simulation(generatedNumbers, timeBetweenArrivalsJson, checkoutTimeJson)

formattedTablePrint(table)
formattedObjectPrint(outsideTableData)