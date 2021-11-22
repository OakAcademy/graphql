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
               <li className="list-group-item m-2 shadow-sm " style={{ cursor: 'pointer', borderRadius: '5px' }} key={movie.id} onClick={(e) => setSelectedMovie(movie.id)}>{movie.name}</li>
            )
         })
      )
   }

   return (
      <div className="row h-100">
         <div className="col-md-7 p-4">
            <ul className="list-group list-group-horizontal flex-wrap">
               {renderMovies()}
            </ul>
         </div>
         <div className="col-md-5 p-4 text-white" style={{ backgroundColor: '#457b9d' }}>
            <MovieDetails selectedMovie={selectedMovie} />
         </div>
      </div>
   );
}

export default MovieList;