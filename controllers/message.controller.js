import { sendMessage, getMessage } from "../services/message.service.js";
import * as responser from "../utils/responser.js";

class messageController {
  sendMessage = async (req, res) => {
    const reqData = req.body;
    reqData.userId = req.userId;
    const data = await sendMessage(reqData);
    console.log(data);
    return responser.send(201, "Successfully Message send", req, res, data);
  };
  
  getMessage = async (req, res) => {
    const loggedInUser = req.userId;
    const params = req.params;
    const data = await getMessage(loggedInUser, params.chatId);
    console.log(data);
    return responser.send(
      201,
      "Successfully Fetched All Send Messages",
      req,
      res,
      data
    );
  };
}

export default new messageController();
