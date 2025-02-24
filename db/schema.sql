DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

\c employees_db;

CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(30) UNIQUE NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INTEGER NOT NULL,
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);

CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(30) UNIQUE NOT NULL,
  last_name VARCHAR(30) UNIQUE NOT NULL,
  role_id INTEGER NOT NULL,
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
  manager_id INTEGER,
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL
);