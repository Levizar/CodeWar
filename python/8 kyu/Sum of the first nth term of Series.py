def series_sum(n):
    a = 0.00
    for i in range(n):
        a += 1 / (1 + (3 * i))
    a = "{0:.2f}".format(a)
    return a
