const express = require("express");

const mongoose = require("mongoose");
const cheerio = require("cheerio");
const fs = require("fs");
const cron = require("node-schedule");
const router = express.Router();
const got = require("got");

const urlOnePiece = "https://onepiecechapters.com/one-piece/";

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
  
    // console.log($ , "$$$$")
  
    let titleName = [];
    $("#opChapters > div > .elementor-position-left.box.elementor-vertical-align-top.elementor-widget.elementor-widget-image-box > div > div > div > h5 > a").each((index, value) => {
      let link = $(value).text();
      titleName.push("One Piece - "+link);
    });
  
  
    let linkFile = [];
    $("#opChapters > div > .elementor-position-left.box.elementor-vertical-align-top.elementor-widget.elementor-widget-image-box > div > div > div > h5 > a").each((index, value) => {
      let link = $(value).attr("href");
      linkFile.push(link.substring(35));
    });
    
    
    titleName =  titleName.splice(0,50)
    linkFile = linkFile.splice(0,50)
  
    console.log(titleName,"titleName",linkFile,"linkFile")
  
  
    const jsonOBJ = [{ episodes: titleName }, { Orginal_NameCH: linkFile }];
    fs.writeFileSync(__dirname+'/one ch.json', JSON.stringify(jsonOBJ) , function (err) {
      if (err) return console.log(err);
      console.log(`One piece file was written on ${Date()}`);
    });
  
    console.log(`One piece file was written on ${Date()}`);
  
  
});



// var numbers = 0;

/*return list of chapters json */

router.get("/ch", async(req, res) => {

  



res.sendFile(__dirname+"/one ch.json")

console.log(`One piece sent file  */One piece chapters.json`);


});



/* webscrape images one piece  */
module.exports = router;
