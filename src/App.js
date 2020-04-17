import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      "title": `New repository ${Date.now()}`,
      "url": "https://github.com/gsgualbano",
      "techs": ["Node", "React", "React Native"]
    });

    setRepositories(prevState => [...prevState, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(prevState => prevState.filter(repo => repo.id !== id))
  }

  useEffect(() => {
    api.get('repositories').then(res => setRepositories(res.data));
  }, [])

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
