from math import sqrt

class Vector:
    def __init__(self, *args):
        if isinstance(args[0], list) or isinstance(args[0], tuple):
            self.x = args[0][0]
            self.y = args[0][1]
            self.z = args[0][2]
        else:
            self.x = args[0]
            self.y = args[1]
            self.z = args[2]
        self.magnitude = sqrt(self.x**2 + self.y**2 + self.z**2)

    def __add__(self, o):
        return Vector(self.x + o.x, self.y + o.y, self.z + o.z)

    def __sub__(self, o):
        return Vector(self.x - o.x, self.y - o.y, self.z - o.z)

    def __eq__(self, o):
        if isinstance(o, self.__class__):
            return self.x == o.x and self.y == o.y and self.z == o.z
        else:
            return False

    def __ne__(self, o):
        return not self.__eq__(o)

    def cross(self, o):
        if isinstance(o, self.__class__):
            return Vector(
                self.y * o.z - self.z * o.y,
                self.z * o.x - self.x * o.z,
                self.x * o.y - self.y * o.x
            )

    def dot(self, o):
        if isinstance(o, self.__class__):
            return self.x * o.x + self.y * o.y + self.z * o.z

    def to_tuple(self):
        return tuple([self.x, self.y, self.z])

    def __str__(self):
        return f"<{self.x}, {self.y}, {self.z}>"

    def get(self):
        return self
