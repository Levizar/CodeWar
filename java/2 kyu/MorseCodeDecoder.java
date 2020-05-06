
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

import static java.lang.Math.abs;

public class MorseCodeDecoder {
    
    // public static String decodeMorse(final String morseCode) {
    //     if(morseCode.equals(" ")|morseCode.equals("")) return "";
    //     String store = Arrays.stream(morseCode.trim().split("   "))
    //             .map(word -> Arrays.stream(word.split(" "))
    //                             .map(MorseCode::get)
    //                             .collect(Collectors.joining("")))
    //             .collect(Collectors.joining(" "))
    //             .trim();
    //     System.out.println(store);
    //     return store;
    // }
    
    public static String decodeBitsAdvanced(String bits) {
        // Clean extra 0
        final String cleanedBits = bits.replaceAll("^0+|0+$|^[ ]|[ ]$", "");
        if(cleanedBits.equals(" ")|cleanedBits.equals("")) return "";

        // Create array which we can work with
        final String[] arrOfBits = cleanedBits.split("(?<=0)(?=1)|(?<=1)(?=0)");
        final Integer[] arrOfBitsLength = Arrays.stream(arrOfBits).mapToInt(String::length).boxed().toArray(size -> new Integer[size]);

        final Integer[] bitsLengthOfArrOf1 = Arrays.stream(cleanedBits.split("[^1]+"))
            .mapToInt(String::length)
            .boxed()
            .toArray(size -> new Integer[size]);
        final Integer[] bitsLengthOfArrOf0 = Arrays.stream(cleanedBits.replaceAll("^1+|1+$", "").split("[^0]+"))
            .mapToInt(String::length)
            .boxed()
            .toArray(size -> new Integer[size]);

        final double[] arrCentroidOf1Data = get2Centroid(bitsLengthOfArrOf1);
        final double[] arrCentroidOf0Data = get3Centroid(bitsLengthOfArrOf0);
        
        for (int i = 0; i < arrOfBitsLength.length; i++) {
            String elmToTranslate = arrOfBits[i];
            Integer length = arrOfBitsLength[i];

            if(elmToTranslate.matches("1+")){
                // blabla de 1
            } else if(elmToTranslate.matches("0+")){
                // blabla de 0
            } else {
                System.out.println("Not 0/1 => That shouldn't happen");
            }

        }

        return "";
    }
    
    public static double[] get2Centroid(Integer[] arrOfData){
        
        double cluster1PreCentroid;
        double cluster2PreCentroid;
        double cluster1NewCentroid = Arrays.stream(arrOfData).mapToDouble(x->x).min().orElse(0.0);
        double cluster2NewCentroid = Arrays.stream(arrOfData).mapToDouble(x->x).max().orElse(0.0);
        
        List<Integer> cluster1 = new ArrayList<Integer>();
        List<Integer> cluster2 = new ArrayList<Integer>();
        
        do {
            cluster1PreCentroid = cluster1NewCentroid;
            cluster2PreCentroid = cluster2NewCentroid;

            cluster1 = new ArrayList<Integer>();
            cluster2 = new ArrayList<Integer>();

            for (int i = 0; i < arrOfData.length; i++) {
                Integer elm = arrOfData[i];
                double distanceToCluster1 = abs(elm - cluster1PreCentroid);
                double distanceToCluster2 = abs(elm - cluster2PreCentroid);

                if(distanceToCluster1 <= distanceToCluster2){
                    cluster1.add(elm);
                } else {
                    cluster2.add(elm);
                }
            }
            
            cluster1NewCentroid = cluster1.stream().mapToDouble(val -> val).average().orElse(0.0);
            cluster2NewCentroid = cluster2.stream().mapToDouble(val -> val).average().orElse(0.0);

        } while (cluster1PreCentroid != cluster1NewCentroid && cluster2PreCentroid != cluster2NewCentroid);
        return new double[]{cluster1NewCentroid, cluster2NewCentroid};
    }
    
    public static double[] get3Centroid(Integer[] arrOfData){
        
        double cluster1PreCentroid;
        double cluster2PreCentroid;
        double cluster3PreCentroid; 
        double cluster1NewCentroid = Arrays.stream(arrOfData).mapToDouble(x->x).min().orElse(0.00);
        double cluster3NewCentroid = Arrays.stream(arrOfData).mapToDouble(x->x).max().orElse(0.00);
        double cluster2NewCentroid = (cluster3NewCentroid - cluster1NewCentroid)/2.0;
        
        List<Integer> cluster1 = new ArrayList<Integer>();
        List<Integer> cluster2 = new ArrayList<Integer>();
        List<Integer> cluster3 = new ArrayList<Integer>();
        
        do {
            cluster1PreCentroid = cluster1NewCentroid;
            cluster2PreCentroid = cluster2NewCentroid;
            cluster3PreCentroid = cluster3NewCentroid;

            cluster1 = new ArrayList<Integer>();
            cluster2 = new ArrayList<Integer>();
            cluster3 = new ArrayList<Integer>();

            for (int i = 0; i < arrOfData.length; i++) {
                Integer elm = arrOfData[i];
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
        return new double[]{cluster1NewCentroid, cluster2NewCentroid, cluster3NewCentroid};
    }
}