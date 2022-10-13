package com.example.MangaScrapper.Controller;


import com.example.MangaScrapper.models.ChapterLinks;
import com.example.MangaScrapper.models.MangaList;
import com.example.MangaScrapper.utils.ConvertToBase64;
import com.example.MangaScrapper.utils.JsoupMethods;
import com.example.MangaScrapper.utils.MongoDB_CRUD;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
public class MangaApiController  {

    ConvertToBase64 convertToBase64 = new ConvertToBase64();

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
          @PathVariable String jsonName )
  {

        return mongoDB_crud.getChapterList(keyName,jsonName);

  }

    @GetMapping(path = "manga/update-list" , produces = MediaType.APPLICATION_JSON_VALUE)
    public String updateList() throws IOException
    {
    JsoupMethods jsoupMethods = new JsoupMethods();
        jsoupMethods.updateChapters();

      return "{response:  'ok'}";
    }



    @GetMapping(path = "manga/links/{link}/isBase64&&={isBase64}",produces = MediaType.APPLICATION_JSON_VALUE)
  public ChapterLinks getChapterLinks( @PathVariable("link") String link,@PathVariable("isBase64") Boolean isBase64 ) throws IOException {

        List<String>  newOne = mongoDB_crud.get_IMG_linkOnly(link).stream()
                .map(e-> e = cleanLink(e) )
                .collect(Collectors.toList());


        System.out.println(link + " **** >> " +  isBase64);
    if(isBase64){

        newOne = newOne.stream()
                .map(e-> {
                    try {
                        return e = convertToBase64.urlToBase64(e);
                    } catch (MalformedURLException ex) {
                        ex.printStackTrace();
                    }
                    return e;
                })
                .collect(Collectors.toList());


    }



        return  new ChapterLinks(newOne) ;
  }




    @RequestMapping("/")
    public ModelAndView welcome() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("index.html");
        return modelAndView;
    }

    @Bean
    public WebMvcConfigurer configure() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/*")
                        .allowedOrigins("https://cdn.readonepiece.com")
                        .allowedMethods("GET","PUT","DELETE","POST");
            }

        };
    }


}

