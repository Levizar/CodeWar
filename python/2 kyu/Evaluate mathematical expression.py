import re


def calc(expression):
    transitions = {
        'formatting_expression': ('reducing_parentheses', format_expression),
        'reducing_parentheses': ('eliminate_minus_redundancy', eliminate_parentheses),
        'eliminate_minus_redundancy': ('perform_multiplication', eliminate_minus_redundancy),
        'perform_multiplication': ('perform_addition', perform_multiplication),
        'perform_addition': ('format_output', perform_addition),
        'format_output': ('done', format_output)
    }
    state = 'formatting_expression'
    while state != 'done':
        state, action = FSM.run(state, transitions)
        expression = action(expression)
    return expression


def format_expression(expression):
    regex = re.compile(r"\d+\.*\d*|[)(*/+-]")
    return "".join(regex.findall(expression))


def eliminate_parentheses(expression):
    regex = re.compile(r"[(][^()]*[)]")
    while regex.search(expression):
        expression = regex.sub(lambda a: str(calc(a[0][1:-1])), expression)
    return expression


def eliminate_minus_redundancy(expression):
    regex = re.compile(r"--|\+\+|-\+|\+-")
    corresp = {
        '--': '+',
        '++': '+',
        '-+': '-',
        '+-': '-',
    }
    while regex.search(expression):
        expression = regex.sub(lambda a: corresp[a[0]], expression)
    return expression


def perform_multiplication(expression):
    regex = re.compile(r"(?P<a>-?\d+\.*\d*)(?P<op>[*/])(?P<b>[-+]?\d+\.*\d*)")
    return perform_substitution(regex, expression)


def perform_addition(expression):
    regex = re.compile(r"(?P<a>-?\d+\.*\d*)(?P<op>[+-])(?P<b>[-+]?\d+\.*\d*)")
    return perform_substitution(regex, expression)


def perform_substitution(regex, expression):
    operations = {
        '*': lambda a, b: a * b,
        '/': lambda a, b: a / b,
        '+': lambda a, b: a + b,
        '-': lambda a, b: a - b,
    }
    while regex.search(expression):
        expression = regex.sub(lambda m: str(operations[m['op']](float(m['a']), float(m['b']))), expression)
    return expression


def format_output(expression):
    regex = re.compile(r"\d+\.0+")
    expression = regex.sub(lambda m: str(int(float(m[0]))), expression)
    return float(expression)


class FSM:
    @classmethod
    def run(cls, state, transitions):
        state, action = transitions[state]
        return state, action


def test(fun, inp, expected_output):
    output = fun(inp)
    if output == expected_output:
        print("NOICE")
    else:
        print("Not Noice")
        print(f"output: {output} , expected: {expected_output} , input: {inp}")


test(calc, '(1+1)', 2)
test(calc, '(1+1)+(2+2)', 6)
test(calc, '((1+1))', 2)
test(calc, '1+1', 2)
test(calc, '(-(-1))', 1)
test(calc, '123', 123)
test(calc, '-123', -123)
test(calc, '12* 123', 1476)
test(calc, '4/2', 2)
test(calc, '2*2*2', 8)
test(calc, '2 /2+3 * 4.75- -6', 21.25)
test(calc, '2 / (2 + 3) * 4.33 - -6', 7.732)
test(calc, '12*-1', -12)
test(calc, "(1 - 2) + -(-(-(-4)))", 3)
test(calc, "12 * -123", -1476)
test(calc, "2 * -2 * 4", -16)
test(calc, "12* 123/-(-5 + 2)", 492)
test(calc, "(123.45*(678.90 / (-2.5+ 11.5)-(((80 -(19))) *33.25)) / 20) - (123.45*(678.90 / (-2.5+ 11.5)-(((80 -(19))) *33.25)) / 20) + (13 - 2)/ -(-11) ", 1)
