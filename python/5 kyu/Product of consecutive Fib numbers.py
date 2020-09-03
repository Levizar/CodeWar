# Refactor inspired by other's solution using Python's features
def productFib(prod):
    fib1, fib2 = 0, 1
    while fib1 * fib2 < prod:
        fib1, fib2 = fib2, fib1 + fib2
    return [fib1, fib2, fib1 * fib2 == prod]

# # Original solution
# def productFib(prod):
#     fib1 = fib_next = 0
#     fib2 = 1
#     while fib1 * fib2 < prod:
#         fib1 = fib2
#         fib2 = fib_next
#         fib_next = fib1 + fib2
#     return [fib1, fib2, fib1 * fib2 == prod]
