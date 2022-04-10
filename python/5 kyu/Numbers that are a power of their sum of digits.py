def power_sumDigTerm(n):
    valid_number = []
    for number in range(2, 100):
        for exponant in range(2, 100):
            candidate = number**exponant
            if sum([int(d) for d in str(candidate)]) == number:
                valid_number.append(candidate)

    valid_number = sorted(valid_number)
    return valid_number[n-1]

def power_sumDigTerm(n):
    return sorted([
        number**exponant 
        for number in range(2, 100) 
        for exponant in range(2, 100)
        if sum([int(d) for d in str(number**exponant)]) == number
    ])[n-1]