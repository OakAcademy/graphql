import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GET_DIRECTORS_QUERY, ADD_MOVIE_MUTATION, GET_MOVIES_QUERY } from '../queries/queries'


const AddMovie = () => {
   const [name, setName] = useState("")
   const [genre, setGenre] = useState("")
   const [directorId, setDirectorId] = useState("")
   const [addMovie] = useMutation(ADD_MOVIE_MUTATION)
   const { data, loading, error } = useQuery(GET_DIRECTORS_QUERY)

   const renderDirectors = () => {
      if (loading) return <option disabled >Loading Directors...</option>
      if (error) return <option disabled >Something went wrong!</option>
      return data.directors.map(director => {
         return <option key={director.id} value={director.id}>{director.name}</option>
      })
   }
   const handleSubmit = (e) => {
      e.preventDefault();
      if (name && genre && directorId) {
         addMovie({
            variables: {
               name,
               genre,
               directorId
            },
            refetchQueries: [{ query: GET_MOVIES_QUERY }]
         })
         console.log(name, genre, directorId);
      } else {
         alert('You can not add empty form')
      }
   }

   return (
      <form className="offset-md-9 offset-sm-6 col-sm-6 col-md-3 bg-white p-3 fixed-bottom" id="add-movie" onSubmit={handleSubmit} >
         <div className="form-group">
            <label htmlFor="movie-name">Movie Name:</label>
            <input className="form-control mt-1" id="movie-name" name="movie-name" type="text" onChange={(e) => setName(e.target.value)} />
         </div>
         <div className="form-group mt-2">
            <label htmlFor="genre">Genre:</label>
            <input className="form-control mt-1" id="genre" name="genre" type="text" onChange={(e) => setGenre(e.target.value)} />
         </div>
         <div className="d-flex flex-column mt-2">
            <label htmlFor="director"> Director: </label>
            <select className="custom-select py-2" id="director" name="director" onChange={(e) => setDirectorId(e.target.value)}>
               <option>Select a Director</option>
               {renderDirectors()}
            </select>
         </div>
         <div className="d-flex form-group mt-3 justify-content-center">
            <button className="btn btn-primary px-4" type="submit" >Add New Movie</button>
         </div>
      </form >
   )
}

export default AddMovie;
