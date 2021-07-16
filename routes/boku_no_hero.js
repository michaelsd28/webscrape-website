const express = require("express");
const cron = require('node-schedule');
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const fs = require("fs");

const router = express.Router();
const request = require("request");

const boku_no_hero_URL = "https://boku-no-hero-academia.com/";


var numbers = 0;

// cron.scheduleJob('0  1 * * *', () => {

// cron.scheduleJob('* * * * * *', () => {

  cron.scheduleJob('0  3 * * *', () => {
  request(boku_no_hero_URL, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      let ul_elements = $(".su-posts");

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

      $(".su-posts a").each((index, value) => {
        var link = $(value).attr("href");
        links.push(link);
      });

      // console.log(links,'href')

      let reqLinks = [];
      const strREQ = links.map((item) => {
        let newItem = item.substring(40);
        reqLinks.push(newItem);
      });

      reqLinks = reqLinks.splice(0, 50);

      const listOfJson = [
        { episodes: listOfChaptersJson },
        { Orginal_NameCH: reqLinks },
      ];

      fs.writeFile(__dirname+'/boku no hero chapters.json', JSON.stringify(listOfJson) , function (err) {
        if (err) return console.log(err);
        console.log('file was written');
      });

  
    }
  });
});



const uri =
  "mongodb+srv://michaelsd28:mypassword28@cluster0.cneai.mongodb.net/boku_no_hero_mangaDB?authSource=admin&replicaSet=atlas-x7tzqc-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;



// connection.once("open", function () {
//   connection.db.collection("chapters", function (err, collection) {
//     collection.find({ linkName: "one-piecechapter-1007" }).toArray(function (err, data) {

//         let [alldata] = data;
//         let { imgSRC } = alldata;
//         let myLinksDB = { links: imgSRC };

//         console.log(myLinksDB); // it will print your collection data
//       });
//   });
// });

// var numbers = 0;

/*return list of chapters json */

router.get("/ch", (req, res) => {
 

  res.sendFile(__dirname+"/boku no hero chapters.json")

  numbers = numbers + 1;

  console.log(numbers, "responded /boku no hero chapters.json");
});

/* webscrape images one piece  */
module.exports = router;