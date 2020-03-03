/* POSTGRESQL */

SELECT
  job_title,
  ROUND((SUM(salary)/COUNT(job_title)), 2)::FLOAT AS average_salary,
  COUNT(job_title) AS total_people,
  ROUND(SUM(salary),2)::FLOAT AS total_salary
FROM job
GROUP BY job_title
ORDER BY average_salary DESC