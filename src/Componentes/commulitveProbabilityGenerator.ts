export const commulitveProbabilityGenerator = (data: number[][]): number[][] => {

    let commulitivePropability = 0;
    data.forEach((record) => {
        record.push(record[1] + commulitivePropability)
        commulitivePropability = record[2]
    })

    return data
}