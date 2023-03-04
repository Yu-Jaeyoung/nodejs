/*
import passport from "passport";
import {KakaoStrategy} from "passport-kakao";
import { User } from '../models';

module.exports = () => {
  passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_ID,
    callbackURL: "/auth/kakao/callback",
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const exUser = await User.findOne({where: {snsId: profile.id, provider: "kakao"}});
      if (exUser) {
        done(null, exUser);
      } else {
        const newUser = await User.create({
          email: profile._json && profile._json.kaccount_email,
          nick: profile.displayName,
          snsId: profile.id,
          provider: "kakao",
        });
        done(null, newUser);
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};*/
