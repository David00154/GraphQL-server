const graphql = require('graphql');
const {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLList,
	 GraphQLBoolean,
	GraphQLString,
	GraphQLNonNull
} = graphql;
const {BooksType} = require('./types');
let books = [
  { id: 8, book: 'Sky', authorId: 2 },
  { id: 9, book: 'Bird', authorId: 2 },
  { id: 10, book: 'Broom', authorId: 1 }
];
const mutation = new GraphQLObjectType({
name: 'Mutation',
fields: {
	addBook: {
		type: new GraphQLList(BooksType),
		args: {
		id: {type: new GraphQLNonNull(GraphQLInt)},
		book: {type: new GraphQLNonNull(GraphQLString)},
		authorId: {type: new GraphQLNonNull(GraphQLInt)}
		},
		resolve(p, args) {
			 books.push(args);
			 return books;
		}
	},
	deleteBook: {
		type: new GraphQLList(BooksType),
		args: {
			id: {type: new GraphQLNonNull(GraphQLList(GraphQLInt))}
		},
		resolve: (p, args) => {
			args.id.map(id => {
				$: books = books.filter(book => id !== book.id)
			})
			return books;
		}
	}
}
})
module.exports = {mutation}  