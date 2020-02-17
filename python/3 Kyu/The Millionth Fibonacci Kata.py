# Todo: use NumPy to impletment the JS matrix solution

# Works but TimeOut
# def fib(n):
#     if n == 0: return 0
#     if n == 1: return 1
#     if n < 0: return fib(n+2) - fib(n+1)
#     i , j = 0 , 1
#     k = 1
#     while k != n:
#         k += 1
#         t = i + j
#         i = j
#         j = t
#     return t


# doesn't work for very high value
# import math  
# def fib(n):
#     if n == 0: return 0
#     if n == 1: return 1
#     if n < 0: return fib(n+2) - fib(n+1)
#     phi = 1.61803398874989
#     return int(round(pow(phi,n)/math.sqrt(5)))

