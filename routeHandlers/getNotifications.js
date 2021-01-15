const {connection} = require('../config');

const getNotifications = (req, res) => {
    const {userId} = req.params;
    const query = `SELECT * FROM notifications WHERE user_id = ${userId}`;
    connection.query(query, (err, result) => {
        if(err) {
            res.json({type: "Error", message: "Internal Server Error"});
            return;
        } else {
            res.json({type: "Success", message: result})
        }
    })
}

module.exports = {
    getNotifications
}