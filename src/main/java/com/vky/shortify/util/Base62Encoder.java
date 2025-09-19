package com.vky.shortify.util;

import org.springframework.stereotype.Component;

@Component
public class Base62Encoder {

    // Characters used in Base62
    private static final String BASE62 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final int BASE = BASE62.length();

    /**
     * Encode a numeric ID to Base62 string
     *
     * @param id numeric ID (from DB)
     * @return Base62 encoded string
     */
    public static String encode(long id) {
        if (id == 0) {
            return String.valueOf(BASE62.charAt(0));
        }
        StringBuilder sb = new StringBuilder();
        while (id > 0) {
            int remainder = (int) (id % BASE);
            sb.append(BASE62.charAt(remainder));
            id /= BASE;
        }
        return sb.reverse().toString();
    }

    /**
     * Decode Base62 string back to numeric ID
     *
     * @param shortCode Base62 encoded string
     * @return numeric ID
     */
    public static long decode(String shortCode) {
        long id = 0;
        for (int i = 0; i < shortCode.length(); i++) {
            id = id * BASE + BASE62.indexOf(shortCode.charAt(i));
        }
        return id;
    }

    // Quick test
    public static void main(String[] args) {
        long id = 1;
        String encoded = encode(id);
        long decoded = decode(encoded);

        System.out.println("ID: " + id);
        System.out.println("Encoded: " + encoded); // cb
        System.out.println("Decoded: " + decoded); // 125
    }
}
