class GameRepository {
    constructor(app) {
        this._app = app;
    }

    findOne(id, callback) {
        let conn = this._app.db.connection();
        conn.query("SELECT * FROM game WHERE id = ?", id, callback);
        conn.end();
    }

    findAll(callback) {
        let conn = this._app.db.connection();
        conn.query("SELECT * FROM game ORDER BY date", callback);
        conn.end();
    }

    save(game, callback) {
        let conn = this._app.db.connection();
        if (game.id) {
            conn.query("UPDATE game SET ? WHERE id = ?", [game, game.id], callback);
        } else {
            conn.query("INSERT INTO game SET ?", game, callback);
        }
        conn.end();
    }

    delete(gameId, callback) {
        let conn = this._app.db.connection();
        conn.query("DELETE FROM game WHERE id = ?", gameId, callback);
        conn.end();
    }

}

module.exports = () => {
    return GameRepository;
}