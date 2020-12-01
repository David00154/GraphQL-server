const graphql = require('graphql');
const {
	GraphQLObjectType,
	GraphQLList,
	GraphQLInt,
	 GraphQLBoolean,
	GraphQLString,
	GraphQLFloat
} = graphql;


const books = [
	{id: 1, book: 'Down Below', authorId: 2},
	{id: 2, book: 'Christ our saviour', authorId: 1},
	{id: 3, book: 'Daily guide', authorId: 2},
	{id: 4, book: 'Into life', authorId: 1},
	{id: 5, book: 'Christ the hope for everybody', authorId: 2},
	{id: 6, book: 'Up above', authorId: 1},
	{id: 7, book: 'Halleujah', authorId: 1}
];
// const authorsType = new GraphQLObjectType({
// 	name: 'Authors',
// 	description: 'An authors type',
// 	fields: () => ({
// 		id: {type: GraphQLInt},
// 		name: {type: GraphQLString},
// 		books: {
// 			type: new GraphQLList(BooksType),
// 			resolve: (parent) => {
// 				return books.filter(book => book.authorId === parent.id)
// 			}
// 		}
// 	})
// })
// 
// const BooksType = new GraphQLObjectType({
// 	name: 'BooksType',
// 	description: 'A simple BooksType',
// 	fields: () => ({
// 		id: {type: GraphQLInt},
// 		book: {type: GraphQLString},
// 		authorId: {type: GraphQLInt}
// 	})
// })
// 
// const authorType = new GraphQLObjectType({
// 	name: 'Author',
// 	description: 'A single author type',
// 	fields: () => ({
// 		id: {type: GraphQLInt},
// 		name: {type: GraphQLString},
// 		books: {
// 			type: new GraphQLList(BooksType),
// 			resolve: (parent) => {
// 				return books.filter(book => book.authorId !== parent.id)
// 			}
// 		}
// 	})
// })
// const postsType = new GraphQLObjectType({
// 	name: 'Posts',
// 	description: 'Posts Type',
// 	fields: () => ({
// 		id: {type: GraphQLInt},
// 		name: {type: GraphQLString},
// 		authorId: {type: GraphQLInt},
// 		body: {type: GraphQLString},
// 		title: {type: GraphQLString}
// 	})
// })

const ProductsType = new GraphQLObjectType({
	name: "Products",
	description: "A ProductsType",
	fields: () => ({
		name: {type: GraphQLString},
		productId: {type: GraphQLInt},
		minPrice: {type: GraphQLFloat},
		maxPrice: {type: GraphQLFloat},
		img: {type: GraphQLString}
	})
});


module.exports = {
	ProductsType
};