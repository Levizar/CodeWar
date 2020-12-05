SELECT
    ROW_NUMBER() OVER(
        ORDER BY
            sub.total_points DESC
    ) AS rank,
    sub.clan,
    sub.total_points,
    sub.total_people
FROM
    (
        SELECT
            SUM(points) total_points,
            COUNT(*) total_people,
            CASE
                WHEN clan LIKE '' THEN '[no clan specified]'
                ELSE clan
            END
        FROM
            people
        GROUP BY
            clan
    ) AS sub;