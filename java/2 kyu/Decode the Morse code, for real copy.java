
// Use average value
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import static java.lang.Math.abs; // import he "abs(x)" method

public static class MorseCodeDecoder {
            
    public static String decodeBits(final String bits) {
        
        // Clean extra 0
        final String cleanedBits = bits.replaceAll("^0+|0+$|^[ ]|[ ]$", "");
        if(cleanedBits.equals(" ")|cleanedBits.equals("")) return "";
        
        // Create array which we can work with
        final String[] arrOfBits = cleanedBits.split("(?<=0)(?=1)|(?<=1)(?=0)");
        final Integer[] arrOfBitsLength = Arrays.stream(arrOfBits).mapToInt(String::length).boxed().toArray(size -> new Integer[size]);
        Integer min = Arrays.stream(arrOfBitsLength).min(Integer::compare).get();
        Integer max = Arrays.stream(arrOfBitsLength).max(Integer::compare).get();

        // Initialize 3 ArrayList for K-means alg
        List<Integer> cluster1 = new ArrayList<Integer>();
        List<Integer> cluster2 = new ArrayList<Integer>();
        List<Integer> cluster3 = new ArrayList<Integer>();
        

        // "random" assignement of the value for first iteration.
        for (int i = 0; i < arrOfBitsLength.length; i++) {
            if( i < (arrOfBitsLength.length/3) ){
                cluster1.add(arrOfBitsLength[i]);
            } else if(i < (2 * arrOfBitsLength.length/3)){
                cluster2.add(arrOfBitsLength[i]);
            } else{
                cluster3.add(arrOfBitsLength[i]);
            }
        }
        
        double cluster1PreCentroid;
        double cluster2PreCentroid;
        double cluster3PreCentroid;
        double cluster1NewCentroid;
        double cluster2NewCentroid;
        double cluster3NewCentroid;
        
        do{
            cluster1PreCentroid = cluster1.stream().mapToDouble(val -> val).average().orElse(min);
            cluster2PreCentroid = cluster2.stream().mapToDouble(val -> val).average().orElse(0.0);
            cluster3PreCentroid = cluster3.stream().mapToDouble(val -> val).average().orElse(max);
            
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
                System.out.println("elm to attr: " + elm);
                System.out.println("distanceToCluster1 : " + distanceToCluster1);
                System.out.println("distanceToCluster2 : " + distanceToCluster2);
                System.out.println("distanceToCluster3 : " + distanceToCluster3);
                if(distanceToCluster1 <= distanceToCluster2 && distanceToCluster1 <= distanceToCluster3){
                    System.out.println("attr to Cl 1");
                    cluster1.add(elm);
                } else if(distanceToCluster2 <= distanceToCluster1 && distanceToCluster2 <= distanceToCluster3){
                    System.out.println("attr to Cl 2");
                    cluster2.add(elm);
                } else if(distanceToCluster3 <= distanceToCluster1 && distanceToCluster3 <= distanceToCluster2){
                    System.out.println("attr to Cl 3");
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
