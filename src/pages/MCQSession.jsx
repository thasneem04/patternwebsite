import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiX, FiArrowRight, FiArrowLeft, FiFlag, FiRefreshCcw } from 'react-icons/fi';

const MCQSession = () => {
  const { category, companySlug } = useParams();
  const navigate = useNavigate();
  
  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({}); // { questionId: "Selected Option Text" }
  const [showExplanation, setShowExplanation] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dynamic import based on category
    const loadQuestions = async () => {
      setLoading(true);
      try {
        // We're simulating API call by importing the local JSON files
        let data;
          // If we have a companySlug, try to load that first
          if (companySlug) {
            try {
              data = (await import(`../data/mcq/companies/${companySlug.toLowerCase()}.json`)).default;
            } catch (err) {
              console.warn(`Could not load company specific MCQs for ${companySlug}, falling back to category.`);
            }
          }
          
          if (!data) {
            switch (category) {
              case 'technical':
                data = (await import('../data/mcq/technical.json')).default;
                break;
              case 'prompt-engineering':
                data = (await import('../data/mcq/prompt-engineering.json')).default;
                break;
              case 'python':
                data = (await import('../data/mcq/python.json')).default;
                break;
              case 'sql':
                data = (await import('../data/mcq/sql.json')).default;
                break;
              default:
                // Fallback to technical if not found
                data = (await import('../data/mcq/technical.json')).default;
            }
          }

        // Shuffle questions and pick up to 50 for a session
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        setQuestions(shuffled.slice(0, 50));
      } catch (error) {
        console.error("Error loading questions:", error);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [category]);

  const handleOptionSelect = (option) => {
    if (showExplanation) return; // Don't allow changing answer after checking
    
    const currentQ = questions[currentQIndex];
    setSelectedOptions({
      ...selectedOptions,
      [currentQ.id]: option
    });
  };

  const handleCheckAnswer = () => {
    if (!selectedOptions[questions[currentQIndex].id]) return;
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentQIndex > 0) {
      setShowExplanation(!!selectedOptions[questions[currentQIndex - 1].id]);
      setCurrentQIndex(currentQIndex - 1);
    }
  };

  const jumpToQuestion = (index) => {
    setCurrentQIndex(index);
    setShowExplanation(!!selectedOptions[questions[index].id]);
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (selectedOptions[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  if (loading) {
    return <div className="p-4xl text-center">Loading questions...</div>;
  }

  if (isFinished) {
    const score = calculateScore();
    const percentage = (score / questions.length) * 100;
    
    return (
      <div className="section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="container-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="score-card"
          >
            <h2 className="text-3xl font-bold mb-lg">Session Complete!</h2>
            
            <div className="score-circle" style={{ '--score-deg': `${(percentage / 100) * 360}deg` }}>
              <div className="score-circle-inner">
                <div className="score-number">{score}</div>
                <div className="score-total">out of {questions.length}</div>
              </div>
            </div>
            
            <h3 className="text-xl mb-md">
              {percentage >= 80 ? 'Excellent work! 🏆' : 
               percentage >= 60 ? 'Good effort! 👍' : 'Keep practicing! 💪'}
            </h3>
            <p className="text-secondary mb-xl">
              You answered {score} out of {questions.length} questions correctly.
            </p>
            
            <div className="flex justify-center gap-md">
              <button className="btn btn-outline" onClick={() => window.location.reload()}>
                <FiRefreshCcw /> Retake Test
              </button>
              <Link to="/mcq" className="btn btn-primary">
                Explore Other Topics
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQIndex];
  const selectedOption = selectedOptions[currentQ.id];
  const progressPercentage = ((currentQIndex + 1) / questions.length) * 100;

  return (
    <div className="section" style={{ paddingTop: 'var(--space-xl)' }}>
      <div className="mcq-container">
        
        <Link to="/mcq" className="btn btn-ghost btn-sm mb-lg" style={{ padding: 0 }}>
          <FiArrowLeft /> Back to Topics
        </Link>

        <div className="mcq-header">
          <div>
            <h1 className="text-2xl font-bold capitalize">{category.replace('-', ' ')} Test</h1>
            <p className="text-secondary text-sm">Question {currentQIndex + 1} of {questions.length}</p>
          </div>
          
          {companySlug && (
            <div className="badge badge-primary">{companySlug.toUpperCase()} Pattern</div>
          )}
        </div>

        <div className="mcq-progress-bar">
          <div className="mcq-progress-fill" style={{ width: `${progressPercentage}%` }}></div>
        </div>

        <div className="grid gap-xl" style={{ gridTemplateColumns: '1fr', '@media (min-width: 1024px)': { gridTemplateColumns: '3fr 1fr' } }}>
          
          {/* Main Question Area */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQ.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="mcq-question-card"
              >
                <div className="flex justify-between items-start mb-md">
                  <div className="mcq-question-number">Question {currentQIndex + 1}</div>
                  <div className="flex gap-sm">
                    <span className="badge badge-gray">{currentQ.difficulty}</span>
                    {currentQ.topic && <span className="badge badge-secondary">{currentQ.topic}</span>}
                  </div>
                </div>

                {/* Handle code blocks in questions if any */}
                {currentQ.question.includes('```') ? (
                  <div>
                    <div className="mcq-question-text">{currentQ.question.split('```')[0]}</div>
                    <div className="mcq-code-block">{currentQ.question.split('```')[1]}</div>
                    <div className="mcq-question-text" style={{ marginTop: 'var(--space-md)' }}>{currentQ.question.split('```')[2]}</div>
                  </div>
                ) : (
                  <div className="mcq-question-text">{currentQ.question}</div>
                )}

                <div className="mcq-options">
                  {currentQ.options.map((option, idx) => {
                    const isSelected = selectedOption === option;
                    const isCorrect = option === currentQ.correctAnswer;
                    
                    let optionClass = 'mcq-option';
                    if (isSelected) optionClass += ' selected';
                    if (showExplanation) {
                      if (isCorrect) optionClass += ' correct';
                      else if (isSelected && !isCorrect) optionClass += ' incorrect';
                    }

                    const letters = ['A', 'B', 'C', 'D', 'E'];

                    return (
                      <div 
                        key={idx} 
                        className={optionClass}
                        onClick={() => handleOptionSelect(option)}
                      >
                        <div className="mcq-option-letter">{letters[idx]}</div>
                        <div style={{ flex: 1 }}>{option}</div>
                        
                        {showExplanation && isCorrect && <FiCheck className="text-accent" size={20} />}
                        {showExplanation && isSelected && !isCorrect && <FiX className="text-danger" size={20} />}
                      </div>
                    );
                  })}
                </div>

                {showExplanation && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mcq-explanation"
                  >
                    <div className="mcq-explanation-title">
                      <FiCheck size={16} /> Explanation
                    </div>
                    <div className="mcq-explanation-text">
                      {currentQ.explanation}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mcq-nav">
              <button 
                className="btn btn-outline" 
                onClick={handlePrev}
                disabled={currentQIndex === 0}
              >
                Previous
              </button>
              
              {!showExplanation ? (
                <button 
                  className="btn btn-primary"
                  onClick={handleCheckAnswer}
                  disabled={!selectedOption}
                >
                  Check Answer
                </button>
              ) : (
                <button 
                  className="btn btn-primary"
                  onClick={handleNext}
                >
                  {currentQIndex === questions.length - 1 ? 'Finish Session' : 'Next Question'} <FiArrowRight />
                </button>
              )}
            </div>
          </div>

          {/* Question Palette Sidebar - visible on larger screens, could be a drawer on mobile */}
          <div className="hidden lg:block">
            <div className="card">
              <h3 className="text-md font-bold mb-md">Question Palette</h3>
              <div className="question-palette">
                {questions.map((q, idx) => {
                  let btnClass = 'palette-btn';
                  const answered = !!selectedOptions[q.id];
                  
                  if (idx === currentQIndex) btnClass += ' current';
                  else if (answered) {
                    if (showExplanation || currentQIndex > idx) {
                      btnClass += selectedOptions[q.id] === q.correctAnswer ? ' correct' : ' incorrect';
                    } else {
                      btnClass += ' answered';
                    }
                  }

                  return (
                    <button 
                      key={q.id}
                      className={btnClass}
                      onClick={() => jumpToQuestion(idx)}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
              
              <div className="mt-lg pt-md" style={{ borderTop: '1px solid var(--border)' }}>
                <div className="flex items-center gap-sm mb-xs text-sm text-secondary">
                  <div className="w-3 h-3 rounded-full bg-primary"></div> Current/Answered
                </div>
                <div className="flex items-center gap-sm mb-xs text-sm text-secondary">
                  <div className="w-3 h-3 rounded-full bg-accent"></div> Correct
                </div>
                <div className="flex items-center gap-sm text-sm text-secondary">
                  <div className="w-3 h-3 rounded-full bg-danger"></div> Incorrect
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MCQSession;
