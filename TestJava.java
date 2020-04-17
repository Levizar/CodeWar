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

        public static String get (final String arg){
            return "This is for test case, it should return a letter corresponding to the morseCode argument";
        }

    }

}