const typeorm = require("typeorm");
const User = require("../../Database/Entities/User");
const generatetoken = () => {
    return Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
}
const auth = async (username,hwid) => {
    const connection = typeorm.getConnection();
    const userRepository = connection.getRepository(User);
    const user = await userRepository.findOne({
        where: {
            username: username,
        },
    })
    if(user) {
        if(new Date() < user.subend && user.hwid == hwid) {
            user.token = generatetoken();
            await userRepository.save(user);
            return {
                success: true,
                id: user.id,
                username: user.username,
                subtype: user.subtype,
                subend: user.subend,
                token: user.token,
            }
        } else {
            return {
                success: false,
                error: "Subscription expired"
            }
        }
    }
    else {
        return {
            success: false,
            error: "User not found"
        }
    }
}
module.exports = auth;