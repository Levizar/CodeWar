// First Solution

// import java.util.Arrays;

// /**
//  * @author Brice
//  */

// public class MorseCodeDecoder {
//     public static String decode(String morseCode) {
//         String[] words = morseCode.trim().split("   ");
//         return Arrays.stream(words)
//                 .map(word -> {
//                     String[] letters = word.split(" ");
//                     return Arrays.stream(letters)
//                             .map(letter -> MorseCode.get(letter))
//                             .reduce("", String::concat);
//                 })
//                 .reduce("", (acc, item) -> acc.equals("") ? item : (acc + " " + item));
//     }
// }


// Second solution : complexity improvement:
// Reduce return a new object at each step
// Collect accumulate in the same object

import java.util.Arrays;
import java.util.stream.Collectors;

public class MorseCodeDecoder {
    public static String decode(String morseCode) {
        return Arrays.stream(morseCode.trim().split("   "))
                .map(word -> Arrays.stream(word.split(" "))
                                .map(MorseCode::get)
                                .collect(Collectors.joining("")))
                .collect(Collectors.joining(" "))
                .trim();
    }
}