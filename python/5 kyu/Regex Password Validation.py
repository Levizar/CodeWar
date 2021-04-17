# https://www.codewars.com/kata/52e1476c8147a7547a000811/
# check if there is at least one a-z, one A-Z, one \d before matching \w
regex = r'^(?=[a-zA-Z\d]*[a-z]){1,}(?=[a-zA-Z\d]*[A-Z]){1,}(?=[a-zA-Z\d]*\d){1,}[a-zA-Z\d]{6,}$'