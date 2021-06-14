const express = require("express");

const mongoose = require("mongoose");
const cheerio = require("cheerio");
const router = express.Router();
const request = require("request");
const boruto_URL = "https://read-boruto.online/";
const fs = require("fs");
var numbers = 0;

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



// cron.schedule('0 1 * * *', () => {



  var cron = require('node-cron');

  cron.schedule('0 1 * * *', () => {

    request(boruto_URL, function (error, response, html) {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        /* get text name */
        let ul_elements = $(".version-chap");
        let listOfChapters = ul_elements.text();
        let newString = listOfChapters.replace(/\t/g, "").replace(/\s\s+/g, " ");
        let newArray = newString.split(" Read ").slice(0, 51);
  
        /* get href*/
  
        let links = [];
  
        $(".version-chap a").each((index, value) => {
          var link = $(value).attr("href");
          links.push(link);
        });
  
        let newLinks = [];
        const strREQ = links.map((item) => {
          let newItem = item.substring(33);
          newLinks.push(newItem);
        });
  
        newLinks = newLinks.splice(0, 51);
  
    
  
        let jsonOBJ = [{ episodes: newArray }, { Orginal_NameCH: newLinks }];

        fs.writeFile(__dirname+'/boruto chapters.json', JSON.stringify(jsonOBJ) , function (err) {
          if (err) return console.log(err);
          console.log('file was written');
        });
  
 
      }
    });
      
  });


router.get("/ch", (req, res) => {
 
  numbers = numbers + 1;


  res.sendFile(__dirname+"/boruto chapters.json")

  console.log(numbers, "response /boruto chapters.json");
});

module.exports = router;