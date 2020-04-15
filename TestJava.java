import java.util.Arrays;
import java.util.stream.Collectors;


/**
 * TestJava This class has been made to test my CodeWars kata's code
 */
public class TestJava {
    /**
     * This function runs the below classes
     * @param args sometimes it expects args, sometimes not
     */
    public static void main(final String[] args) {
        String decodedBits = MorseCode.MorseCodeDecoder.decodeBits(String.join(" ", args));
        String decodedMessage = MorseCode.MorseCodeDecoder.decodeMorse(decodedBits);
        System.out.println(decodedMessage);
    }

    public static class MorseCode {


        public static class MorseCodeDecoder {

            
            public static String decodeBits(final String bits) {

                // International Standard:
                final String regexWordSepStandard = "0000000";
                final String regexLetterSepStandard = "000";
                final String regexCodeSepStandard = "0";
                final String regexDotStandard = "1";
                final String regexDashStandard = "111";

                // Remove uneeded 0
                final String cleanedBits = bits.replaceAll("^0+", "");

                // finding t value:

                // is there a match for word standard separator ?
                if(bits.matches(".*" + regexWordSepStandard + ".*")){
                    // define t with the 7 "0"
                    
                } else if(bits.matches(".*" + regexLetterSepStandard + ".*")){
                    // define t with the 3 "0"

                } else {
                    // define t with the shorter list of 1 = dot
                }


                final int t = 2; // time unit

                // Prepare the regex to match the current morse code
                final String regexWordSep = regexWordSepStandard.repeat(t);
                final String regexLetterSep = regexLetterSepStandard.repeat(t);
                final String regexCodeSep = regexCodeSepStandard.repeat(t);
                final String regexDot = regexDotStandard.repeat(t);
                final String regexDash = regexDashStandard.repeat(t);

                // Start the conversion
                return Arrays.stream(cleanedBits.split(regexWordSep))
                    .map(bitsWord ->
                        Arrays.stream(bitsWord.split(regexLetterSep))
                            .map(bitsCode -> {
                                // String morseCode = (bitsCode.replaceAll(regexDash, "-"));
                                // morseCode = morseCode.replaceAll(regexDot, ".");
                                String morseCode = (bitsCode.replaceAll(regexDash, "-")).replaceAll(regexDot, ".").replaceAll(regexCodeSep, "");
                                // System.out.println(morseCode);
                                // System.out.println(MorseCode.get(morseCode));
                                return morseCode;
                            })
                            .collect(Collectors.joining(" "))
                    )
                    .collect(Collectors.joining("   "));
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

        public static String get (final String arg){
            return "This is for test case, it should return a letter corresponding to the morseCode argument";
        }

    }

}