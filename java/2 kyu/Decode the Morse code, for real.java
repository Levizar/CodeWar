import java.util.Arrays;
import java.util.stream.Collectors;


public class MorseCodeDecoder {
    
    public static String decodeMorse(final String morseCode) {
        if(morseCode.equals(" ")|morseCode.equals("")) return "";
        String store = Arrays.stream(morseCode.trim().split("   "))
                .map(word -> Arrays.stream(word.split(" "))
                                .map(MorseCode::get)
                                .collect(Collectors.joining("")))
                .collect(Collectors.joining(" "))
                .trim();
        System.out.println(store);
        return store;
    }
    
    public static String decodeBitsAdvanced(String bits) {
        System.out.println("bits:" + bits);
        // Clean extra 0
        final String cleanedBits = bits.replaceAll("^0+|0+$|^[ ]|[ ]$", "");
        if(cleanedBits.equals(" ")|cleanedBits.equals("")) return "";
        System.out.println("cleanedBits: " + cleanedBits);
        
        // Get an array of 1
        final String[] arrOf1 = cleanedBits.split("[^1]+");
        int min1 = Arrays.stream(arrOf1).map(chain -> chain.length()).min(Integer::compare).get();
        int max1 = Arrays.stream(arrOf1).map(chain -> chain.length()).max(Integer::compare).get();
        min1 = min1 == 0 ? 1 : min1;
        max1 = max1 == 0 ? 1 : max1;
        
        // Get an array of 0 after cleaning extra 1
        final String[] arrOf0 = cleanedBits.replaceAll("^1+|1+$", "").split("[^0]+");
        int min0 = Arrays.stream(arrOf0).map(chain -> chain.length()).min(Integer::compare).get();
        int max0 = Arrays.stream(arrOf0).map(chain -> chain.length()).max(Integer::compare).get();
        double average = Arrays.stream(arrOf0).map(chain -> chain.length()).mapToInt(Integer::intValue).average().orElse(Double.NaN);
        System.out.println("HAHAHA :" + average);
        
        min0 = (min0 == 0 | min1 < min0) ? min1 : min0;
        min1 = min1 > min0 ? min0 : min1;
        max0 = max0 == 0 ? 1 : max0;
        
        // dash-dot/2  => before limit = dot after limit = dash
        final double limitValue1 = (max1 - min1) / 2.0;
final double limitValue2 = (arrOf0.length == 1 && arrOf0[0].length() < 6) ? max0 : (limitValue1 + ((max0 - limitValue1) / 2.0));

        int dotTopLine = (int) Math.floor(limitValue1);
        dotTopLine = dotTopLine == 0 ? min1 : dotTopLine;
        int dashBottomLine = (int) Math.ceil(limitValue1);
        dashBottomLine = dashBottomLine <= dotTopLine ? dotTopLine + 1 : dashBottomLine;
        int outCharTopLine = (int) Math.floor(limitValue2);
        outCharTopLine = outCharTopLine < dashBottomLine ? dashBottomLine : outCharTopLine;
        int wordBottomLine = (int) Math.ceil(limitValue2);
        wordBottomLine = wordBottomLine <= outCharTopLine ? outCharTopLine + 1 : wordBottomLine;
        
        System.out.println("min0 : " + min0);
        System.out.println("max0 : " + max0);
        System.out.println("min1 : " + min1);
        System.out.println("max1 : " + max1);
        System.out.println("limitValue1 : " + limitValue1);
        System.out.println("max0 : " + max0);
        System.out.println("dotTopLine "+ dotTopLine);
        System.out.println("dashBottomLine : " + dashBottomLine);
        System.out.println("limitValue2 : " + limitValue2);
        System.out.println("outCharTopLine : " + outCharTopLine);
        System.out.println("wordBottomLine : " + wordBottomLine);

        final String dotRegex = String.format("1{%s,%s}", min1, dotTopLine);
        final String inCharSepRegex = String.format("0{%s,%s}", min1, dotTopLine);
        final String dashRegex = String.format("1{%s,}", dashBottomLine);
        final String outCharSepRegex = String.format("0{%s,%s}", dashBottomLine, outCharTopLine);
        final String wordSepRegex = String.format("0{%s,}", wordBottomLine);

        System.out.println("dotRegex");
        System.out.println(dotRegex);
        System.out.println("inCharSepRegex");
        System.out.println(inCharSepRegex);
        System.out.println("dashRegex");
        System.out.println(dashRegex);
        System.out.println("outCharSepRegex");
        System.out.println(outCharSepRegex);
        System.out.println("wordSepRegex");
        System.out.println(wordSepRegex);

        // 110110100111000001100000011111101001111100111111000000000001110111111110111110111110000001011000111111000001111100111011000001
        // ···· · −·−−   ·−−− ··− −·· ·
        // Start the conversion
        String store = cleanedBits.replaceAll(dashRegex, "-")
                    .replaceAll(dotRegex, ".")
                    .replaceAll(wordSepRegex, "   ")
                    .replaceAll(outCharSepRegex, " ")
                    .replaceAll(inCharSepRegex, "");
                    
        System.out.println(store);
        return store;
    }
}