import * as Express from "express";
import Hero from "../models/hero";
import { readFileSync } from "fs";
import { resolve } from "path";

const findAll = async (req: Express.Request, res: Express.Response) => {
  // Return list of all characters from data crawled from website
  let rawdata = readFileSync(resolve(__dirname, "../../src/data/heroes.json"));
  let data = JSON.parse(rawdata.toString());
  res.json(data);
};

const findById = async (req: Express.Request, res: Express.Response) => {
  // Return 1 character (based on id) from data crawled from website
  let rawdata = readFileSync(resolve(__dirname, "../../src/data/heroes.json"));
  let data = JSON.parse(rawdata.toString());
  let character = {};
  data.forEach(hero => {
    if (hero.id === req.params.id) {
      character = hero;
    }
  });
  res.json(character);
};

export default {
  findAll,
  findById
};
