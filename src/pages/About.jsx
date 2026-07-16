import { FiUsers, FiTarget, FiHeart } from 'react-icons/fi';

const About = () => {
  return (
    <div>
      <div className="page-header" style={{ padding: 'var(--space-4xl) 0' }}>
        <div className="container-sm text-center">
          <div className="badge badge-primary mb-md mx-auto">About Us</div>
          <h1 className="text-5xl font-black mb-md">Empowering Students to Achieve their Dream Careers</h1>
          <p className="text-lg text-secondary mx-auto" style={{ maxWidth: '700px' }}>
            We're on a mission to democratize placement preparation by providing high-quality, up-to-date resources completely free of cost.
          </p>
        </div>
      </div>

      <div className="section">
        <div className="container-sm">
          <div className="grid grid-2 gap-xl mb-4xl items-center">
            <div>
              <h2 className="text-3xl font-bold mb-md">Our Story</h2>
              <p className="text-secondary leading-relaxed mb-md">
                PlacementPrep started as a small project by a group of engineering graduates who realized how fragmented and outdated most placement resources were. Students were paying thousands of rupees for information that should be freely available.
              </p>
              <p className="text-secondary leading-relaxed">
                We built this platform to bring structure to campus placement preparation. By crowdsourcing interview experiences and analyzing thousands of test patterns, we've created the most accurate resource for engineering students in India.
              </p>
            </div>
            <div className="card-glass" style={{ background: 'var(--gradient-hero)', padding: 'var(--space-2xl)', borderRadius: 'var(--radius-2xl)' }}>
              <div className="text-center">
                <div className="text-6xl mb-md">🚀</div>
                <h3 className="text-2xl text-white font-bold mb-sm">Built for Students</h3>
                <p className="text-white opacity-80">No paywalls. No hidden fees. Just pure preparation material.</p>
              </div>
            </div>
          </div>

          <h2 className="text-center text-3xl font-bold mb-xl">Our Values</h2>
          <div className="grid grid-3 gap-lg">
            <div className="card text-center">
              <div className="mx-auto mb-md flex items-center justify-center text-primary" style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(37,99,235,0.1)' }}>
                <FiTarget size={30} />
              </div>
              <h3 className="text-xl mb-sm">Accuracy</h3>
              <p className="text-secondary text-sm">We constantly update our company patterns based on the latest campus drives and student feedback.</p>
            </div>
            <div className="card text-center">
              <div className="mx-auto mb-md flex items-center justify-center text-accent" style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(34,197,94,0.1)' }}>
                <FiUsers size={30} />
              </div>
              <h3 className="text-xl mb-sm">Community</h3>
              <p className="text-secondary text-sm">We believe in learning together. Our platform grows through the contributions of placed seniors.</p>
            </div>
            <div className="card text-center">
              <div className="mx-auto mb-md flex items-center justify-center text-danger" style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(239,68,68,0.1)' }}>
                <FiHeart size={30} />
              </div>
              <h3 className="text-xl mb-sm">Accessibility</h3>
              <p className="text-secondary text-sm">Quality education should not be a privilege. All our core content will always remain free.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
