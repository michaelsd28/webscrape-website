package com.example.MangaScrapper.utils;
import org.apache.commons.io.FileUtils;

import java.io.*;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;
import java.net.URLConnection;
import java.util.Base64;
public class ConvertToBase64 {

    public  byte[] downloadUrl(URL toDownload) {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        try {
            byte[] chunk = new byte[98304];
            int bytesRead;
            InputStream stream = toDownload.openStream();

            while ((bytesRead = stream.read(chunk)) > 0) {
                outputStream.write(chunk, 0, bytesRead);
            }

        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }

        return outputStream.toByteArray();
    }

    public  String urlToBase64(String url) throws MalformedURLException {

        String format ="data:image/png;base64,";
        URL urlFormat =  new URL(url) ;
        byte[] fileContent =downloadUrl(urlFormat);

        return format+Base64.getEncoder().encodeToString(fileContent);
    }


    public static void main(String[] args) throws IOException {


    ConvertToBase64 convertToBase64 = new ConvertToBase64();


        FileWriter myWriter = new FileWriter("filename.txt");
        myWriter.write(convertToBase64.urlToBase64( "https://www.imgacademy.com/sites/default/files/2009-stadium-about.jpg"));



//        System.out.println(Base64.getUrlEncoder().encodeToString(downloadUrl(url)));

    }

}
