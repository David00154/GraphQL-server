 const mysql = require('mysql');

 var connection = mysql.createConnection({
    // host     : 'localhost',
    host: 'b3iys1pqgas1f9pc9khr-mysql.services.clever-cloud.com',
    // user     : 'david00154',
    user: 'uee21zva2ajabcab',
    // password : '00154abs',
    password: 'mOxW2iz0Cm58LwgSKFwt',
    // database : 'binterestDB'
    database: 'b3iys1pqgas1f9pc9khr'
  });
   
  connection.connect();

  // connection.query(`INSERT INTO users (name, email, password, country, countryCode, phoneNumber, token, register_date) VALUES ( 'David Briggs', 'davidbriggs00154@gmail.com', '00154abs', 'Nigeria', 234, 9057695839, 'hyd4dbhd4d14ddnnd1dndhd1d4', now() )`, function (error, results, fields) {
  //   if (error) throw error;
  //   console.log(results);
  // });
   
  // connection.end();

 module.exports = {
   connection
 }

//  function now() {
//   var currentdate = new Date();
//   return currentdate.getDay() + "-" + currentdate.getMonth() 
//   + "-" + currentdate.getFullYear() + " " 
//   + currentdate.getHours() + ":" 
//   + currentdate.getMinutes() + ":" + currentdate.getSeconds();
// }

// const _query_ = `SELECT * FROM users WHERE email = "david00154@gmail.com" AND password = "00154abs"`;
// 				connection.query(_query_, function(error, result) {
// 					if(error) throw new Error(error);
// 					console.log(result.length)
// 				})

// console.log(now())
