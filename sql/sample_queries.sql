-- top 10 countries by medal count
SELECT country, COUNT(*) AS medals
FROM alumni
WHERE medal IN ('Gold','Silver','Bronze')
GROUP BY country
ORDER BY medals DESC
LIMIT 10;

-- where have IMO gold medalists from 2010‑2020 settled?
SELECT alumnus_id, current_city, lat, lng
FROM career_moves
WHERE alumnus_id IN (
  SELECT id FROM alumni 
  WHERE olympiad='IMO' AND medal='Gold' AND year BETWEEN 2010 AND 2020
);

-- upcoming seminars in next 30 days
SELECT * FROM seminars
WHERE date >= CURRENT_DATE 
  AND date <= CURRENT_DATE + INTERVAL '30 days'
ORDER BY date;
