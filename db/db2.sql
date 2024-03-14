CREATE DATABASE schooldbv2;

USE schooldbv2;

CREATE TABLE school(
    school_id INT PRIMARY KEY,
    show_comments BOOLEAN
);

CREATE TABLE type_user(
    id_type_user INT PRIMARY KEY, 
    name_type_user VARCHAR(20)
);

CREATE TABLE user(
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    loginuser VARCHAR(50),
    username VARCHAR(50),
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    password VARCHAR(50),
    uri_image_profile VARCHAR(200),
    user_description VARCHAR(200),
    id_type_user INT,
    school_id INT,
    birthday_day DATE NOT NULL,
    FOREIGN KEY(id_type_user) REFERENCES type_user(id_type_user),
    FOREIGN KEY(school_id) REFERENCES school(school_id)

);

CREATE TABLE bitacora(
    id_bitacora INT AUTO_INCREMENT PRIMARY KEY,
    name_bitacora VARCHAR(100),
    id_author_bitacora INT,
    FOREIGN KEY (id_author_bitacora) REFERENCES user(id_user)
);

CREATE TABLE question(
    id_question INT AUTO_INCREMENT PRIMARY KEY,
    question VARCHAR(200)
);

CREATE TABLE answer(
    answer VARCHAR (200),
    id_question INT,
    id_user INT,
    id_bitacora INT,
    PRIMARY KEY(id_question, id_user, id_bitacora),
    FOREIGN KEY(id_question) REFERENCES question(id_question),
    FOREIGN KEY(id_user) REFERENCES user(id_user),
    FOREIGN KEY (id_bitacora) REFERENCES bitacora(id_bitacora)
);

CREATE TABLE report_general(
    id_report INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT,
    report_description VARCHAR(400),
    FOREIGN KEY(id_user) REFERENCES user(id_user)
);

CREATE TABLE post(
    id_post INT AUTO_INCREMENT PRIMARY KEY,
    id_author_post INT NOT NULL,
    post_description VARCHAR(200),
    post_category VARCHAR(200),
    fecha_post DATE NOT NULL,
    num_likes INTEGER,
    thumbnail_video VARCHAR(200),
    video_url VARCHAR(200),
    FOREIGN KEY(id_author_post) REFERENCES user(id_user)
);

CREATE TABLE report_post(
    id_report_post INT AUTO_INCREMENT PRIMARY KEY,
    report_description VARCHAR(400)
);


CREATE TABLE comments(
    id_comment INT AUTO_INCREMENT PRIMARY KEY,
    comment VARCHAR(200),
    id_user_response INT
);


CREATE TABLE actions(
    id_action INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT,
    id_post INT,
    id_comment INT,
    id_report_post INT,
    fecha_action DATE NOT NULL,
    FOREIGN KEY(id_user) REFERENCES user(id_user),
    FOREIGN KEY(id_post) REFERENCES post(id_post) ON DELETE CASCADE,  
    FOREIGN KEY(id_comment) REFERENCES comments(id_comment) ON DELETE CASCADE,
    FOREIGN KEY(id_report_post) REFERENCES report_post(id_report_post)
);

CREATE TABLE like_post(
    id_post INT,
    id_user INT,
    PRIMARY KEY (id_post, id_user),
    is_liked BOOLEAN,
    FOREIGN KEY(id_user) REFERENCES user(id_user),
    FOREIGN KEY(id_post) REFERENCES post(id_post) ON DELETE CASCADE  
);

CREATE TABLE image(
    id_image INT AUTO_INCREMENT PRIMARY KEY,
    position INT,
    id_post INT,
    url_image VARCHAR(200),
    FOREIGN KEY(id_post) REFERENCES post(id_post) ON DELETE CASCADE  
);

CREATE TABLE survey(
    id_survey INT AUTO_INCREMENT PRIMARY KEY,
    id_author_survey INT,
    question_survey VARCHAR(200),
    FOREIGN KEY(id_author_survey) REFERENCES user(id_user)

);

CREATE TABLE alternative(
    id_alternative INT AUTO_INCREMENT PRIMARY KEY,
    alternative VARCHAR(200),
    id_survey INT,
    FOREIGN KEY(id_survey) REFERENCES survey(id_survey) ON DELETE CASCADE
);

