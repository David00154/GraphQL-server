const axios = require('axios');
const jwt = require('jsonwebtoken'); 
// const mongo = require('./mongo');

const generateBtcAddress = async() => {
    try {
        const res = await axios.post('https://api.blockcypher.com/v1/btc/main/addrs');
			return res.data;
    } catch(e) {
        throw e;
    }
}

const generateEthAddress = async() => {
    try {
        const res = await axios.post('https://api.blockcypher.com/v1/eth/main/addrs');
			return res.data;
    } catch(e) {
        throw e;
    }
}

// const y = [{name: 'eth', public: "445"}, {name: 'btc', public: "147"}]


const createWallet = async(options) => {
    const {name} = options;
    var data = {name, addresses: []};
    const btc = await generateBtcAddress();
    if(btc){
        const {public, private, address, wif} = btc;
        data.addresses.push({name: "btc", address, public, private, wif});
        //  console.log(btc)
    }

    const eth = await generateEthAddress();
    if(eth) {
        // console.log(eth)
        const {public, private, address, wif} = eth;
        data.addresses.push({name: "eth", address, public, private, wif});
    }
    
    if(btc && eth) {
        // const response = {
        //     wallet: {
        //         public,
        //         private,
        //         address,
        //         wif,
        //         name: data.name,
        //         addresses: [...data.addresses]
        //     }
        // }
        return data.addresses;
    }
}

const signData = (options) => {
    try {
        const token = jwt.sign({payload: options}, '00154abs');
        if(token) {
            return token
        }
    } catch(e) {
        console.error(e)
    }
}

const finalizeLogin = async(options) => {
    // const {email, password} = options;
    // try {
    //     const data = await mongo();
    //     const res = await data.find();
    // } catch(e) {
    //     throw e;
    // }
}

// function now() {
    // 	var currentdate = new Date();
    // 	return currentdate.getFullYear() + "-" + currentdate.getMonth() 
    // 	+ "-" + currentdate.getDay() + " " 
    // 	+ currentdate.getHours() + ":" 
    // 	+ currentdate.getMinutes() + ":" + currentdate.getSeconds();
    // }


    // const wallet = {
// 	bearerToken: `Bearer ${signData({
// 		name,
// 		email,
// 		phoneNumber,
// 		password
// 	})}`,
// 	name: createdWallet.wallet.name,
// 	addresses: createdWallet.wallet.addresses
// };




module.exports = {
    generateBtcAddress,
    signData,
    createWallet,
    finalizeLogin
}