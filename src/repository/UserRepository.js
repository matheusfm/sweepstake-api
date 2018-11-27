class UserRepository {
    constructor(app) {
        this._app = app;
    }
    
    findByUsernameAndPassword(username, password, callback) {
        let conn = this._app.db.connection();
        conn.query("SELECT * FROM user WHERE username = ? AND password = ?", [username, password], callback);
        conn.end();
    }

    save(user, callback) {
        let conn = this._app.db.connection();
        conn.query("INSERT INTO user SET ?", user, callback);
        conn.end();
    }
}

module.exports = () => {
    return UserRepository;
}