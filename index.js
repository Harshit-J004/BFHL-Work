const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const USER_DETAILS = {
    full_name: "harshit_joshi",
    birth_date: "10042004",
    email: "heerj4477@gmail.com",
    roll_number: "22BCE3398"
};

function isNumber(str) {
    return !isNaN(str) && !isNaN(parseFloat(str));
}

function isAlphabet(char) {
    return /^[a-zA-Z]$/.test(char);
}

function isSpecialCharacter(char) {
    return /^[^a-zA-Z0-9]$/.test(char);
}

function createAlternatingCaps(alphabets) {
    let allChars = [];
    
    alphabets.forEach(item => {
        for (let char of item) {
            if (isAlphabet(char)) {
                allChars.push(char.toLowerCase());
            }
        }
    });
    
    allChars.reverse();
    
    return allChars.map((char, index) => {
        return index % 2 === 0 ? char.toLowerCase() : char.toUpperCase();
    }).join('');
}

app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        
        // Validate input
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                message: "Invalid input. 'data' must be an array."
            });
        }
        
        // Initialize arrays
        const oddNumbers = [];
        const evenNumbers = [];
        const alphabets = [];
        const specialCharacters = [];
        let sum = 0;
        
        data.forEach(item => {
            const itemStr = String(item);
            
            if (isNumber(itemStr)) {
                const num = parseInt(itemStr);
                sum += num;
                
                if (num % 2 === 0) {
                    evenNumbers.push(itemStr);
                } else {
                    oddNumbers.push(itemStr);
                }
            }
            else if (itemStr.split('').every(char => isAlphabet(char))) {
                alphabets.push(itemStr.toUpperCase());
            }
            else {
                for (let char of itemStr) {
                    if (isSpecialCharacter(char)) {
                        specialCharacters.push(char);
                    }
                }
            }
        });
        
        const response = {
            is_success: true,
            user_id: `${USER_DETAILS.full_name}_${USER_DETAILS.birth_date}`,
            email: USER_DETAILS.email,
            roll_number: USER_DETAILS.roll_number,
            odd_numbers: oddNumbers,
            even_numbers: evenNumbers,
            alphabets: alphabets,
            special_characters: specialCharacters,
            sum: sum.toString(),
            concat_string: createAlternatingCaps(alphabets)
        };
        
        res.status(200).json(response);
        
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({
            is_success: false,
            message: "Internal server error"
        });
    }
});

app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

app.get('/', (req, res) => {
    res.json({
        message: "BFHL API is running",
        endpoints: {
            POST: "/bfhl - Main processing endpoint",
            GET: "/bfhl - Operation code endpoint"
        }
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;