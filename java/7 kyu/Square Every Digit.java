
// Refactored when I saw others people solutions
import java.util.stream.Collectors;
public class SquareDigit {
  public int squareDigits(int n) {
    return Integer.parseInt(String.valueOf(n)
                  .chars()
                  .map(car -> Integer.parseInt(String.valueOf((char) car)))
                  .map(num -> (int) Math.pow(num,2))
                  .mapToObj(String::valueOf)
                  .collect(Collectors.joining("")));
  }
}


// First solution :
public class SquareDigit {
    public int squareDigits(int n) {
      int temp = n;
      String str = "";
      while(temp > 0){
        int squared = (int) Math.pow((int) temp%10, 2);
        temp /= 10;
        str = (String) Integer.toString(squared) + str; 
      }
      temp = Integer.parseInt(str);
      return temp;
    }
  }