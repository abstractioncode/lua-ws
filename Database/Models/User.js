class User {
    constructor(id,username,subend,subtype,hwid,token) {
        this.id = id;
        this.username = username;
        this.subend = subend;
        this.subtype = subtype;
        this.hwid = hwid;
        this.token = token;
    }
}
module.exports = {
    User: User
};