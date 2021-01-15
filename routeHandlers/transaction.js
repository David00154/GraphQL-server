const axios = require('axios');
const {connection} = require('../config');


const addToWallet = ({type, profit, id, price}) => {
    if(price == "$400usd bitcoin") {
        setTimeout(() => {
            const query =  `INSERT INTO balances (btc_investment_balance) VALUES (${profit.split(' ')[1]}) WHERE user_id = ${id}`;
                connection.query(query, (err, result) => {
                    if(err) {
                        res.json({type: "Error", message: "Internal Server Error"});
                        return;
                    } else {
                        res.json({type: "Sucess", message: "Success"})
                    }
                })  
        }, 21600000)
        return;
    } else if(price === "$20000usd bitcoin") {
        setTimeout(() => {
            const query =  `INSERT INTO balances (btc_investment_balance) VALUES (${profit.split(' ')[1]}) WHERE user_id = ${id}`;
                connection.query(query, (err, result) => {
                    if(err) {
                        res.json({type: "Error", message: "Internal Server Error"});
                        return;
                    } else {
                        res.json({type: "Sucess", message: "Success"})
                    }
                })  
        }, 86400000)
        return;
    } else if(price === "$800usd bitcoin") {
        setTimeout(() => {
            const query =  `INSERT INTO balances (btc_investment_balance) VALUES (${profit.split(' ')[1]}) WHERE user_id = ${id}`;
                connection.query(query, (err, result) => {
                    if(err) {
                        res.json({type: "Error", message: "Internal Server Error"});
                        return;
                    } else {
                        res.json({type: "Sucess", message: "Success"})
                    }
                })  
        }, 43200000)
        return;
    } else if(price === "$1400usd bitcoin") {
        setTimeout(() => {
            const query =  `INSERT INTO balances (btc_investment_balance) VALUES (${profit.split(' ')[1]}) WHERE user_id = ${id}`;
                connection.query(query, (err, result) => {
                    if(err) {
                        res.json({type: "Error", message: "Internal Server Error"});
                        return;
                    } else {
                        res.json({type: "Sucess", message: "Success"})
                    }
                })  
        }, 43200000)
        return;
    }
}

const makeTransaction = async(req, res) => {
const {
    id,
    name,
    coin,
    price,
    profit,
    email,
    type
} = req.body;
    try {
        const _res_ = await axios.get(`https://api.blockcypher.com/v1/btc/main/addrs/3JtTJ2sBXqvh31VkjoGEpKuSqEqrLp1e11/balance`);
            const isSame = () => _res_.data.balance >= 0.09
            if(!isSame()) {
                res.json({type: "Error", message: "You Must Have At Least 0.09btc In Your Wallet To Access This Plan"});
                return;
            } else {
                addToWallet({type, profit: `${profit.split(' ')[1].split('usd')[0]}`, id, price});
                res.json({type: "Success", message: ""}) 
            }



    } catch(e) {
        res.json({type: "Error", message: "Internal Serval Error"});
    } 
};

module.exports = {
    makeTransaction
}