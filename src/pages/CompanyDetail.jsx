import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiMapPin, FiUsers, FiGlobe, FiExternalLink, FiClock, FiBook, FiCode, FiMessageCircle, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { getCompanyById } from '../data/companies';

const CompanyDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const data = getCompanyById(slug);
    if (data) {
      setCompany(data);
      window.scrollTo(0, 0);
    } else {
      navigate('/companies'); // Redirect if not found
    }
  }, [slug, navigate]);

  if (!company) return <div className="p-4xl text-center">Loading...</div>;

  return (
    <div>
      {/* Banner */}
      <div className="company-banner" style={{ '--company-gradient': company.gradient }}>
        <div className="container">
          <Link to="/companies" className="btn btn-ghost mb-lg" style={{ color: 'white', padding: '0', display: 'inline-flex' }}>
            <FiArrowLeft /> Back to Companies
          </Link>
          
          <div className="company-banner-inner">
            <div className="company-banner-logo">
              {company.logo}
            </div>
            <div className="company-banner-info">
              <h1>{company.name}</h1>
              <p>{company.overview.tagline}</p>
              
              <div className="flex flex-wrap gap-md mt-sm">
                <div className="badge" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
                  <FiGlobe /> {company.globalPresence}
                </div>
                <div className="badge" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
                  <FiUsers /> {company.employees}
                </div>
                <div className="badge" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
                  <FiMapPin /> {company.headquarters.split(',')[0]}
                </div>
              </div>
            </div>
            
            <div className="ml-auto" style={{ alignSelf: 'flex-end' }}>
              <a href={company.careersPage} target="_blank" rel="noopener noreferrer" className="btn" style={{ background: 'white', color: company.color }}>
                Careers Page <FiExternalLink />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="container">
          {/* Tabs */}
          <div className="company-tabs">
            <button className={`company-tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
              Company Overview
            </button>
            <button className={`company-tab ${activeTab === 'recruitment' ? 'active' : ''}`} onClick={() => setActiveTab('recruitment')}>
              Recruitment Pattern
            </button>
            <button className={`company-tab ${activeTab === 'eligibility' ? 'active' : ''}`} onClick={() => setActiveTab('eligibility')}>
              Eligibility Criteria
            </button>
            <button className={`company-tab ${activeTab === 'interview' ? 'active' : ''}`} onClick={() => setActiveTab('interview')}>
              Interview Prep
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-content" style={{ minHeight: '500px' }}>
            <AnimatePresence mode="wait">
              
              {/* OVERVIEW TAB */}
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-4 gap-xl"
                  style={{ gridTemplateColumns: '2fr 1fr' }}
                >
                  <div className="flex-col gap-xl">
                    <div className="card">
                      <h3 className="text-xl mb-md">About {company.name}</h3>
                      <p className="text-secondary leading-relaxed">{company.description}</p>
                      
                      <h4 className="text-md font-bold mt-lg mb-sm">Key Highlights</h4>
                      <ul className="text-secondary" style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                        {company.overview.highlights.map((h, i) => <li key={i}>{h}</li>)}
                      </ul>
                    </div>

                    <div className="card mt-lg">
                      <h3 className="text-xl mb-md">Business Domains</h3>
                      <div className="flex flex-wrap gap-sm">
                        {company.businessDomains.map((domain, i) => (
                          <span key={i} className="chip">{domain}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex-col gap-lg">
                    <div className="card">
                      <h3 className="text-xl mb-md">Key Information</h3>
                      <div className="flex flex-col gap-md">
                        <div>
                          <div className="text-xs text-muted uppercase font-bold tracking-wide">Industry</div>
                          <div className="font-medium">{company.industry}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted uppercase font-bold tracking-wide">Founded</div>
                          <div className="font-medium">{company.founded}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted uppercase font-bold tracking-wide">CEO</div>
                          <div className="font-medium">{company.ceo}</div>
                        </div>
                      </div>
                    </div>

                    <div className="card">
                      <h3 className="text-xl mb-md">Tech Stack</h3>
                      <div className="flex flex-wrap gap-xs">
                        {company.techStack.map((tech, i) => (
                          <span key={i} className="badge badge-gray">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* RECRUITMENT PATTERN TAB */}
              {activeTab === 'recruitment' && (
                <motion.div
                  key="recruitment"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex flex-wrap justify-between items-center mb-lg">
                    <div>
                      <h2 className="text-2xl font-bold mb-xs">Recruitment Process</h2>
                      <p className="text-secondary text-sm">Last updated: {company.recruitmentPattern.lastUpdated}</p>
                    </div>
                    
                    <div className="flex gap-sm">
                      <div className="badge badge-easy">Difficulty: {company.recruitmentPattern.difficultyLevel}</div>
                      <div className="badge badge-primary">{company.recruitmentPattern.assessmentPlatform}</div>
                    </div>
                  </div>

                  {company.recruitmentPattern.sourceType === 'candidate-experience' ? (
                    <div className="info-banner mb-xl">
                      <FiAlertCircle size={20} className="text-warning flex-shrink-0" style={{ color: '#D97706' }} />
                      <div>This pattern is based on recent candidate experiences and standard hiring drives. Exact patterns may vary slightly by college or specific drive.</div>
                    </div>
                  ) : null}

                  <div className="grid grid-2 gap-lg mb-xl" style={{ gridTemplateColumns: '1fr 2fr' }}>
                    <div className="card bg-secondary">
                      <h3 className="text-lg mb-md">Roles Offered</h3>
                      <div className="flex flex-col gap-md">
                        {company.recruitmentPattern.roles.map((role, i) => (
                          <div key={i} className="p-md bg-card rounded-md border">
                            <div className="flex justify-between items-start mb-xs">
                              <div className="font-bold">{role.title}</div>
                              <div className="badge badge-success" style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#16A34A' }}>{role.package}</div>
                            </div>
                            <div className="text-sm text-secondary">{role.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="card">
                      <h3 className="text-lg mb-md">Preparation Strategy</h3>
                      <div className="grid grid-2 gap-md mb-md">
                        <div>
                          <div className="text-xs text-muted uppercase font-bold">Prep Time</div>
                          <div className="font-medium flex items-center gap-xs"><FiClock /> {company.recruitmentPattern.preparationTime}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted uppercase font-bold">Negative Marking</div>
                          <div className="font-medium text-danger">{company.recruitmentPattern.negativeMark}</div>
                        </div>
                      </div>
                      
                      <h4 className="text-sm font-bold mt-md mb-xs">Important Topics:</h4>
                      <div className="flex flex-wrap gap-xs mb-md">
                        {company.recruitmentPattern.keyTopics.map((topic, i) => (
                          <span key={i} className="badge badge-gray text-xs">{topic}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-lg">Selection Rounds</h3>
                  <div className="rounds-timeline">
                    {company.recruitmentPattern.rounds.map((round, i) => (
                      <div key={i} className="round-item">
                        <div className="round-dot" style={{ background: company.color, boxShadow: `0 0 0 3px ${company.color}30` }}></div>
                        <div className="round-card" style={{ borderColor: `${company.color}20` }}>
                          <div className="round-header">
                            <div>
                              <div className="round-number" style={{ color: company.color }}>Round {round.roundNumber}: {round.type}</div>
                              <h4 className="round-name">{round.name}</h4>
                            </div>
                            <div className="badge bg-secondary text-secondary"><FiClock size={12} /> {round.duration}</div>
                          </div>
                          
                          <p className="round-description">{round.description}</p>
                          
                          {round.sections && (
                            <div className="round-sections">
                              {round.sections.map((sec, j) => (
                                <div key={j} className="round-section-item">
                                  <div className="section-name">{sec.name}</div>
                                  <div className="flex justify-between items-center mt-xs">
                                    <span className="section-detail">{sec.questions} Qs</span>
                                    <span className="section-detail text-primary font-medium">{sec.time}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {round.topics && (
                            <div className="mt-md pt-md" style={{ borderTop: '1px solid var(--border)' }}>
                              <div className="text-xs text-muted font-bold uppercase mb-sm">Focus Areas:</div>
                              <div className="flex flex-wrap gap-xs">
                                {round.topics.map((topic, j) => (
                                  <span key={j} className="text-xs bg-secondary px-2 py-1 rounded-sm text-secondary">{topic}</span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ELIGIBILITY TAB */}
              {activeTab === 'eligibility' && (
                <motion.div
                  key="eligibility"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 className="text-2xl font-bold mb-lg">Eligibility Criteria</h2>
                  
                  <div className="eligibility-grid mb-xl">
                    <div className="eligibility-card">
                      <div className="eligibility-icon" style={{ color: company.color, background: `${company.color}15` }}><FiBook /></div>
                      <div>
                        <div className="eligibility-label">CGPA Requirement</div>
                        <div className="eligibility-value">{company.eligibility.cgpa}</div>
                      </div>
                    </div>
                    
                    <div className="eligibility-card">
                      <div className="eligibility-icon" style={{ color: company.color, background: `${company.color}15` }}><FiCheckCircle /></div>
                      <div>
                        <div className="eligibility-label">Backlogs</div>
                        <div className="eligibility-value">{company.eligibility.backlogs}</div>
                      </div>
                    </div>
                    
                    <div className="eligibility-card">
                      <div className="eligibility-icon" style={{ color: company.color, background: `${company.color}15` }}><FiClock /></div>
                      <div>
                        <div className="eligibility-label">Academic Gap</div>
                        <div className="eligibility-value">{company.eligibility.gap}</div>
                      </div>
                    </div>
                    
                    <div className="eligibility-card">
                      <div className="eligibility-icon" style={{ color: company.color, background: `${company.color}15` }}><FiUsers /></div>
                      <div>
                        <div className="eligibility-label">Eligible Batches</div>
                        <div className="eligibility-value">{company.eligibility.batch}</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-2 gap-lg">
                    <div className="card">
                      <h3 className="text-lg mb-md">Eligible Degrees</h3>
                      <div className="flex flex-wrap gap-sm mb-lg">
                        {company.eligibility.degrees.map((deg, i) => (
                          <span key={i} className="badge badge-primary">{deg}</span>
                        ))}
                      </div>
                      
                      <h3 className="text-lg mb-md">Eligible Branches</h3>
                      <ul className="text-secondary" style={{ paddingLeft: '20px' }}>
                        {company.eligibility.branches.map((branch, i) => (
                          <li key={i} className="mb-xs">{branch}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="card bg-secondary">
                      <h3 className="text-lg mb-md">Important Notes</h3>
                      <p className="text-secondary leading-relaxed">{company.eligibility.note}</p>
                      
                      <div className="mt-xl p-md rounded-md" style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                        <div className="font-bold text-danger mb-xs flex items-center gap-xs"><FiAlertCircle /> Common Rejection Reasons</div>
                        <ul className="text-secondary text-sm" style={{ paddingLeft: '20px' }}>
                          <li>Failing to meet strict percentage criteria (e.g. 59.9% when 60% is required)</li>
                          <li>Having active backlogs during the interview process</li>
                          <li>More than 1 year gap after 12th standard</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* INTERVIEW PREP TAB */}
              {activeTab === 'interview' && (
                <motion.div
                  key="interview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 className="text-2xl font-bold mb-lg">Interview Preparation Guide</h2>
                  
                  <div className="grid grid-2 gap-lg mb-2xl">
                    {/* Technical Interview */}
                    <div className="card">
                      <div className="flex items-center gap-sm mb-md">
                        <div className="p-sm rounded-md bg-primary text-white"><FiCode size={20} /></div>
                        <h3 className="text-xl m-0">Technical Interview</h3>
                      </div>
                      <div className="text-sm text-secondary mb-md">Duration: {company.interview.technical.duration}</div>
                      
                      <h4 className="font-bold text-sm mb-sm">Key Topics to Prepare:</h4>
                      <div className="flex flex-wrap gap-xs mb-lg">
                        {company.interview.technical.topics.map((t, i) => <span key={i} className="badge badge-gray">{t}</span>)}
                      </div>
                      
                      <h4 className="font-bold text-sm mb-sm">Pro Tips:</h4>
                      <ul className="text-secondary text-sm" style={{ paddingLeft: '20px' }}>
                        {company.interview.technical.tips.map((t, i) => <li key={i} className="mb-xs">{t}</li>)}
                      </ul>
                    </div>

                    {/* HR Interview */}
                    <div className="card">
                      <div className="flex items-center gap-sm mb-md">
                        <div className="p-sm rounded-md bg-secondary text-white"><FiMessageCircle size={20} /></div>
                        <h3 className="text-xl m-0">HR / Managerial Interview</h3>
                      </div>
                      <div className="text-sm text-secondary mb-md">Duration: {company.interview.hr.duration}</div>
                      
                      <h4 className="font-bold text-sm mb-sm">Common Questions:</h4>
                      <div className="flex flex-wrap gap-xs mb-lg">
                        {company.interview.hr.topics.map((t, i) => <span key={i} className="badge badge-gray">{t}</span>)}
                      </div>
                      
                      <h4 className="font-bold text-sm mb-sm">Pro Tips:</h4>
                      <ul className="text-secondary text-sm" style={{ paddingLeft: '20px' }}>
                        {company.interview.hr.tips.map((t, i) => <li key={i} className="mb-xs">{t}</li>)}
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-md">Expert Advice for {company.shortName}</h3>
                  <div className="grid grid-3 gap-md mb-2xl">
                    <div className="card bg-secondary border-none">
                      <h4 className="font-bold text-primary mb-sm flex items-center gap-xs"><FiCheckCircle /> Top Tips</h4>
                      <ul className="text-sm text-secondary" style={{ paddingLeft: '16px' }}>
                        {company.recruitmentPattern.tips.map((t, i) => <li key={i} className="mb-xs">{t}</li>)}
                      </ul>
                    </div>
                    <div className="card bg-secondary border-none">
                      <h4 className="font-bold text-danger mb-sm flex items-center gap-xs"><FiAlertCircle /> Common Mistakes</h4>
                      <ul className="text-sm text-secondary" style={{ paddingLeft: '16px' }}>
                        {company.recruitmentPattern.commonMistakes.map((t, i) => <li key={i} className="mb-xs">{t}</li>)}
                      </ul>
                    </div>
                    <div className="card bg-secondary border-none flex-col items-center justify-center text-center">
                      <div className="text-4xl mb-sm">🎯</div>
                      <h4 className="font-bold mb-xs">Ready to practice?</h4>
                      <p className="text-xs text-secondary mb-md">Test your skills with our curated questions for {company.shortName}.</p>
                      <Link to={`/mcq/${company.id}/technical`} className="btn btn-sm btn-primary w-full">Start Mock Test</Link>
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;
