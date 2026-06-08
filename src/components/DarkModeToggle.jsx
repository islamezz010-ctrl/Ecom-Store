import React, { useEffect, useState } from 'react';

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage or system preference
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark'; 
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="relative cursor-pointer h-10 w-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 hover:ring-2 ring-blue-500 transition-all active:scale-90"
      aria-label="Toggle Dark Mode"
    >
      <span className="text-xl">
        {isDark ? '🌙' : '☀️'}
      </span>
    </button>
  );
};

export default DarkModeToggle;