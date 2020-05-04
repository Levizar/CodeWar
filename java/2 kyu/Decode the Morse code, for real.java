/*

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
*/

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import static java.lang.Math.abs;

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
        // Clean extra 0
        final String cleanedBits = bits.replaceAll("^0+|0+$|^[ ]|[ ]$", "");
        if(cleanedBits.equals(" ")|cleanedBits.equals("")) return "";
        System.out.println(cleanedBits);        
        
        // Create array which we can work with
        final String[] arrOfBits = cleanedBits.split("(?<=0)(?=1)|(?<=1)(?=0)");
        final Integer[] arrOfBitsLength = Arrays.stream(arrOfBits).mapToInt(String::length).boxed().toArray(size -> new Integer[size]);

        // Initialize 3 ArrayList for K-means alg
        List<Integer> cluster1;
        List<Integer> cluster2;
        List<Integer> cluster3;
        
        double cluster1PreCentroid;
        double cluster2PreCentroid;
        double cluster3PreCentroid;
        double cluster1NewCentroid = (double) Arrays.stream(arrOfBitsLength).min(Integer::compare).get();
        double cluster3NewCentroid = (double) Arrays.stream(arrOfBitsLength).max(Integer::compare).get();
        double cluster2NewCentroid = (cluster3NewCentroid - cluster1NewCentroid) / 2.0;
        
        do{
        
            cluster1PreCentroid = cluster1NewCentroid;
            cluster2PreCentroid = cluster2NewCentroid;
            cluster3PreCentroid = cluster3NewCentroid;
           
            System.out.println("cluster1 :" + cluster1.toString());
            System.out.println("cluster2 :" + cluster2.toString());
            System.out.println("cluster3 :" + cluster3.toString());
            
            cluster1 = new ArrayList<Integer>();
            cluster2 = new ArrayList<Integer>();
            cluster3 = new ArrayList<Integer>();
            
            System.out.println("cluster1PreCentroid : " + cluster1PreCentroid);
            System.out.println("cluster2PreCentroid : " + cluster2PreCentroid);
            System.out.println("cluster3PreCentroid : " + cluster3PreCentroid);

            for (int i = 0; i < arrOfBitsLength.length; i++) {
                Integer elm = arrOfBitsLength[i];
                double distanceToCluster1 = abs(elm - cluster1PreCentroid);
                double distanceToCluster2 = abs(elm - cluster2PreCentroid);
                double distanceToCluster3 = abs(elm - cluster3PreCentroid);

                if(distanceToCluster1 <= distanceToCluster2 && distanceToCluster1 <= distanceToCluster3){
                    cluster1.add(elm);
                } else if(distanceToCluster2 <= distanceToCluster1 && distanceToCluster2 <= distanceToCluster3){
                    cluster2.add(elm);
                } else if(distanceToCluster3 <= distanceToCluster1 && distanceToCluster3 <= distanceToCluster2){
                    cluster3.add(elm);
                } else {
                    System.out.println("4th case shouldn't happen");
                }
            }
            
            cluster1NewCentroid = cluster1.stream().mapToDouble(val -> val).average().orElse(0.0);
            cluster2NewCentroid = cluster2.stream().mapToDouble(val -> val).average().orElse(0.0);
            cluster3NewCentroid = cluster3.stream().mapToDouble(val -> val).average().orElse(0.0);

        } while (cluster1PreCentroid != cluster1NewCentroid && cluster2PreCentroid != cluster2NewCentroid && cluster3PreCentroid != cluster3NewCentroid);

        System.out.println("bits:" + bits);
        System.out.println("cleanedBits:" + cleanedBits);
        System.out.println("arrOfBitsLength :" + Arrays.toString(arrOfBitsLength));
        System.out.println("cluster1 :" + cluster1.toString());
        System.out.println("cluster2 :" + cluster2.toString());
        System.out.println("cluster3 :" + cluster3.toString());
        System.out.println(cluster1NewCentroid);
        System.out.println(cluster2NewCentroid);
        System.out.println(cluster3NewCentroid);

        StringBuilder store = new StringBuilder();

        for (int i = 0; i < arrOfBitsLength.length; i++) {
            Integer elm = arrOfBitsLength[i];
            double distanceToCluster1 = abs(elm - cluster1NewCentroid);
            double distanceToCluster2 = abs(elm - cluster2NewCentroid);
            double distanceToCluster3 = abs(elm - cluster3NewCentroid);

            if(distanceToCluster1 <= distanceToCluster2 && distanceToCluster1 <= distanceToCluster3){
                // if match 0 => remplacer par espace
                // if match 1 => remplacer par dot
            } else if(distanceToCluster2 <= distanceToCluster1 && distanceToCluster2 <= distanceToCluster3){
                // if match 0 => remplacer par 3 espace
                // if match 1 => remplacer par dash
            } else if(distanceToCluster3 <= distanceToCluster1 && distanceToCluster3 <= distanceToCluster2){
                // if match 0 => remplacer par 7 espace
                // if match 1 => remplacer par dash
            } else {
                System.out.println("4th case shouldn't happen");
            }
        }

        /*
        final String dotRegex = String.format("1{%s,%s}", 1, dotTopLine);
        final String inCharSepRegex = String.format("0{%s,%s}", 1, dotTopLine);
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
        */
        return "";
    }
}