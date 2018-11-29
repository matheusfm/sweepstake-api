class BetRepository {
    constructor(app) {
        this._app = app;
    }

    findByUserId(userId, callback) {
        let conn = this._app.db.connection();
        conn.query('SELECT bet.*, game.team1, game.team2, game.team1_goals, game.team2_goals, game.date FROM bet INNER JOIN game ON bet.game_id = game.id WHERE user_id = ?', userId, callback);
        conn.end();
    }

    findOne(id, callback) {
        let conn = this._app.db.connection();
        conn.query('SELECT bet.*, game.team1, game.team2, game.team1_goals, game.team2_goals, game.date FROM bet INNER JOIN game ON bet.game_id = game.id WHERE bet.id = ?', id, callback);
        conn.end();
    }

    delete(id, callback) {
        let conn = this._app.db.connection();
        conn.query('DELETE FROM bet WHERE id = ?', id, callback);
        conn.end();
    }

    save(bet, callback) {
        let conn = this._app.db.connection();
        conn.query('INSERT INTO bet SET ? ON DUPLICATE KEY UPDATE updated_at = NOW(), ?', [bet, bet], callback);
        conn.end();
    }
}

module.exports = () => {
    return BetRepository;
}