CREATE TABLE answer_alternative(
    id_alternative INT,
    id_user INT,
    PRIMARY KEY (id_alternative, id_user),
    fecha_answer TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6),
    FOREIGN KEY(id_alternative) REFERENCES alternative(id_alternative) ON DELETE CASCADE,
    FOREIGN KEY(id_user) REFERENCES user(id_user)
);

CREATE TABLE follow(
  id_user INT, 
  id_followed INT,
  follow BOOLEAN,
  PRIMARY KEY(id_user, id_followed),
  FOREIGN KEY(id_user) REFERENCES user(id_user),
  FOREIGN KEY(id_followed) REFERENCES user(id_user)
);

INSERT INTO school
VALUES (1, TRUE),
       (2, TRUE);

INSERT INTO type_user(id_type_user, name_type_user)
VALUES (0, "user"),
       (1, "admin"),
       (2, "ministerio");

INSERT INTO user(id_user, loginuser, username, firstname, lastname,  password, uri_image_profile, user_description, id_type_user, school_id, birthday_day)
VALUES (1, 'johndoe', 'johndoe', 'John', 'Doe', "123456", 'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/userProfile.png', 'Teacher at XYZ High School', 1, 1, '1997-11-04'),
       (2, 'janedoe2', 'janedoe2', 'Jane2', 'Doe1', "123456",'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/profile1.jpg', 'Student at XYZ High School', 0, 1, '1997-11-04'),
       (3, 'rabbit', 'rabbit', 'rabbit', 'rabbit', "123456",'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/profile5.jpg', 'Estudiante, apasionado por la lectura.', 0, 1, '1997-11-04'),
       (4, 'rabbit', 'janedoe4', 'Jane4', 'Doe3', "123456",'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/profile3.jpg', 'Student at XYZ High School', 2, 1, '1997-11-04'),
       (5, 'janedoe5', 'janedoe5', 'Jane5', 'Doe4', "123456",'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/profile4.jpg', 'Student at XYZ High School', 0, 1, '1997-11-04'),
       (6, 'janedoe6', 'janedoe6', 'Jane6', 'Doe5', "123456",'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/profile1.jpg', 'Student at XYZ High School', 0, 1, '1997-11-04'),
       (7, 'janedoe7', 'janedoe7', 'Jane7', 'Doe6', "123456",'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/profile2.jpg', 'Student at XYZ High School', 0, 1, '1997-11-04'),
       (8, 'janedoe8', 'janedoe8', 'Jane8', 'Doe7', "123456",'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/profile3.jpg', 'Student at XYZ High School', 0, 1, '1997-11-04'),
       (9, 'janedoe9', 'janedoe9', 'Jane9', 'Doe8', "123456",'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/profile4.jpg', 'Student at XYZ High School', 0, 1, '1997-11-04'),
       (10, 'janedoe10', 'janedoe10', 'Jane10', 'Doe9', "123456",'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/profile1.jpg', 'Student at XYZ High School', 0, 2, '1997-11-04'),
       (11, 'janedoe11', 'janedoe11', 'Jane11', 'Doe10', "123456",'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/profile2.jpg', 'Student at XYZ High School', 0, 2, '1997-11-04'),
       (12, 'rabbit', 'rabbit', 'rabbit', 'rabbit', "123456",'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/profile5.jpg', 'Estudiante, apasionado por la lectura.', 0, 1, '1997-11-04'),
       (13, 'janedoe13', 'janedoe13', 'Jane11', 'Doe10', "123456",'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/profile3.jpg', 'Ministerio', 0, 1, '1997-11-04');

INSERT INTO report_general(id_report, id_user, report_description)
VALUES (1, 1, "Reporto ese perfil porque no me parece un contenido adecuado para nosotros"),
       (2, 1, "El cristian me insulto en la clase!"),
       (3, 1, "El bastian me dijo que mi comentario era tonto!");

INSERT INTO report_post(id_report_post, report_description)
VALUES (1, "Publicación no adecuada!"),
       (2, "Publicación es ofensiva!"),
       (3, "Publicación tiene imagenes vulgares!");

