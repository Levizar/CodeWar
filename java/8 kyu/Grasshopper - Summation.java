public class GrassHopper {
    public static int summation(int n) {
        return n == 1 ? 1 : n + summation(n-1);
    }
}