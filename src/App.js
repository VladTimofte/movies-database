import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');

  // Fetch movies from the TMDb API
  // npm install axios
  const searchMovies = async (e) => {
    e.preventDefault();

    const API_KEY = 'f7455edce462776797bf6c8e78f2d653';
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;

    try {
      const response = await axios.get(url);
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="app">
      <h1>Movie Database</h1>
      <form className="form" onSubmit={searchMovies}>
        <input
          type="text"
          className="input"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="button" type="submit">Search</button>
      </form>
      
      <div className="movie-list">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <h3>{movie.title}</h3>
            <p>{movie.overview.substring(0, 100)}...</p>
            <p><strong>Release Date:</strong> {movie.release_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
