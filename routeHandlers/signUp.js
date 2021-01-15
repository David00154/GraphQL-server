const {createWallet, signData, generateBtcAddress} = require('../utilities');
const {connection} = require('../config');
const mailer = require('nodemailer');

const signUp = async function(req, res) {
    const {name, email, phoneNumber, password, country, countryCode} = req.body.args;

    try {
        const createdWallet = await createWallet({name: `@${name}of${email}-Wallet`});

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
            `"${data.token}"`, 
            new Date()]
        ];

        const _query_ = `SELECT * FROM users WHERE email = "${email}" AND password = "${password}"`;
            connection.query(_query_, function(error, result) {
                if(error) {
                    console.log('Error 4')
                    res.json({type: 'Error', message: "Internal Server Error"})
                    return;
                } else if(result.length !== 0) {
                    res.json({type: "Error", message: `Email of ${email} and Password of ${password} already exist`})
                    return;
                } else {
                    connection.query(UsersQuery, [UsersValues], function (error, result, fields) {
                        if (error) {
                            console.log('Error 3')
                            res.json({type: 'Error', message: "Internal Server Error"})
                            return;
                            // console.error('Error from users INSERT')
                        } else {
                            userId = result.insertId;
                            console.log('Success on user INSERT')
                            const walletQuery = `INSERT INTO wallets (wallet_name, user_id, bearerToken) VALUES ?`;
            
                            const values = [
                                [`${`@${data.name}of${data.email}-Wallet`}`, `${userId}`, `${data.token}`]
                            ]
                            connection.query(walletQuery, [values], (error, result) => {
                                if(error) {
                                    res.json({type: 'Error', message: "Internal Server Error"})
                                    return;
                                    // console.error('Error from wallets INSERT')
                                    // throw new Error('Internal server error');
                                } else {
                                    console.log("Wallet created Successfully")
                                    walletId = result.insertId;

                                    const addressesQuery = `INSERT INTO addresses (user_id, wallet_id, name, addresss, public, private, wif) VALUES ?`;
                                const addressValues = [
                                    [`${userId}`, 
                                    `${walletId}`, 
                                    `${createdWallet[0].name}`, 
                                    `${createdWallet[0].address}`, 
                                    `${new Date().getTime()}`, 
                                    `${new Date().getTime()}`, 
                                    `${new Date().getTime()}`],
                                    [`${userId}`, 
                                    `${walletId}`, 
                                    `${createdWallet[1].name}`, 
                                    `${createdWallet[1].address}`, 
                                    `${new Date().getTime()}`, 
                                    `${new Date().getTime()}`, 
                                    `${new Date().getTime()}`]
                                ]
                                    connection.query(addressesQuery, [addressValues], (err, result) => {
                                        if(err) {
                                            console.log(err)
                                            res.json({type: 'Error', message: "Internal Server Error"});
                                            return;
                                        } else {
                                            const query = `INSERT INTO balances (user_id, eth_wallet_balance, btc_wallet_balance, btc_investment_balance, eth_investment_balance) VALUES (${userId}, 0, 0, 0, 0)`;
                                            connection.query(query, (err, result) => {
                                                if(err) {
                                                    console.log('Error 1')
                                                    res.json({type: 'Error', message: "Internal Server Error"})
                                                } else {
                                                    console.log("Everything went succesful")
                                                  res.json({type: "Success", message: "Account Created Successfully"})
                                                }
                                            })
                                            // var mailOptions = {
                                            //     from: "davidbriggs00154@gmail.com",
                                            //     to: `${email}`,
                                            //     subject: "Signup Successful",
                                            //     html: "<p>Welcome To Binterest</p>"
                                            //   };
                                            //   var transporter = mailer.createTransport({
                                            //     service: 'gmail',
                                            //     auth: {
                                            //       user: 'davidbriggs00154@gmail.com',
                                            //       pass: '00154abs'
                                            //     }
                                            //   });

                                            //   transporter.sendMail(mailOptions, function(error, info){
                                            //     if (error) {
                                            //       console.log(error);
                                            //       res.json({type: "Error", message: "Internal Server Error"})
                                            //       return;
                                            //     } else {
                                            //       console.log('Email sent: ' + info.response);
                                            //       console.log("Everything went succesful")
                                            //       res.json({type: "Success", message: "Account Created Successfully"})
                                            //     }
                                            //   });
                                        }
                                    })
                                }
                            })
                        }
                    });
                }
                
            });

    } catch(e) {
        console.log('Error 2')
        res.json({type: 'Error', message: "Internal Server Error"});
        throw new Error(e)
    }
}

module.exports = {signUp}