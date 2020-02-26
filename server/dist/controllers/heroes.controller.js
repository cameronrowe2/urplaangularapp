"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const findAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Return list of all characters from data crawled from website
    let rawdata = fs_1.readFileSync(path_1.resolve(__dirname, "../../src/data/heroes.json"));
    let data = JSON.parse(rawdata.toString());
    res.json(data);
});
const findById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Return 1 character (based on id) from data crawled from website
    let rawdata = fs_1.readFileSync(path_1.resolve(__dirname, "../../src/data/heroes.json"));
    let data = JSON.parse(rawdata.toString());
    let character = {};
    data.forEach(hero => {
        if (hero.id === req.params.id) {
            character = hero;
        }
    });
    res.json(character);
});
exports.default = {
    findAll,
    findById
};
//# sourceMappingURL=heroes.controller.js.map