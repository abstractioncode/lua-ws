const auth = require("./../Modules/UserService/Index.js");
const {GetLua} = require("./../Modules/LuaSender/Index.js");
const {TokenChecker} = require("./../Modules/LuaSender/Index.js");
const {LogInfo, LogWarn, LogError} = require('./../Modules/Logger/index.js');
const handler = async (headers,data,ws) => {
    const dataObj = JSON.parse(data.toString());
    switch(dataObj.command) { 
        case "login": {
           const user = await auth(headers.username,dataObj.hwid);
              if(user.success) {
                LogInfo(`${new Date()} ${user?.username} login success`);
                ws.send(JSON.stringify({user: user}));
              }
        }
        break;
        case "getlua": {
            LogInfo(`${new Date()} ${headers?.username} requested ${dataObj.version} lua`);
            if(await TokenChecker(dataObj)) {
                LogInfo(`${new Date()} ${headers?.username} token is valid`);
                const lua = await GetLua(dataObj.version);
                LogInfo(`${new Date()} ${headers?.username} ${dataObj.version} lua sent`);
                ws.send(JSON.stringify({lua: lua}));
            } else {
                LogWarn(`${new Date()} ${headers?.username} token is invalid`);
                ws.send(JSON.stringify({error: "invalid token"}));
            }
        }
        break;
    }
}
module.exports = handler;
