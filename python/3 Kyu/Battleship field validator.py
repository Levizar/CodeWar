def validate_battlefield(field):
    ships = {
            "battleship": {
            "expected": 1,
            "size": 4,
            "counted": 0
        },
        "cruisers": {
            "expected": 2,
            "size": 3,
            "counted": 0
        },
        "destroyers": {
            "expected": 3,
            "size": 2,
            "counted": 0
        },
        "submarines": {
            "expected": 4,
            "size": 1,
            "counted": 0
        }
    }
    
    #1) Check for touching ships

    for i in range(len(field)):
        for j in range(len(field[i])):
            if field[i][j]:
                # check for corner if occupied : return False

                # the first field i-/+1 condition verify if the line exist before acceding to the sub array
                # the second j-/+1 condition verify if the col exist
                if (
                    ((i - 1 >= 0)         and (j - 1 >= 0)            and field[i - 1][j - 1]) or
                    ((i - 1 >= 0)         and (j + 1 < len(field[i])) and field[i - 1][j + 1]) or
                    ((i + 1 < len(field)) and (j - 1 >= 0)            and field[i + 1][j - 1]) or
                    ((i + 1 < len(field)) and (j + 1 < len(field[i])) and field[i + 1][j + 1])
                ): return False
                # check if ships from size 4,3,2 are touching by checking if lines cross
                # We do not verify the size 1 because they will not be counted as submarines if they touch with another which lead to false disposition
                # the first field i-/+1 condition verify if the line exist before acceding to the sub array
                if ((((i - 1 >= 0) and field[i - 1][j]) or ((i + 1 < len(field)) and field[i + 1][j])) and ((field[i] and field[i][j - 1]) or (field[i] and field[i][j + 1]))): return False
    # 2) Check numbers of ships :
    # At this point ships aren't touching so we can assume that every touching point are part of a ship
    checking_Field = list(map(lambda line: map(lambda elm: False, line), field))
    for i in range(len(field)):
        for j in range(len(field[i])):
            # has ij already been checked ?
            if checking_Field[i][j] == False :
                checking_Field[i][j] == True
                # Check if ship on ij
                if field[i][j]:
                    # If yes, we start analysing the grid and the around area
                    checking = True
                    size = 1
                    # Check around for other part of ship. We don't check j-1 or i-1 because we already checked it
                    if (j < len(field[i]) and field[i][j+1]):
                        # means it's horizontal
                        while checking :
                            if j + size < len(field[i]):
                                checking_Field[i][j + size] = True
                                if field[i][j + size]:
                                    size =+ 1  
                                else:
                                    checking = False
                            else:
                                checking = False
                    elif i + 1 < len(field) and field[i + 1][j]:
                        # i + 1 < len(field) => verify if the line exist
                        # means it's vertical
                        while checking:
                            if i + size < len(field):
                                checking_Field[i + size][j] = True
                                if field[i+size][j]:
                                    size += 1
                                else:
                                    checking = False
                            else:
                                checking = False
                    else:
                        # means it's a submarine : do nothing
                        checking = False
                    # We have the size of the ship, we have to get the type and increment its count
                    checking = True
                    for ship in ships:
                        if ship["size"] == size:
                            checking = False
                            ships[ship]["counted"] += 1
                            if ships[ship]["counted"] > ships[ship]["expected"]: return False
                            break
                    if checking: return False
    # end of for

    # At this point we know there isn't too much ship but we have to check if there is too few of it
    for ship in ships: 
        if ship["expected"] != ship["counted"]: return False

    # If the grid pass all the test then the grid is valid
    return True


battleField = [[1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
                 [1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
                 [1, 0, 1, 0, 1, 1, 1, 0, 1, 0],
                 [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
                 [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
                 [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
validate_battlefield(battleField)