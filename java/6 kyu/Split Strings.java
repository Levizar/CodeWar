import java.util.Arrays;
import java.util.ArrayList;
public class StringSplit {
    public static String[] solution(String s) {
        final ArrayList<String> arrayList = new ArrayList<String>();
        String temp = "";
        for (int i = 0; i < s.length(); i++) {
            temp += s.charAt(i);
            if (i % 2 == 1) {
                arrayList.add(temp);
                temp = "";
            } if((i == s.length() - 1) && (s.length() % 2 == 1)){
                temp += "_";
                arrayList.add(temp);
            }
        }
        final String[] toReturn = arrayList.toArray(new String[arrayList.size()]);
        return toReturn;
    }
}