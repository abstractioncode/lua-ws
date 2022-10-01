const EntitySchema = require("typeorm").EntitySchema; 
const User = require("../models/user").User; 

module.exports = new EntitySchema({
    name: "User",
    target: User,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        username: {
            type: "varchar"
        },
        subend: {
            type: "timestamp"
        },
        subtype: {
            type: "varchar"
        },
        hwid: {
            type: "varchar"
        },
        token: {
            type: "varchar"
        }
    }
});
