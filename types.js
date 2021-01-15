const graphql = require('graphql');
const {
	GraphQLObjectType,
	GraphQLList,
	GraphQLInt,
	 GraphQLBoolean,
	GraphQLString,
	GraphQLFloat
} = graphql;

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
const AddressesType = new GraphQLObjectType({
	name: "AddressesType",
	description: "A AddressesType",
	fields: () => ({
		name: {type: GraphQLString},
		address: {type: GraphQLString},
		public: {type: GraphQLString},
		private: {type: GraphQLString},
		address: {type: GraphQLString},
		wif: {type: GraphQLString},
	})
})

const WalletType = new GraphQLObjectType({
	name: "_WalletType",
	description: "A WalletType",
	fields: () => ({
		name: {type: GraphQLString},
		bearerToken: {type: GraphQLString},
		addresses: {type: new GraphQLList(AddressesType)}
	})
})


const SignUpType = new GraphQLObjectType({
	name: "SignUp",
	description: "A SignupType",
	fields: () => ({
		id: {type: GraphQLInt},
		name: {type: GraphQLString},
		email: {type: GraphQLString},
		password: {type: GraphQLString},
		country: {type: GraphQLString},
		countryCode: {type: GraphQLInt},
		phoneNumber: {type: GraphQLFloat},
		wallet: {type: WalletType},
		token: {type: GraphQLString}
	})
})


const LogInType = new GraphQLObjectType({
	name: "LogIn",
	description: "A LogInType",
	fields: () => ({
		name: {type: GraphQLString},
		email: {type: GraphQLString},
		password: {type: GraphQLString},
		country: {type: GraphQLString},
		countryCode: {type: GraphQLInt},
		phoneNumber: {type: GraphQLFloat},
		wallet: {type: WalletType},
		token: {type: GraphQLString}
	})
})
module.exports = {
	SignUpType,
	LogInType
};