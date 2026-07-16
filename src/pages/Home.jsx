import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiSearch, FiCode, FiBookOpen, FiAward, FiTarget } from 'react-icons/fi';
import companies from '../data/companies';

const Home = () => {
  const navigate = useNavigate();
  const topCompanies = companies.slice(0, 8); // Show first 8 companies on home page

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    if (query) {
      navigate(`/companies?q=${encodeURIComponent(query)}`);
    }
  };

  const features = [
    {
      icon: <FiTarget size={28} />,
      title: "Company-Specific Patterns",
      description: "Get detailed insights into recruitment patterns, eligibility criteria, and syllabus for 15+ top IT companies.",
      color: "var(--primary)"
    },
    {
      icon: <FiBookOpen size={28} />,
      title: "Extensive MCQ Bank",
      description: "Practice thousands of MCQs on Aptitude, Reasoning, Verbal, DBMS, OS, and Prompt Engineering.",
      color: "var(--secondary)"
    },
    {
      icon: <FiCode size={28} />,
      title: "Coding Practice",
      description: "Solve frequently asked programming questions with hints, solutions, and time complexity analysis.",
      color: "var(--accent)"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg-grid"></div>
        <div className="hero-bg-orb hero-bg-orb-1"></div>
        <div className="hero-bg-orb hero-bg-orb-2"></div>
        
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="hero-eyebrow">🚀 The Ultimate Placement Platform</div>
            <h1 className="hero-title">
              Crack Your Dream <span className="text-gradient">IT Job</span> With Confidence
            </h1>
            <p className="hero-subtitle">
              Prepare for campus placements with company-wise recruitment patterns, comprehensive MCQs, coding challenges, and interview experiences.
            </p>
            
            <form className="hero-search" onSubmit={handleSearch}>
              <FiSearch className="search-icon" />
              <input 
                type="text" 
                name="search"
                placeholder="Search for TCS, Infosys, Wipro, Accenture..." 
                autoComplete="off"
              />
              <button type="submit" className="btn btn-primary" style={{ position: 'absolute', right: '8px', top: '8px', bottom: '8px' }}>
                Search
              </button>
            </form>
            
            <div className="flex items-center justify-center gap-md mt-lg">
              <Link to="/companies" className="btn btn-primary btn-lg">
                Explore Companies <FiArrowRight />
              </Link>
              <Link to="/mcq" className="btn btn-outline btn-lg" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}>
                Start Practice
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section bg-secondary" style={{ background: 'var(--bg-secondary)', padding: 'var(--space-2xl) 0' }}>
        <div className="container">
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-number" style={{ color: 'var(--primary)' }}>15+</div>
              <div className="hero-stat-label" style={{ color: 'var(--text-secondary)' }}>Top IT Companies</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number" style={{ color: 'var(--secondary)' }}>2000+</div>
              <div className="hero-stat-label" style={{ color: 'var(--text-secondary)' }}>Practice Questions</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number" style={{ color: 'var(--accent)' }}>500+</div>
              <div className="hero-stat-label" style={{ color: 'var(--text-secondary)' }}>Coding Challenges</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number" style={{ color: 'var(--warning)' }}>50k+</div>
              <div className="hero-stat-label" style={{ color: 'var(--text-secondary)' }}>Students Placed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">Platform Features</div>
            <h2 className="section-title">Everything you need to succeed</h2>
            <p className="section-subtitle">
              We've analyzed thousands of placement drives to bring you the most accurate and up-to-date preparation material.
            </p>
          </div>

          <div className="grid grid-2 gap-xl">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="card flex gap-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div style={{ 
                  width: '64px', height: '64px', borderRadius: '16px', 
                  background: `${feature.color}15`, color: feature.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl mb-sm">{feature.title}</h3>
                  <p className="text-secondary">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Companies Section */}
      <section className="section bg-secondary" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="flex items-center justify-between mb-xl">
            <div>
              <h2 className="section-title mb-xs">Top Companies Hiring</h2>
              <p className="text-secondary">Explore recruitment patterns and syllabus for mass recruiters.</p>
            </div>
            <Link to="/companies" className="btn btn-outline hidden md:flex">
              View All Companies
            </Link>
          </div>

          <div className="company-grid">
            {topCompanies.map((company, index) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link to={`/companies/${company.id}`} className="company-card" style={{ '--company-gradient': company.gradient, '--company-glow': `${company.color}40` }}>
                  <div className="company-card-logo">
                    {company.logo}
                  </div>
                  <h3 className="company-card-name">{company.name}</h3>
                  <p className="company-card-industry">{company.industry}</p>
                  
                  <div className="company-card-stats">
                    <div className="company-card-stat">
                      <div className="company-card-stat-value">{company.employees}</div>
                      <div className="company-card-stat-label">Employees</div>
                    </div>
                    <div className="company-card-stat">
                      <div className="company-card-stat-value">{company.eligibility?.batch || '2024, 25'}</div>
                      <div className="company-card-stat-label">Hiring Batch</div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-xl flex md:hidden justify-center">
            <Link to="/companies" className="btn btn-outline">
              View All Companies
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container-sm">
          <div className="card-gradient" style={{ textAlign: 'center', padding: 'var(--space-4xl) var(--space-2xl)' }}>
            <h2 className="text-4xl font-extrabold mb-md">Ready to crack your next interview?</h2>
            <p className="text-lg mb-xl" style={{ opacity: 0.9, maxWidth: '600px', margin: '0 auto var(--space-xl)' }}>
              Join thousands of students who have successfully secured placements in top MNCs using our platform.
            </p>
            <Link to="/mcq" className="btn btn-lg" style={{ background: 'white', color: 'var(--primary)' }}>
              Start Practicing Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
