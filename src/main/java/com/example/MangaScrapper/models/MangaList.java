package com.example.MangaScrapper.models;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class MangaList {

    @Getter @Setter
    private List<String> chapterNames;

    @Getter @Setter
    private List<String>linkNames;

    public MangaList(List<String> chapterNames, List<String>linkNames) {
        this.chapterNames = chapterNames;
        this.linkNames = linkNames;
    }
}
