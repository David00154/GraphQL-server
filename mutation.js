	const graphql = require('graphql');
	const {
		GraphQLObjectType,
		GraphQLInt,
		GraphQLList,
		GraphQLBoolean,
		GraphQLString,
		GraphQLNonNull
	} = graphql;

	const {SignUpType} = require('./types');
	const {createWallet, signData, generateBtcAddress} = require('./utilities');
	const {connection} = require('./config');


const mutation = new GraphQLObjectType({
name: 'Mutation',
fields: {
	SignUp: {
		type: SignUpType,
		args: {
			name: {type: GraphQLString},
			email: {type: GraphQLString},
			password: {type: GraphQLString},
			country: {type: GraphQLString},
			countryCode: {type: GraphQLInt},
			phoneNumber: {type: graphql.GraphQLFloat}
		},
		resolve: async(_, args) => {
			const {name, email, phoneNumber, password, country, countryCode} = args;
			// const createdWallet = await createWallet({name: `@${name}of${email}-Wallet`});
			try {
				// const createdWallet = await createWallet({name: `@${name}of${email}-Wallet`});

				const data = {
					name,
					email,
					password,
					country,
					countryCode,
					phoneNumber,
					token: `Bearer ${signData({
						name,
						email,
						phoneNumber,
						password
					})}`
				};
	
				let userId = '';
				let addressesId = '';
				let walletId = '';
	
				const UsersQuery = `INSERT INTO users (name, email, password, country, countryCode, phoneNumber, token, register_date) VALUES ?;`
				
				const UsersValues = [
					[`${data.name}`, 
					`${data.email}`, 
					`${data.password}`, 
					`${data.country}`, 
					`${data.countryCode}`, 
					`${data.phoneNumber}`, 
					new Date()]
				];

				connection.query(UsersQuery, [UsersValues], function (error, result, fields) {
					if (error) {
						console.error('Error from users INSERT')
						throw new Error('Internal server error on insert 1');
					} else {
						userId = result.insertId;
						console.log('Success on user INSERT')
						const walletQuery = `INSERT INTO wallets (name, user_id, bearerToken) VALUES ?`;
	
						const values = [
							[`${`@${data.name}of${data.email}-Wallet`}`, `${userId}`, `${data.token}`]
						]
						connection.query(walletQuery, [values], (error, result) => {
							if(error) {
								console.error('Error from wallets INSERT')
								throw new Error('Internal server error');
							} else {
								walletId = result.insertId;
								console.log('Success on wallet INSERT')
							}
						})
					}
				});

			} catch(e) {
				throw new Error(e)
			}

		}
	},
}
})
module.exports = {mutation}  