const graphql = require('graphql');
const {GraphQLObjectType, 
	GraphQLList, GraphQLInt, 
	GraphQLString, 
	GraphQLBoolean, 
	GraphQLSchema} = graphql;
const {ProductsType} = require('./types');
const {mongo} = require('./mongo');
// const {mutation} = require('./mutation');
 const uri = "mongodb+srv://davidbriggs:00154abs@cluster001.ueang.mongodb.net/ShopApp?retryWrites=true&w=majority"
const RootQuery = new GraphQLObjectType({
	name: "RootQuery",
	fields: {
		Products: {
			type: new GraphQLList(ProductsType),
			resolve: async() => {
				// return mongo("mongodb://127.0.0.1:27017/", "ShopApp").then(({find}) => {
				// 	return find({}, "Products");
				// });
				try {
					
					const res = await mongo(uri, "ShopApp")
					const data = await res.find({}, "Products");
					return data;
				} catch(e) {
					throw e;
				}
			}
		},
		Product: {
			type: new GraphQLList(ProductsType),
			args: {
				slug: {type: GraphQLString}
			},
			resolve: async(_, {slug}) => {
				try {
					const res = await mongo(uri, "ShopApp");
					const data = await res.query({name: slug}, "Products");
						return data;
				} catch(e) {
					if(e){
						return e;
					}
				}
			}
		}
	}
});

const schema = new GraphQLSchema({
	query: RootQuery
});

module.exports = {
	schema
}