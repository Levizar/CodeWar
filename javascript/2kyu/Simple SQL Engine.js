function SQLEngine(database){
  
    // select col1, col2 from table join table2 where condition
    
    this.execute = function(query){
        // check for the column between select and from
        columnName = this.getColumnName(query)
        // check for the table between from and join/where/end of string
        tableName = this.getTableName(query)
        // check for table to join between join and where/end of string
        
        // check for where after where
    };
    
    this.getColumnName = function(query){
        columnMatchingRegex = /^SELECT (?<columns>(\s*[a-z\d]+\.[a-z\d]+\s?,?\s?\n?)*)[\s\n]FROM.*$/i
        nameProperty = [];
        return nameProperty;
    }


  }

bigRegex = /^SELECT[\s\n\r](?<columns>([\s\n\r]*[a-z\d]+\.[a-z\d]+[\s\n\r]*,?[\s\n\r]*)+)[\s\n\r]+FROM[\s\n\r]+(?<fromTable>[a-z\d]+)[\s\n\r]+/i

// space or carriage return
const ws = "[\s\n\r]+"
// numbers or value in single quote
const cons = "[\d]|'.*'"
// " = " | " > " | " < " | " <= " | " >= " | " <> "
const comparison = "\s=\s|\s>\s|\s<\s|\s<=\s|\s>=\s|\s<>\s"
// valid name for column and table
const tableName = "[a-zA-Z0-9_]+"
const columnName = tableName
// column selector
const columnId = tableName + "\." + columnName
// column or value
const value = columnId + "|" + cons
// comparison clause
const valueTest = value + comparison + value
const whereClause = "WHERE\s+" + valueTest
const join = "JOIN\s+" + tableName + "\s+ON\s+" + valueTest
const from = "FROM\s" + tableName + `(${(ws + join)})*`
const select = "SELECT\s" + columnId + `(,\s${columnId})*`
const sqlQuery = select + ws + from + `(${ws + join})*` + `(${ws + whereClause})*`


// query         =  select, ws, from, [ ws, join ], [ ws, where ] ; X
// select        =  "SELECT ", column-id, [ { ", ", column-id } ] ; X
// from          =  "FROM ", table-name, [ { ws, join } ] ; X
// join          =  "JOIN ", table-name, " on ", value-test ; X
// where         =  "WHERE ", value-test ; X
// value-test    =  value, comparison, value; X
// column-id     =  table-name, ".", column-name ; X
// table-name    = ? a valid SQL table name ? ; X
// column-name   = ? a valid SQL column name ? ; X
// value         =  column-id | const X
// comparison    =  " = " | " > " | " < " | " <= " | " >= " | " <> " ; X
// const         =  ? a number ? | ? a SQL single-quoted string ? ; X
// ws            = " " | "\n" | ws, ws ; X




// SELECT tAble1.col1, table1.col2, table1.col3 from table1 join table2 on table1.id = table2.id where table1.col1 = "haha"


// SeLECT table1.col1,
//        table1.col2, 
//        table1.col3 
// from table1 join table2 on table1.id = table2.id where table1.col1 = "haha"



// SeLECTtable1.col1,
//        table1.col2, 
//        table1.col3 
// from table1 join table2 on table1.id = table2.id where table1.col1 = "haha"