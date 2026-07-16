const fs = require('fs');
const path = require('path');

const companies = ['tcs', 'infosys', 'wipro', 'cognizant'];
const outDir = 'e:/patternwebsite/src/data/mcq/companies';

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

// Pool of questions
const questionsPool = [
    // Aptitude
    { q: "If A is faster than B, and B is faster than C. Who is the slowest?", options: ["A", "B", "C", "None"], a: "C", topic: "Aptitude", diff: "Easy" },
    { q: "What is the next number in the series: 2, 4, 8, 16, ...?", options: ["24", "32", "64", "128"], a: "32", topic: "Aptitude", diff: "Easy" },
    { q: "Train A running at 60km/hr crosses a pole in 9s. What is the length of train?", options: ["120m", "150m", "180m", "210m"], a: "150m", topic: "Aptitude", diff: "Medium" },
    { q: "A can do a work in 15 days, B in 20 days. Together they work for 4 days. Fraction of work left?", options: ["7/15", "8/15", "1/2", "1/3"], a: "8/15", topic: "Aptitude", diff: "Medium" },
    { q: "The probability of getting a sum 9 from two throws of a dice is?", options: ["1/6", "1/8", "1/9", "1/12"], a: "1/9", topic: "Aptitude", diff: "Hard" },
    // Technical
    { q: "Which data structure uses LIFO?", options: ["Queue", "Stack", "Tree", "Graph"], a: "Stack", topic: "Technical", diff: "Easy" },
    { q: "What is the time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"], a: "O(log n)", topic: "Technical", diff: "Easy" },
    { q: "Which of the following is not a NoSQL database?", options: ["MongoDB", "Cassandra", "MySQL", "Redis"], a: "MySQL", topic: "Technical", diff: "Medium" },
    { q: "What is a virtual memory?", options: ["RAM", "Secondary storage used as RAM", "Cache", "ROM"], a: "Secondary storage used as RAM", topic: "Technical", diff: "Medium" },
    { q: "In OOP, what is polymorphism?", options: ["Many forms", "Data hiding", "Inheritance", "Modularity"], a: "Many forms", topic: "Technical", diff: "Easy" },
    // Prompt Engineering / GenAI
    { q: "What is 'Few-Shot Prompting'?", options: ["No examples", "One example", "Multiple examples", "Negative examples"], a: "Multiple examples", topic: "Prompt Engineering", diff: "Medium" },
    { q: "Which model architecture is behind ChatGPT?", options: ["CNN", "RNN", "Transformer", "GAN"], a: "Transformer", topic: "Prompt Engineering", diff: "Easy" },
    { q: "What does 'Temperature' control in LLMs?", options: ["Speed", "Creativity/Randomness", "Length", "Grammar"], a: "Creativity/Randomness", topic: "Prompt Engineering", diff: "Easy" },
    { q: "What is 'Hallucination' in the context of LLMs?", options: ["Seeing images", "Generating false information", "Overheating", "Fast generation"], a: "Generating false information", topic: "Prompt Engineering", diff: "Medium" },
    { q: "Which technique is used to prevent LLMs from generating harmful content?", options: ["RLHF", "CNN", "Dropout", "Batch Normalization"], a: "RLHF", topic: "Prompt Engineering", diff: "Hard" },
    { q: "What is 'Chain of Thought' prompting?", options: ["Step by step reasoning", "Random words", "Only code", "No prompts"], a: "Step by step reasoning", topic: "Prompt Engineering", diff: "Medium" }
];

// Generate 50 items by repeating and slightly modifying the pool
function generateData(company) {
    const data = [];
    for (let i = 0; i < 50; i++) {
        const base = questionsPool[i % questionsPool.length];
        data.push({
            id: `${company}-q-${i + 1}`,
            question: base.q,
            options: base.options,
            correctAnswer: base.a,
            explanation: `Explanation for ${base.q}`,
            difficulty: base.diff,
            topic: base.topic
        });
    }
    return data;
}

companies.forEach(company => {
    const filePath = path.join(outDir, `${company}.json`);
    const data = generateData(company);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Generated ${filePath}`);
});
