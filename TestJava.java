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
              
              
              
                return "... ...   .--";
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