import AuthService from "../../../services/auth.service";
import { Strategy } from "passport-local";

const options = {
  usernameField: "email",
  passwordField: "password",
};

const service = new AuthService();

const LocalStrategy = new Strategy(options, async (email, password, done) => {
  try {
    const user = await service.getUser(email, password);
    done(null, user);
  } catch (err) {
    done(err, false);
  }
});

export { LocalStrategy };
