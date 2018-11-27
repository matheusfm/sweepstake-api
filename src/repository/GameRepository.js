class GameRepository {
    constructor(app) {
        this._app = app;
    }

    findOne(id, callback) {
        let conn = this._app.db.connection();
        conn.query("SELECT * FROM game WHERE enabled = TRUE AND id = ?", id, callback);
        conn.end();
    }

    findAll(callback) {
        let conn = this._app.db.connection();
        conn.query("SELECT * FROM game", callback);
        conn.end();
    }

    findByEnabled(enabled, callback) {
        let conn = this._app.db.connection();
        conn.query("SELECT * FROM game WHERE enabled = ?", enabled, callback);
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

    disable(gameId, callback) {
        let conn = this._app.db.connection();
        conn.query("UPDATE game SET enabled = false WHERE enabled = TRUE AND id = ?", gameId, callback);
        conn.end();
    }

}

module.exports = () => {
    return GameRepository;
}