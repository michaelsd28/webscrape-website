
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

        // fs.writeFile(
        //   "Boruto chapters.json",
        //   JSON.stringify(jsonOBJ),
        //   function (err) {
        //     if (err) throw err;
        //     console.log("created file");
        //   }
        // );
    //   }
    // });

    res.sendFile(__dirname+'/Boruto chapters.json')


numbers = numbers + 1;

console.log(numbers, "mmg");
});
