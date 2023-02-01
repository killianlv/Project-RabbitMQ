import mysql from "mysql2"


export async function dbMysql() {
    

    //même confique que dans docker-compose.yml
    const mysqlConfig = {
        host: "mysql_server",
        user: "killian",
        password: "secret",
        database: "test_db"
    }

    

    function connectionDb() {

        const connection =  mysql.createConnection(mysqlConfig);
        connection.connect(function(err) {
            if (err) throw err;
            const sql = `
            CREATE TABLE IF NOT EXISTS orders (
              orderId INT AUTO_INCREMENT PRIMARY KEY,
              name VARCHAR(255),
              status VARCHAR(55) NOT NULL
            )  ENGINE=INNODB;
            `;
            connection.query(sql, function (err, result) {
              if (err) throw err;
            });
        })
        return connection
    }

    return {
        connectionDb: connectionDb,
    }
}