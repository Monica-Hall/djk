DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS form; 

-- USERS
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY, 
    name VARCHAR(25), 
    email VARCHAR(30), 
    password VARCHAR, 
    is_admin BOOLEAN
);

INSERT INTO users (name, email, password, is_admin)
VALUES
('Monica', 'm@fakemail.com', 'password', true), 
('Rachel', 'r@fakemail.com', 'password', false), 
('Phoebe', 'p@fakemail.com', 'password', false); 

-- FORM
CREATE TABLE form (
    form_id SERIAL PRIMARY KEY, 
    user_id INT REFERENCES users(user_id), 
    -- name VARCHAR(25)  REFERENCES users(name), 
    artist VARCHAR(30), 
    title VARCHAR(50), 
    requests VARCHAR(150), 
    complete BOOLEAN
); 

INSERT INTO form (user_id, artist, title, requests, complete)
VALUES
(1, 'Nicki Minaj', 'Anaconda', 'Anounce me as Queen Bee', false),
(2, 'Kelly Clarkson', 'Since youve been gone', 'Play that remix by so and so...', false), 
(3, 'Famous Phoebe', 'Smelly Cat', 'Ill be singing accapella, I brought my own guitar', false); 

SELECT * FROM users; 
SELECT * FROM form; 