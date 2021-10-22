const graphql = require('graphql');
const _ = require('lodash')
const Movie = require('../models/movie')
const Director = require('../models/director')

const {
   GraphQLObjectType,
   GraphQLString,
   GraphQLSchema,
   GraphQLID,
   GraphQLInt,
   GraphQLList,
   GraphQLNonNull
} = graphql;


const MovieType = new GraphQLObjectType({
   name: 'Movie',
   fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      genre: { type: GraphQLString },
      director: {
         type: DirectorType,
         resolve(parent, args) {
            // return _.find(directors, { id: parent.directorId });
            return Director.findById(parent.directorId);
         }
      }
   })
})

const DirectorType = new GraphQLObjectType({
   name: 'Director',
   fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      age: { type: GraphQLInt },
      movies: {
         type: new GraphQLList(MovieType),
         resolve(parent, args) {
            // return _.filter(movies, { directorId: parent.id })
            return Movie.find({ directorId: parent.id })
         }
      }
   })
})

const RootQuery = new GraphQLObjectType({
   name: 'RootQueryType',
   fields: () => ({
      movie: {
         type: MovieType,
         args: { id: { type: GraphQLID } },
         resolve(parent, args) {
            //get data from database
            // return _.find(movies, { id: args.id });
            return Movie.findById(args.id);
         }
      },
      director: {
         type: DirectorType,
         args: { id: { type: GraphQLID } },
         resolve(parent, args) {
            // return _.find(directors, { id: args.id });
            return Director.findById(args.id);
         }
      },
      movies: {
         type: new GraphQLList(MovieType),
         resolve(parent, args) {
            // return movies;
            return Movie.find({});
         }
      },
      directors: {
         type: new GraphQLList(DirectorType),
         resolve(parent, args) {
            // return directors;
            return Director.find({});
         }
      }
   })
})

const Mutation = new GraphQLObjectType({
   name: 'Mutation',
   fields: {
      addDirector: {
         type: DirectorType,
         args: {
            name: { type: new GraphQLNonNull(GraphQLString) },
            age: { type: new GraphQLNonNull(GraphQLInt) }
         },
         resolve(parent, args) {
            let director = new Director({
               name: args.name,
               age: args.age,
            })
            return director.save()
         }
      },
      addMovie: {
         type: MovieType,
         args: {
            name: { type: new GraphQLNonNull(GraphQLString) },
            genre: { type: new GraphQLNonNull(GraphQLString) },
            directorId: { type: new GraphQLNonNull(GraphQLID) }
         },
         resolve(parent, args) {
            let movie = new Movie({
               name: args.name,
               genre: args.genre,
               directorId: args.directorId
            })
            return movie.save();
         }
      }
   }
})

module.exports = new GraphQLSchema({
   query: RootQuery,
   mutation: Mutation
})