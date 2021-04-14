# https://www.codewars.com/kata/562b384167350ac93b00010c/train/python
from functools import lru_cache

@lru_cache
def gcd(a, b):
    if (r:= a % b) == 0:
        return b
    else:
        gcd(b, r)

@lru_cache
def a(n):
    if n == 1:
        return 7
    return a(n-1) + gcd(n, (n - 1))

@lru_cache
def gn(n):
    return a(n) - a(n-1)

def count_ones(n):
    return [gn(i) for i in range(n)]

def max_pn(n):
    return

def an_over_average(n):
    return
