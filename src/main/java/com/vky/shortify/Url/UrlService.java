package com.vky.shortify.Url;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import com.vky.shortify.util.Base62Encoder;

@Service
public class UrlService {
    
    @Autowired
    UrlRepository urlRepository;

    @Autowired
    Base62Encoder base62Encoder;

    public  boolean is_long_exists(String longUrl) {

        return urlRepository.existsByLongUrl(longUrl);

    }

    public String get_shortUrl(String longUrl) {

        Url url = urlRepository.findByLongUrl(longUrl);

        System.out.println(url.getId()+"id found");

        // return Base62Encoder.encode(url.getId());
        return url.getShortCode();

    }

    public String saveUrl(Url url) {

        System.out.println(url.getLongUrl());

        if(is_long_exists(url.getLongUrl()))

            return get_shortUrl(url.getLongUrl());

        Url res = urlRepository.save(url);

        String shortCode = Base62Encoder.encode(res.getId());

        res.setShortCode(shortCode);

        urlRepository.save(res);

        return shortCode;
    }

    @Cacheable(value = "urls", key = "#shortcode")
    public Url getLongUrl(String shortcode) {

        Url url = null;

        try{

        System.out.println("fetching from db" +shortcode);

        Long id = Base62Encoder.decode(shortcode);

        url = urlRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("URL not found for shortcode: " + shortcode));

        }
        catch(Exception e) {

            e.printStackTrace();
        }

        return url;

    }
}
