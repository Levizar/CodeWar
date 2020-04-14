/**
 * @author: Brice
 */

import java.util.Arrays;
import java.util.stream.IntStream;

public class Kata{
  public static String reverseWords(final String original){
      String[] arrOfStringChar = original.split(" ");
      if(arrOfStringChar.length == 0) return original;
      return Arrays.stream(arrOfStringChar)
        .map(w->{
            String[] splitedWord = w.split("");
            return IntStream
                .rangeClosed(1, splitedWord.length)
                .mapToObj(i -> (String) splitedWord[splitedWord.length - i])
                .map(Object::toString)
                .reduce("",String::concat);
        })
        .reduce("", (acc, item) -> acc.equals("") ? item : (acc + " " + item));
  }
}

// Other solution inspired by others' answer:
/*

import java.util.Arrays;
import java.util.stream.Collectors;

public class Kata{
  public static String reverseWords(final String original){
      return Arrays.stream(original.split("(?<=\\s)|(?=\\s+)"))
        .map(word -> (new StringBuilder(word)).reverse().toString())
        .collect(Collectors.joining(""));
  }
}

*/