const MongoClient = require('mongodb').MongoClient;

const mongo = async(url, _db) => {
	try {
		const db = await MongoClient.connect(url, { useUnifiedTopology: true });
		const dbo = await db.db(_db);

		return {
			find: async(obj, collection) => {
				try {
					const x =  await dbo.collection(collection).find(obj).toArray();
					return x;
				} catch(e) {
					throw e;
				}
			},
			query: async(query, collection) => {
				try {
					//query is an object
					const x =  await dbo.collection(collection).find(query).toArray();
					return x;
				} catch(e) {
					throw e;
				}
			}, 
			sort: async(sort, collection) => {
				try {
					const x =  await dbo.collection(collection).find({}).sort(sort).toArray();
					return x;
				} catch(e) {
					throw e;
				}
			}, 
			deleteOne: async(query, collection) => {
				try {
					const x =  await dbo.collection(collection).deleteOne(query);
					const status = [{status: "OK", message: "1 Document Deleted"}];
					return status;
				} catch(e) {
					throw e;
				}
			},
			deleteMany: async(query, collection) => {
				try {
					// query format
					// {address: /^0/}
					const x =  await dbo.collection(collection).deleteMany(query);
					const status = [{status: "OK", message: "2 Documents Deleted"}];
					return status;
				} catch(e) {
					throw e;
				}
			},
			createDB: async() => {				
				return {
					createCollection: async(collection) => {
						try {
							const res = await dbo.createCollection(collection)
							if(res) {
								return [{status: "OK", message: "1 Collection Created"}];
							}
						} catch(e) {
							if(e) throw e;
						}
					}
				}
			},
			collection: async(_collection) => {
				try {
				const res = await dbo.collection(_collection);
				return {
					drop: async() => {
						try {
							const _res = await res.drop();
							if(_res) {
								return [{status: "OK", message: "1 Collection Dropped"}];
							}
						}
						catch(e) {
							throw e;
						}	
					}
				}
				} catch(e) {
					throw e;
				}
			}, 
			insert:async(_data, _collection) => {
				try {
					const res = await dbo.collection(_collection);
					const data = res.insertOne(_data);
					if(data) {
						return "Document inserted";
					}
				} catch(e) {
					throw e;
				}
			},
			update:async() => {},
			limit: async() => {},
			join: async() => {}
		};
	}	
	catch(e) {
		throw e;
	}
}

module.exports = {mongo}

// mongo("mongodb://localhost:27017", "DB001").then(res => {
// 	// res.createDB().then(data => {
// 	// 	data.createCollection("pep")
// 	// })
// 	const data = {
// 		id: 1,
// 		name: "David"
// 	}
// 	// res.insert(data, "pep").then(res => {
// 	// 	console.log(res)
// 	// })
// 	res.query(data, "pep").then(res => {
// 		console.log(res)
// 	})
// 	// res.deleteMany({name: /^0/}, "pep").then(res => {
// 	// 	console.log(res)
// 	// })
// })