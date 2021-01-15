const {connection} = require('../config');
const axios = require('axios');
const getEarnings = (req, res) => {
    const {userId, type} = req.params;

    if(type == "getAddresses") {
        let btcAmount;
        let ethAmount;
        const query = `SELECT name, public, addresss, wif FROM addresses WHERE user_id = ${userId}`
        connection.query(query, async (err, result) => {
            if(err) {
                res.json({type: "Error", message: "Internal Server Error"})
            } else {
                // res.json({type: "Success", message: result})
                try {
                    const res_ = await axios.get(`https://api.blockcypher.com/v1/btc/main/addrs/${result[0].addresss}/balance`);
                    if(res_.data) {
                        console.log('Btc Price Gotten')
                        btcAmount = res_.data.balance;
                        try {
                            const _res = await axios.get(`https://api.blockcypher.com/v1/eth/main/addrs/${result[1].addresss}/balance`);
                            if(_res.data) {
                                console.log('Eth Price Gotten')
                                ethAmount = _res.data.balance;
                                res.json({type: "Success", message: {
                                    btc: {
                                        public: result[0].public,
                                        wif: result[0].wif,
                                        private: result[0].private,
                                        address: result[0].addresss,
                                        balance:  btcAmount,
                                        coin: "btc"
                                    },
                                    eth: {
                                        public: result[1].public,
                                        wif: result[1].wif,
                                        private: result[1].private,
                                        address: result[1].addresss,
                                        balance:  ethAmount,
                                        coin: "eth"
                                    }
                                }})
                            }
                        } catch(e) {
                            console.log(e)
                        }
                    } else {
                        console.log('Err 2')
                        res.json({type: "Error", message: "Internal Server Error"})
                    }

                } catch(err) {
                    console.log('err3')
                    res.json({type: "Error", message: "Internal Server Error"})
                    return;
                }
            }
        })
    } else if(type == "getEarnings") {
        const query = `SELECT btc_investment_balance, eth_investment_balance FROM balances WHERE user_id = ${userId}`;
        connection.query(query, (err, result) => {
            if(err) {
                res.json({type: "Error", message: "Internal Server Error"})
            } else {
                res.json({type: "Success", message: {
                    btc: result[0].btc_investment_balance,
                    eth: result[0].eth_investment_balance,
                }})
            }
        })
    }
}

module.exports = {
    getEarnings
}