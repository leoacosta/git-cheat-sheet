import React, { useState } from 'react';
import './App.css';
import commands from './data.json';
import logoGit from './logo-git.svg';
import logoGitHub from './logo-github.svg';

interface Commands {
  name: string;
  description: string;
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Commands[]>([]);

  // filter items based on search term
  const results = commands.filter((command) =>
    command.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // store search term in state
  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    setSearchTerm(event.currentTarget.value);

    // @ts-ignore
    if (event.code === 'Enter') {
      setSearchResults(results);
    }
  }

  return (
    <div className="App">
      <header className="header">
        <div className="d-flex">
          <img src={logoGit} alt="Git Logo" className="logo" />
          <p className="site-title">The Git cheat sheet</p>
        </div>
        <a
          className="d-flex"
          href="https://github.com/leoacosta/git-cheat-sheet/"
        >
          <img src={logoGitHub} alt="GitHub Logo" className="logo--small" />
          <p className="site-contribution">View on GitHub</p>
        </a>
      </header>
      <main className="App-header">
        <p>
          <code>Search for any git command you can think of.</code>
        </p>
        <div className="search">
          <input
            className="search-input"
            type="text"
            placeholder="Search git command"
            value={searchTerm}
            onChange={handleChange}
            onKeyPress={handleChange}
          />
          <button
            className="search-button"
            onClick={() => setSearchResults(results)}
          >
            <svg
              width="32"
              height="32"
              version="1.1"
              viewBox="0 0 32 32"
              aria-hidden="false"
            >
              <path d="M22 20c1.2-1.6 2-3.7 2-6 0-5.5-4.5-10-10-10S4 8.5 4 14s4.5 10 10 10c2.3 0 4.3-.7 6-2l6.1 6 1.9-2-6-6zm-8 1.3c-4 0-7.3-3.3-7.3-7.3S10 6.7 14 6.7s7.3 3.3 7.3 7.3-3.3 7.3-7.3 7.3z"></path>
            </svg>
          </button>
        </div>
        {searchResults.map((item: Commands, index) => (
          <div className="search-result" key={index}>
            <h2>
              <code>{item.name}</code>
            </h2>
            <p>
              <code>{item.description}</code>
            </p>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
