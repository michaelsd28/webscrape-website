package com.example.MangaScrapper.models;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class ChapterLinks {

    @Setter @Getter
    private List <String>  mangaLinks;



    public ChapterLinks(List<String> mangaLinks) {
        this.mangaLinks = mangaLinks;
    }




}
