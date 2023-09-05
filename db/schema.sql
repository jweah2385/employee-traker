DROP DATABASE IF EXISTS business_db;
CREATE DATABASE business_db;

USE business_db;








CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department (id)
);


CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL
  -- role_id INT NOT NULL,
  -- manager_id INT
  -- FOREIGN KEY (role_id) REFERENCES role (id),
  -- FOREIGN KEY (manager_id) REFERENCES employees (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT
  -- FOREIGN KEY (role_id) REFERENCES role (id),
  -- FOREIGN KEY (manager_id) REFERENCES employees (id)
);


-- CREATE TABLE department (
--   id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
--   name VARCHAR(30) NOT NULL
-- );