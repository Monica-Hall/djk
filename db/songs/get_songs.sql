SELECT f.form_id, u.name, f.artist, f.title, f.requests 
FROM form f
JOIN users u
ON f.user_id = u.user_id; 