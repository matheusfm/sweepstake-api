# sweepstake-api
API de bolão como trabalho da pós-graduação

Running a Docker container for the MySQL:
```
docker run --name=mysql1 -d -e MYSQL_ROOT_PASSWORD=fatec -p 3306:3306 -p 33060:33060 mysql/mysql-server
```

Creating database:
```
CREATE DATABASE node_fatec;
USE node_fatec;
CREATE TABLE user
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    username VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL,
    role VARCHAR(10) NOT NULL DEFAULT 'USER'
);
CREATE TABLE game
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    date DATETIME NOT NULL,
    team1 VARCHAR(50) NOT NULL,
    team2 VARCHAR(50) NOT NULL,
    enabled BOOLEAN NOT NULL DEFAULT 1,
    tream1_goals INT NOT NULL DEFAULT 0,
    tream2_goals INT NOT NULL DEFAULT 0
);
CREATE TABLE bet
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    game_id INT NOT NULL,
    user_id INT NOT NULL,
    tream1_goals INT NOT NULL DEFAULT 0,
    tream2_goals INT NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT NOW(),
    updated_at DATETIME,
    FOREIGN KEY (game_id) REFERENCES game(id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);
```

Creating new user in MySQL:
```
CREATE USER 'fatec'@'%' IDENTIFIED WITH mysql_native_password BY 'fatec';
GRANT ALL ON node_fatec.* TO 'fatec'@'%';
FLUSH PRIVILEGES;
```

Inserting in the user table:
```
INSERT INTO user(name, username, password, role) VALUES ('ADMIN', 'admin', '@dmin', 'SYSADMIN');
```