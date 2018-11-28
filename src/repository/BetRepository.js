class BetRepository {
    constructor(app) {
        this._app = app;
    }

    findByUserId(userId, callback) {
        let conn = this._app.db.connection();
        conn.query("SELECT * FROM bet WHERE user_id = ?", userId, callback);
        conn.end();
    }

    findAll(callback) {
        let conn = this._app.db.connection();
        conn.query("SELECT * FROM bet", callback);
        conn.end();
    }

    save(bet, callback) {
        let conn = this._app.db.connection();
        if (bet.id) {
            conn.query("UPDATE bet SET ? WHERE id = ?", [bet, bet.id], callback);
        } else {
            conn.query("INSERT INTO bet SET ?", bet, callback);
        }
        conn.end();
    }
}

module.exports = () => {
    return BetRepository;
}