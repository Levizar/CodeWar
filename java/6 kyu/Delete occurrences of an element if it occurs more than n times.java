// Commented code below the class
// Method to delete elements of arrays that occure more than maxOccurences time

// import des dataStructures et des interfaces nécessaires
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class EnoughIsEnough {

    public static int[] deleteNth(int[] elements, int maxOccurrences) {
        if(maxOccurrences == 0) return new int[0]; // gestion du cas 0
        final Map<Integer, Integer> controlMap = new HashMap(); // Création d'une map (similaire au dictionnaire)
        final ArrayList<Integer> listOfIntegerAccepted = new ArrayList<Integer>(); // Création d'une liste
        for (int i = 0; i < elements.length; i++) { // boucle sur l'array reçue en paramètre
            if(controlMap.get(elements[i]) == null){ // check si la map (dictionnaire) ne possède pas encore l'élément
                controlMap.put(elements[i], 1); // Si l'élément n'existe pas encore, ajout dans la map de l'élément comme key et de 1 comme value
                listOfIntegerAccepted.add(elements[i]); // push de l'élément dans la liste
            } else if(controlMap.get(elements[i]) < maxOccurrences){ // Sinon (l'élément existe déjà dans la map), récupère sa valeur et check si < maxOccurence
                controlMap.put(elements[i], controlMap.get(elements[i]) + 1); // Change la valeur pour la key dans la map => pour key value = value + 1
                listOfIntegerAccepted.add(elements[i]); // Push de l'élement dans la liste
            }
        }
        final int[] finalArray = listOfIntegerAccepted.stream().mapToInt(x->x).toArray(); // transformation de la liste d'entier en une array de int (c'est diff des entiers)
        System.out.println(Arrays.toString(finalArray)); // print pour test
        return finalArray; // envoi de l'array finale
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