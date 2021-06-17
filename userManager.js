module.exports = function(app){
    //Truy xuất tất cả dữ liệu user
    app.get('/users', function(req, res){
        Connection.query('SELECT * FROM users', function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'Users list.' });
        });
    });

    //Truy xuất user theo id
    app.get('/user/:id', function(req,res){
        let user_id = req.params.id;
        Connection.query(`SELECT * FROM users where id='${user_id}'`, function (error, results, fields) {
            if (error) throw error;
            if (!results[0]) return res.status(404).send({ error: true, message:'User does not exist'});
            return res.send({ error: false, data: results[0], message: 'Users.' });
        });
    });

    //Thêm user mới
    app.post('/user', function(req,res){
        let user = req.body.user;
        if (!user) {
            return res.status(400).send({ error:true, message: 'Please provide user.' });
        }
        Connection.query(`SELECT * FROM users where email='${user.email}'`, function (error, results, fields) {
            if (error) throw error;
            if (!results[0]) {
                Connection.query(`INSERT INTO users(fullName, nickName, gender, birthday, email, password, addressCity) VALUE ('${user.fullName}', '${user.nickName}', '${user.gender}', '${user.birthday}', '${user.email}', '${user.password}', '${user.addressCity}')`
                            , function (error, results, fields) {
                if (error) throw error;
                return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
                });
            } else return res.send({ error: true, message: 'Email already exists.' });
        });
    })

    //  Cập nhật user với id
    app.put('/user/:id', function (req, res) {
        let user_id = req.params.id;
        let user = req.body.user;
        if (!user.password || !user.email) {
        return res.status(400).send({ error: user, message: 'Please provide email and password' });
        }
        Connection.query(`SELECT * FROM users where email='${user.email}' and id <> ${user_id}`, function (error, results, fields) {
            if (error) throw error;
            if (!results[0]) {
                Connection.query(`UPDATE users SET fullName = '${user.fullName}', nickName = '${user.nickName}', gender = '${user.gender}', birthday = '${user.birthday}', email = '${user.email}', password = '${user.password}', addressCity = '${user.addressCity}' WHERE id = ${user_id}`, function (error, results, fields) {
                    if (error) throw error;
                    return res.send({ error: false, data: results, message: 'user has been updated successfully.' });
                });
            } else return res.send({ error: true, message: 'Email already exists.' });
        }); 
    });

    //Xóa user theo id
    app.delete('/user/:id', function (req, res) {
        let user_id = req.params.id;
        if (!user_id) {
            return res.status(400).send({ error: true, message: 'Please provide user_id' });
        }
        Connection.query(`SELECT * FROM users where id='${user_id}'`, function (error, results, fields) {
            if (error) throw error;
            if (!results[0]) return res.send({ error: true, message: 'User does not exist' });
            else {
                Connection.query(`DELETE FROM users WHERE id = ${user_id}`,  function (error, results, fields) {
                    if (error) throw error;
                    return res.send({ error: false, data: results, message: 'User has been updated successfully.' });
                });
            }
        });
    });

    app.get("/login",function(req, res){
        if (!req.body.email || !req.body.password){
            return res.status(400).send({ error: true, message: 'Email user/ password empty.'});
        }   
        Connection.query(`SELECT * FROM users where email='${req.body.email}' and password='${req.body.password}'`, function(error, results, fields) {
            if (error) {
                console.log("error");
                throw error;
            }
            if (!results[0]){
                return res.status(409).send({ error: true, message: 'Email user/ password wrong.' });
            } else {
                var user_string = JSON.stringify(results[0]);
                fs.writeFile(__dirname+"/input.txt", user_string, 'utf-8', (err, data) => {
                    if (err) throw err;
                });
                return res.send({ error: false, data:results, message: 'Login Successful' });
            }
        });
    });
    app.get("/logout",function (req, res) {
        fs.writeFile(__dirname+"/input.txt", "{}", 'utf-8', (err, data) => {
            if (err) throw err;
        });
        res.send({ error: false, message: 'Logout Successful'})
    });
    app.put("/register",function (req, res) {
        Connection.query(`SELECT * FROM users where email='${req.body.email}'`, function (error, results, fields) {
            if (error) throw error;
            if (!results[0]) {
                Connection.query(`INSERT INTO users(fullName, email, password) VALUE ('${req.body.fullName}', '${req.body.email}', '${req.body.password}')`
                            , function (error, results, fields) {
                if (error) throw error;
                return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
                });
            } else return res.send({ error: true, message: 'Email already exists.' });
        });
    });
}