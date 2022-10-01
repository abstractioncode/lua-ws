const fs = require('fs');
const path  = require('path');
const typeorm = require("typeorm");
const User = require("../../Database/Entities/User");
const {LogInfo, LogWarn, LogError} = require('../../Modules/Logger/index.js');
const versions = {
    beta: "Beta.lua",
    Debug: "Debug.lua",
    Stable: "Stable.lua",
}
const TokenChecker = async (obj) => {
    const connection = typeorm.getConnection();
    const userRepository = connection.getRepository(User);
    const user = await userRepository.findOne({
        where: {
            token: obj.token,
        },
    })
    if(user) {
        if(new Date() < user.subend && user.hwid == obj.hwid) {
            LogInfo(`${new Date()} ${user.username} token is valid`);
            return true;
        } else {
            LogWarn(`${new Date()} ${user.username} token is invalid`);
            return false;
        }
    }
    else {
        return false;
    }
}

const GetLua = async (version) => {
    const file = fs.readFileSync(path.join(__dirname+"./../../LuaType/", versions[version]));
    return file.toString();
}
module.exports.GetLua = GetLua;
module.exports.TokenChecker = TokenChecker;