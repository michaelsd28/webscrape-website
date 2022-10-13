package com.example.MangaScrapper;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

import java.awt.*;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

@SpringBootApplication
public class MangaScrapperApplication {
    public static void main(String[] args) {

        try {

            //specify the protocol along with the URL
            Desktop desktop = java.awt.Desktop.getDesktop();
            URI oURL = new URI("http://localhost:8080/");

            desktop.browse(oURL);
        } catch (URISyntaxException | IOException e) {
            //
            e.printStackTrace();
        }
        SpringApplication.run(MangaScrapperApplication.class, args);


    }

}
