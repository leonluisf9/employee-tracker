INSERT INTO department (name)
VALUES  ('Sales'),
        ('Accounting'),
        ('IS'),
        ('Customer Service'),
        ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES  ('Sales Person', 80000, 1),
        ('Sales Lead', 95000, 1),
        ('Account Manager', 100000, 2),
        ('Accountant', 80000, 2),
        ('Software Engineer', 90000, 3),
        ('IS Manager', 105000, 3),
        ('Team Lead', 90000, 4),
        ('Order Entry Clerk', 75000, 4),
        ('Legal Team Lead', 110000, 5),
        ('Lawyer', 90000, 5);

INSERT INTO employee (role_id, first_name, last_name, manager_id)
VALUES  (1, 'John', 'Reed', 2),
        (2, 'Martha', 'Rogers', 3),
        (3, 'James', 'Stokes', NULL),
        (4, 'Philip', 'Silver', NULL),
        (5, 'Michael', 'Johnson', 5),
        (6, 'Luther', 'McMillan', 5),
        (7, 'Harold', 'Banks', 5),
        (8, 'Ana', 'Grant', 4),
        (9, 'Linda', 'Baker', 4),
        (10, 'Sara', 'Smith', 4);      