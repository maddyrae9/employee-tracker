DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS roles;

CREATE TABLE department(
    id INT AUTO_INCREMENT,
    department_name VARCHAR(25) NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE roles(
    id INT AUTO_INCREMENT,
    title VARCHAR(25),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY (id)
    PRIMARY KEY (department_id) REFERENCES department(id)
);
CREATE TABLE employee(
    id INT AUTO_INCREMENT,
    first_name VARCHAR(25),
    last_name VARCHAR(25),
    roles_id INT,
    PRIMARY KEY(id),
    FOREIGN KEY(roles_id) REFERENCES roles(id)
);