const express = require("express");
const app = express();
const port = 3001;
var cors = require('cors')
const mongoose = require("mongoose");
// const mongodb = require("mongodb");
const cheerio = require("cheerio");
const fs = require("fs");
const urlOnePiece = 'https://w3.bokunoheromanga.com/'
//const urlOnePiece = 'https://myonepiecemanga.com/'
const request = require("request");
const urlMangaImages = "https://w3.bokunoheromanga.com/manga/";
const uri = "mongodb+srv://michaelsd28:mypassword28@cluster0.cneai.mongodb.net/boku_no_hero_mangaDB?authSource=admin&replicaSet=atlas-x7tzqc-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";

app.use(cors())

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








/*return list of chapters json */


app.get("/one-piece", (req, res) => {

  Chapter.findOne().sort({linkName: -1}).exec(function(err, post) {


    if (err){

      console.log(err)
    }else{

  let chapterDate =  post.chapterName.split('-');
  let day = parseInt(chapterDate[1])
  let month = parseInt(chapterDate[0]);
  var myAGE = getAge(month,day);


  if (myAGE>6){
    request(urlOnePiece, function (error, response, html) {
   
      if(!error && response.statusCode == 200){
        const $ = cheerio.load(html);
    
        let  ul_elements = $('.ceo_latest_comics_widget')
        let listOfChapters = ul_elements.text();
    
       let  listOfChaptersArray = listOfChapters.split('\n')
       let new_listOfChaptersArray = []
       let listOfChaptersArrayJson = []
  
       const map1 = listOfChaptersArray.map(item => { new_listOfChaptersArray.push(item)   } );
       new_listOfChaptersArray = new_listOfChaptersArray.slice(1,51)
       const map2 = new_listOfChaptersArray.map(item => {
         
         let newItem =  item.trim().replace(',',' ').replace(/  /g,' ').replace(/:/g,' -');
          listOfChaptersArrayJson.push(newItem)
      
      } );
      let newArray = [];
       const map3 = new_listOfChaptersArray.map(item=>{
        
  
      
           
        newArray.push(  chapterForRequest(item.replace(/\t/g,'')))
       
                  
                  
          return newArray
      })
  
    
    
   
  
        listOfChaptersJson =  [{episodes: listOfChaptersArrayJson},{ Orginal_NameCH: newArray  }]
         
  
   
    res.json(listOfChaptersJson)
    console.log('its old and had to update json')
        
    
       fs.writeFile(
          "Boku no Hero chapters.json",
          JSON.stringify(listOfChaptersJson),
          function (err) {
            if (err) throw err;
            console.log("created file");
          }
        );
    
    
  
     
    
      }
    
    
    });
    
  
  }else{



  
    res.sendFile(__dirname+'/Boku no Hero chapters.json')
    console.log('its new and send the json file')


  }



    }
    
  
  });






  numbers = numbers + 1;

  console.log(numbers, "mmg");

  



});





////websrape images

///fetch data for images








/* webscrape images   */


app.get("/one-piece-ch/:chapterName", (req, res) => {
  

  let chapterName_1 = chapterForRequest(req.params.chapterName) 
  let chapterName_new = chapterName_1 + "/";
  let imgWebscrape = urlMangaImages + chapterName_new;

  //fetchImages(imgWebscrape);

  console.log(numbers, "mmg images");


 

  Chapter.find({ linkName: chapterName_1 }, 
    function (err, Chapterr) {
      if(err) {
    
        console.log('not found err 404 ')
        res.json(myLinks)
      }else{
    
      
        if(Chapterr.length == 0 ){

          request(imgWebscrape, function (error, response, html) {
            var myLinks = { links: [] };
            if (!error && response.statusCode == 200) {
              const $ = cheerio.load(html);
        
              const img_elements = $("img").each((index, value) => {
                var link = $(value).attr("src");
        
                myLinks.links.push(link);
              });
        
              const myLinks_newLinks = myLinks.links.splice(
                0,
                myLinks.links.length
              );
        
              myLinks = { links: myLinks_newLinks };
        
             
            
            
        
         
              console.log("myLinks", "console was excecuted");
        
              let {links} = myLinks
      
              const chapter = new Chapter({
    
                chapterName:`${mm}-${dd}`,
                imgSRC:links,
                dateAdded: `${mm}-${dd}`,
                linkName:chapterName_1
             
              });

              console.log(links.length,'links.length  *4:00AM*')
        
              
              chapter.save();
    
    
    
    
              console.log('chapter was not found and created a new one ')

            
              
              res.json(myLinks)
        
           
            }
          });
        
        






    
        }else{
      
          let [alldata]   =  Chapterr
          let {imgSRC} = alldata
          let myLinksDB = { links: imgSRC };
         console.log('10:45 ,chapter was found and responded with json',);

      

         res.json(myLinksDB)
    
        }
     
    
      }
    
    
    
    });

 



});
























/*read dabase mongoose */

// Chapter.find({ linkName: 'boku-no-hero-academia-chapter-300' }, 
// function (err, Chapterr) {
//   if(err) {

//     console.log('mmg');

//   }else{

  
//     if(Chapterr.length == 0 ){

  
//        console.log('error finding one');


//     }else{

//       let [alldata]   =  Chapterr
//       let {linkName} = alldata
//      console.log(linkName,'10:02');

//     }
 

//   }



// });






// Chapter.find((err, chapter) => {
//   if (err) {
//     console.log(err);
//   } else {
//     /*close connection */

//     chapter.forEach((chapter) => {
//       console.log(chapter.chapterName);
//       mongoose.connection.close();
//     });
//   }
// });

/*validation database mongoose */


// const chapterSchema = new mongoose.Schema({

//     chapterName:[String],
//     imgSRC :[String],
//     linkName:[String]
    
//     })


/*update database  mongoose */

let rawdata = fs.readFileSync('List of chapters.json');
let listFile = JSON.parse(rawdata);
let {episodes} = listFile;
//console.log(episodes,'listFile 9:15')



Chapter.updateOne(
  { linkName: 'one-piece-chapter-1013' },
  { chapterName: episodes[0] } ,  (err) => {

    if (err) {
      console.log(err);
  
    } else {
      console.log("sucess updateOne");
  

 
    }
  }
);

/*delete database  mongoose */
/* 
          Chapter.deleteOne({linkName:'linkName'},(err)=>{

            if(err){
                console.log(err);
            }else{
                  console.log('success deleteOne')

            }


          })*/
