const express = require("express");
const app = express();
const port = 3001;
const cors = require('cors')
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const fs = require("fs");
const https = require('https');
const path = require('path')


/* anime manga */
const boku_no_hero_URL = 'https://w3.bokunoheromanga.com/'
const boku_no_hero_Manga = 'https://w3.bokunoheromanga.com/manga/'
const urlOnePiece = 'https://myonepiecemanga.com/'

const boruto_Manga = 'https://read-boruto.online/manga/'

const boruto_URL = 'https://read-boruto.online/'



const request = require("request");
const OnePiceManga = "https://myonepiecemanga.com/manga/";

/* anime manga */

const uri = "mongodb+srv://michaelsd28:mypassword28@cluster0.cneai.mongodb.net/boku_no_hero_mangaDB?authSource=admin&replicaSet=atlas-x7tzqc-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";

app.use(cors())
// exports.app =  functions.https.onRequest(app)


app.use('/ssl',(req,res)=>{

console.log('https is working')


});

const sslServer = https.createServer({

key: fs.readFileSync(path.join(__dirname,'cert','key.pem')),
cert: fs.readFileSync(path.join(__dirname,'cert','cert.pem')),

},
app

)

sslServer.listen(443,()=>{



  console.log('sslServer is running on 443 ***https***')
})










mongoose.connect(uri, { useNewUrlParser: true });
let date = new Date();
let dd = String(date.getDate());
let mm = String(date.getMonth()+1);

function getAge(month,day){

  let newMonth = (mm - month )*30;
  let newDate = (dd -day )+newMonth;
  
  
  
  return parseInt(newDate);
  
  }
  






/*create dabase mongoose */

const chapterSchema = new mongoose.Schema({

  chapterName:String,
  imgSRC :[String],
  linkName:String
  
});

const Chapter = mongoose.model("Chapter", chapterSchema);


/*create obj for mongoose */









const chapterForRequest = (chapter) => {
  chapter = chapter
    .replace(/ – /g, "%")
    .replace(/’/g, "")
    .replace(/,/g, "")
    .replace(/ /g, "%")
    .replace(/%/g, "-")
    .replace(/:/g,'')
    .toLowerCase();

  return chapter.toString();
};



var numbers = 0;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });





/*return list of chapters json */


app.get("/one-piece", (req, res) => {
  Chapter.findOne()
    .sort({ linkName: -1 })
    .exec(function (err, post) {
      if (err) {
        console.log(err);
      } else {
        let chapterDate = post.chapterName.split("-");
        let day = parseInt(chapterDate[1]);
        let month = parseInt(chapterDate[0]);
        var myAGE = getAge(month, day);

        if (!myAGE) {
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


              const listOfJson = [
                { episodes: listOfChaptersJson },
                { Orginal_NameCH: listOfChaptersOrginal },
              ];

              res.json(listOfJson);

              console.log("its old and had to update json one piece");

              fs.writeFile(
                "One Piece - chapters.json",
                JSON.stringify(listOfJson),
                function (err) {
                  if (err) throw err;
                  console.log("created file");
                }
              );
            }
          });
        } else {
          res.sendFile(__dirname + "/One Piece - chapters.json");
          console.log("its new and send the json file one piece");
        }
      }
    });

  numbers = numbers + 1;

  console.log(numbers, "mmg");
});



/* boku no hero json api */
app.get("/boku-no-hero", (req, res) => {
  Chapter.findOne()
    .sort({ linkName: -1 })
    .exec(function (err, post) {
      if (err) {
        console.log(err);
      } else {
        let chapterDate = post.chapterName.split("-");
        let day = parseInt(chapterDate[1]);
        let month = parseInt(chapterDate[0]);
        var myAGE = getAge(month, day);

        if (!myAGE > 6) {
          request(boku_no_hero_URL, function (error, response, html) {
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


              const listOfJson = [
                { episodes: listOfChaptersJson },
                { Orginal_NameCH: listOfChaptersOrginal },
              ];

              res.json(listOfJson);

              console.log("its old and had to update json boku no hero ");

              fs.writeFile(
                "Boku no Hero chapters.json",
                JSON.stringify(listOfJson),
                function (err) {
                  if (err) throw err;
                  console.log("created file");
                }
              );
            }
          });
        } else {
          res.sendFile(__dirname + "/Boku no Hero chapters.json");
          console.log("its new and send the json file boku no hero");
        }
      }
    });

  numbers = numbers + 1;

  console.log(numbers, "mmg");
});










