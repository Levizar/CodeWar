/**
 *
 * @author Brice
 */

import java.util.Arrays;
import java.util.Stack;

public class Main {

    public static void main(String[] args) {
        double t = Calc.evaluate("1 3 +");
        System.out.println("1 3 +");
        System.out.println(t);
    }

    public static class Calc {
        public static double evaluate(String expr) {
            if (expr.equals("")) return 0.0;
            Stack<Double> polishStack = new Stack<>();
            String[] arrOfStr = expr.split(" ");
            Arrays.stream(arrOfStr)
                    .forEach(s -> {
                        if (s.equals("+") || s.equals("-") || s.equals("*") || s.equals("/")) {
                            Double n2 = polishStack.pop();
                            Double n1 = polishStack.pop();
                            Double result;
                            if (s.equals("+")) {
                                result = n1 + n2;
                            } else if (s.equals("-")) {
                                result = n1 - n2;
                            } else if (s.equals("*")) {
                                result = n1 * n2;
                            } else if (s.equals("/")) {
                                result = n1 / n2;
                            } else {
                                result = 0.00;
                            }
                            polishStack.push(result);
                        } else {
                            Double toPush = Double.parseDouble(s);
                            polishStack.push(toPush);
                        }
                    });
            return (polishStack.pop());
        }
    }
}
