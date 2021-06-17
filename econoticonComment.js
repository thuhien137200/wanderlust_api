module.exports = function(app){

    var fs = require("fs");
    var bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ 
        extended: true 
    }));

    var mysql = require ("mysql");
    var Connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'thuhien137200',
        database: 'test'
    })
    Connection.connect();

    //Truy xuất tất cả dữ liệu econoticon of comment
    app.get('/econoticonComments', function(req, res){
        Connection.query('SELECT * FROM econoticonComment', function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'econoticon of comment list.' });
        });
    });

    //Cập nhập econotion of comment
    app.put('/econoticonComment', function(req, res){
        id_comment=req.body.id_comment;
        id_user = req.body.id_user;
        Connection.query(`SELECT * FROM econoticonComment WHERE id_comment=${id_comment} and id_user=${id_user}`, function (error, results, fields) {
            if (error) throw error;
            if (results[0]) 
                Connection.query(`DELETE FROM econoticonComment WHERE id_comment=${id_comment} and id_user=${id_user} `,  function (error, results, fields) {
                    if (error) throw error;
                    return res.send({ error: false, data: results, message: 'econoticon has been deleted successfully.' });
                });
            else     
                Connection.query(`INSERT INTO econoticonComment  VALUE (${id_comment}, ${id_user})`
                                    , function (error, results, fields) {
                    if (error) throw error;
                    return res.send({ error: false, data: results, message: 'New econoticon has been created successfully.' });
                });
        });
    })

    //Thêm econoticon of comment theo id
    app.post('/econoticonComment', function(req,res){
        id_comment=req.body.id_comment;
        id_user = req.body.id_user;
        Connection.query(`INSERT INTO econoticonComment  VALUE (${id_comment}, ${id_user})`
                            , function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'New econoticon has been created successfully.' });
        });
    })

    //Xóa econoticon of comment theo id
    app.delete('/econoticonComment', function (req, res) {
        id_comment=req.body.id_comment;
        id_user = req.body.id_user;
        Connection.query(`DELETE FROM econoticonComment WHERE id_comment=${id_comment} and id_user=${id_user} `,  function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'econoticon has been deleted successfully.' });
        });
    });
}