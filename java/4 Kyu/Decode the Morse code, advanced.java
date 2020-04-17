// Last version: simple replaceAll instead of o² iteration
import java.util.Arrays;
import java.util.stream.Collectors;

public static class MorseCodeDecoder {
            
    public static String decodeBits(final String bits) {

        final String cleanedBits = bits.replaceAll("^0+|0+$", "");
        int t = Arrays.stream(cleanedBits.split("(?<=0)(?=1)|(?<=1)(?=0)"))
            .map(chain -> chain.length())
            .min(Integer::compare)
            .get();
        
        // International Morse Standard adapted with the t timing:
        final String regexWordSep = String.format("0{%s}", (t*7));
        final String regexLetterSep = String.format("0{%s}", (t*3));
        final String regexCodeSep = String.format("0{%s}", (t*1));
        final String regexDot = String.format("1{%s}", (t*1));
        final String regexDash = String.format("1{%s}", (t*3));

        // Start the conversion
        return cleanedBits.replaceAll(regexDash, "-")
                          .replaceAll(regexDot, ".")
                          .replaceAll(regexWordSep, "   ")
                          .replaceAll(regexLetterSep, " ")
                          .replaceAll(regexCodeSep, "");
    }
    
    public static String decodeMorse(final String morseCode) {
        return Arrays.stream(morseCode.trim().split("   "))
                .map(word -> Arrays.stream(word.split(" "))
                                .map(MorseCode::get)
                                .collect(Collectors.joining("")))
                .collect(Collectors.joining(" "))
                .trim();
    }
}

// // Second version: 2 improvements: t calculation & regex computation
// import java.util.Arrays;
// import java.util.stream.Collectors;

// public static class MorseCodeDecoder {
            
//     public static String decodeBits(final String bits) {

//         final String cleanedBits = bits.replaceAll("^0+|0+$", "");
//         int t = Arrays.stream(cleanedBits.split("(?<=0)(?=1)|(?<=1)(?=0)"))
//             .map(chain -> chain.length())
//             .min(Integer::compare)
//             .get();
        
//         // International Morse Standard adapted with the t timing:
//         final String regexWordSep = String.format("0{%s}", (t*7));
//         final String regexLetterSep = String.format("0{%s}", (t*3));
//         final String regexCodeSep = String.format("0{%s}", (t*1));
//         final String regexDot = String.format("1{%s}", (t*1));
//         final String regexDash = String.format("1{%s}", (t*3));

//         // Start the conversion
//         return Arrays.stream(cleanedBits.split(regexWordSep))
//             .map(bitsWord ->
//                 Arrays.stream(bitsWord.split(regexLetterSep))
//                     .map(bitsCode -> {
//                         String morseCode = (bitsCode.replaceAll(regexDash, "-")).replaceAll(regexDot, ".").replaceAll(regexCodeSep, "");
//                         return morseCode;
//                     })
//                     .collect(Collectors.joining(" "))
//             )
//             .collect(Collectors.joining("   "));
//     }
    
//     public static String decodeMorse(final String morseCode) {
//         return Arrays.stream(morseCode.trim().split("   "))
//                 .map(word -> Arrays.stream(word.split(" "))
//                                 .map(MorseCode::get)
//                                 .collect(Collectors.joining("")))
//                 .collect(Collectors.joining(" "))
//                 .trim();
//     }
// }


// // First version
// import java.util.Arrays;
// import java.util.stream.Collectors;

// public static class MorseCodeDecoder {

            
//     public static String decodeBits(final String bits) {

//         // International Standard:
//         final String regexWordSepStandard = "0000000";
//         final String regexLetterSepStandard = "000";
//         final String regexCodeSepStandard = "0";
//         final String regexDotStandard = "1";
//         final String regexDashStandard = "111";

//         // Remove uneeded 0 at the beginning and the end
//         final String cleanedBits = bits.replaceAll("^0+|0+$", "");

        
//         // find t value
//         Integer[] arrT = new Integer[2];

//         // t = number of occurence for the shortest "0" chain
//         arrT[0] = Arrays.stream(cleanedBits.replaceAll("^1+|1+$", "").split("[^0]+")).map(chain -> chain.length()).min(Integer::compare).get();
//         // t = number of occurence for the shortest "1" chain
//         arrT[1] = Arrays.stream(cleanedBits.split("[^1]+")).map(chain -> chain.length()).min(Integer::compare).get();

//         int t = Arrays.stream(arrT).reduce(999, (acc,item) -> (item < acc && item != 0) ? item : acc);

//         // Prepare the regex to match the current morse code
//         final String regexWordSep = regexWordSepStandard.repeat(t);
//         final String regexLetterSep = regexLetterSepStandard.repeat(t);
//         final String regexCodeSep = regexCodeSepStandard.repeat(t);
//         final String regexDot = regexDotStandard.repeat(t);
//         final String regexDash = regexDashStandard.repeat(t);

//         // Start the conversion
//         return Arrays.stream(cleanedBits.split(regexWordSep))
//             .map(bitsWord ->
//                 Arrays.stream(bitsWord.split(regexLetterSep))
//                     .map(bitsCode -> {
//                         String morseCode = (bitsCode.replaceAll(regexDash, "-")).replaceAll(regexDot, ".").replaceAll(regexCodeSep, "");
//                         return morseCode;
//                     })
//                     .collect(Collectors.joining(" "))
//             )
//             .collect(Collectors.joining("   "));
//     }
    
//     public static String decodeMorse(final String morseCode) {
//         return Arrays.stream(morseCode.trim().split("   "))
//                 .map(word -> Arrays.stream(word.split(" "))
//                                 .map(MorseCode::get)
//                                 .collect(Collectors.joining("")))
//                 .collect(Collectors.joining(" "))
//                 .trim();
//     }
// }