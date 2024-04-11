import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Container, Pagination, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Movies.css';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState('en'); 
  useEffect(() => {
    fetchMovies();
  }, [currentPage, language]); 

  const fetchMovies = () => {
    let apiUrl = '';
    if (searchQuery) {
      apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=1c61f7854caf371b34a23ef611f0efed&query=${searchQuery}&page=${currentPage}&language=${language}`;
    } else {
      apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=1c61f7854caf371b34a23ef611f0efed&page=${currentPage}&language=${language}`;
    }

    axios.get(apiUrl)
      .then((res) => setMovies(res.data.results))
      .catch((err) => console.log(err));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchMovies();
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <Container>
      <div className="language-toggle">
        <button onClick={toggleLanguage}>{language === 'en' ? 'AR' : 'en'}</button>
      </div>
      <div className="movies-search">
        <input
          type="text"
          placeholder="Search movies"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>
      <Row style={{ backgroundColor: '#eceff1' }}>
        {movies.map(movie => (
          <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="movie-column">
            <Card className="movie-card">
              <Link to={`/moviesdetails/${movie.id}`}>
                <Card.Img className="movie-image" variant="top" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
              </Link>
              {movie.title}
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination className="justify-content-center mt-4">
        <Pagination.Prev className="pagination-button" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
        <Pagination.Item active>{currentPage}</Pagination.Item>
        <Pagination.Next className="pagination-button" onClick={() => handlePageChange(currentPage + 1)} />
      </Pagination>
    </Container>
  );
}

export default Movies;
