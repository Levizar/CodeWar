import re


def tokenize(expression):
    if expression == "":
        return []

    regex = re.compile("\s*(=>|[-+*\/\%=\(\)]|[A-Za-z_][A-Za-z0-9_]*|[0-9]*\.?[0-9]+)\s*")
    tokens = regex.findall(expression)
    return [s for s in tokens if not s.isspace()]


operators_precedence = {
    "=": 100,
    "+": 2,
    "-": 2,
    "*": 1,
    "/": 1,
    "%": 1,
}


def convert_parenthesis_to_token_list(tokens):
    new_tokens = []
    stack_of_list = [new_tokens]  # top element is the one on which we aggregates
    while tokens:
        t = tokens.pop(0)
        if t == "(":
            # starts to aggregates in a sublist
            sub_token_list = []
            # place the list as a sublist
            stack_of_list[-1].append(sub_token_list)
            # make the place in which next aggregation should take place
            stack_of_list.append(sub_token_list)
        elif t == ")":
            # we reached the end of this list: stop aggregation in this one, go up one level
            stack_of_list.pop()
        else:
            # classic token to aggregate on the current list level
            stack_of_list[-1].append(t)

    return new_tokens


class Interpreter:

    def __init__(self):
        self.vars = {}
        self.functions = {}

    def operation(self, a, op, b):
        if op == "=":
            self.vars[a] = b
            return self.vars[a]

        if isinstance(b, str):
            b = self.vars[b]

        if isinstance(a, str):
            a = self.vars[a]

        match op:
            case "+":
                return a + b
            case "-":
                return a - b
            case "*":
                return a * b
            case "/":
                return a / b
            case "%":
                return a % b

    def input(self, expression):
        if expression in ("", " "):
            return ""
        tokens = tokenize(expression)
        tokens = convert_parenthesis_to_token_list(tokens)
        tokens = self.convert_tokens_to_their_types(tokens)
        return self.process_tokens(tokens)

    def convert_tokens_to_their_types(self, tokens, sublist_process=False):
        new_tokens = []
        for i, token in enumerate(tokens):
            if isinstance(token, list):
                t = self.convert_tokens_to_their_types(token, sublist_process=True)  # convert type in the sublist
            elif token.isnumeric():
                t = int(token)
            elif (
                    token in operators_precedence  # operator or assigning variable
                    or (not sublist_process and i == 0)  # ensure it's not a sublist
            ):
                t = token
            else:
                # variable that can be replaced
                t = self.vars[token]
            new_tokens.append(t)

        return new_tokens

    def process_tokens(self, tokens):
        # process all sublist first
        new_tokens = []
        for token in tokens:
            if isinstance(token, list):
                new_tokens.append(self.process_tokens(token))
            else:
                new_tokens.append(token)
        tokens = new_tokens

        # There isn't any sublist anymore, process the rest
        if len(tokens) == 1:
            # it's just checking the value of a variable
            return self.vars[tokens[0]]
        elif len(tokens) == 3:
            a, op, b = tokens
            return self.operation(a, op, b)
        else:
            # 1) decide 3 tokens with priority of operation
            # 2) call process_tokens recursively
            # 3) replace the 3 tokens by the results
            # 4) call input on the remaining parts

            # 1) decide 3 tokens with priority of operation
            first_operator_index, first_operator_precedence = None, float("inf")
            for i, token in enumerate(tokens):
                local_op_precedence = operators_precedence.get(token)
                if local_op_precedence is not None and local_op_precedence < first_operator_precedence:
                    first_operator_index, first_operator_precedence = i, local_op_precedence

            # 2) call process_tokens recursively on those 3 tokens
            local_tokens = tokens[first_operator_index - 1:first_operator_index + 2]
            local_result = self.process_tokens(local_tokens)

            # 3) replace the 3 tokens by the results
            new_tokens = tokens[:first_operator_index - 1] + [local_result] + tokens[first_operator_index + 2:]

            # 4) call process_tokens recursively on the remaining parts
            return self.process_tokens(new_tokens)


def assert_equals(given, expected):
    ok = given == expected
    if ok:
        print(f"OK: {expected=}")
    else:
        print(f"NOOOP: {expected=} , {given=}")


def expect_error(given_func):
    error = False
    try:
        given_func()
    except Exception:
        error = True

    assert error


assert_equals(convert_parenthesis_to_token_list([1, 2, 3]), [1, 2, 3])
assert_equals(convert_parenthesis_to_token_list([1, "+", 2]), [1, "+", 2])
assert_equals(convert_parenthesis_to_token_list([1, 2, "(", 3, "+", 4, ")", 5]), [1, 2, [3, "+", 4], 5])
assert_equals(convert_parenthesis_to_token_list([1, 2, "(", "(", 3, "+", 4, ")", ")", 5]), [1, 2, [[3, "+", 4]], 5])

interpreter = Interpreter()

# Basic arithmetic
assert_equals(interpreter.input("1 + 1"), 2)
assert_equals(interpreter.input("2 - 1"), 1)
assert_equals(interpreter.input("2 * 3"), 6)
assert_equals(interpreter.input("8 / 4"), 2)
assert_equals(interpreter.input("7 % 4"), 3)

# Variables
assert_equals(interpreter.input("x = 1"), 1)
assert_equals(interpreter.input("x"), 1)
assert_equals(interpreter.input("x + 3"), 4)
expect_error(lambda: interpreter.input("y"))
assert_equals(interpreter.input("4 + 2 * 3"), 10)
assert_equals(interpreter.input("4 / 2 * 3"), 6)
assert_equals(interpreter.input("(4 + 2) * 3"), 18)

# Functions
interpreter.input("fn avg x y => (x + y) / 2")
assert_equals(interpreter.input("avg 4 2"), 3)
expect_error(lambda: interpreter.input("avg 7"))
expect_error(lambda: interpreter.input("avg 7 2 4"))

# Conflicts
expect_error(lambda: interpreter.input("fn x => 0"))
expect_error(lambda: interpreter.input("avg = 5"))
