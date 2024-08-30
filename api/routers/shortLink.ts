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

ShortLinkRouter.get("/:shortUrl", async (req, res) => {
  try {
    const product = await Shorter.findOne({ shortUrl: req.params.shortUrl });
    if (product) {
      res.status(301).redirect(product.originalUrl);
    } else {
      res.status(404).send("Короткий URL не найден");
    }
  } catch (e) {
    console.error(e);
  }
});

export default ShortLinkRouter;
