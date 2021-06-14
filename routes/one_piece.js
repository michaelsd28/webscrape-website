const express = require("express");


const cheerio = require("cheerio");


const router = express.Router();

const request = require("request");
const urlOnePiece = "https://myonepiecemanga.com/";



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

  
   
res.sendFile(__dirname+"/One piece chapters.json")

  numbers = numbers + 1;

  console.log(numbers, "mmg response file");
});







module.exports = router;