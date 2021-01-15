const {connection} = require('../config');

const login = (req, res) => {
    const {email, password} = req.params;
    console.log(req.params)

    // const query = `SELECT * FROM `users` WHERE email = "${email}" AND password = "${password}";`;
    const query = `
    SELECT users.id, users.name, users.email, users.token, wallets.wallet_name FROM users INNER JOIN wallets on wallets.user_id = users.id WHERE email = "${email}" AND password = "${password}" 
    `;

    connection.query(query, (err, result) => {
        if(err) {
            res.json({type: "Error", message: "Internal Server Error"});
        } else if(result.length == 0) {
            res.json({type: "Invalid", message: "Email and Password Does Not exist"})
        } else {
            res.json({type: "Success", message: result})
        }
    })
}

module.exports = {login}