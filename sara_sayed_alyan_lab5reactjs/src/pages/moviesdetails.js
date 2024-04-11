import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';

function MoviesDetails() {
    const { id } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=1c61f7854caf371b34a23ef611f0efed`)
            .then((res) => setMovieDetails(res.data))
            .catch((err) => console.log(err));
    }, [id]);

    if (!movieDetails) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <h1>{movieDetails.title}</h1>
            <Row style={{ backgroundColor: '#eceff1' }}>
                <Col md={4}>
                    <Image src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`} alt={movieDetails.title} fluid />
                </Col>
                <Col md={8}>
                    <p>{movieDetails.overview}</p>
                    <p><strong>Release Date:</strong> {movieDetails.release_date}</p>
                    <p><strong>Runtime:</strong> {movieDetails.runtime} minutes</p>
                    <p><strong>Genres:</strong> {movieDetails.genres.map(genre => genre.name).join(', ')}</p>
                    <p><strong>Popularity:</strong> {movieDetails.popularity}</p>
                    <p><strong>Vote Average:</strong> {movieDetails.vote_average}</p>
                </Col>
            </Row>
        </Container>
    );
}

export default MoviesDetails;