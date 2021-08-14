import React, { useState } from 'react';
import './App.css';
import commands from './data.json';
import logoGit from './logo-git.svg';
import logoGitHub from './logo-github.svg';
import iconSearch from './icon-search.svg';

interface Commands {
  name: string;
  description: string;
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Commands[]>(commands);

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
      <header className="site-header">
        <div className="site-branding">
          <img className="site-logo" src={logoGit} alt="Git Logo" />
          <p className="site-title">The Git cheat sheet</p>
        </div>
        <div className="site-search">
          <input
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
            <img src={iconSearch} alt="Search" style={{ width: 30 }} />
          </button>
        </div>
        <div className="site-contribution">
          <a href="https://github.com/leoacosta/git-cheat-sheet/">
            <img src={logoGitHub} alt="Contribute on GitHub" />
          </a>
        </div>
      </header>
      <main className="site-content">
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
