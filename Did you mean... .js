function Dictionary(words) {
    this.words = words;
}

Dictionary.prototype.findMostSimilar = function(term) {
    // TODO: this is your task ;)
};


TestDictionary({
    words: ['cherry', 'pineapple', 'melon', 'strawberry', 'raspberry'],
    expectations: [
      { query:   'strawbery',
        nearest: 'strawberry'
      },
      { query:   'berry',
        nearest: 'cherry'
      }
    ],
  });
  
  TestDictionary({
    words: Test.randomize(['javascript', 'java', 'ruby', 'php', 'python', 'coffeescript']),
    expectations: [
      { query:   'heaven',
        nearest: 'java'
      },
      { query:   'javascript',
        nearest: 'javascript'
      }
    ],