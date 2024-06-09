const numbers = [ 
    4, 2, 5, 7, 1, 11, 15, 14, 19, 16, 17, 20, 3, 9, 8, 12, 6, 13, 10, 18
];

const sortArray = (array) => {
    return array.sort((a, b) => a - b);
}

const sortedNumbers = sortArray(numbers);

console.log(sortedNumbers);