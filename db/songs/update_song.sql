UPDATE form
-- SET complete = ${complete}
SET artist = ${artist}, title = ${title}, requests = ${requests}
WHERE form_id = ${form_id}; 

SELECT f.form_id, f.artist, f.title, f.requests, f.complete, u.name 
FROM form f
JOIN users u
ON f.user_id = u.user_id; 