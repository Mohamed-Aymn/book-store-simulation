import timeBetweenArrivalsJson from './Data/timeBetweenArrivals.json';
import checkoutTimeJson from './Data/checkoutTime.json';
import { exactNumberGenerator, randomNumberGenerator } from './Componentes/numberGenerator';
import { simulation } from './Componentes/simulation';
import { formattedObjectPrint, formattedTablePrint } from './utils/formatedPrint';
import * as readline from 'readline';

(async () => {
    let generatedNumbers;
    let simulationNumber = 50;

    // ask for number generation type
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    const answer = await new Promise<string>(resolve => {
        rl.question('type "e" for exact number generation and any key for random ones:  ', (answer) => {
            resolve(answer.toLowerCase());
        });
    });
    switch (answer) {
        case 'e':
            generatedNumbers = exactNumberGenerator(simulationNumber);
            break;
        default:
            generatedNumbers = randomNumberGenerator(simulationNumber);
    }
    rl.close();

    // simulation implementation
    let { table, outsideTableData } = simulation(generatedNumbers, timeBetweenArrivalsJson, checkoutTimeJson);

    // output
    formattedTablePrint(table);
    formattedObjectPrint(outsideTableData);
})();