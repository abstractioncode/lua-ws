class User {
    constructor(id,username,subend,subtype,hwid,token,banned) {
        this.id = id;
        this.username = username;
        this.subend = subend;
        this.subtype = subtype;
        this.hwid = hwid;
        this.token = token;
        this.banned = banned;
    }
}
module.exports = {
    User: User
};