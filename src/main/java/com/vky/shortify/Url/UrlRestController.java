package com.vky.shortify.Url;

import org.springframework.web.bind.annotation.RestController;

import com.vky.shortify.User.UserEntity;
import com.vky.shortify.User.UserService;

import java.security.Principal;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api/")
public class UrlRestController {

@Autowired
UserService userService;

@Autowired
UrlService urlService;

    
@GetMapping("test")
public HashMap<String,String> getMethodName(Principal Principal) {
    System.out.println("Authenticated User: " + Principal.getName());
    HashMap<String, String> map = new HashMap<>();
    map.put("test", "success");
    return map;
}

@PostMapping("shortenpublic")
public HashMap<String,String> shorten_url_public(@RequestBody Url longurl) {

    HashMap<String,String> response = new HashMap<>();


    System.out.println("Public shorten api called");

    try {
    UserEntity user = userService.findByUsername("publicuser@vky.com");
                                                                            
    longurl.setCreatedBy(user);


    response.put("status", "success");
    response.put("shortUrl", urlService.saveUrl(longurl));

    }
    catch(Exception e) {
        System.out.println("Error in public shorten api: "+e.getMessage());
        response.put("status", "failed");
    }

    return response;
}

@PostMapping("shorten")
public String shorten_url(@RequestBody Url longurl) {

    return urlService.saveUrl(longurl);
}


}
