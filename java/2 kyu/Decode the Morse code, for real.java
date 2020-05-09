// Seperate K-means for 1 and 0

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
        
        System.out.println("bits:" + bits);
        System.out.println(cleanedBits);        
        System.out.println(Arrays.toString(arrOfBits));
        System.out.println("arrOfBitsLength :" + Arrays.toString(arrOfBitsLength));

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
            
            cluster1NewCentroid = Math.ceil(cluster1.stream().mapToDouble(val -> val).average().orElse(0.0));
            cluster2NewCentroid = Math.ceil(cluster2.stream().mapToDouble(val -> val).average().orElse(0.0));
            cluster3NewCentroid = Math.ceil(cluster3.stream().mapToDouble(val -> val).average().orElse(0.0));

        } while (cluster1PreCentroid != cluster1NewCentroid && cluster2PreCentroid != cluster2NewCentroid && cluster3PreCentroid != cluster3NewCentroid);

        if(cluster2NewCentroid == 0.00) cluster2NewCentroid = (cluster1NewCentroid + cluster3NewCentroid)/2;

        System.out.println("cluster1 :" + cluster1.toString());
        System.out.println("cluster2 :" + cluster2.toString());
        System.out.println("cluster3 :" + cluster3.toString());
        System.out.println("centroidCluster1 :" + cluster1NewCentroid);
        System.out.println("centroidCluster2 :" + cluster2NewCentroid);
        System.out.println("centroidCluster3 :" + cluster3NewCentroid);

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

// // Thx to:
// // https://www.baeldung.com/java-k-means-clustering-algorithm
// // https://www.analyticsvidhya.com/blog/2016/11/an-introduction-to-clustering-and-different-methods-of-clustering/

// import java.util.ArrayList;
// import java.util.Arrays;
// import java.util.List;
// import java.util.stream.Collectors;
// import static java.lang.Math.abs;

// public class MorseCodeDecoder {
    
//     public static String decodeMorse(final String morseCode) {
//         if(morseCode.equals(" ")|morseCode.equals("")) return "";
//         String store = Arrays.stream(morseCode.trim().split("   "))
//                 .map(word -> Arrays.stream(word.split(" "))
//                                 .map(MorseCode::get)
//                                 .collect(Collectors.joining("")))
//                 .collect(Collectors.joining(" "))
//                 .trim();
//         System.out.println(store);
//         return store;
//     }
    
//     public static String decodeBitsAdvanced(String bits) {
//         // Clean extra 0
//         final String cleanedBits = bits.replaceAll("^0+|0+$|^[ ]|[ ]$", "");
//         if(cleanedBits.equals(" ")|cleanedBits.equals("")) return "";

//         // Create array which we can work with
//         final String[] arrOfBits = cleanedBits.split("(?<=0)(?=1)|(?<=1)(?=0)");
//         final Integer[] arrOfBitsLength = Arrays.stream(arrOfBits).mapToInt(String::length).boxed().toArray(size -> new Integer[size]);

//         // Initialize variables for K-means alg
//         List<Integer> cluster1 = new ArrayList<Integer>();
//         List<Integer> cluster2 = new ArrayList<Integer>();
//         List<Integer> cluster3 = new ArrayList<Integer>();
        
//         double cluster1PreCentroid;
//         double cluster2PreCentroid;
//         double cluster3PreCentroid;
//         // alter the initiales values to get to he desired optimimum
//         double cluster1NewCentroid = (double) Arrays.stream(arrOfBitsLength).min(Integer::compare).get();
//         double cluster3NewCentroid = (double) Arrays.stream(arrOfBitsLength).max(Integer::compare).get();
//         double cluster2NewCentroid = (cluster3NewCentroid - cluster1NewCentroid) / 2.0;
        
//         System.out.println("bits:" + bits);
//         System.out.println(cleanedBits);        
//         System.out.println(Arrays.toString(arrOfBits));
//         System.out.println("arrOfBitsLength :" + Arrays.toString(arrOfBitsLength));

//         do{
        
//             cluster1PreCentroid = cluster1NewCentroid;
//             cluster2PreCentroid = cluster2NewCentroid;
//             cluster3PreCentroid = cluster3NewCentroid;
           
//             System.out.println("cluster1 :" + cluster1.toString());
//             System.out.println("cluster2 :" + cluster2.toString());
//             System.out.println("cluster3 :" + cluster3.toString());
            
//             cluster1 = new ArrayList<Integer>();
//             cluster2 = new ArrayList<Integer>();
//             cluster3 = new ArrayList<Integer>();
            
//             System.out.println("cluster1PreCentroid : " + cluster1PreCentroid);
//             System.out.println("cluster2PreCentroid : " + cluster2PreCentroid);
//             System.out.println("cluster3PreCentroid : " + cluster3PreCentroid);

//             for (int i = 0; i < arrOfBitsLength.length; i++) {
//                 Integer elm = arrOfBitsLength[i];
//                 double distanceToCluster1 = abs(elm - cluster1PreCentroid);
//                 double distanceToCluster2 = abs(elm - cluster2PreCentroid);
//                 double distanceToCluster3 = abs(elm - cluster3PreCentroid);

