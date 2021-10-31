
# The resolution goes from the inside to the outside
# As there will always be an operator between 2 numbers
# we can assume that an operator will always receive a resolved number as a 
# parameter and that it has to return a function with this parameter "in memory" (curried) in order for a
# number fuction to to pass a number to the call back of the operator function it receives as a parameter.


def zero(func=None):
    return 0 if func is None else func(0)
def one(func=None):
    return 1 if func is None else func(1)
def two(func=None):
    return 2 if func is None else func(2)
def three(func=None):
    return 3 if func is None else func(3)
def four(func=None):
    return 4 if func is None else func(4)
def five(func=None):
    return 5 if func is None else func(5)
def six(func=None):
    return 6 if func is None else func(6)
def seven(func=None):
    return 7 if func is None else func(7)
def eight(func=None):
    return 8 if func is None else func(8)
def nine(func=None):
    return 9 if func is None else func(9)

def plus(y):
    return lambda x : x + y
def minus(y):
    return lambda x : x - y
def times(y):
    return lambda x : x * y
def divided_by(y):
    return lambda x : x // y


# First attempt: awful solution

# number function either return a number if doesnt get any parameter or execute an eval statement in order to return a number
# the eval statement is using the 2 arguments that are return by the operator function

# def zero(*args):  # your code here
#     val = 0
#     if len(args) == 0:
#         return val
#     return int(eval(f"{val} {args[0][0]} {args[0][1]}"))

# def one(*args):  # your code here
#     val = 1
#     if len(args) == 0:
#         return val
#     return int(eval(f"{val} {args[0][0]} {args[0][1]}"))

# def two(*args):  # your code here
#     val = 2
#     if len(args) == 0:
#         return val
#     return int(eval(f"{val} {args[0][0]} {args[0][1]}"))

# def three(*args):  # your code here
#     val = 3
#     if len(args) == 0:
#         return val
#     return int(eval(f"{val} {args[0][0]} {args[0][1]}"))

# def four(*args):  # your code here
#     val = 4
#     if len(args) == 0:
#         return val
#     return int(eval(f"{val} {args[0][0]} {args[0][1]}"))

# def five(*args):  # your code here
#     val = 5
#     if len(args) == 0:
#         return val
#     return int(eval(f"{val} {args[0][0]} {args[0][1]}"))

# def six(*args):  # your code here
#     val = 6
#     if len(args) == 0:
#         return val
#     return int(eval(f"{val} {args[0][0]} {args[0][1]}"))

# def seven(*args):  # your code here
#     val = 7
#     if len(args) == 0:
#         return val
#     return int(eval(f"{val} {args[0][0]} {args[0][1]}"))

# def eight(*args):  # your code here
#     val = 8
#     if len(args) == 0:
#         return val
#     return int(eval(f"{val} {args[0][0]} {args[0][1]}"))

# def nine(*args):  # your code here
#     val = 9
#     if len(args) == 0:
#         return val
#     return int(eval(f"{val} {args[0][0]} {args[0][1]}"))

# def plus(*args):  # your code here
#     return '+', args[0]

# def minus(*args):  # your code here
#     return '-', args[0]

# def times(*args):  # your code here
#     return '*', args[0]

# def divided_by(*args):  # your code here
#     return '/', args[0]