package com.example.MangaScrapper.utils;

import com.example.MangaScrapper.models.MangaList;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import org.bson.Document;
import org.bson.conversions.Bson;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

public class MongoDB_CRUD   {




//    String onePiece_URL_List = "C:\\Users\\rd28\\Documents\\Coding\\Scrape\\Manga\\One Piece.html";
//    String boruto_URL = "C:\\Users\\rd28\\Documents\\Coding\\Scrape\\Manga\\One Piece.html\\Boruto_ Naruto Next Generations.html";
//    String boku_no_hero_URL = "C:\\Users\\rd28\\Documents\\Coding\\Scrape\\Manga\\One Piece.html\\Read Boku no Hero Academia Manga Online - English Scans.html";

//    String urlOnePiece = "https://onepiecechapters.com/one-piece/";

    //C:\Users\rd28\Documents\Coding\Scrape\Manga




    public static String cleanList(String str){

        str = str.replaceAll("\\[","")
                .replaceAll("]","")
                .replaceAll("a,","a")
                .replaceAll("\\\"","")
                .replaceAll("\"","")
                .replaceAll("s,","s")
                .replaceAll( " ero"," Hero");

        return  str;
    }



    String uri = "mongodb+srv://michaelsd28:mypassword28@cluster0.cneai.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    MongoClient mongoClient = MongoClients.create(uri);
    MongoDatabase mangaDB = mongoClient.getDatabase("boku_no_hero_mangaDB");
    MongoCollection<Document> mongoCollection = mangaDB.getCollection("chapters");

   public MangaList getChapterList(String keyName ,String jsonName){


       String search = this.mongoCollection.find(new Document(keyName,jsonName)).first().toJson();
       JsonObject jsonObject = new JsonParser().parse(search).getAsJsonObject();
       String mm =  jsonObject.get(jsonName).toString().replaceAll("\\\\","")
               .replace("\"{","{").replace("}\"","}")
               .replaceAll("\\\\","");

       JsonObject jsonObject2 = new JsonParser().parse(mm).getAsJsonObject();

       return new MangaList(Arrays.asList(
               cleanList( jsonObject2
                       .get("chapterNames").toString())
               .split(",")),Arrays.asList(
                    cleanList(jsonObject2.get("linkNames").toString())
                               .split(",")));


   }

   public List<String> get_IMG_linkOnly(String linkName) throws IOException {

     try {
         String string =   mongoCollection.find(new Document("linkName",linkName)).first().toJson();
         JsonObject jsonObject = new Gson().fromJson(string, JsonObject.class);
         System.out.println("found in data base " + linkName);
         return Arrays.asList(jsonObject.get("imgSRC").toString().split(","));
     } catch (Exception e){

         System.out.println("not found and had to scrape " +linkName );
         JsoupMethods jsoupMethods = new JsoupMethods();

         if(jsoupMethods.getScrapeImages(linkName).getMangaLinks().size()<3){
             System.out.println("not enough images to save to database");
             return jsoupMethods.getScrapeImages(linkName).getMangaLinks();
         }
         this.insertChapterData(linkName.substring(0,10),linkName,jsoupMethods.getScrapeImages(linkName).getMangaLinks());
         String string =   mongoCollection.find(new Document("linkName",linkName)).first().toJson();
         JsonObject jsonObject = new Gson().fromJson(string, JsonObject.class);
         return Arrays.asList(jsonObject.get("imgSRC").toString().split(","));
     }
   }

    public void insertChapterList(String name ,  List<String> episodes ,List<String> linkNames,String keyName,String valueName  ){
        MangaList mangaList = new MangaList(episodes,linkNames);
        Document document  = new Document();
        document.append(name, new Gson().toJson(mangaList)  ).append(keyName,valueName);
        this.mongoCollection.insertOne(document);
    }

        public Bson bsonFilter(String keyName, String value){


       return Filters.eq(keyName,value);
        }





    public void insertChapterData(String chapterName, String linkName,List<String> images){
        Document bson = new org.bson.Document("imgSRC",images)
                .append("chapterName",chapterName).append("linkName",linkName);
        this.mongoCollection.insertOne(bson);
    }







    public static void main(String[] args) {



MongoDB_CRUD mongoDB_crud = new MongoDB_CRUD();





//        System.out.println("741258****  "+mongoDB_crud.mongoCollection.find((Document) search).first().toJson() + " ****741258");


    }
}


