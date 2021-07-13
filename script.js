const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const fs = require("fs");
const https = require("https");
const path = require("path");
const router = express.Router();
const request = require("request");
const got = require("got");

const oneRoute = require("./routes/one");
const boku_no_heroRoute = require("./routes/boku_no_hero");
const borutoRoute = require("./routes/boruto");

/* anime manga */

const boku_no_hero_Manga = "https://boku-no-hero-academia.com/manga/";

const OnePiceManga = "https://onepiece-mangaonline.com/manga/";
const boruto_Manga = "https://read-boruto.online/manga/";

/* anime manga */

const uri =
  "mongodb+srv://michaelsd28:mypassword28@cluster0.cneai.mongodb.net/boku_no_hero_mangaDB?authSource=admin&replicaSet=atlas-x7tzqc-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
mongoose.connect(uri, { useNewUrlParser: true });

app.use(cors());

app.use("/one", oneRoute);
app.use("/boku-no-hero", boku_no_heroRoute);
app.use("/boruto", borutoRoute);

app.use("/ssl", (req, res) => {
  console.log("https is working");
});

const sslServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")),
  },
  app
);

// sslServer.listen(443,()=>{

//   console.log('sslServer is running on 443 ***https***')
// })

let date = new Date();
let dd = String(date.getDate());
let mm = String(date.getMonth() + 1);

function getAge(month, day) {
  let newMonth = (mm - month) * 30;
  let newDate = dd - day + newMonth;

  return parseInt(newDate);
}

/*create dabase mongoose */

const chapterSchema = new mongoose.Schema({
  chapterName: String,
  imgSRC: [String],
  linkName: String,
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
    .replace(/:/g, "")
    .toLowerCase();

  return chapter.toString();
};

var numbers = 0;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

/* webscrape images one piece  */

app.get("/one-piece-ch/:chapterName", async (req, res) => {
  let chapterName_1 = req.params.chapterName;



  let chapterName_new = chapterName_1 + "/";
  let imgWebscrape = OnePiceManga + chapterName_new;

  //fetchImages(imgWebscrape);

  console.log(numbers, "mmg images one-piece-ch");

  Chapter.find({ linkName: chapterName_1 }, async function (err, Chapterr) {
    if (err) {
      console.log("not found err 404 ");
      res.json(myLinks);
    } else {
      if (Chapterr.length == 0) {
        const html = await got(imgWebscrape);
        console.log(imgWebscrape,"imgWebscrape")
      

        const $ = cheerio.load(html.body);

        /* get href */

        const myLinks = [];
        $(".entry-content img").each((index, value) => {
          let link = $(value).attr("data-src");

          myLinks.push(link);
        });

        console.log(myLinks, "myLinks");

        let links_JSON = { links: myLinks };

        console.log("myLinks", "console was excecuted one piece");

        let { links } = myLinks;

        const chapter = new Chapter({
          chapterName: "one-piece",
          imgSRC: myLinks,
          dateAdded: `${mm}-${dd}`,
          linkName: chapterName_1,
        });

        console.log(myLinks.length, "links.length  *4:00AM* one piece");

        if (myLinks.length > 6) {
          chapter.save();
        }

        console.log("chapter was not found and created a new one one piece ");

        res.json(links_JSON);
      } else {
        let [alldata] = Chapterr;
        let { imgSRC } = alldata;
        let myLinksDB = { links: imgSRC };
        console.log(
          "10:45 ,chapter was found and responded with json  one-piece"
        );

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

            if (links.length > 6) {
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
        console.log(
          "10:45 ,chapter was found and responded with json  boku-no-hero"
        );

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

            const OnePieceNoEmptyLinks = myLinks_newLinks.filter((e) => {
              return (
                e !== "" &&
                e !==
                  "https://myonepiecemanga.com/wp-content/plugins/ad-inserter/images/ads.png"
              );
            });

            const removeSpaces = OnePieceNoEmptyLinks.map((item, index) => {
              let newItem = item.replace(/\t/g, "").replace(/\n/g, "");

              OnePieceNoEmptyLinks[index] = newItem;
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

            if (links.length > 6) {
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
