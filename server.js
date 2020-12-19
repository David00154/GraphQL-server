const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const cors = require('cors');
const fs = require('fs');
const {schema} = require('./schema');
const path = require('path');
const coinbase = require('coinbase').Client;

const app = express();



// Allow CORS
app.use(cors())
app.use('/graphql', graphqlHTTP({
	graphiql: true,
	schema
}))

// app.get('/signup', (req, res, next) => {
	// console.log('Sign up started')
	// 	console.log(req)
	// 	res.send(JSON.stringify({
	// 		status: 'Done'
	// 	}))
// });

app.get("/", (req, res) => {
	res.send("<h1><center>Hello World!!! \n My GraphQL-server made with love...</center></h1>")
})

// app.get('/video', (req, res) => {
	// 	console.log()
	// 	console.log('Stream started')
	// 	res.status(200)
	// 	const stat = fs.statSync(__dirname + '/The Hunt (2020) (NetNaija.com).mp4');
	// 	const fileSize = stat.size;
	// 	const range = req.headers.range;
	// 	if(range) {
	// 		const parts = range.replace(/bytes=/, "").split("-");
	// 		const start = parseInt(parts[0], 10);
	// 		const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;
	// 		const chunkSize = (end-start)+1;
	// 		const file = fs.createReadStream(__dirname + '/The Hunt (2020) (NetNaija.com).mp4', {start, end});
	// 		const head = {
	// 			'Content-Range': `bytes ${start}-${end}/${fileSize}`,
	// 			'Accept-Ranges': 'bytes',
	// 			'Content-Length': chunkSize,
	// 			'Content-Type': 'video/mp4'
	// 		};
	// 		res.writeHead(206, head)
	// 		file.pipe(res);
	// 	} else {
	// 		const head = {
	// 			'Content-Length': fileSize,
	// 			'Content-Type': 'video/mp4'
	// 		};
	// 		res.writeHead(200, head)
	// 		fs.createReadStream(__dirname + '/The Hunt (2020) (NetNaija.com).mp4').pipe(res);
		//}
// });

// const url = 'mongodb://127.0.0.1:27017/';

const _coinbase = () => {

	const API_KEY = 'C36wABxTv59uAyMI';
	const API_SECRET = 'O6CHTa8fVnq0zrgrcBaBpAWhc63SKL1t';

	let client = new coinbase({'apiKey': API_KEY, 'apiSecret': API_SECRET});

	client.getAccounts({}, function(err, accounts) {
	  // accounts.forEach(function(acct) {
	  //   console.log('my bal: ' + acct.balance.amount + ' for ' + acct.name);
	  // });
		if(err) {
			return 'Error'
		} else {
			return 'Data'
		}
	})
}





app.get('/coin-base', async(req, res) => {
	const data = _coinbase();

	if(data === "Data") {
		res.send(`<h1><center>DATA</center></h1>`)
	} else {
		res.send(`<h1><center>ERROR</center></h1>`)
	}
})


const PORT = process.env.PORT || 2000;
app.listen(PORT, () => console.log(`Server statred on port ${PORT}`));