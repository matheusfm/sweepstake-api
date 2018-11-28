module.exports = (app) => {
    app.post("/games", (req, res) => {
        if (req.user.role.endsWith("ADMIN")) {
            let gameRequest = {
                date: req.body.date,
                team1: req.body.team1,
                team2: req.body.team2,
            }
            let repository = new app.repository.GameRepository(app);
            repository.save(gameRequest, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).end();
                } else {
                    res.status(result.affectedRows > 0 ? 201 : 500).end();
                }
            })
        } else {
            res.status(403).end();
        }
    });

    app.put("/games/:id", (req, res) => {
        if (req.user.role.endsWith("ADMIN")) {
            let gameRequest = {
                id: req.params.id,
                date: req.body.date,
                team1: req.body.team1,
                team2: req.body.team2,
            }
            let repository = new app.repository.GameRepository(app);
            repository.save(gameRequest, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).end();
                } else {
                    res.status(result.affectedRows > 0 ? 200 : 404).end();
                }
            })
        } else {
            res.status(403).end();
        }
    });

    app.get("/games", (req, res) => {
        let repository = new app.repository.GameRepository(app);
        repository.findByEnabled(true, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).end();
            } else {
                res.status(200).json(result);
            }
        });
    });

    app.get("/games/:id", (req, res) => {
        let id = req.params.id;
        let repository = new app.repository.GameRepository(app);
        repository.findOne(id, (err, result) => {
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

    app.delete("/games/:id", (req, res) => {
        if (req.user.role.endsWith("ADMIN")) {
            let id = req.params.id;
            let repository = new app.repository.GameRepository(app);
            repository.disable(id, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).end();
                } else {
                    if (result.affectedRows > 0) {
                        res.status(204).end();
                    } else {
                        res.status(404).end();
                    }
                }
            });
        } else {
            res.status(403).end();
        }
    });

    app.post("/games/:id/goals", (req, res) => {
        if (req.user.role.endsWith("ADMIN")) {
            let resultRequest = {
                id: req.params.id,
                tream1_goals: req.body.tream1_goals,
                tream2_goals: req.body.tream2_goals,
            }
            let repository = new app.repository.GameRepository(app);

            repository.save(resultRequest, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).end();
                } else {
                    res.status(result.affectedRows > 0 ? 201 : 500).end();
                }
            });
        } else {
            res.status(403).end();
        }
    });
}