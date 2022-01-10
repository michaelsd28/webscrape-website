package com.example.MangaScrapper.Controller;


import com.example.MangaScrapper.models.ChapterLinks;
import com.example.MangaScrapper.models.MangaList;
import com.example.MangaScrapper.utils.JsoupMethods;
import com.example.MangaScrapper.utils.MongoDB_CRUD;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class MangaApiController extends JsoupMethods {

    public static String cleanLink(String str){
        str = str.replaceAll("[\\[\\]\"]","").replaceAll("\\\\t","")
                .replaceAll("\\\\n","").
                replaceAll("\\\\","")
                .replaceAll("jpegr","jpeg")
                .replaceAll("pngr","png");

        return str;
    }

    MongoDB_CRUD mongoDB_crud = new MongoDB_CRUD();




  @GetMapping(path = "manga/list/{keyName}&={jsonName}")
  public MangaList getMangaList(
          @PathVariable String keyName ,
          @PathVariable String jsonName ){

        return mongoDB_crud.getChapterList(keyName,jsonName);

  }

    @GetMapping(path = "manga/update-list" , produces = MediaType.APPLICATION_JSON_VALUE)
    public String updateList() throws IOException {

this.updateChapters();

      return "{response:  'ok'}";
    }



    @GetMapping(path = "manga/links/{link}",produces = MediaType.APPLICATION_JSON_VALUE)
  public ChapterLinks getChapterLinks(@PathVariable String link) throws IOException {

     List<String> newOne = mongoDB_crud.get_IMG_linkOnly(link).stream()
             .map(e-> e = cleanLink(e) )
             .collect(Collectors.toList());

      return  new ChapterLinks(newOne) ;
  }




}

