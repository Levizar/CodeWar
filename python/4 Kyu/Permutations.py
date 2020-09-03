# Original solution
def permutations(string):
    # Base case:
    if len(string) is 1:
        return [string]
    # Avoid repetition due to repetition in string variable
    anagrams = set()
    for i, char in enumerate(string):
        # get all sub anagram for this char
        sub_anagrams = permutations((string[:i] + string[i+1:]))
        for sub_anagram in sub_anagrams:
            anagrams.add(char + sub_anagram)
    return list(anagrams)

# # Refactor using list comprehension
# # But using list(set(list)) doesn't sound good
#
# def permutations(string):
#     if len(string) is 1:
#         return [string]
#     anagrams = []
#     for i, char in enumerate(string):
#         anagrams += [char + sub_anagram for sub_anagram in permutations((string[:i] + string[i + 1:]))]
#     return list(set(anagrams))
