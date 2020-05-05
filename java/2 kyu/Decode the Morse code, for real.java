// Thx to:
// https://www.baeldung.com/java-k-means-clustering-algorithm
// https://www.analyticsvidhya.com/blog/2016/11/an-introduction-to-clustering-and-different-methods-of-clustering/

import java.util.ArrayList;
import java.util.Arrays;
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

        // Create array which we can work with
        final String[] arrOfBits = cleanedBits.split("(?<=0)(?=1)|(?<=1)(?=0)");
        final Integer[] arrOfBitsLength = Arrays.stream(arrOfBits).mapToInt(String::length).boxed().toArray(size -> new Integer[size]);

        // Initialize variables for K-means alg
        List<Integer> cluster1 = new ArrayList<Integer>();
        List<Integer> cluster2 = new ArrayList<Integer>();
        List<Integer> cluster3 = new ArrayList<Integer>();
        
        double cluster1PreCentroid;
        double cluster2PreCentroid;
        double cluster3PreCentroid;
        // alter the initiales values to get to he desired optimimum
        double cluster1NewCentroid = (double) Arrays.stream(arrOfBitsLength).min(Integer::compare).get();
        double cluster3NewCentroid = (double) Arrays.stream(arrOfBitsLength).max(Integer::compare).get();
        double cluster2NewCentroid = (cluster3NewCentroid - cluster1NewCentroid) / 2.0;
        
        System.out.println(cleanedBits);        
        System.out.println(Arrays.toString(arrOfBits));

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
        String regex1 = "1+";
        String regex0 = "0+";

        for (int i = 0; i < arrOfBitsLength.length; i++) {
            Integer length = arrOfBitsLength[i];
            double distanceToCluster1 = abs(length - cluster1NewCentroid);
            double distanceToCluster2 = abs(length - cluster2NewCentroid);
            double distanceToCluster3 = abs(length - cluster3NewCentroid);

            String elmToTranslate = arrOfBits[i];
            

            if(distanceToCluster1 <= distanceToCluster2 && distanceToCluster1 <= distanceToCluster3){
                if(elmToTranslate.matches(regex0)) store.append("");
                if(elmToTranslate.matches(regex1)) store.append(".");
            } else if(distanceToCluster2 <= distanceToCluster1 && distanceToCluster2 <= distanceToCluster3){
                if(elmToTranslate.matches(regex0)) store.append(" ");
                if(elmToTranslate.matches(regex1)) store.append("-");
            } else if(distanceToCluster3 <= distanceToCluster1 && distanceToCluster3 <= distanceToCluster2){
                if(elmToTranslate.matches(regex0)) store.append("   ");
                if(elmToTranslate.matches(regex1)) store.append("-");
            } else {
                System.out.println("4th case shouldn't happen");
            }
        }
        System.out.println(store.toString());
        return store.toString();
    }
}