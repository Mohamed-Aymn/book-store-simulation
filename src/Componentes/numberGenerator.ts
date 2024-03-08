export const exactNumberGenerator = (n: number): number[] => {
    let numbers = [];
    for (let i = 1; i <= n; i++) {
        numbers.push(i);
    }
    return numbers;
}

export const randomNumberGenerator = (n: number): number[] => {
    const numbers = [];
    for (let i = 0; i < n; i++) {
        numbers.push(Math.floor(Math.random() * 100));
    }
    return numbers;
}