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
			insert:async() => {},
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
