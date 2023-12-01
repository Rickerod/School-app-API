DROP DATABASE schooldb;

CREATE DATABASE schooldb;

USE schooldb;


CREATE TABLE school(
    school_id INT PRIMARY KEY
);

CREATE TABLE user(
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50),
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    uri_image_profile VARCHAR(200),
    user_description VARCHAR(200),
    type_user BOOLEAN,
    school_id INT,
    FOREIGN KEY(school_id) REFERENCES school(school_id)

);

CREATE TABLE report(
    id_report INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT,
    report_description VARCHAR(400),
    FOREIGN KEY(id_user) REFERENCES User(id_user)
);

CREATE TABLE post(
    id_post INT AUTO_INCREMENT PRIMARY KEY,
    id_author_post INT NOT NULL,
    post_description VARCHAR(200),
    post_category VARCHAR(200),
    fecha_post DATE NOT NULL,
    num_likes INTEGER,
    FOREIGN KEY(id_author_post) REFERENCES user(id_user)
);

CREATE TABLE like_post(
    id_post INT,
    id_user INT,
    PRIMARY KEY (id_post, id_user),
    is_liked BOOLEAN,
    fecha_like DATE NOT NULL,
    FOREIGN KEY(id_user) REFERENCES user(id_user),
    FOREIGN KEY(id_post) REFERENCES post(id_post)
);

CREATE TABLE comments(
    id_comment INT AUTO_INCREMENT PRIMARY KEY,
    id_post INT,
    id_user INT,
    comment VARCHAR(200),
    id_user_response INT,
    fecha_comment DATE NOT NULL,
    FOREIGN KEY(id_user) REFERENCES user(id_user),
    FOREIGN KEY(id_post) REFERENCES post(id_post)
);

CREATE TABLE image(
    id_image INT AUTO_INCREMENT PRIMARY KEY,
    id_post INT,
    url_image VARCHAR(200),
    FOREIGN KEY(id_post) REFERENCES post(id_post)
);

CREATE TABLE video(
    id_video INT AUTO_INCREMENT PRIMARY KEY,
    id_post INT,
    url_video VARCHAR(200),
    FOREIGN KEY(id_post) REFERENCES post(id_post)
);

CREATE TABLE followed(
  id_user INT, 
  id_followed INT,
  PRIMARY KEY(id_user, id_followed),
  FOREIGN KEY(id_user) REFERENCES user(id_user),
  FOREIGN KEY(id_followed) REFERENCES User(id_user)
);

CREATE TABLE follower(
    id_user INT,
    id_follower INT,
    PRIMARY KEY(id_user, id_follower),
    FOREIGN KEY(id_user) REFERENCES user(id_user),
    FOREIGN KEY(id_follower) REFERENCES user(id_user)
);

INSERT INTO school(school_id)
VALUES (1);

INSERT INTO user (username, firstname, lastname, uri_image_profile, user_description, type_user, school_id)
VALUES ('johndoe', 'John', 'Doe','https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/userProfile.png', 'Teacher at XYZ High School', TRUE, 1),
       ('janedoe2', 'Jane2', 'Doe1', 'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/profile1.jpg', 'Student at XYZ High School', FALSE, 1),
       ('janedoe3', 'Jane3', 'Doe2', 'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/profile2.jpg', 'Student at XYZ High School', FALSE, 1),
       ('janedoe4', 'Jane4', 'Doe3', 'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/profile3.jpg', 'Student at XYZ High School', FALSE, 1),
       ('janedoe5', 'Jane5', 'Doe4', 'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/profile4.jpg', 'Student at XYZ High School', FALSE, 1),
       ('janedoe6', 'Jane6', 'Doe5', 'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/profile1.jpg', 'Student at XYZ High School', FALSE, 1),
       ('janedoe7', 'Jane7', 'Doe6', 'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/profile2.jpg', 'Student at XYZ High School', FALSE, 1),
       ('janedoe8', 'Jane8', 'Doe7', 'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/profile3.jpg', 'Student at XYZ High School', FALSE, 1),
       ('janedoe9', 'Jane9', 'Doe8', 'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/profile4.jpg', 'Student at XYZ High School', FALSE, 1),
       ('janedoe10', 'Jane10', 'Doe9', 'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/profile1.jpg', 'Student at XYZ High School', FALSE, 1),
       ('janedoe11', 'Jane11', 'Doe10', 'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/profile2.jpg', 'Student at XYZ High School', FALSE, 1);

INSERT INTO report (id_user, report_description)
VALUES (1, "No me gustó como este alumno me comento en la publicacion, fue muy poco acertivo"),
       (2, "El bastian me insultó en la publicacion y dijo groserias"),
       (3, "El julian dijo que mi comentario no aportaba en nada :(. , me hizo sentirme triste");

INSERT INTO post (id_author_post, post_description, post_category, fecha_post, num_likes)
VALUES (1, 'First day of classes', 'imagen', '2023-09-01', 10),
       (2, 'I love this history class!', 'imagen', '2023-09-15', 20),
       (3, 'I love this history class!', 'imagen', '2023-09-14', 30),
       (4, 'I love this history class!', 'imagen', '2023-09-13', 40),
       (5, 'I love this history class!', 'imagen', '2023-09-12', 50),
       (6, 'I love this history class!', 'imagen', '2023-09-11', 60),
       (7, 'I love this history class!', 'imagen', '2023-09-10', 70),
       (8, 'I love this history class!', 'imagen', '2023-09-09', 80),
       (9, 'I love this history class!', 'imagen', '2023-09-08', 23),
       (10, 'I love this history class!', 'imagen', '2023-09-07', 22),
       (1, 'I love this history class!', 'imagen', '2023-09-07', 30),
       (1, 'I love this history class!', 'imagen', '2023-09-07', 30),
       (1, 'I love this history class!', 'imagen', '2023-09-07', 30);

       
INSERT INTO like_post (id_post, id_user, is_liked, fecha_like)
VALUES (1, 2, TRUE, '2023-09-02'),
       (2, 1, TRUE, '2023-09-20');
       
INSERT INTO comments (id_post, id_user, comment, id_user_response, fecha_comment)  
VALUES (1, 2, 'Have a great first day!', 0, '2023-09-01'),
       (2, 1, 'Glad you are enjoying it!', 0, '2023-09-16');
       
INSERT INTO image (id_post, url_image)
VALUES (1, 'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/post1.jpg'),
       (1, 'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/post2.jpg'),   
       (1, 'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/post3.jpg'),
       (2, 'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/post2.jpg'),
       (3, 'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/post3.jpg'),
       (4, 'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/post4.jpg'),
       (5, 'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/post5.jpg'),
       (6, 'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/post6.jpg'),
       (7, 'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/post7.jpg'),
       (8, 'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/post8.jpg'),
       (9, 'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/post9.jpg'),
       (10, 'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/post10.jpg'),
       (11, 'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/post6.jpg'),
       (12, 'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/post8.jpg'),
       (13, 'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/post9.jpg');
       
INSERT INTO video (id_post, url_video)  
VALUES (1, 'https://example.com/firstdayvid.mp4');

INSERT INTO followed (id_user, id_followed)
VALUES (1, 2);

INSERT INTO follower (id_user, id_follower)
VALUES (2, 1);

