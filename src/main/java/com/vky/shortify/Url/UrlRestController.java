package com.vky.shortify.Url;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api/")
public class UrlRestController {

@Autowired
UrlService urlService;

    
@GetMapping("test")
public String getMethodName() {
    return new String("hello");
}

@PostMapping("shorten")
public String shorten_url(@RequestBody Url longurl) {
    return urlService.saveUrl(longurl);
}


}
