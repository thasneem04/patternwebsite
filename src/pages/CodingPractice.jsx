import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiClock, FiCheckCircle, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const CodingPractice = () => {
  const [questions, setQuestions] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    // Load coding questions from the JSON file
    const loadData = async () => {
      try {
        const data = (await import('../data/mcq/coding.json')).default;
        // Filter out only the ones that have a 'problem' object
        const codingQs = data.filter(q => q.problem);
        setQuestions(codingQs);
      } catch (err) {
        console.error("Failed to load coding questions", err);
      }
    };
    loadData();
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>Coding Challenges</h1>
          <p>Practice frequently asked programming questions in IT service and product companies.</p>
        </div>
      </div>

      <div className="section">
        <div className="container-sm">
          <div className="flex justify-between items-center mb-xl">
            <h2 className="text-2xl font-bold">Problem Set</h2>
            <div className="badge badge-gray">{questions.length} Problems</div>
          </div>

          <div className="flex flex-col gap-md">
            {questions.map((q, index) => (
              <motion.div 
                key={q.id}
                className="card"
                style={{ padding: '0', overflow: 'hidden' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                {/* Header / Summary */}
                <div 
                  className="flex justify-between items-center p-lg cursor-pointer hover:bg-secondary transition-colors"
                  onClick={() => toggleExpand(q.id)}
                  style={{ background: expandedId === q.id ? 'var(--bg-secondary)' : 'transparent' }}
                >
                  <div className="flex items-center gap-md">
                    <div style={{ 
                      width: '40px', height: '40px', borderRadius: '10px', 
                      background: 'rgba(37,99,235,0.1)', color: 'var(--primary)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <FiCode size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{q.problem.title}</h3>
                      <div className="flex gap-sm mt-xs">
                        <span className={`badge badge-${q.difficulty.toLowerCase()}`}>{q.difficulty}</span>
                        <span className="badge badge-gray">{q.topic}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    {expandedId === q.id ? <FiChevronUp size={24} className="text-muted" /> : <FiChevronDown size={24} className="text-muted" />}
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedId === q.id && (
                  <div className="p-lg" style={{ borderTop: '1px solid var(--border)' }}>
                    <div className="mb-lg">
                      <h4 className="font-bold mb-xs text-sm uppercase tracking-wide text-secondary">Problem Statement</h4>
                      <p className="leading-relaxed">{q.problem.description}</p>
                    </div>

                    <div className="mb-lg">
                      <h4 className="font-bold mb-xs text-sm uppercase tracking-wide text-secondary">Examples</h4>
                      <div className="flex flex-col gap-sm">
                        {q.problem.examples.map((ex, i) => (
                          <div key={i} className="p-md rounded-md bg-dark text-white font-mono text-sm">
                            <div><span className="text-muted">Input:</span> {ex.input}</div>
                            <div><span className="text-muted">Output:</span> {ex.output}</div>
                            {ex.note && <div className="text-muted mt-xs text-xs">// {ex.note}</div>}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-lg">
                      <h4 className="font-bold mb-xs text-sm uppercase tracking-wide text-secondary">Constraints</h4>
                      <ul className="text-sm text-secondary pl-lg">
                        {q.problem.constraints.map((c, i) => <li key={i}>{c}</li>)}
                      </ul>
                    </div>

                    <div className="p-md rounded-lg" style={{ background: 'rgba(34, 197, 94, 0.05)', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
                      <div className="flex items-center gap-xs font-bold text-accent mb-sm">
                        <FiCheckCircle /> Optimal Approach
                      </div>
                      <p className="text-sm mb-md">{q.explanation}</p>
                      
                      {q.problem.solution && (
                        <div>
                          <div className="text-xs font-bold uppercase text-muted mb-xs">Reference Solution (Python)</div>
                          <div className="p-md rounded-md bg-dark text-white font-mono text-sm whitespace-pre overflow-x-auto">
                            {q.problem.solution}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-2xl text-center">
            <p className="text-secondary mb-md">Want to practice coding in a real IDE environment?</p>
            <a href="https://leetcode.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              Practice on LeetCode <FiCode className="ml-xs" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingPractice;
