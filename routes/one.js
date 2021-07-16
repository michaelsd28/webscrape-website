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

  cron.scheduleJob('0 2 * * *', async () => {
 
    const html = await got(urlOnePiece);

    const $ = cheerio.load(html.body);
  
    let titleName = [];
    $("#ceo_latest_comics_widget-3 > ul > li:nth-child(n) > a").each((index, value) => {
      let link = $(value).text();
      titleName.push(link);
    });
  
  
    let linkFile = [];
    $("#ceo_latest_comics_widget-3 > ul > li:nth-child(n) > a").each((index, value) => {
      let link = $(value).attr("href");
      linkFile.push(link.substring(39));
    });
    
    
    titleName =  titleName.splice(0,50)
    linkFile = linkFile.splice(0,50)
  
  
    const jsonOBJ = [{ episodes: titleName }, { Orginal_NameCH: linkFile }];
    fs.writeFile(__dirname+'/One piece chapters.json', JSON.stringify(jsonOBJ) , function (err) {
      if (err) return console.log(err);
      console.log(`One piece file was written on ${Date()}`);
    });
  
    console.log(`One piece file was written on ${Date()}`);
  
});



// var numbers = 0;

/*return list of chapters json */

router.get("/ch", async(req, res) => {



res.sendFile(__dirname+"/One piece chapters.json")

console.log(`One piece sent file  */One piece chapters.json`);


});

/* webscrape images one piece  */
module.exports = router;
