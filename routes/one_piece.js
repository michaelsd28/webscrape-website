const express = require("express");

const mongoose = require("mongoose");
const cheerio = require("cheerio");


const router = express.Router();

const request = require("request");
const urlOnePiece = "https://onepiece-mangaonline.com/";



var numbers = 0;

/*connect to database  */
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









/*return list of chapters json */

router.get("/ch", (req, res) => {

  request(urlOnePiece, function (error, response, html) {
    if (!error && response.statusCode == 200) {
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
        var link = $(value).attr("href");
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

      res.json(listOfJson);

      console.log(listOfJson)
    }
  });
   
  numbers = numbers + 1;

  console.log(numbers, "mmg");
});




/* webscrape images one piece  */


module.exports = router;