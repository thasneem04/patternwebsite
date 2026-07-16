import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter } from 'react-icons/fi';
import companiesData from '../data/companies';

const Companies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Extract unique industries for filters
  const industries = ['All', ...new Set(companiesData.map(c => {
    if (c.industry.includes('IT Services')) return 'IT Services';
    if (c.industry.includes('Professional Services') || c.industry.includes('Consulting')) return 'Consulting / Big 4';
    if (c.industry.includes('Product') || c.industry.includes('SaaS')) return 'Product / SaaS';
    return c.industry;
  }))];

  // Filter companies based on search term and active filter
  const filteredCompanies = companiesData.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          company.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          company.techStack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    
    let matchesFilter = true;
    if (activeFilter !== 'All') {
      if (activeFilter === 'IT Services') matchesFilter = company.industry.includes('IT Services');
      else if (activeFilter === 'Consulting / Big 4') matchesFilter = company.industry.includes('Professional Services') || company.industry.includes('Consulting');
      else if (activeFilter === 'Product / SaaS') matchesFilter = company.industry.includes('Product') || company.industry.includes('SaaS');
      else matchesFilter = company.industry === activeFilter;
    }
    
    return matchesSearch && matchesFilter;
  });

  // Update URL when search changes
  useEffect(() => {
    if (searchTerm) {
      setSearchParams({ q: searchTerm });
    } else {
      setSearchParams({});
    }
  }, [searchTerm, setSearchParams]);

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>Companies</h1>
          <p>Explore recruitment patterns, selection processes, and eligibility criteria for top tech companies.</p>
        </div>
      </div>

      <div className="section">
        <div className="container">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-lg justify-between items-center mb-2xl">
            <div className="input-group" style={{ width: '100%', maxWidth: '400px' }}>
              <FiSearch className="input-icon" size={18} />
              <input 
                type="text" 
                className="input input-search" 
                placeholder="Search companies, tech stack..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="filter-bar" style={{ margin: 0 }}>
              <FiFilter className="text-muted" size={18} />
              {industries.map(industry => (
                <button 
                  key={industry}
                  className={`filter-btn ${activeFilter === industry ? 'active' : ''}`}
                  onClick={() => setActiveFilter(industry)}
                >
                  {industry}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-lg text-secondary font-medium">
            Showing {filteredCompanies.length} companies
          </div>

          {/* Company Grid */}
          {filteredCompanies.length > 0 ? (
            <div className="company-grid">
              {filteredCompanies.map((company, index) => (
                <motion.div
                  key={company.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link to={`/companies/${company.id}`} className="company-card" style={{ '--company-gradient': company.gradient, '--company-glow': `${company.color}40` }}>
                    <div className="company-card-logo">
                      {company.logo}
                    </div>
                    <h3 className="company-card-name">{company.name}</h3>
                    <p className="company-card-industry">{company.industry}</p>
                    
                    <div className="mt-sm mb-md flex flex-wrap gap-xs">
                      {company.techStack.slice(0, 3).map((tech, i) => (
                        <span key={i} className="badge badge-gray text-xs">{tech}</span>
                      ))}
                      {company.techStack.length > 3 && <span className="badge badge-gray text-xs">+{company.techStack.length - 3}</span>}
                    </div>
                    
                    <div className="company-card-stats">
                      <div className="company-card-stat">
                        <div className="company-card-stat-value" style={{ color: company.color }}>
                          {company.recruitmentPattern.roles[0]?.package.split(' ')[0] || 'N/A'}
                        </div>
                        <div className="company-card-stat-label">Avg Package</div>
                      </div>
                      <div className="company-card-stat">
                        <div className="company-card-stat-value">{company.recruitmentPattern.difficultyLevel}</div>
                        <div className="company-card-stat-label">Difficulty</div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center p-4xl bg-secondary rounded-xl border">
              <div className="text-6xl mb-md">🔍</div>
              <h3 className="text-2xl font-bold mb-sm">No companies found</h3>
              <p className="text-secondary mb-lg">We couldn't find any companies matching your search criteria.</p>
              <button className="btn btn-primary" onClick={() => { setSearchTerm(''); setActiveFilter('All'); }}>
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Companies;
