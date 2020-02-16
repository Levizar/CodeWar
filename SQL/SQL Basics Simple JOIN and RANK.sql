SELECT 
  people.id, 
  people.name, 
  COUNT(sales.sale) AS sale_count, 
  RANK() OVER(
    ORDER BY COUNT(sales.sale)
  ) AS sale_rank
FROM people 
JOIN sales 
ON sales.people_id = people.id
GROUP BY people.id