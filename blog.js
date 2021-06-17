module.exports = function(app){
    var comments = require("./comments");
    comments(app);
    var econoticonBlog = require("./econoticonBlog");
    econoticonBlog(app);
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

    //Truy xuất tất cả dữ liệu blog
    app.get('/blogs', function(req, res){
        Connection.query('SELECT * FROM blogs', function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'blogs list.' });
        });
    });

    //Truy xuất blog theo id
    app.get('/blog/:id', function(req,res){
        let id_blog = req.params.id;
        Connection.query(`SELECT * FROM blogs where id=${id_blog};`, function (error, results, fields) {
            if (error) throw error;
            if (!results[0]) return res.status(404).send({ error: true, message:'Blog does not exist'});
            return res.send({ error: false, data: results[0], message: 'Blog.' });
        });
    });

    //Thêm blog mới
    app.post('/blog', function(req,res){
        let blog = req.body.blog;
        if (!blog) {
            return res.status(400).send({ error:true, message: 'Please provide blog.' });
        }
        Connection.query(`INSERT INTO blogs(id_user, blog_mode , caption, checkin) VALUE (${blog.id_user},  '${blog.blog_mode}' , '${blog.caption}', '${blog.checkin}')`
                            , function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'New blog has been created successfully.' });
        });
    })

    //  Cập nhật blog với id
    app.put('/blog/:id', function (req, res) {
        let id =  req.params.id;
        let blog = req.body.blog;
        Connection.query(`UPDATE blogs SET blog_mode='${blog.blog_mode}' caption='${blog.caption}', checkin='${blog.checkin}'  WHERE id = ${id}`, function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'blog has been updated successfully.' });
        });
    });

    //Xóa blog theo id
    app.delete('/blog/:id', function (req, res) {
        let blog_id = req.params.id;
        if (!blog_id) {
            return res.status(400).send({ error: true, message: 'Please provide blog_id' });
        }
        Connection.query(`SELECT * FROM blogs where id=${blog_id}`, function (error, results, fields) {
            if (error) throw error;
            if (!results[0]) return res.send({ error: true, message: 'Blog does not exist' });
            else {
                Connection.query(`DELETE FROM econoticonBlog WHERE id_blog=${id_blog}`,  function (error, results, fields) {
                    if (error) throw error;
                    return res.send({ error: false, data: results, message: 'econoticon has been deleted successfully.' });
                });
                Connection.query(`DELETE FROM comments WHERE id_blog = ${blog_id}`,  function (error, results, fields) {
                    if (error) throw error;
                    return res.send({ error: false, data: results, message: 'comment has been deleted successfully.' });
                });
                Connection.query(`DELETE FROM blogs WHERE id = ${blog_id}`,  function (error, results, fields) {
                    if (error) throw error;
                    return res.send({ error: false, data: results, message: 'Blog has been deleted successfully.' });
                });
            }
        });
    });
}