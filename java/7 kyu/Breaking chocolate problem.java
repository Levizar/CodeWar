// refactor

public class Chocolate{
    public static int breakChocolate(int n, int m) {
      return n == 0 || m == 0 ? 0 : n * m - 1;
    }
}


// First attempt
public class Chocolate{
    public static int breakChocolate(int n, int m) {
        if( n == 0 || m == 0) return 0;
        return (n * m) - 1;
    }
}