INSERT INTO department (id, name)
VALUES (1,"Sales"),
        (2,"Engineering"),
        (3,"Finance"),
        (4,"Legal");


        
INSERT INTO role (id, title, salary, department_id)
VALUES 
    (1, "Sales", 130040.0, 1),
    (2, "Marketing", 140000.0, 2),
    (3, "Software", 120000.0, 3),
    (4, "Accountant", 160000.0, 4);
 


INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES 
        (1,"John", "Doe", 1,1),
        (2, "Mike", "Chan", 2,2),
        (3, "Sam", "Loe", 3,3),
        (4, "Kiven", "Foe", 4,4);
        
        
