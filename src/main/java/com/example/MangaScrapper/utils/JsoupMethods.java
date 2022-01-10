package com.example.MangaScrapper.utils;

import com.example.MangaScrapper.models.ChapterLinks;
import com.example.MangaScrapper.models.MangaList;
import com.google.gson.Gson;
import org.bson.conversions.Bson;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class JsoupMethods {

    String onePieceUrl = "https://ww8.readonepiece.com/chapter/";
    String BorutoURL = "https://ww1.read-boruto.online/manga/";
    String BokuNoURL = "https://boku-no-hero-academia.com/manga/";

    String onePiece_Query = "div.w-full a[href]";
    String boku_no_hero_Query = "ul.su-posts a[href]";
    String boruto_Query = "ul.main a[href]";

    String onePiece_URL_List = "https://ww8.readonepiece.com/manga/one-piece/";
    String boruto_URL_List = "https://ww1.read-boruto.online/";
    String boku_no_hero_URL_List = "https://boku-no-hero-academia.com/";



    MongoDB_CRUD mongoDB_crud = new MongoDB_CRUD();

    public MangaList scrapeMangaList(String url,String querySelector , int subString) throws IOException {

        ///with link
        Document website =     Jsoup.connect(url).get();

        //with no link
        File onePieceHTML = new File(url);
//        Document website =     Jsoup.parse(onePieceHTML, null);

        Elements elements = website.select(querySelector);

        List<String> chapterList = new ArrayList<>();
        List<String> linkList = new ArrayList<>();

        int first50 = 0;
        for (Element element : elements) {
            if (!element.text().equals("Read")) {
                chapterList.add(element.text());
                linkList.add( element.attr("href").substring(subString)) ;
                first50++;
            }
            if(first50 == 50)  break;
        }
        MangaList mangaLists = new MangaList(chapterList,linkList);
        return mangaLists;
    }

    public ChapterLinks scrapeImages(String url, String querySelector) throws IOException {
///with link
        Document website =     Jsoup.connect(url).get();
        File onePieceHTML = new File(url);
        Elements elements = website.select(querySelector);
        List<String> linkList = new ArrayList<>();

        for (Element element : elements) {
                if(!element.toString().contains(".gif") ){
                 linkList.add(element.attr("src")) ;
                }
        }
        return new ChapterLinks(linkList);
    }

    public ChapterLinks getScrapeImages(String nameLink) throws IOException {


        if(nameLink.contains("one-piece") || nameLink.contains("onepiece")){
           return this.scrapeImages(onePieceUrl+nameLink,
                   "div.js-pages-container img[src]");
        } else if(nameLink.contains("boruto")){
            return this.scrapeImages(BorutoURL+nameLink,
                    "div.reading-content div.page-break img[src]");
        }
            return this.scrapeImages(BokuNoURL+nameLink,
                    "div.entry-content img[src]");
    }


    public void updateChapters() throws IOException {

        mongoDB_crud.mongoCollection.findOneAndReplace(mongoDB_crud
                        .bsonFilter("_OnePieceList","OnePieceList")
                ,new org.bson.Document("OnePieceList",new Gson().toJson(scrapeMangaList(onePiece_URL_List,onePiece_Query,37)) )
                        .append("_OnePieceList","OnePieceList"));

        mongoDB_crud.mongoCollection.findOneAndReplace(mongoDB_crud
                        .bsonFilter("_BorutoList","BorutoList")
                ,new org.bson.Document("BorutoList",new Gson().toJson(scrapeMangaList(boruto_URL_List,boruto_Query,37)) )
                        .append("_BorutoList","BorutoList"));

        mongoDB_crud.mongoCollection.findOneAndReplace(mongoDB_crud
                        .bsonFilter("_BokuNoHeroList","BokuNoHeroList")
                ,new org.bson.Document("BokuNoHeroList",new Gson().toJson(scrapeMangaList(boku_no_hero_URL_List,boku_no_hero_Query,40)) )
                        .append("_BokuNoHeroList","BokuNoHeroList"));

System.out.println("updated all chapter list");
    }



    public static void main(String[] args) throws IOException {


        JsoupMethods onePiece = new JsoupMethods();
        MongoDB_CRUD mongoDB_crud = new MongoDB_CRUD();


//        System.out.println( new Gson().toJson( onePiece.getMangaLinks("C:\\Users\\rd28\\Documents\\Coding\\Scrape\\Manga\\One Piece Chapter 1028.html",
//                "div.js-pages-container img")));

        /// 1* One Piece.html
        /// 2* One Piece Chapter 1028.html
        /// 3* Boruto_ Naruto Next Generations.html
        /// 4* Read Boku no Hero Academia Manga Online - English Scans.html


        String url = "C:\\Users\\rd28\\Documents\\Coding\\Scrape\\Manga\\";
        String name = "Boruto_ Naruto Next Generations.html";
        String query = "ul.main a[href]";



        mongoDB_crud.mongoCollection.findOneAndReplace(mongoDB_crud
                .bsonFilter("_BorutoList","BorutoList")
                ,new org.bson.Document("BorutoList",new Gson().toJson( onePiece
                .scrapeMangaList(url+name,query,37)) ).append("_BorutoList","BorutoList"));


//        System.out.println( "*** "+ new Gson().toJson( onePiece
//                .scrapeMangaList(url+name,query,37))+" ***");

    }

    }

