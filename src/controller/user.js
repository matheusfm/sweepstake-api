module.exports = (app) => {

    app.post("/users", (req, res) => {
        let userRequest = {
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
        }
        let repository = new app.repository.UserRepository(app);
        repository.save(userRequest, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).end();
            } else {
                res.status(result.affectedRows > 0 ? 201 : 500).end();
            }
        })
    });

    app.post("/auth", (req, res) => {
        let username = req.body.username;
        let password = req.body.password;

        if (!username || !password) {
            res.status(400).json({ error: "Invalid username or password" });
        } else {
            let repository = new app.repository.UserRepository(app);
            repository.findByUsernameAndPassword(username, password, (err, result) => {
                if (err) {
                    res.status(500).end();
                } else if (!result || result.length <= 0) {
                    res.status(401).json(result).end();
                } else {
                    let user = result[0];
                    const payload = { user: user };
                    const jwt = app.get('jwt');
                    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: 60 * 60 * 24 });
                    let response = {
                        id: user.id,
                        name: user.name,
                        role: user.role,
                        access_token: token
                    }
                    res.status(200).json(response);
                }
            })
        }
    });
}