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
const puppeteer = require("puppeteer");
const uniqid = require("uniqid");
const fs_1 = require("fs");
const path_1 = require("path");
function getHeroes() {
    return __awaiter(this, void 0, void 0, function* () {
        const START_URL = "https://www.marvel.com/characters";
        const heroes = [];
        const browser = yield puppeteer.launch({
            headless: true
        });
        const page = yield browser.newPage();
        yield page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36");
        console.log("Getting heroes from website", START_URL);
        yield page.goto(START_URL);
        yield page.waitForSelector("body");
        // names
        const hero_names = yield page.evaluate(() => {
            return Array.from(document.querySelectorAll(".card-body__headline")).map(item => item.innerText);
        });
        // photo
        const hero_images = yield page.evaluate(() => {
            return Array.from(document.querySelectorAll(".card-thumb-frame img")).map(item => item.src);
        });
        // link
        const hero_links = yield page.evaluate(() => {
            return Array.from(document.querySelectorAll(".mvl-card .explore__link")).map(item => item.href);
        });
        // bios
        const hero_bios = [];
        for (let i = 0; i < hero_links.length; i++) {
            console.log(i);
            yield page.goto(hero_links[i]);
            yield page.waitForSelector("body");
            const hero_bio = yield page.evaluate(() => {
                const element = document.querySelector(".masthead__copy");
                return element != null ? element.innerHTML : "";
            });
            hero_bios.push(hero_bio);
        }
        // save
        for (let i = 0; i < hero_names.length; i++) {
            heroes.push({
                id: uniqid(),
                name: hero_names[i],
                photo: hero_images[i],
                bio: hero_bios[i]
            });
        }
        yield browser.close();
        fs_1.writeFile(path_1.resolve(__dirname, "../heroes.json"), JSON.stringify(heroes, null, 2), err => {
            if (err) {
                throw err;
            }
            console.log("Finished writing file");
        });
    });
}
getHeroes();
//# sourceMappingURL=getHeroes.js.map