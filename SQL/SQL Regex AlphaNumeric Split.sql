/*  SQL  */
SELECT 
  project, 
  REGEXP_REPLACE(address,'[0-9]*','', 'ig') letters, 
  REGEXP_REPLACE(address,'[A-Z]*','', 'ig') numbers  
FROM repositories