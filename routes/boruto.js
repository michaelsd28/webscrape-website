const express = require("express");

const mongoose = require("mongoose");
const cheerio = require("cheerio");
const router = express.Router();
const request = require("request");
const boruto_URL = "https://read-boruto.online/";

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

module.exports = router;

router.get("/bo", (req, res) => {
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

      console.log(newLinks);

      let jsonOBJ = [{ episodes: newArray }, { Orginal_NameCH: newLinks }];

      res.json(jsonOBJ);
    }
  });

  numbers = numbers + 1;

  console.log(numbers, "mmg boruto");
});
