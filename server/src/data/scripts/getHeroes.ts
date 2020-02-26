const puppeteer = require("puppeteer");
const uniqid = require("uniqid");
import { writeFile } from "fs";
import { resolve } from "path";
import Hero from "../../models/hero";

async function getHeroes() {
  const START_URL = "https://www.marvel.com/characters";
  const heroes: Hero[] = [];

  const browser = await puppeteer.launch({
    headless: true
  });
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
  );

  console.log("Getting heroes from website", START_URL);
  await page.goto(START_URL);

  await page.waitForSelector("body");

  // names
  const hero_names = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".card-body__headline")).map(
      item => (item as HTMLElement).innerText
    );
  });

  // photo
  const hero_images = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".card-thumb-frame img")).map(
      item => (item as HTMLImageElement).src
    );
  });

  // link
  const hero_links = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll(".mvl-card .explore__link")
    ).map(item => (item as HTMLLinkElement).href);
  });

  // bios
  const hero_bios = [];
  for (let i = 0; i < hero_links.length; i++) {
    console.log(i);
    await page.goto(hero_links[i]);
    await page.waitForSelector("body");

    const hero_bio = await page.evaluate(() => {
      const element = document.querySelector(".masthead__copy") as HTMLElement;
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

  await browser.close();

  writeFile(
    resolve(__dirname, "../heroes.json"),
    JSON.stringify(heroes, null, 2),
    err => {
      if (err) {
        throw err;
      }
      console.log("Finished writing file");
    }
  );
}

getHeroes();