INSERT INTO post(id_post, id_author_post, post_description, post_category, fecha_post, num_likes, thumbnail_video, video_url)
VALUES (1, 1, 'First day of classes', 'imagen', '2023-09-01', 0, NULL, NULL),
       (2, 2, 'I love this history class!', 'imagen', '2023-09-15', 0, NULL, NULL),
       (3, 3, 'I love this history class!', 'imagen', '2023-09-14', 0, NULL, NULL),
       (4, 4, 'I love this history class!', 'imagen', '2023-09-13', 0, NULL, NULL),
       (5, 5, 'I love this history class!', 'imagen', '2023-09-12', 0, NULL, NULL),
       (6, 6, 'I love this history class!', 'imagen', '2023-09-11', 0, NULL, NULL),
       (7, 7, 'I love this history class!', 'imagen', '2023-09-10', 0, NULL, NULL),
       (8, 8, 'I love this history class!', 'imagen', '2023-09-09', 0, NULL, NULL),
       (9, 9, 'I love this history class!', 'imagen', '2023-09-08', 0, NULL, NULL),
       (10, 10, 'I love this history class!', 'imagen', '2023-09-07', 0, NULL, NULL),
       (11, 1, 'I love this history class!', 'imagen', '2023-09-07', 0, NULL, NULL),
       (12, 1, 'I love this history class!', 'imagen', '2023-09-07', 0, NULL, NULL),
       (13, 1, 'I love this history class!', 'imagen', '2023-09-07', 0, NULL, NULL),
       (14, 1, 'Big Buck Bunny!', 'video', '2023-09-01', 0, "https://woo-demo.hoststreamsell.com/wp-content/uploads/2021/04/600c26a209974338f4a579055e7ef61f_big.jpg", "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4");

       
INSERT INTO like_post(id_post, id_user, is_liked)
VALUES (1, 2, false),
       (2, 1, false);
    
INSERT INTO comments(id_comment, comment, id_user_response) 
VALUES (1, 'Have a great first day!', 0),
       (2, 'Glad you are enjoying it!', 0);

INSERT INTO actions(id_user, id_post, id_comment, id_report_post, fecha_action)
VALUES (1, 1, 1, NULL, "2023-09-15"),
       (1, 1, 2, NULL, "2023-09-15"),
       (1, 1, NULL, 1,  "2023-09-15"),
       (1, 1, NULL, 2, "2023-09-15"),
       (1, 1, NULL, 3, "2023-09-15");
       
INSERT INTO image(id_post, position, url_image)
VALUES (1, 1, 'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/post1.jpg'),
       (1, 1, 'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/post2.jpg'),   
       (1, 1, 'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/post3.jpg'),
       (2, 1, 'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/post2.jpg'),
       (3, 1, 'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/post3.jpg'),
       (4, 1, 'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/post4.jpg'),
       (5, 1,  'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/post5.jpg'),
       (6, 1, 'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/post6.jpg'),
       (7, 1, 'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/post7.jpg'),
       (8, 1, 'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/post8.jpg'),
       (9, 1, 'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/post9.jpg'),
       (10, 1, 'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/post10.jpg'),
       (11, 1, 'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/post6.jpg'),
       (12, 1, 'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/post8.jpg'),
       (13, 1, 'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/post9.jpg');
       

INSERT INTO follow(id_user, id_followed, follow)
VALUES (1, 2, TRUE);

INSERT INTO bitacora(id_bitacora, name_bitacora, id_author_bitacora)
VALUES (1, "Conociendo la aplicación", 1);

INSERT INTO question(id_question, question)
VALUES (1, "¿Con que nivel de energía te iras de la clase?"),
       (2, "¿Que nota le pondrias a esta actividad"),
       (3, "¿Como te vas de la clase?, menciona una emoción de la imagen."),
       (4, "¿Que aprendiste de la clase hoy?. Comparte una reflexión personal");

INSERT INTO answer(answer, id_question, id_user, id_bitacora)
VALUES ("7", 1, 1, 1),
       ("7", 2, 1, 1),
       ("Contento", 3, 1, 1),
       ("Aprendi a como utilizar la aplicación.", 4, 1, 1),
       ("5", 1, 2, 1),
       ("5", 2, 2, 1),
       ("Triste", 3, 2, 1),
       ("La aplicación me da miedo!.", 4, 2, 1);

INSERT INTO survey(id_survey, id_author_survey, question_survey)
VALUES (1, 1, "¿Donde vamos a comer?"),
       (2, 1, "¿Donde iremos?");

INSERT INTO alternative(id_alternative, alternative, id_survey)
VALUES (1, "Mall", 1),
       (2, "Casino", 1),
       (3, "Corral", 2),
       (4, "Lago ranco", 2),
       (5, "Osorno", 2);



