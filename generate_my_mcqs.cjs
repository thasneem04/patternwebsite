const fs = require('fs');
const path = require('path');

const companies = ['kpmg', 'pwc', 'zoho', 'hexaware'];

const templates = [
    // Aptitude
    {
        q: "If {a} apples cost ${b}, how much do {c} apples cost?",
        opts: (a, b, c) => [
            `$${((b/a)*c).toFixed(2)}`,
            `$${((b/a)*c + 1).toFixed(2)}`,
            `$${((b/a)*c - 1).toFixed(2)}`,
            `$${((b/a)*c + 2).toFixed(2)}`
        ],
        ans: (a, b, c) => `$${((b/a)*c).toFixed(2)}`,
        exp: "Calculate the unit price and multiply.",
        diff: "Easy",
        top: "Aptitude"
    },
    {
        q: "A train running at {s} km/hr crosses a pole in {t} seconds. What is the length of the train in metres?",
        opts: (s, t) => [
            `${(s * 5 / 18 * t).toFixed(0)}`,
            `${(s * 5 / 18 * t + 10).toFixed(0)}`,
            `${(s * 5 / 18 * t - 10).toFixed(0)}`,
            `${(s * 5 / 18 * t + 20).toFixed(0)}`
        ],
        ans: (s, t) => `${(s * 5 / 18 * t).toFixed(0)}`,
        exp: "Convert speed to m/s and multiply by time.",
        diff: "Medium",
        top: "Aptitude"
    },
    // Technical
    {
        q: "What is the time complexity of {algo}?",
        opts: (algo) => {
            if (algo === "binary search") return ["O(n)", "O(log n)", "O(n log n)", "O(1)"];
            if (algo === "bubble sort") return ["O(n)", "O(log n)", "O(n^2)", "O(1)"];
            if (algo === "merge sort") return ["O(n)", "O(log n)", "O(n log n)", "O(n^2)"];
            return ["O(n)", "O(log n)", "O(n log n)", "O(n^2)"];
        },
        ans: (algo) => {
            if (algo === "binary search") return "O(log n)";
            if (algo === "bubble sort") return "O(n^2)";
            if (algo === "merge sort") return "O(n log n)";
            return "O(n)";
        },
        exp: "Standard algorithm time complexity.",
        diff: "Medium",
        top: "Technical"
    },
    // Prompt Engineering
    {
        q: "Which technique is best for {task} in Prompt Engineering?",
        opts: (task) => {
            if (task === "complex reasoning") return ["Zero-shot", "Chain-of-Thought", "Random sampling", "Temperature 0"];
            if (task === "format instruction") return ["Few-shot", "Chain-of-Thought", "Negative prompting", "Temperature 1"];
            return ["Few-shot", "Chain-of-Thought", "Zero-shot", "Meta-prompting"];
        },
        ans: (task) => {
            if (task === "complex reasoning") return "Chain-of-Thought";
            if (task === "format instruction") return "Few-shot";
            return "Few-shot";
        },
        exp: "Matching the task to the most suitable prompting technique.",
        diff: "Medium",
        top: "Prompt Engineering"
    }
];

const algos = ["binary search", "bubble sort", "merge sort"];
const tasks = ["complex reasoning", "format instruction"];

function generateData(company) {
    let data = [];
    for (let i = 1; i <= 50; i++) {
        let type = i % 3; // 0 = Aptitude, 1 = Tech, 2 = Prompt
        let qObj = {};
        
        if (type === 0) {
            let s = 36 + (i % 5) * 18;
            let t = 5 + (i % 4);
            let a = 2 + (i % 3);
            let b = 10 + (i % 5);
            let c = 5 + (i % 4);
            
            if (i % 2 === 0) {
                let opts = templates[1].opts(s, t).sort(() => 0.5 - Math.random());
                qObj = {
                    id: `${company}-q${i}`,
                    question: templates[1].q.replace("{s}", s).replace("{t}", t),
                    options: opts,
                    correctAnswer: templates[1].ans(s, t),
                    explanation: templates[1].exp,
                    difficulty: templates[1].diff,
                    topic: templates[1].top
                };
            } else {
                let opts = templates[0].opts(a, b, c).sort(() => 0.5 - Math.random());
                qObj = {
                    id: `${company}-q${i}`,
                    question: templates[0].q.replace("{a}", a).replace("{b}", b).replace("{c}", c),
                    options: opts,
                    correctAnswer: templates[0].ans(a, b, c),
                    explanation: templates[0].exp,
                    difficulty: templates[0].diff,
                    topic: templates[0].top
                };
            }
        } else if (type === 1) {
            let algo = algos[i % algos.length];
            let opts = templates[2].opts(algo).sort(() => 0.5 - Math.random());
            qObj = {
                id: `${company}-q${i}`,
                question: templates[2].q.replace("{algo}", algo),
                options: opts,
                correctAnswer: templates[2].ans(algo),
                explanation: templates[2].exp,
                difficulty: templates[2].diff,
                topic: templates[2].top
            };
        } else {
            let task = tasks[i % tasks.length];
            let opts = templates[3].opts(task).sort(() => 0.5 - Math.random());
            qObj = {
                id: `${company}-q${i}`,
                question: templates[3].q.replace("{task}", task),
                options: opts,
                correctAnswer: templates[3].ans(task),
                explanation: templates[3].exp,
                difficulty: templates[3].diff,
                topic: templates[3].top
            };
        }
        data.push(qObj);
    }
    return data;
}

const outDir = 'e:/patternwebsite/src/data/mcq/companies';
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

companies.forEach(comp => {
    const data = generateData(comp);
    fs.writeFileSync(path.join(outDir, `${comp}.json`), JSON.stringify(data, null, 2));
    console.log(`Generated ${comp}.json`);
});
