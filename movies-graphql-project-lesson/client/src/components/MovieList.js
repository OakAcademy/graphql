import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_MOVIES_QUERY } from '../queries/queries'
import MovieDetails from './MovieDetails';


function MovieList() {
   const { loading, data } = useQuery(GET_MOVIES_QUERY)
   const [selectedMovie, setSelectedMovie] = useState(null)

   if (loading) return <p>Loading...</p>;
   console.log(data);

   const renderMovies = () => {
      return (
         data.movies.map((movie) => {
            return (
               <li key={movie.id} onClick={(e) => setSelectedMovie(movie.id)}>{movie.name}</li>
            )
         })
      )
   }

   return (
      <div>
         <ul>
            {renderMovies()}
         </ul>
         <MovieDetails selectedMovie={selectedMovie} />
      </div>
   );
}

export default MovieList;