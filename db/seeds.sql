INSERT INTO department (department_name)
VALUES ("Human Resources")
("Finance"),
("Logistics"),
("Coding"),
("Engineering"),

INSERT INTO roles (title, salary, department_id)
VALUES ("Assistant, 70000, 1")
("Receptionist", 35000, 1),
("HR Manager", 120000, 1),
("Technical Supervisor", 80000, 3),
("Shipping Supervisor", 75000, 4);
("Software Developer", 90000, 5),
("Budget Specialist", 55000, 2),

Insert INTO employee (first_name, last_name, roles_id, manager_id)
Values ("Madison", "Mulligan", 1, NULL),
("Jane", "Doe", 2, 1"),
("Bob", "Williams", 1, 2"),