//                 if(distanceToCluster1 <= distanceToCluster2 && distanceToCluster1 <= distanceToCluster3){
//                     cluster1.add(elm);
//                 } else if(distanceToCluster2 <= distanceToCluster1 && distanceToCluster2 <= distanceToCluster3){
//                     cluster2.add(elm);
//                 } else if(distanceToCluster3 <= distanceToCluster1 && distanceToCluster3 <= distanceToCluster2){
//                     cluster3.add(elm);
//                 } else {
//                     System.out.println("4th case shouldn't happen");
//                 }
//             }
            
//             cluster1NewCentroid = cluster1.stream().mapToDouble(val -> val).average().orElse(0.0);
//             cluster2NewCentroid = cluster2.stream().mapToDouble(val -> val).average().orElse(0.0);
//             cluster3NewCentroid = cluster3.stream().mapToDouble(val -> val).average().orElse(0.0);

//         } while (cluster1PreCentroid != cluster1NewCentroid && cluster2PreCentroid != cluster2NewCentroid && cluster3PreCentroid != cluster3NewCentroid);


//         System.out.println("cluster1 :" + cluster1.toString());
//         System.out.println("cluster2 :" + cluster2.toString());
//         System.out.println("cluster3 :" + cluster3.toString());
//         System.out.println(cluster1NewCentroid);
//         System.out.println(cluster2NewCentroid);
//         System.out.println(cluster3NewCentroid);

//         StringBuilder store = new StringBuilder();
//         String regex1 = "1+";
//         String regex0 = "0+";

//         for (int i = 0; i < arrOfBitsLength.length; i++) {
//             Integer length = arrOfBitsLength[i];
//             double distanceToCluster1 = abs(length - cluster1NewCentroid);
//             double distanceToCluster2 = abs(length - cluster2NewCentroid);
//             double distanceToCluster3 = abs(length - cluster3NewCentroid);

//             String elmToTranslate = arrOfBits[i];
            

//             if(distanceToCluster1 <= distanceToCluster2 && distanceToCluster1 <= distanceToCluster3){
//                 if(elmToTranslate.matches(regex0)) store.append("");
//                 if(elmToTranslate.matches(regex1)) store.append(".");
//             } else if(distanceToCluster2 <= distanceToCluster1 && distanceToCluster2 <= distanceToCluster3){
//                 if(elmToTranslate.matches(regex0)) store.append(" ");
//                 if(elmToTranslate.matches(regex1)) store.append("-");
//             } else if(distanceToCluster3 <= distanceToCluster1 && distanceToCluster3 <= distanceToCluster2){
//                 if(elmToTranslate.matches(regex0)) store.append("   ");
//                 if(elmToTranslate.matches(regex1)) store.append("-");
//             } else {
//                 System.out.println("4th case shouldn't happen");
//             }
//         }
//         System.out.println(store.toString());
//         return store.toString();
//     }
// }

/*

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

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
        
        final Integer[] arrOfBitsLength = Arrays.stream(arrOfBits).mapToInt(String::length).boxed().toArray(size -> new Integer[size]);
        StringBuilder morseCodeBStringBuilder = new StringBuilder();
        
        for (int i = 0; i < arrOfBitsLength.length; i++) {
            String elmToTranslate = arrOfBits[i];
            Integer length = arrOfBitsLength[i];

            if(elmToTranslate.matches("1+")){
                double distanceToCluster1 = abs(length - arrCentroidOf1Data[0]);
                double distanceToCluster2 = abs(length - arrCentroidOf1Data[1]);
                if(distanceToCluster1 <= distanceToCluster2) {
                    morseCodeBStringBuilder.append(".");
                } else {
                    morseCodeBStringBuilder.append("-");
                } 
            } else if(elmToTranslate.matches("0+")){
                double distanceToCluster1 = abs(length - arrCentroidOf0Data[0]);
                double distanceToCluster2 = abs(length - arrCentroidOf0Data[1]);
                double distanceToCluster3 = abs(length - arrCentroidOf0Data[2]);
                if(distanceToCluster1 <= distanceToCluster2 && distanceToCluster1 <= distanceToCluster3){
                    morseCodeBStringBuilder.append("");

                } else if(distanceToCluster2 < distanceToCluster1 && distanceToCluster2 <= distanceToCluster3){
                    morseCodeBStringBuilder.append(" ");

                } else if(distanceToCluster3 < distanceToCluster1 && distanceToCluster3 < distanceToCluster2 ){
                    morseCodeBStringBuilder.append("   ");
                } 
            } else {
                System.out.println("Not 0/1 => That shouldn't happen");
            }

        }

        return morseCodeBStringBuilder.toString();
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

*/



/*
First algorithm without k-means : Working !!!


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
        if(cleanedBits.equals(" ")||cleanedBits.equals("")) return "";
        System.out.println("cleanedBits: " + cleanedBits);
        
        // Get an array of 1
        final String[] arrOf1 = cleanedBits.split("[^1]+");
        int min1 = Arrays.stream(arrOf1).map(chain -> chain.length()).min(Integer::compare).get();
        int max1 = Arrays.stream(arrOf1).map(chain -> chain.length()).max(Integer::compare).get() + 1;
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

        final String dotRegex = String.format("1{%s,%s}", min1, dotTopLine);
        final String inCharSepRegex = String.format("0{%s,%s}", min1, dotTopLine);
        final String dashRegex = String.format("1{%s,}", dashBottomLine);
        final String outCharSepRegex = String.format("0{%s,%s}", dashBottomLine, outCharTopLine);
        final String wordSepRegex = String.format("0{%s,}", wordBottomLine);

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