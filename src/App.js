import React, {useState, useEffect}from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([]);
  useEffect(() => {
    api.get('repositories').then( response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const repository = {
      title: `Novo Repositório${new Date().getSeconds()}`,
      url: `http://github.com/teste/teste${new Date().getSeconds()}`,
      techs: ["Nodejs", "ReactJs", "Java"]
    }
    const response = await api.post('repositories', repository);
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    setRepositories(repositories.filter(repo => repo.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repository => {
          return (
              <li key={repository.id}>
                {repository.title}
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li>
            )
          })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
