import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiDatabase, FiCode, FiCpu, FiTerminal, FiGlobe, FiLock } from 'react-icons/fi';

const categories = [
  { id: 'technical', name: 'Core Technical (CS)', icon: <FiCpu />, count: 150, color: 'var(--primary)', desc: 'DSA, DBMS, OS, Computer Networks, OOPs' },
  { id: 'python', name: 'Python Programming', icon: <FiCode />, count: 120, color: 'var(--secondary)', desc: 'Syntax, Data Structures, OOPs, Libraries' },
  { id: 'sql', name: 'Database & SQL', icon: <FiDatabase />, count: 85, color: '#8B5CF6', desc: 'Queries, Joins, Normalization, Transactions' },
  { id: 'prompt-engineering', name: 'Prompt Engineering', icon: <FiTerminal />, count: 45, color: 'var(--accent)', desc: 'AI Prompts, LLMs, Best Practices, Hexaware Specific' },
  { id: 'aptitude', name: 'Quantitative Aptitude', icon: <FiGlobe />, count: 200, color: '#F59E0B', desc: 'Time & Work, Probabilty, Permutation, Profit/Loss' },
  { id: 'reasoning', name: 'Logical Reasoning', icon: <FiLock />, count: 180, color: '#EF4444', desc: 'Puzzles, Series, Syllogism, Blood Relations' },
];

const MCQPractice = () => {
  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>MCQ Practice Center</h1>
          <p>Master the multiple-choice questions asked by top IT recruiters.</p>
        </div>
      </div>

      <div className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Select a Category</h2>
            <p className="section-subtitle">Choose a topic to start your mock test session. Questions are curated from recent campus drives.</p>
          </div>

          <div className="grid grid-3 gap-lg">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link to={`/mcq/${cat.id}`} className="card flex-col gap-md" style={{ display: 'flex', textDecoration: 'none', height: '100%' }}>
                  <div className="flex justify-between items-start">
                    <div style={{ 
                      width: '48px', height: '48px', borderRadius: '12px', 
                      background: `${cat.color}15`, color: cat.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px'
                    }}>
                      {cat.icon}
                    </div>
                    <div className="badge badge-gray">{cat.count}+ Qs</div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl mb-xs">{cat.name}</h3>
                    <p className="text-secondary text-sm">{cat.desc}</p>
                  </div>
                  
                  <div className="mt-auto pt-md" style={{ borderTop: '1px solid var(--border)' }}>
                    <span className="text-primary font-medium text-sm flex items-center gap-xs">
                      Start Test &rarr;
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-4xl card-gradient text-center" style={{ padding: 'var(--space-3xl) var(--space-xl)' }}>
            <h3 className="text-3xl font-bold mb-md">Company Specific Tests</h3>
            <p className="mb-lg" style={{ opacity: 0.9, maxWidth: '600px', margin: '0 auto var(--space-xl)' }}>
              Want to practice exact patterns for TCS, Infosys, or Hexaware? Head over to the companies page.
            </p>
            <Link to="/companies" className="btn btn-lg" style={{ background: 'white', color: 'var(--primary)' }}>
              View Companies
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MCQPractice;
