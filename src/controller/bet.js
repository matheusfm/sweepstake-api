module.exports = (app) => {
    app.post("/bets", (req, res) => {
        let betRequest = {
            user_id: req.user.id,
            game_id: req.body.game_id,
            team1_goals: req.body.team1_goals,
            team2_goals: req.body.team2_goals,
        }

        // TODO validar se o game está ativo
        // let gameRepository = new app.repository.GameRepository(app);
        // gameRepository.findOne(betRequest.game_id, (err, result) => {
        //     if(err || !result.enabled) {
        //         res.status(404).end();
        //     }
        // });

        let repository = new app.repository.BetRepository(app);
        repository.save(betRequest, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).end();
            } else {
                res.status(result.affectedRows > 0 ? 201 : 500).end();
            }
        });
    });

    app.put("/bets/:id", (req, res) => {
        let betRequest = {
            id: req.params.id,
            user_id: req.user.id,
            game_id: req.body.game_id,
            team1_goals: req.body.team1_goals,
            team2_goals: req.body.team2_goals,
        }

        let repository = new app.repository.BetRepository(app);
        repository.save(betRequest, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).end();
            } else {
                res.status(result.affectedRows > 0 ? 200 : 404).end();
            }
        });
    });

    app.get("/bets", (req, res) => {
        let repository = new app.repository.BetRepository(app);
        repository.findByUserId(req.user.id, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).end();
            } else {
                res.status(200).json(result);
            }
        });
    });

    app.get("/bets/:id", (req, res) => {
        let repository = new app.repository.BetRepository(app);
        repository.findOne(req.params.id, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).end();
            } else {
                let first = result[0];
                if (first) {
                    res.status(200).json(first);
                } else {
                    res.status(404).end();
                }
            }
        });
    });

    app.delete("/bets/:id", (req, res) => {
        let repository = new app.repository.BetRepository(app);
        repository.delete(req.params.id, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).end();
            } else {
                res.status(result.affectedRows > 0 ? 200 : 404).end();
            }
        });
    });
}