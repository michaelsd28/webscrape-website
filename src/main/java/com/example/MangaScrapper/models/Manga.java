package com.example.MangaScrapper.models;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

public class Manga {

    @Getter @Setter
    private String [] chapterImages;

    @Getter @Setter
    private String chapterName;

    @Getter @Setter
    private String linkName;

    @Getter @Setter
    private Date date;

    public Manga(String[] chapterImages, String chapterName, String linkName) {
        this.chapterImages = chapterImages;
        this.chapterName = chapterName;
        this.linkName = linkName;
    }






}
