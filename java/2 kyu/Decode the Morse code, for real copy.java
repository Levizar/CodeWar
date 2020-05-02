
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
        final String[] arrOfBits = cleanedBits.split("");

        // Initialize 3 ArrayList for K-means alg
        List<Integer>[] arrayOfCluster = {
            new ArrayList<Integer>(),
            new ArrayList<Integer>(),
            new ArrayList<Integer>()
        };

        // get easier reference for the arrayOfCluster
        List<Integer> cluster1 = arrayOfCluster[0];
        List<Integer> cluster2 = arrayOfCluster[1];
        List<Integer> cluster3 = arrayOfCluster[2];
        
        double cluster1PreCentroid;
        double cluster2PreCentroid;
        double cluster3PreCentroid;
        double cluster1newCentroid;
        double cluster2newCentroid;
        double cluster3newCentroid;

        // "random" assignement of the value for first iteration.
        for (int i = 0; i < arrOfBits.length; i++) {
            arrayOfCluster[(i % 3)].add(arrOfBits[i]);
        }

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