app.get("/boruto", (req, res) => {
  
          // request(boruto_URL, function (error, response, html) {
          //   if (!error && response.statusCode == 200) {
          //     const $ = cheerio.load(html);
          //     /* get text name */
          //     let ul_elements = $(".version-chap");
          //     let listOfChapters = ul_elements.text();
          //     let newString = listOfChapters
          //       .replace(/\t/g, "")
          //       .replace(/\s\s+/g, " ");
          //     let newArray = newString.split(" Read ").slice(0, 51);

          //     /* get href*/

          //     let links = [];

          //     $(".version-chap a").each((index, value) => {
          //       var link = $(value).attr("href");
          //       links.push(link);
          //     });

          //     let newLinks = [];
          //     const strREQ = links.map((item) => {
          //       let newItem = item.substring(33);
          //       newLinks.push(newItem);
          //     });

          //     newLinks = newLinks.splice(0, 51);

          //     console.log(newLinks);

          //     let jsonOBJ = [
          //       { episodes: newArray },
          //       { Orginal_NameCH: newLinks },
          //     ];

          //     fs.writeFile(
          //       "Boruto chapters.json",
          //       JSON.stringify(jsonOBJ),
          //       function (err) {
          //         if (err) throw err;
          //         console.log("created file");
          //       }
          //     );
          //   }
          // });

          res.sendFile(__dirname+'/Boruto chapters.json')
      
    
  numbers = numbers + 1;

  console.log(numbers, "mmg");
});





////websrape images

///fetch data for images








/* webscrape images one piece  */


app.get("/one-piece-ch/:chapterName", (req, res) => {
  let chapterName_1 = chapterForRequest(req.params.chapterName);

  if (chapterName_1 === "one-piece-chapter-1007") {
    chapterName_1 = "one-piecechapter-1007";
  }

  let chapterName_new = chapterName_1 + "/";
  let imgWebscrape = OnePiceManga + chapterName_new;

  //fetchImages(imgWebscrape);

  console.log(numbers, "mmg images one-piece-ch");

  Chapter.find({ linkName: chapterName_1 }, function (err, Chapterr) {
    if (err) {
      console.log("not found err 404 ");
      res.json(myLinks);
    } else {
      if (Chapterr.length == 0) {
        request(imgWebscrape, function (error, response, html) {
          let myLinks = { links: [] };
          if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);

            const img_elements = $("img").each((index, value) => {
              let link = $(value).attr("src");

              myLinks.links.push(link);
            });

            const myLinks_newLinks = myLinks.links.splice(
              0,
              myLinks.links.length
            );

            const OnePieceNoEmptyLinks = myLinks_newLinks.filter(function (e) {
              return (
                e !== "" &&
                e !==
                  "https://myonepiecemanga.com/wp-content/plugins/ad-inserter/images/ads.png"
              );
            });

            myLinks = { links: OnePieceNoEmptyLinks };

            console.log("myLinks", "console was excecuted");

            let { links } = myLinks;

            const chapter = new Chapter({
              chapterName: `${mm}-${dd}`,
              imgSRC: links,
              dateAdded: `${mm}-${dd}`,
              linkName: chapterName_1,
            });

            console.log(links.length, "links.length  *4:00AM*");

            if(links.length>6){
              chapter.save();

            }

            console.log("chapter was not found and created a new one ");

            res.json(myLinks);
          }
        });
      } else {
        let [alldata] = Chapterr;
        let { imgSRC } = alldata;
        let myLinksDB = { links: imgSRC };
        console.log("10:45 ,chapter was found and responded with json  one-piece");

        res.json(myLinksDB);
      }
    }
  });
});



/* webscrape images boku no hero  */

