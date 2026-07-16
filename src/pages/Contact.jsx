import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';

const Contact = () => {
  return (
    <div>
      <div className="page-header">
        <div className="container text-center">
          <h1>Contact Us</h1>
          <p>Have questions, feedback, or want to contribute? We'd love to hear from you.</p>
        </div>
      </div>

      <div className="section">
        <div className="container-sm">
          <div className="grid grid-2 gap-xl" style={{ gridTemplateColumns: '1fr 1.5fr' }}>
            
            <div className="flex-col gap-lg">
              <div className="card bg-secondary">
                <h3 className="text-xl mb-md">Get in Touch</h3>
                <p className="text-secondary text-sm mb-lg">
                  Fill out the form and our team will get back to you within 24 hours.
                </p>
                
                <div className="flex flex-col gap-md">
                  <div className="flex items-start gap-md">
                    <div className="text-primary mt-xs"><FiMail size={20} /></div>
                    <div>
                      <div className="font-bold text-sm">Email</div>
                      <div className="text-secondary text-sm">hello@placementprep.com</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-md">
                    <div className="text-primary mt-xs"><FiMapPin size={20} /></div>
                    <div>
                      <div className="font-bold text-sm">Location</div>
                      <div className="text-secondary text-sm">Bangalore, Karnataka, India</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card card-gradient mt-lg">
                <h3 className="text-xl text-white mb-sm">Share Interview Experience</h3>
                <p className="text-white opacity-80 text-sm mb-md">
                  Recently gave an interview? Help juniors by sharing your experience!
                </p>
                <button className="btn w-full" style={{ background: 'white', color: 'var(--primary)' }}>
                  Contribute Now
                </button>
              </div>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold mb-lg">Send a Message</h2>
              <form className="flex flex-col gap-md" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-2 gap-md">
                  <div>
                    <label className="text-sm font-bold text-secondary mb-xs block">First Name</label>
                    <input type="text" className="input" placeholder="John" />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-secondary mb-xs block">Last Name</label>
                    <input type="text" className="input" placeholder="Doe" />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-bold text-secondary mb-xs block">Email Address</label>
                  <input type="email" className="input" placeholder="john@example.com" />
                </div>
                
                <div>
                  <label className="text-sm font-bold text-secondary mb-xs block">Subject</label>
                  <select className="input" style={{ cursor: 'pointer' }}>
                    <option>General Inquiry</option>
                    <option>Report Content Error</option>
                    <option>Partnership/Sponsorship</option>
                    <option>Technical Support</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-bold text-secondary mb-xs block">Message</label>
                  <textarea className="input" rows="5" placeholder="How can we help you?"></textarea>
                </div>
                
                <button type="submit" className="btn btn-primary btn-lg mt-sm">
                  Send Message
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
