// Commented code below the class
// Method to delete elements of arrays that occure more than maxOccurences time

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class EnoughIsEnough {

    public static int[] deleteNth(int[] elements, int maxOccurrences) {
        if(maxOccurrences == 0) return new int[0];
        final Map<Integer, Integer> controlMap = new HashMap();
        final ArrayList<Integer> listOfIntegerAccepted = new ArrayList<Integer>();
        for (int i = 0; i < elements.length; i++) {
            if(controlMap.get(elements[i]) == null){
                controlMap.put(elements[i], 1);
                listOfIntegerAccepted.add(elements[i]);
            } else if(controlMap.get(elements[i]) < maxOccurrences){
                controlMap.put(elements[i], controlMap.get(elements[i]) + 1);
                listOfIntegerAccepted.add(elements[i]);
            }
        }
        final int[] finalArray = listOfIntegerAccepted.stream().mapToInt(x->x).toArray();
        System.out.println(Arrays.toString(finalArray));
        return finalArray;
    }

}


// import java.util.ArrayList;
// import java.util.Arrays;
// import java.util.HashMap;
// import java.util.Map;

// public class EnoughIsEnough {

// 	public static int[] deleteNth(int[] elements, int maxOccurrences) {
//         // Return empty array if needed
//         if(maxOccurrences == 0) return new int[0];
//         // To print bugs
//         System.out.println(Arrays.toString(elements));
//         System.out.println(maxOccurrences);
//         // Declare the Map Interface with Integer ref and Integer value.
//         // Initialize it with a HashMap object
//         final Map<Integer, Integer> controlMap = new HashMap();
//         // Declare an ArrayList of Integer and initializing it
//         final ArrayList<Integer> listOfIntegerAccepted = new ArrayList<Integer>();
//         for (int i = 0; i < elements.length; i++) {
//             if(controlMap.get(elements[i]) == null){
//                 controlMap.put(elements[i], 1);
//                 listOfIntegerAccepted.add(elements[i]);
//             } else if(controlMap.get(elements[i]) < maxOccurrences){
//                 controlMap.put(elements[i], controlMap.get(elements[i]) + 1);
//                 listOfIntegerAccepted.add(elements[i]);
//             }
//         }
//         // Convert the result into int array
//         // To do so: Create a Stream which is a method from the list Interface and make operation on the stream.
//         final int[] finalArray = listOfIntegerAccepted.stream().mapToInt(x->x).toArray();
//         // Print final statement
//         System.out.println(Arrays.toString(finalArray));
// 		return finalArray;
// 	}

// }