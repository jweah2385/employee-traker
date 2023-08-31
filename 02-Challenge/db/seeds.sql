
INSERT INTO employee (id, first_name, last_name, manager_id)
VALUES (1, "John", "Doe", 1),
        (2, "Mike", "Chan", 2),
        (3, "Sam", "Loe", 3),
        (4, "Kiven", "Foe", 4),
        (5, "Sarah", "Sing", 5),
        (6, "Malia", "Brown", 6),
        (7, "Sarah", "Lourd", 7),
        (8, "Tom", "Allen", 8);




INSERT INTO role (id, title, salary, department_id)
VALUES 
    (1, "Sales Lead", 130040, 1),
    (2, "Salesperson", 80000, 2),
    (3, "Lead Engineer", 140000, 3),
    (4, "Software Engineer", 120000, 4),
    (5, "Account Manager", 160000, 5),
    (6, "Accountant", 250000, 6),
    (7, "Legal Team Lead", 250043, 7),
    (8, "Lawyer", 190000, 8);



INSERT INTO department (id, name)
VALUES (1,  "Sales" ),
        (2,  "Engineering"),
        (3, "Finance"),
        (4,  "Legal")