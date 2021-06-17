module.exports = function(app){
    var econoticonComment = require("./econoticonComment");
    econoticonComment(app);

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

    //Truy xuất tất cả dữ liệu comment
    app.get('/comments', function(req, res){
        Connection.query('SELECT * FROM comments', function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'comments list.' });
        });
    });

    //Truy xuất comment theo id
    app.get('/comment/:id', function(req,res){
        let id = req.params.id;
        Connection.query(`SELECT * FROM comments where id='${id}'`, function (error, results, fields) {
            if (error) throw error;
            if (!results[0]) return res.status(404).send({ error: true, message:'Comment does not exist'});
            return res.send({ error: false, data: results[0], message: 'Comment.' });
        });
    });

    //Thêm comment mới
    app.post('/comment', function(req,res){
        let comment = req.body.comment;
        if (!comment) {
            return res.status(400).send({ error:true, message: 'Please provide comment.' });
        }
        Connection.query(`INSERT INTO comments(id_blog, id_user, message) VALUE (${comment.id_blog}, ${comment.id_user}, '${comment.message}')`
                            , function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'New comment has been created successfully.' });
        });
    })

    //  Cập nhật comment với id
    app.put('/comment/:id', function (req, res) {
        let id = req.params.id;
        let comment = req.body.comment;
        Connection.query(`UPDATE comments SET message='${comment.message}' WHERE id = ${id}`, function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'comment has been updated successfully.' });
        });
    });

    //Xóa comment theo id
    app.delete('/comment/:id', function (req, res) {
        let comment_id = req.params.id;
        if (!comment_id) {
            return res.status(400).send({ error: true, message: 'Please provide comment_id' });
        }
        Connection.query(`SELECT * FROM comments where id=${comment_id}`, function (error, results, fields) {
            if (error) throw error;
            if (!results[0]) return res.send({ error: true, message: 'comment does not exist' });
            else {
                Connection.query(`DELETE FROM econoticonComment WHERE id_comment=${comment_id}`,  function (error, results, fields) {
                    if (error) throw error;
                    return res.send({ error: false, data: results, message: 'econoticon has been deleted successfully.' });
                });
                Connection.query(`DELETE FROM comments WHERE id = ${comment_id}`,  function (error, results, fields) {
                    if (error) throw error;
                    return res.send({ error: false, data: results, message: 'comment has been deleted successfully.' });
                });
            }
        });
    });
}