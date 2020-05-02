
// Use average value
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public static class MorseCodeDecoder {
            
    public static String decodeBits(final String bits) {
        System.out.println("bits:" + bits);

        // Clean extra 0
        final String cleanedBits = bits.replaceAll("^0+|0+$|^[ ]|[ ]$", "");
        if(cleanedBits.equals(" ")|cleanedBits.equals("")) return "";
        // Create an array which we can work with
        
        // Need to change the regex of the split !
        final String[] arrOfBits = cleanedBits.split("");
        final Integer[] arrOfBitsLength = Arrays.stream(arrOfBits).mapToInt(String::length).boxed().toArray(size -> new Integer[size]);

        // Initialize 3 ArrayList for K-means alg
        List<Integer> cluster1 = new ArrayList<Integer>();
        List<Integer> cluster2 = new ArrayList<Integer>();
        List<Integer> cluster3 = new ArrayList<Integer>();
        
        // "random" assignement of the value for first iteration.
        for (int i = 0; i < arrOfBitsLength.length; i++) {
            switch (i%3) {
                case 0:
                    cluster1.add(arrOfBitsLength[i]);
                    break;
                case 1:
                    cluster2.add(arrOfBitsLength[i]);
                    break;
                case 2:
                    cluster3.add(arrOfBitsLength[i]);
                    break;
            }
        }

        double cluster1PreCentroid;
        double cluster2PreCentroid;
        double cluster3PreCentroid;
        double cluster1newCentroid;
        double cluster2newCentroid;
        double cluster3newCentroid;


        cluster1PreCentroid = cluster1.stream().mapToDouble(val -> val).average().orElse(0.0);
        cluster2PreCentroid = cluster2.stream().mapToDouble(val -> val).average().orElse(0.0);
        cluster3PreCentroid = cluster3.stream().mapToDouble(val -> val).average().orElse(0.0);
        
        System.out.println(cluster1PreCentroid);
        System.out.println(cluster2PreCentroid);
        System.out.println(cluster3PreCentroid);
        
        final String dotRegex = String.format("1{%s,%s}", min, dotTopLine);
        final String inCharSepRegex = String.format("0{%s,%s}", min, dotTopLine);
        final String dashRegex = String.format("1{%s,}", dashBottomLine);
        final String outCharSepRegex = String.format("0{%s,%s}", dashBottomLine, outCharTopLine);
        final String wordSepRegex = String.format("0{%s,}", wordBottomLine);

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
    
    public static String decodeMorse(final String morseCode) {
        if(morseCode.equals(" ")|morseCode.equals("")) return "";
        return Arrays.stream(morseCode.trim().split("   "))
                .map(word -> Arrays.stream(word.split(" "))
                                .map(MorseCode::get)
                                .collect(Collectors.joining("")))
                .collect(Collectors.joining(" "))
                .trim();
    }
}
