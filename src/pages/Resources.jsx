import { FiDownload, FiFileText, FiVideo, FiLink } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Resources = () => {
  const resources = [
    {
      title: "Resume Templates",
      description: "ATS-friendly resume templates used by students placed in top MNCs.",
      icon: <FiFileText />,
      color: "var(--primary)",
      items: [
        { name: "SDE Resume Template (Docs)", type: "Doc" },
        { name: "Consulting Resume Template", type: "PDF" },
        { name: "Freshers Minimalist Template", type: "Figma" }
      ]
    },
    {
      title: "Cheat Sheets",
      description: "Quick revision notes for last-minute interview preparation.",
      icon: <FiDownload />,
      color: "var(--accent)",
      items: [
        { name: "Data Structures & Algorithms", type: "PDF" },
        { name: "SQL Queries & Joins", type: "PDF" },
        { name: "Object Oriented Programming", type: "PDF" }
      ]
    },
    {
      title: "Video Tutorials",
      description: "Curated playlists for aptitude and technical concepts.",
      icon: <FiVideo />,
      color: "var(--warning)",
      items: [
        { name: "TCS NQT Aptitude Crash Course", type: "YouTube" },
        { name: "Dynamic Programming in 5 Hours", type: "YouTube" },
        { name: "System Design for Freshers", type: "YouTube" }
      ]
    },
    {
      title: "Useful Links",
      description: "Important career portals and coding platforms.",
      icon: <FiLink />,
      color: "var(--secondary)",
      items: [
        { name: "LeetCode Top Interview 150", type: "Link" },
        { name: "GeeksforGeeks Placement Series", type: "Link" },
        { name: "HackerRank Interview Prep Kit", type: "Link" }
      ]
    }
  ];

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>Free Resources</h1>
          <p>Download cheat sheets, templates, and guides to accelerate your preparation.</p>
        </div>
      </div>

      <div className="section">
        <div className="container-sm">
          <div className="grid grid-2 gap-lg">
            {resources.map((category, index) => (
              <motion.div 
                key={index}
                className="card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-md mb-md">
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '12px',
                    background: `${category.color}15`, color: category.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px'
                  }}>
                    {category.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{category.title}</h2>
                    <p className="text-sm text-secondary">{category.description}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-sm mt-lg">
                  {category.items.map((item, i) => (
                    <div key={i} className="flex justify-between items-center p-sm bg-secondary rounded-md hover:bg-dark-elevated transition-colors cursor-pointer">
                      <div className="font-medium text-sm">{item.name}</div>
                      <div className="badge badge-gray text-xs">{item.type}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-2xl info-banner">
            <div><strong>Note:</strong> Most downloadable resources require a free account to access. This helps us prevent spam and server overload. Please login to download PDFs and Templates.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
