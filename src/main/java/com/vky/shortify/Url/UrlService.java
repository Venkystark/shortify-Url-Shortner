package com.vky.shortify.Url;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

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

        return Base62Encoder.encode(url.getId());
    }

    public String saveUrl(Url url) {

        System.out.println(url.getLongUrl());

        if(is_long_exists(url.getLongUrl()))

            return get_shortUrl(url.getLongUrl());

        Url res = urlRepository.save(url);

        return Base62Encoder.encode(res.getId());
    }

    public String getLongUrl(String shortcode) {

        Long id = Base62Encoder.decode(shortcode);

        Url url = urlRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("URL not found for shortcode: " + shortcode));

        return url.getLongUrl();

    }
}
