// config/passportConfig.js
import { Strategy as LocalStrategy } from "passport-local";
import { findUser } from "../Models/userModel.js";
import bcrypt from "bcrypt";

export default function initializePassport(passport) {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await findUser(username);
        if (!user) return done(null, false, { message: "User not found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return done(null, false, { message: "Wrong password" });

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await findUserById(id); // implementa esta função se necessário
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
}
