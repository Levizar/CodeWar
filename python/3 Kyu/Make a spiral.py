# OOP overkill and unclean solution
# To make a clean OOP, I would need to define a second class called block and externalize every block related method
class Spiralize():
    x = 0
    y = 0
    direction = 0

    def __init__(self, size):
        self.spiral = [[0 for _ in range(size)] for _ in range(size)]
        self.mark_visited()
        self.size = size

    def spiral(self):
        return self.spiral

    def run(self):
        while self.is_next_block_safe():
            self.move_and_mark_visited_until_not_safe()
            self.turn()

    def move_and_mark_visited_until_not_safe(self):
        while self.is_next_block_safe():
            self.move()
            self.mark_visited()

    def is_next_block_safe(self):
        next_block = self.n_next_block_coordinate(
            self.current_block(), 1, self.direction)
        return self.is_block_existing(next_block) and not self.is_next_block_front_and_right_neighbours_already_visited()

    def mark_visited(self):
        self.spiral[self.x][self.y] = 1

    def move(self):
        if self.direction == 0:
            self.y += 1

        if self.direction == 1:
            self.x += 1

        if self.direction == 2:
            self.y -= 1

        if self.direction == 3:
            self.x -= 1

    def turn(self):
        self.direction = 0 if self.direction == 3 else self.direction + 1

    def is_next_block_front_and_right_neighbours_already_visited(self):
        next_block = self.n_next_block_coordinate(self.current_block(), 1, self.direction)
        next_block_front_neighbout = self.n_next_block_coordinate(next_block, 1, self.direction)
        next_block_right_neighbout = self.n_next_block_coordinate(next_block, 1, self.direction + 1)

        next_block_front_neighbout_visited = self.is_block_existing(next_block_front_neighbout) and self.is_block_visited(next_block_front_neighbout)
        next_block_right_neighbout_visited = self.is_block_existing(next_block_right_neighbout) and self.is_block_visited(next_block_right_neighbout)

        return any((next_block_front_neighbout_visited, next_block_right_neighbout_visited))

    def n_next_block_coordinate(self, block, n, direction):
        if direction is None:
            direction = self.direction
        (a, b) = block
        if direction == 0:
            b += n
        if direction == 1:
            a += n
        if direction == 2:
            b -= n
        if direction == 3:
            a -= n
        return (a, b)

    def is_block_existing(self, block):
        try:
            (a, b) = block
            if a < 0 or b < 0:
                raise IndexError
            else:
                self.spiral[a][b]
            return True
        except IndexError:
            return False

    def current_block(self):
        return (self.x, self.y)

    def is_block_visited(self, block):
        (a, b) = block
        return self.is_block_existing(block) and bool(self.spiral[a][b])


def spiralize(size):
    spiral = Spiralize(size)
    spiral.run()
    for i in range(size):
        print(spiral.spiral[i])
    return spiral.spiral


spiralize(15)
