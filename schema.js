const graphql = require('graphql');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const {signData, finalizeLogin} = require('./utilities');
const {
	GraphQLObjectType, 
	GraphQLList, GraphQLInt, 
	GraphQLString, 
	GraphQLBoolean,
	GraphQLSchema
} = graphql;

const {SignUpType, LogInType} = require('./types');
const {mutation} = require('./mutation');

 const RootQuery = new GraphQLObjectType({
	name: "RootQuery",
	fields: {
		LogIn: {
			type: LogInType,
			args: {
				email: {type: GraphQLString},
				password: {type: GraphQLString},
			},
			resolve: async(_, {email, password}) => {

				const authLogin = await finalizeLogin({email, password});

				const data = {
					name,
					email,
					password,
					country,
					countryCode,
					phoneNumber,
					wallet: {
						bearerToken: `Bearer ${signData({
							name,
							email,
							phoneNumber,
							password
						})}`,
						name: createdWallet.wallet.name,
						addresses: createdWallet.wallet.addresses
					},
					token: `Bearer ${signData({
						name,
						email,
						phoneNumber,
						password
					})}`
				};
				return data
			}
		}
	}
});

const schema = new GraphQLSchema({
	query: RootQuery,
	mutation
});

module.exports = {
	schema
}