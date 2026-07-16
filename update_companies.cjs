const fs = require('fs');
const path = require('path');

const companiesDir = path.join(__dirname, 'src', 'data', 'companies');

// Helper to update a company JSON file
function updateCompanyFile(folderName) {
  const filePath = path.join(companiesDir, folderName, 'company.json');
  if (!fs.existsSync(filePath)) return;

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // 1. Add Prompt Engineering to tech stack if not there
  if (!data.techStack.includes('Prompt Engineering')) {
    data.techStack.push('Prompt Engineering');
  }
  if (!data.techStack.includes('GenAI')) {
    data.techStack.push('GenAI');
  }

  // 2. Add to key topics
  if (!data.recruitmentPattern.keyTopics.includes('Prompt Engineering')) {
    data.recruitmentPattern.keyTopics.push('Prompt Engineering (Zero-shot, Few-shot)');
    data.recruitmentPattern.keyTopics.push('Retrieval-Augmented Generation (RAG)');
  }

  // 3. Update or add the GenAI round
  const hasGenAIRound = data.recruitmentPattern.rounds.some(r => r.name.includes('GenAI') || r.name.includes('Prompt'));
  
  if (!hasGenAIRound) {
    // Insert after Technical round (usually round 2 or 3)
    const newRound = {
      roundNumber: data.recruitmentPattern.rounds.length + 1,
      name: "GenAI & Prompt Engineering Assessment",
      type: "Technical",
      duration: "45 mins",
      description: "Evaluation of GenAI fundamentals, prompt optimization, RAG pipelines, and enterprise security (prompt injection).",
      topics: [
        "Prompt Chaining",
        "RAG vs Fine-tuning",
        "Token Optimization",
        "LLM Guardrails"
      ]
    };
    // Adjust round numbers
    data.recruitmentPattern.rounds.push(newRound);
    data.recruitmentPattern.rounds.forEach((r, i) => r.roundNumber = i + 1);
  }

  // 4. Update Technical Interview tips
  if (data.interview && data.interview.technical) {
    if (!data.interview.technical.topics.includes('Prompt Engineering')) {
      data.interview.technical.topics.push('Prompt Engineering & LLMs');
    }
    
    const tip = "Be prepared to design a RAG pipeline or explain how to prevent prompt injection vulnerabilities.";
    if (!data.interview.technical.tips.includes(tip)) {
      data.interview.technical.tips.push(tip);
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Updated ${folderName}`);
}

const companies = fs.readdirSync(companiesDir).filter(f => fs.statSync(path.join(companiesDir, f)).isDirectory());

companies.forEach(company => {
  try {
    updateCompanyFile(company);
  } catch(e) {
    console.error(`Failed updating ${company}: ${e.message}`);
  }
});
