const axios = require("axios").default;

// General information about a blockchain is available by GET-ing the base resource.
// axios.get('https://api.blockcypher.com/v1/btc/main')
// .then(res => console.log(res.data))
// .catch(e => console.log(e))

//Block Hash Endpoint
//If you want more data on a particular block, you can use the Block Hash endpoint
// e.g /blocks/$BLOCK_HASH

// axios.get('https://api.blockcypher.com/v1/btc/main/blocks/0000000000000000189bba3564a63772107b5673c940c16f12662b3e8546b412https://api.blockcypher.com/v1/btc/main')
// .then(res => console.log(res.data))
// .catch(e => console.log(e))

//Address Balance Endpoint

// axios.get('https://api.blockcypher.com/v1/btc/main/addrs/1DEP8i3QJCsomS4BSMY2RpU1upv62aGvhD/balance')
// .then(res => console.log(res.data))
// .catch(e => console.log(e))

//Address Endpoint
// axios.get('https://api.blockcypher.com/v1/btc/main/addrs/1DEP8i3QJCsomS4BSMY2RpU1upv62aGvhD')
// .then(res => console.log(res.data))
// .catch(e => console.log(e))

//Address Full Endpoint

// axios.get('https://api.blockcypher.com/v1/btc/main/addrs/1DEP8i3QJCsomS4BSMY2RpU1upv62aGvhD/full?before=300000')
// .then(res => console.log(res.data))
// .catch(e => console.log(e))

//Generate Address Endpoint

// axios.post('https://api.blockcypher.com/v1/btc/main/addrs')
// .then(res => console.log(res.data))
// .catch(e => console.log(e))

//Create Wallet Endpoint
// endpoint => https://api.blockcypher.com/v1/btc/main/wallets?token=YOURTOKEN

// var data = {"name": "pap","addresses": ["1HhwN6MxyKYqfnFWGMvo4axhjYEfqYVjkY"]};
// var USERTOKEN =  '206565bff23d4deb85a0d047e7c4a250';
// axios.post(`https://api.blockcypher.com/v1/btc/main/wallets?token=${USERTOKEN}`, JSON.stringify(data))

// .then(res => console.log(res.data))
// .catch(e => console.log(e))

// const generateBtcAddress = async() => {
//     try {
//         const res = await axios.post('https://api.blockcypher.com/v1/btc/main/addrs');
//         console.log(res.data)
//         // const data = await res.json();
//         // if(data) {
//         //     return  data.data
//         // }
//     } catch(e) {
//         console.error(e)
//     }
// }
//
// console.log();
// generateBtcAddress()

axios.get('https://api.blockcypher.com/v1/eth/main/addrs/826350944cf25ba3a07d11c98ed6f504ee7c33aa/balance')
.then(res => console.log(res.data))
.catch(e => console.log(e))