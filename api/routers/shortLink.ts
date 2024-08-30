import { Router } from "express";
import Shorter from "../models/Shorter";
import { linkModel } from "../types";
import crypto from "crypto";

const ShortLinkRouter = Router();

ShortLinkRouter.get("/", async (req, res) => {
  try {
    const results = await Shorter.find();
    res.send(results);
  } catch (e) {
    console.error(e);
  }
});

ShortLinkRouter.get("/:shortUrl", async (req, res, next) => {
  try {
    const product = await Shorter.findOne({ shortUrl: req.params.shortUrl });
    if (product) {
      res.status(301).redirect(product.originalUrl);
    } else {
      res.status(404).send("Короткий URL не найден");
    }
  } catch (e) {
    return next(e);
  }
});

ShortLinkRouter.post("/links", async (req, res, next) => {
  try {
    const linkData: linkModel = {
      originalUrl: req.body.url,
      shortUrl: crypto.randomBytes(3).toString("hex"),
    };

    const link = new Shorter(linkData);
    await link.save();
    res.send(link);
  } catch (e) {
    return next(e);
  }
});

export default ShortLinkRouter;
