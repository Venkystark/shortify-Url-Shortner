package com.vky.shortify.Url;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
@RequestMapping("/")
public class UrlController {

    @Autowired
    private UrlService urlService;

    @GetMapping("{shortCode}")
    public String redirectToLongUrl(@PathVariable String shortCode) {

        String long_url = urlService.getLongUrl(shortCode);

        System.out.println(long_url+"found");

        return "redirect:"+long_url;
    }
    
}
