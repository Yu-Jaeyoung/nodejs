import passport from "passport";
import local from "./localStrategy.js";
// import kakao from './kakaoStrategy.js';
import {User} from "../models/modelsGroup.js";

class Passport {
  config() {
    passport.serializeUser((user, done) => {
      done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
      User.findOne({
        where: {id},
        include: [{
          model: User,
          attributes: ["id", "nick"],
          as: "Followers",
        }, {
          model: User,
          attributes: ["id", "nick"],
          as: "Followings",
        }],
      })
        .then(user => done(null, user))
        .catch(err => done(err));
    });

    //kakao();
    local();
  };
}

export default Passport;
