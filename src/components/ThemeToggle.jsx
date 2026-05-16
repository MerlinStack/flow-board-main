function ThemeToggle() {
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-slate-700/50 hover:bg-slate-600/50 transition-colors"
    >
      <span className="sr-only">Toggle theme</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-slate-400"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l-.707.707a1 1 0 001.414-1.414l.707-.707a1 1 0 00-1.414-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
}

export default ThemeToggle;
