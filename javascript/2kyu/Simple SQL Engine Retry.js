function SQLEngine(database){

  this.execute = function(query){
    // Parse the query
    console.log(query);
    console.log(``);
    const { toSelect, from, joins, where } = this.parseQuery(query);

//     console.log(`to select: ${toSelect}`);
    console.log(`from: ${from}`);
    console.log(``);
    console.log('joins:');
    console.log(joins);
    console.log(``);
    console.log('where:');
    console.log(where);
    console.log(``);

    // Gather the results
    // starts with from table and format their properties name to contain the table name
    const rows = database[from].map(row => formatRow(from, row));
    const alreadyJoined = [from];
    let res = rows;
    for (const [join, cond] of Object.entries(joins)) {
      const [lCond, op, rCond] = cond;
//   joins:
//   { director: [ 'director.id', '=', 'movie.directorID' ] }
      let [ltable, lfield] = lCond.split('.');
      let [rtable, rfield] = rCond.split('.');

      console.log([lCond, op, rCond]);

      const newRes = [];
      for (const row of res) {
        for (const jrow of database[join]) {
          const newRow = {...row, ...formatRow(join, jrow)};
          if (newRow[lCond] == newRow[rCond]) {
            newRes.push(newRow);
          }
        }
      }
      res = newRes;
    }

    console.log('res:');
    console.log(res);
    console.log('');
    const finalRes = [];
    for (const row of res) {
      // filter the result
      if (!conditionHandler(where, row)) {
        continue;
      }
      // condition is ok, select the right properties
      const toPush = {};
      for (const select of toSelect) {
        toPush[select] = row[select];
      }
      finalRes.push(toPush);
    }
    console.log('finalRes:');
    console.log(finalRes);
    return finalRes;
  }

  this.parseQuery = function(query){
    const toSelect = [];
    const joins = {};
    const where = [];
    let mode = false;
    let from = false;
    let lastJoin = false;
    // match all white space except white space enclosed by single quote
    const q = query.split(/\s+(?=(?:[^']*'[^']*')*[^']*$)/)
    for(let s of q){
      switch (s.toLowerCase()) {
          case 'select':
            mode = 'select';
            continue;
          case 'from':
            mode = 'from';
            continue;
          case 'join':
            mode = 'join'
            continue;
          case 'on':
            mode = 'on'
            continue;
          case 'where':
            mode = 'where';
            continue;
      }
      if (s[0] == "'") {
        s = s.substring(1, s.length - 1);
      }
      s = s.replace(/''/g, "'");
      switch (mode) {
          case 'select':
            toSelect.push(s.replaceAll(',', ''));
            continue;
          case 'from':
            from = s
            continue;
          case 'join':
            joins[s] = [];
            lastJoin = s;
            continue;
          case 'on':
            joins[lastJoin].push(s)
            continue;
          case 'where':
            where.push(s)
            continue;
      }
    }
    return {
      toSelect: toSelect,
      from: from,
      joins: joins,
      where: where,
    }
  }
}

function formatRow(table, obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([k,v]) => [`${table}.${k}`, v])
  );
}

function conditionHandler(where, row) {
    if (!where.length) {
      return true;
    }
    console.log(where);
    switch (where[1]) {
        case '=':
          return row[where[0]] == where[2];
        case '<>':
          return row[where[0]] != where[2];
        case '>':
          return row[where[0]] > where[2];
        case '<':
          return row[where[0]] < where[2];
        case '>=':
          return row[where[0]] >= where[2];
        case '<=':
          return row[where[0]] <= where[2];
    }
}