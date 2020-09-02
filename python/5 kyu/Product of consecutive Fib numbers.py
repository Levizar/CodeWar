def productFib(prod):
    # your code
    fib1 = fib_next = 0
    fib2 = 1
    found = False
    while fib1 * fib2 < prod:
        fib1 = fib2
        fib2 = fib_next
        fib_next = fib1 + fib2
    return [fib1, fib2, fib1 * fib2 == prod]