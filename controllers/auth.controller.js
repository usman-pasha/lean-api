import { register, login, userAllProfiles } from "../services/auth.service.js";
import * as responser from "../utils/responser.js";

class authController {
  register = async (req, res) => {
    const reqData = req.body;
    const data = await register(reqData);
    console.log(data);
    return responser.send(201, "Successfully User Register", req, res, data);
  };

  login = async (req, res) => {
    const reqData = req.body;
    const data = await login(reqData);
    console.log(data);
    return responser.send(200, "Successfully User Login", req, res, data);
  };

  profile = async (req, res) => {
    const userId = req.userId;
    const data = await userAllProfiles(userId);
    console.log(data);
    return responser.send(
      200,
      "Successfully Fetched All Users Profile",
      req,
      res,
      data
    );
  };
}

export default new authController();
