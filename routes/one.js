const express = require("express");

const mongoose = require("mongoose");
const cheerio = require("cheerio");
const fs = require("fs");
const cron = require("node-schedule");
const router = express.Router();
const got = require("got");

const urlOnePiece = "https://onepiece-mangaonline.com/";

// const uri =
//   "mongodb+srv://michaelsd28:mypassword28@cluster0.cneai.mongodb.net/boku_no_hero_mangaDB?authSource=admin&replicaSet=atlas-x7tzqc-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
// mongoose.connect(uri, { useNewUrlParser: true });
// const connection = mongoose.connection;

var numbers = 0;

// cron.scheduleJob('0 1 * * *', async () => {
// cron.scheduleJob('* * * * * *', () => {

cron.scheduleJob("0 2 * * *", async () => {
  const response = await got(urlOnePiece);

  const $ = cheerio.load(html);

  let ul_elements = $(".ceo_latest_comics_widget");

  let listOfChapters = ul_elements.text();

  let listOfChaptersArray = listOfChapters.split("\n").slice(1, 51);

  const listOfChaptersJson = [];
  const listOfChaptersOrginal = [];
  const noSpacesMap = listOfChaptersArray.map((item) => {
    let newItem = item
      .trim()
      .replace(",", " ")
      .replace(/  /g, " ")
      .replace(/:/g, " -")
      .replace(/\t/g, "");

    let newItemOrginal = item.replace(/\t/g, "");
    listOfChaptersJson.push(newItem);
    listOfChaptersOrginal.push(newItemOrginal);
  });

  /* get href */
  let links = [];

  $(".ceo_latest_comics_widget a").each((index, value) => {
    let link = $(value).attr("href");
    links.push(link);
  });

  // console.log(links,'href')

  let reqLinks = [];
  const strREQ = links.map((item) => {
    let newItem = item.substring(39);
    reqLinks.push(newItem);
  });

  reqLinks = reqLinks.splice(0, 50);

  const listOfJson = [
    { episodes: listOfChaptersJson },
    { Orginal_NameCH: reqLinks },
  ];

  fs.writeFile(
    __dirname + "/One piece chapters.json",
    JSON.stringify(listOfJson),
    function (err) {
      if (err) return console.log(err);
      console.log("file was written");
    }
  );

  console.log("file was written");

  numbers = numbers + 1;

  console.log(numbers, "mmg");
});

function sayHola() {
  console.log("object");
}


// var numbers = 0;

/*return list of chapters json */

router.get("/ch", (req, res) => {
  res.sendFile(__dirname + "/One piece chapters.json");

  console.log(numbers, "responded /One piece chapters.json");
});

/* webscrape images one piece  */
module.exports = router;
