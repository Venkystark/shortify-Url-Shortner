package com.vky.shortify.Url;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class UrlController {

    @Autowired
    private UrlService urlService;

    @GetMapping("{shortCode}")
    public String redirectToLongUrl(@PathVariable String shortCode) {

        String redirection = "/api/test";

        Url url = urlService.getLongUrl(shortCode);

        if(url!=null)

        redirection = url.getLongUrl();

        return "redirect:"+redirection;
    }
    
}
