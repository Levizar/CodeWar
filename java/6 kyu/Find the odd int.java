import java.util.Arrays;
import java.util.stream.Collectors;

public class FindOdd {
    public static int findIt(int[] a) {
      final int[] odd = {0};
      Arrays.stream(a).boxed()
        .map(elm -> Integer.toString(elm))
        .collect(Collectors.groupingBy(s->s))
        .forEach((key,elm) -> {
          if((elm.size()) % 2 == 1) odd[0] = Integer.parseInt(key);
        });
      return odd[0];
    }
}

// https://www.programcreek.com/2013/09/top-10-methods-for-java-arrays/
// https://www.geeksforgeeks.org/different-ways-for-integer-to-string-conversions-in-java/
// https://stackoverflow.com/questions/8098601/java-count-occurrence-of-each-item-in-an-array
// https://dzone.com/articles/how-to-use-map-filter-collect-of-stream-in-java-8
// https://www.geeksforgeeks.org/arrays-stream-method-in-java/
// https://mkyong.com/java8/java-8-how-to-convert-intstream-to-integer/
// https://stackoverflow.com/questions/1348199/what-is-the-difference-between-the-hashmap-and-map-objects-in-java
// https://stackoverflow.com/questions/46898/how-do-i-efficiently-iterate-over-each-entry-in-a-java-map
// https://docs.oracle.com/javase/8/docs/api/java/util/Map.html
// https://stackoverflow.com/questions/27592379/local-variables-referenced-from-a-lambda-expression-must-be-final-or-effectively