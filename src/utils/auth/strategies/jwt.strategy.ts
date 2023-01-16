import { Strategy, ExtractJwt } from "passport-jwt";
import conf from "../../../config/config";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: conf.jwtSecret,
};

const jwtStrategy = new Strategy(options, (payload, done) => {
  done(null, payload);
});

export { jwtStrategy };
