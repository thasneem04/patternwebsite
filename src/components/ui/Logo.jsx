import React from 'react';

const Logo = ({ size = 36, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    style={{ filter: 'drop-shadow(0px 4px 12px rgba(37, 99, 235, 0.4))' }}
  >
    {/* Base square with gradient */}
    <rect width="100" height="100" rx="24" fill="url(#logo_gradient)" />
    
    {/* Abstract P and Book/Target Symbol */}
    <path 
      d="M32 75V25C32 25 45 25 55 25C65 25 72 32 72 40C72 48 65 55 55 55H32" 
      stroke="white" 
      strokeWidth="12" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    
    <path 
      d="M50 55L72 75M72 75V60M72 75H57" 
      stroke="#22D3EE" 
      strokeWidth="10" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    
    <defs>
      <linearGradient id="logo_gradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2563EB" />
        <stop offset="0.5" stopColor="#4F46E5" />
        <stop offset="1" stopColor="#7C3AED" />
      </linearGradient>
    </defs>
  </svg>
);

export default Logo;
