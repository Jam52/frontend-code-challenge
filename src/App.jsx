import React, { useEffect, useState } from 'react';
import './App.css';

const URL_PATH =
  'https://gist.githubusercontent.com/bar0191/fae6084225b608f25e98b733864a102b/raw/dea83ea9cf4a8a6022bfc89a8ae8df5ab05b6dcc/pokemon.json';

const App = () => {
  const [state, setState] = useState({
    pokemonData: [],
    loading: false,
  });

  const [input, setInput] = useState('');

  useEffect(() => {
    setState({ ...state, loading: true });
    const fetchData = async () => {
      const result = await fetch(URL_PATH);
      const data = await result.json();
      console.log(data);
      setState({ loading: false, pokemonData: await data });
    };
    fetchData();
  }, []);

  const noResult = (
    <li>
      <img
        src="https://cyndiquil721.files.wordpress.com/2014/02/missingno.png"
        alt=""
      />
      <div className="info">
        <h1 className="no-results">No results</h1>
      </div>
    </li>
  );

  const filterPokemonByName = (pokemon) => {
    if (input.length > 0) {
      if (pokemon.Name.toLowerCase().includes(input.toLowerCase())) {
        return true;
      }
      if (pokemon.Types.join(' ').toLowerCase().includes(input.toLowerCase())) {
        return true;
      }
      return false;
    }
    return true;
  };

  const topFourResults = state.pokemonData
    .filter((pokemon) => {
      return filterPokemonByName(pokemon);
    })
    .map((data) => {
      return (
        <li key={data.Number}>
          <img src={data.img} alt={data.About} />
          <div className="info">
            <h1>
              <span className="hl">{data.Name}</span>
            </h1>
            {data.Types.map((type) => {
              return (
                <span className={`type ${type.toLowerCase()}`}>{type}</span>
              );
            })}
          </div>
        </li>
      );
    })
    .slice(0, 4);

  const handleInput = (event) => {
    setInput(event.target.value);
    console.log(event.target.value);
  };

  return (
    <>
      <label htmlFor="maxCP" className="max-cp">
        <input type="checkbox" id="maxCP" />
        <small>Maximum Combat Points</small>
      </label>
      <input
        type="text"
        className="input"
        placeholder="Pokemon or type"
        onChange={(event) => handleInput(event)}
        value={input}
      />
      {state.loading ? <div className="loader"></div> : null}
      <ul className="suggestions">{topFourResults}</ul>
    </>
  );
};

export default App;
