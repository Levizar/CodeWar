
# First attempt: awful solution

def zero(*args):  # your code here
    val = 0
    if len(args) == 0:
        return val
    return int(eval(f"{val} {args[0][0]} {args[0][1]}"))

def one(*args):  # your code here
    val = 1
    if len(args) == 0:
        return val
    return int(eval(f"{val} {args[0][0]} {args[0][1]}"))

def two(*args):  # your code here
    val = 2
    if len(args) == 0:
        return val
    return int(eval(f"{val} {args[0][0]} {args[0][1]}"))

def three(*args):  # your code here
    val = 3
    if len(args) == 0:
        return val
    return int(eval(f"{val} {args[0][0]} {args[0][1]}"))

def four(*args):  # your code here
    val = 4
    if len(args) == 0:
        return val
    return int(eval(f"{val} {args[0][0]} {args[0][1]}"))

def five(*args):  # your code here
    val = 5
    if len(args) == 0:
        return val
    return int(eval(f"{val} {args[0][0]} {args[0][1]}"))

def six(*args):  # your code here
    val = 6
    if len(args) == 0:
        return val
    return int(eval(f"{val} {args[0][0]} {args[0][1]}"))

def seven(*args):  # your code here
    val = 7
    if len(args) == 0:
        return val
    return int(eval(f"{val} {args[0][0]} {args[0][1]}"))

def eight(*args):  # your code here
    val = 8
    if len(args) == 0:
        return val
    return int(eval(f"{val} {args[0][0]} {args[0][1]}"))

def nine(*args):  # your code here
    val = 9
    if len(args) == 0:
        return val
    return int(eval(f"{val} {args[0][0]} {args[0][1]}"))

def plus(*args):  # your code here
    return '+', args[0]

def minus(*args):  # your code here
    return '-', args[0]

def times(*args):  # your code here
    return '*', args[0]

def divided_by(*args):  # your code here
    return '/', args[0]