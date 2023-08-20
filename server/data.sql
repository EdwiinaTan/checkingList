CREATE DATABASE checkingList;

CREATE TABLE list (
  id VARCHAR(255) PRIMARY KEY,
  user_email VARCHAR(255),
  title VARCHAR(30),
  progress INT,
  date VARCHAR(255)
);

CREATE TABLE users (
  email VARCHAR(255) PRIMARY KEY,
  hashed_password VARCHAR(255)
);

INSERT INTO
  list (id, user_email, title, progress, date)
  VALUES (1, 'test@test.com', 'holiday', 3, '19/09/23');

DELETE FROM list
  WHERE id = 1