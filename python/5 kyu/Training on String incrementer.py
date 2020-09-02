# Original refactor inspired by others's solutions:
import re


def increment_string(strng):
    digits = ""
    match = re.search("\d*$", strng)
    if match:
        digits = match.group(0)
    return strng + "1" if digits == "" else strng[:-len(digits)] + str(int(digits) + 1).zfill(len(digits))

# Original solution:

# import re


# def increment_string(strng):
#     if re.search("\d+$", strng):
#         arr = re.findall("\d+$", strng)
#         number_of_digit = len(arr[0])
#         str_digit_incremented = str(int(arr[0]) + 1)
#         number_of_digit_post_incrementation = len(str_digit_incremented)
#         if number_of_digit > number_of_digit_post_incrementation :
#             zero_to_append = "0" * (number_of_digit - number_of_digit_post_incrementation)
#             str_digit_incremented = zero_to_append + str_digit_incremented

#         prev_char = re.findall(".*\D(?=\d+$)", strng)
#         prev_char = "" if len(prev_char) == 0 else prev_char[0]
#         strng = prev_char + str_digit_incremented
#     else:
#         strng += "1"
#     return strng
