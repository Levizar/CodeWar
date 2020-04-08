class Solution {
    public static String camelCase(String input) {
        input = input.replaceAll("(?=[A-Z])", " ");
        // input = input.replaceAll("(?<=[a-z])(?=[A-Z])", " "); // should be this one but the testCases need the space on the first char
        return input;
    }
}