INSERT INTO form (artist, title, requests, complete, user_id)
VALUES (${artist}, ${title}, ${requests}, 'false', ${user_id}); 

SELECT f.form_id, f.artist, f.title, f.requests, f.complete, u.name 
FROM form f
JOIN users u
ON f.user_id = u.user_id; 