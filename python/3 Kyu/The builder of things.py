from collections import abc
from functools import partial, wraps


class Thing(abc.Sequence):
    def __init__(self, name, length=1, current=0, *singular):
        cls = type(self)
        if singular and name.endswith('s'):  # handle singular name
            name = name[:-1]
        self.name = name
        self.state = 'idle'
        self.current = current
        # True is to have singular = True
        self.internal_list = [cls(self.name, 1, i, True) for i in range(length)] if length > 1 else [self]
        setattr(self, f'is_{name}', True)

    def __str__(self):
        return self.name

    def __repr__(self):
        return f"'{self.name}'"

    def __len__(self):
        return len(self.internal_list)

    def __iter__(self):
        yield from self.internal_list

    def __getitem__(self, i):
        return self.internal_list[i]

    def __contains__(self, item):
        return item in self.internal_list

    def __eq__(self, other):
        if isinstance(other, str):
            return self.name == other
        return id(self) == id(other)

    def _archiving_function_run(self, func, property_name):
        @wraps(func)
        def new_func(*args, **kwargs):
            result = func(*args, **kwargs)
            archive = getattr(self, f'{property_name}')
            # print("_archiving_: {self=} {self.state=} {property_name=}")
            archive.append(result)
            return result

        return new_func

    def __call__(self, *arg):
        # print(f'__call__: {self=} - {self.state=}- {arg=}')
        match self.state, arg:
            case ['has' | 'having', [arg]]:
                # not idle here as going back to `__getattr__` right after to set the attribute
                self.arg = arg
                return self
            case ['each', [func]]:
                self.state = 'idle'
                for thing in self.internal_list:
                    func(thing)
                return self
            case ['do', [func, *archive]]:
                self.state = 'idle'
                bounded_func = partial(func, self)
                if archive:
                    # keep results of call in a list at archive_property by decorating func with `_archiving_function_run`
                    [archive_property] = archive
                    setattr(self, f'{archive_property}', [])
                    bounded_func = self._archiving_function_run(bounded_func, archive_property)
                setattr(self, f'{self.verb}', bounded_func)
                return self
            case _:
                raise Exception(f"unimplemented __call__: {self.state=} {arg=}")

    def __getattr__(self, key):
        # print(f'__getattr__: {self=} - {self.state=} - {key=}')
        # getattr is called as last resort by python if it doesn't find anything matching by other means
        match self.state, key:
            case ['idle', action] if action in ('is_a', 'is_not_a', 'has', 'having'):
                self.state = action
                return self
            case ['is_a', _]:
                self.state = 'idle'
                setattr(self, f'is_a_{key}', True)
                return self
            case ['is_not_a', _]:
                self.state = 'idle'
                setattr(self, f'is_a_{key}', False)
                return self
            case ['has' | 'having', _]:
                self.state = 'idle'
                cls = type(self)
                quantity = self.arg
                new_thing = cls(f'{key}', quantity)
                setattr(self, f'{key}', new_thing)
                return new_thing
            case ['idle', 'each']:
                self.state = 'each'
                return self
            case ['idle', 'is_the' | 'being_the' | 'and_the']:
                self.state = 'is_the'
                return self
            case ['idle', 'can']:
                self.state = 'can'
                return self
            case ['can', verb]:
                self.state = 'do'
                self.verb = verb
                return self
            case ['is_the', qualifier]:
                self.state = qualifier
                return self
            case [str(qualifier), _]:  # 'is_the', 'being_the', 'and_the' case
                self.state = 'idle'
                cls = type(self)
                new_thing = cls(f'{key}')
                setattr(self, qualifier, new_thing)
                return self
            case _:
                raise AttributeError


a = Thing('Tctblvicyqeo')
b = a.has(2).amszskbceos.each(lambda th: th.has(2).ycimdrnamwbs).each(lambda th: th.being_the.tzsqayf_of.qpzvobcdehx).each(lambda th: th.can.dbijuaqyra(lambda self,**kw: set(kw), 'dbijuaqyra_z'))
print('bp')
