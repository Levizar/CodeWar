# if an object is given as a default value to a function, the adress persist and thus the object
# As the object is mutable, it allows to memoïze directly in it.
def sum_dif_rev(n, memo={1: 45, 2: 54, 3: 495, 4: 594}):
    if n not in memo:
        nb = sum_dif_rev(n - 1)
        is_weird_nb = False

        while not is_weird_nb:
            nb += 1
            if nb % 10 == 0 or nb == int(str(nb)[::-1]):
                continue
            rev = int(str(nb)[::-1])
            is_weird_nb = (nb + rev) % abs(nb - rev) == 0

        memo.update({n: nb})
    return memo.get(n)

# # first solution
# def sum_dif_rev(n, memo={1: 45, 2: 54, 3: 495, 4: 594}):
#     nb = memo.get(n)
#     if(nb is not None):
#         return nb
#     k, nb = get_previous_n(n, memo)
#     k += 1
#     while True:
#         nb += 1
#         # we dont accept reverse starting by 0
#         if nb % 10 == 0:
#             continue
#         reversed = int(str(nb)[::-1])
#         if nb == reversed:
#             continue
#         sum = nb + reversed
#         diff = abs(nb - reversed)
#         if sum % diff == 0:
#             if k == n:
#                 memo.update({n: nb})
#                 return nb
#             memo.update({k: nb})
#             k += 1

# def get_previous_n(n, memo):
#     prev_n = max(memo.keys())
#     return prev_n, memo.get(prev_n)


sum_dif_rev(15)
