const typeorm = require("typeorm");
const setup =  () => {

    typeorm.createConnection({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "",
        database: "test",
        entities: [
          require("./Entities/User"),
        ],
        synchronize: true,
    }).then(connection => {
        console.log("Connected to database");
    }
    ).catch(error => {
        console.log("Error: " + error);
    })
}
module.exports = setup