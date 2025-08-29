const testCases = [
    {
        name: "Example A",
        input: { data: ["a","1","334","4","R", "$"] },
        expected: {
            odd_numbers: ["1"],
            even_numbers: ["334","4"],
            alphabets: ["A","R"],
            special_characters: ["$"],
            sum: "339"
        }
    },
    {
        name: "Example B", 
        input: { data: ["2","a", "y", "4", "&", "-", "*", "5","92","b"] },
        expected: {
            odd_numbers: ["5"],
            even_numbers: ["2","4","92"],
            alphabets: ["A", "Y", "B"],
            special_characters: ["&", "-", "*"],
            sum: "103"
        }
    },
    {
        name: "Example C",
        input: { data: ["A","ABcD","DOE"] },
        expected: {
            odd_numbers: [],
            even_numbers: [],
            alphabets: ["A","ABCD","DOE"],
            special_characters: [],
            sum: "0"
        }
    }
];

function testLogic() {
    console.log("Testing BFHL API Logic...\n");
    
    testCases.forEach((testCase, index) => {
        console.log(`Test ${index + 1}: ${testCase.name}`);
        console.log("Input:", JSON.stringify(testCase.input, null, 2));
        console.log("Expected Output:", JSON.stringify(testCase.expected, null, 2));
        console.log("---\n");
    });
}

if (require.main === module) {
    testLogic();
}

module.exports = { testCases, testLogic };