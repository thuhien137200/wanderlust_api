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

    //Truy xuất tất cả dữ liệu econoticon of blog
    app.get('/econoticonBlogs', function(req, res){
        Connection.query('SELECT * FROM econoticonBlog', function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'econoticon of blog list.' });
        });
    });

    //Cập nhập econotion of blog
    app.put('/econoticonBlog', function(req, res){
        id_blog=req.body.id_blog;
        id_user = req.body.id_user;
        Connection.query(`SELECT * FROM econoticonBlog WHERE id_blog=${id_blog} and id_user=${id_user}`, function (error, results, fields) {
            if (error) throw error;
            if (results[0]) 
                Connection.query(`DELETE FROM econoticonBlog WHERE id_blog=${id_blog} and id_user=${id_user} `,  function (error, results, fields) {
                    if (error) throw error;
                    return res.send({ error: false, data: results, message: 'econoticon has been deleted successfully.' });
                });
            else     
                Connection.query(`INSERT INTO econoticonBlog  VALUE (${id_blog}, ${id_user})`
                                    , function (error, results, fields) {
                    if (error) throw error;
                    return res.send({ error: false, data: results, message: 'New econoticon has been created successfully.' });
                });
        });
    })

    //Thêm econoticon of blog theo id
    app.post('/econoticonBlog', function(req,res){
        id_blog=req.body.id_blog;
        id_user = req.body.id_user;
        Connection.query(`INSERT INTO econoticonBlog  VALUE (${id_blog}, ${id_user})`
                                    , function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'New econoticon has been created successfully.' });
        });
    })

    //Xóa econoticon of blog theo id
    app.delete('/econoticonBlog', function (req, res) {
        id_blog=req.body.id_blog;
        id_user = req.body.id_user;
        Connection.query(`DELETE FROM econoticonBlog WHERE id_blog=${id_blog} and id_user=${id_user} `,  function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'econoticon has been deleted successfully.' });
        });
    });
}