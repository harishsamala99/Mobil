import React from 'react';

const StandardMobilLogo = () => (
  <svg viewBox="0 0 250 50" className="h-full w-full" aria-label="Mobil Logo">
    <text
      x="45"
      y="40"
      className="font-heading font-black text-5xl"
      aria-hidden="true"
    >
      <tspan className="fill-current text-mobil-blue">M</tspan>
      <tspan className="fill-current text-accent">o</tspan>
      <tspan className="fill-current text-mobil-blue">bil</tspan>
    </text>
  </svg>
);

const F1CarLogo = () => (
    <svg
    viewBox="0 0 250 50"
    className="h-full w-full"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Mobil F1 Car Logo"
  >
    {/* Rear Wing */}
    <path d="M220 10 L245 10 L240 22 L225 22 Z" className="fill-current text-secondary dark:text-light/80" />
    <path d="M222 12 H 243 V 15 H 222 Z" className="fill-current text-primary dark:text-secondary" />
    <path d="M228 22 L225 30 L230 30 Z" className="fill-current text-secondary dark:text-light/80" />

    {/* Main Body */}
    <path d="M40 25 C 80 20, 150 18, 190 20 L225 22 L225 32 L190 35 C 150 36, 80 35, 40 30 Z" className="fill-current text-accent" />
    
    {/* Floor */}
    <path d="M40 30 C 80 35, 150 36, 190 35 L225 32 V 36 H 40 Z" className="fill-current text-primary" />

    {/* Cockpit & Halo */}
    <path d="M140 18 C 145 15, 155 15, 160 18 L155 22 L145 22 Z" className="fill-current text-primary" />

    {/* MOBIL Text */}
    <text
      x="55"
      y="31"
      className="font-heading font-black text-[11px] text-light fill-current"
    >
      M
    </text>
    <text
      x="105"
      y="31"
      className="font-heading font-black text-[11px] text-light fill-current"
    >
      BIL
    </text>

    {/* Rear Wheel (The 'O') */}
    <g transform="translate(70, 12)">
      <circle cx="15" cy="20" r="15" className="fill-current text-primary" />
      <circle cx="15" cy="20" r="13" className="fill-current text-secondary/80 dark:text-black" />
      <circle cx="15" cy="20" r="6" className="fill-current text-accent" />
      <circle cx="15" cy="20" r="3" className="fill-current text-primary" />
    </g>

    {/* Front Wheel */}
    <g transform="translate(190, 20)">
      <circle cx="12" cy="12" r="12" className="fill-current text-primary" />
      <circle cx="12" cy="12" r="10" className="fill-current text-secondary/80 dark:text-black" />
      <circle cx="12" cy="12" r="5" className="fill-current text-accent" />
      <circle cx="12" cy="12" r="2" className="fill-current text-primary" />
    </g>

    {/* Front Wing */}
    <path
      d="M0 28 H35 C 40 28, 45 25, 50 22 L 55 22 C 50 25, 45 31, 35 31 H0 Z"
      className="fill-current text-secondary dark:text-light/80"
    />
    <path
      d="M5 29 H 30" stroke="currentColor" className="stroke-current text-primary dark:text-secondary" strokeWidth="1"
    />
  </svg>
);


export const Logo = (props: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="relative h-12 w-[240px]" {...props}>
      {/* Standard Logo */}
      <div className="absolute inset-0 animate-standard-logo-morph">
        <StandardMobilLogo />
      </div>
      {/* F1 Car Logo */}
      <div className="absolute inset-0 animate-f1-logo-morph">
        <F1CarLogo />
      </div>
    </div>
  );
};
