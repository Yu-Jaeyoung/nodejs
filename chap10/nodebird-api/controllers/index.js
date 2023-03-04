import {v4} from "uuid";
import {User, Domain} from "../models/modelsGroup.js";

export async function renderLogin(req, res, next) {
  try {
    const user = await User.findOne({
      where: {id: req.user?.id || null},
      include: {model: Domain},
    });
    res.render("login", {
      user,
      domains: user?.Domains,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export async function createDomain(req, res, next) {
  try {
    await Domain.create({
      UserId: req.user.id,
      host: req.body.host,
      type: req.body.type,
      clientSecret: v4(),
    });
    res.redirect("/");
  } catch (err) {
    console.error(err);
    next(err);
  }
}
;