app.get("/boku-no-hero-ch/:chapterName", (req, res) => {
  let chapterName_1 = chapterForRequest(req.params.chapterName);

  if (chapterName_1 === "one-piece-chapter-1007") {
    chapterName_1 = "one-piecechapter-1007";
  }

  let chapterName_new = chapterName_1 + "/";
  let imgWebscrape = boku_no_hero_Manga + chapterName_new;

  //fetchImages(imgWebscrape);

  console.log(numbers, "mmg images boku-no-hero-ch");

  Chapter.find({ linkName: chapterName_1 }, function (err, Chapterr) {
    if (err) {
      console.log("not found err 404 ");
      res.json(myLinks);
    } else {
      if (Chapterr.length == 0) {
        request(imgWebscrape, function (error, response, html) {
          let myLinks = { links: [] };
          if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);

            const img_elements = $("img").each((index, value) => {
              let link = $(value).attr("src");

              myLinks.links.push(link);
            });

            const myLinks_newLinks = myLinks.links.splice(
              0,
              myLinks.links.length
            );

            const OnePieceNoEmptyLinks = myLinks_newLinks.filter(function (e) {
              return (
                e !== "" &&
                e !==
                  "https://myonepiecemanga.com/wp-content/plugins/ad-inserter/images/ads.png"
              );
            });

            myLinks = { links: OnePieceNoEmptyLinks };

            console.log("myLinks", "console was excecuted");

            let { links } = myLinks;

            const chapter = new Chapter({
              chapterName: `${mm}-${dd}`,
              imgSRC: links,
              dateAdded: `${mm}-${dd}`,
              linkName: chapterName_1,
            });

            console.log(links.length, "links.length  *4:00AM*");

            if(links.length>6){
              chapter.save();

            }

            console.log("chapter was not found and created a new one ");

            res.json(myLinks);
          }
        });
      } else {
        let [alldata] = Chapterr;
        let { imgSRC } = alldata;
        let myLinksDB = { links: imgSRC };
        console.log("10:45 ,chapter was found and responded with json  boku-no-hero");

        res.json(myLinksDB);
      }
    }
  });
});



/* webscrape images boku no hero  */

app.get("/boruto-ch/:chapterName", (req, res) => {
  let chapterName_1 = chapterForRequest(req.params.chapterName);



  let chapterName_new = chapterName_1 + "/";
  let imgWebscrape = boruto_Manga + chapterName_new;

  console.log(imgWebscrape,'imgWebscrape')

  //fetchImages(imgWebscrape);

  console.log(numbers, "mmg images boruto");

  Chapter.find({ linkName: chapterName_1 }, function (err, Chapterr) {
    if (err) {
      console.log("not found err 404 ");
      res.json(myLinks);
    } else {
      if (Chapterr.length == 0) {
        request(imgWebscrape, function (error, response, html) {
          let myLinks = { links: [] };
          if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);

            const img_elements = $("img").each((index, value) => {
              let link = $(value).attr("src");

              myLinks.links.push(link);
            });


        

            const myLinks_newLinks = myLinks.links.splice(
              0,
              myLinks.links.length
            );

            const OnePieceNoEmptyLinks = myLinks_newLinks.filter(e=> {
              return (
                e !== "" &&
                e !==
                  "https://myonepiecemanga.com/wp-content/plugins/ad-inserter/images/ads.png"
              );
            });

            const removeSpaces = OnePieceNoEmptyLinks.map((item,index)=>{

              let newItem = item.replace(/\t/g,'').replace(/\n/g,'')

              OnePieceNoEmptyLinks[index] = newItem;

            })

            

            

            myLinks = { links: OnePieceNoEmptyLinks };

            console.log("myLinks", "console was excecuted");

            let { links } = myLinks;

            const chapter = new Chapter({
              chapterName: `${mm}-${dd}`,
              imgSRC: links,
              dateAdded: `${mm}-${dd}`,
              linkName: chapterName_1,
            });

            console.log(links.length, "links.length  *4:00AM*");

            if(links.length>6){
              chapter.save();

            }

          

            console.log("chapter was not found and created a new one ");

            res.json(myLinks);
          }
        });
      } else {
        let [alldata] = Chapterr;
        let { imgSRC } = alldata;
        let myLinksDB = { links: imgSRC };
        console.log("10:45 ,chapter was found and responded with json  boruto");

        res.json(myLinksDB);
      }
    }
  });
});