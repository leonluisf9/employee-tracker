import inquirer from "inquirer";
import { QueryResult } from 'pg';
import { pool, connectToDb } from './connection.js';

await connectToDb();
console.log('----------Employee Tracker----------')

function init() {
       inquirer
        .prompt([
    {
        type: 'list',
        name: 'options',
        message: 'What would you like to do?',
        choices: [
            {
                name:'View All Employees',
                value: 'VIEW_ALL_EMPLOYEE',
            },
            {
                name:'Add Employee',
                value: 'ADD_EMPLOYEE',
            },
            {   name: 'Update Employee Role',
                value: 'UPDATE_EMPLOYEE_ROLE',
            },
            {
                name: 'View All Roles',
                value: 'VIEW_ALL_ROLES',
            },  
            {
                name: 'Add Role',
                value: 'ADD_ROLE',
            },  
            {
                name: 'View All Departments',
                value: 'VIEW_ALL_DEPARTMENTS',
            },   
            {
                name: 'Add Department',
                value: 'ADD_DEPARTMENT',
            }, 
            {
                name: 'Quit',
                value: 'QUIT',
            }, 
        ],
    },
])
.then((answers: any) => {
    let option = answers.options;
    switch (option) {
        case 'VIEW_ALL_EMPLOYEE':
            viewAllEmployee();
            break;
        case 'ADD_EMPLOYEE':
            addEmployee();
            break;
        // case 'UPDATE_EMPLOYEE_ROLE':
        //     updateEmployee();
        //     break;
        case 'VIEW_ALL_ROLES':
            viewRoles();
            break;
        case 'ADD_ROLE':
            addRole();
            break;
        case 'VIEW_ALL_DEPARTMENTS':
            viewDepartments();
            break;
        case 'ADD_DEPARTMENT':
            addDepartment();
            break;
        // default:
        //     quit();
    }});
};

function viewAllEmployee() {
    pool.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id', (err: Error, result: QueryResult) => {
        if (err) {
          console.log(err);
        } else if (result) {
             let employees = result.rows;
             console.log();
             console.table(employees);
             init();
         }
      });
    };    

async function addEmployee() {
        const result = await pool.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id');
        const { rows } = result;
        const roleChoices = rows.map(({id,title})=> 
            ({
                name: title,
                value: id,
            }));
        const managerChoices = rows.map(({id,first_name})=> 
                ({
                    name: first_name,
                    value: id,
                }));
            inquirer
             .prompt(
                [
                    {
                        type: 'input',
                        name: 'firstName',
                        message: 'What is the first name?'
                    },
                    {
                        type: 'input',
                        name: 'lastName',
                        message: 'What is the last name?'
                    },
                    {
                        type: 'list',
                        name: 'roleId',
                        message: 'What role does the employee belong to?',
                        choices: roleChoices
                    },
                    {
                        type: 'list',
                        name: 'managerId',
                        message: 'What manager does the employee belong to?',
                        choices: managerChoices
                    }
                ]
            ).then((answer: any) => {
                pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1,$2,$3,$4)', 
                [answer.firstName, answer.lastName, answer.roleId, answer.managerId],
                (err: Error, result: QueryResult) => {
                    if (err) {
                        console.log(err);
                    } else if (result) {
                        console.log('Employee created successfully');
                        init();
                    }
                });
                });
    };
    


function viewRoles() {
    pool.query('SELECT role.id, role.title, department.name, role.salary FROM role LEFT JOIN department ON role.department_id = department.id', (err: Error, result: QueryResult) => {
        if (err) {
          console.log(err);
        } else if (result) {
            let roles = result.rows;
            console.log();
            console.table(roles);
            init();
        }
       })
    }; 
async function addRole() {
    const result = await pool.query('SELECT id, name FROM department');
    const { rows } = result;
    const departmentChoices = rows.map(({id,name})=> 
    ({
        name: name,
        value: id,
    }));
        inquirer
         .prompt(
            [ 
            {
                type: 'input',
                name: 'titleName',
                message: 'What role title would you like to add?'
            },
            {
                type: 'input',
                name: 'salaryAmount',
                message: 'What salary amount would you like to add?'
            },
            {
                type: 'list',
                name: 'departmentId',
                message: 'What department for the role?',
                choices: departmentChoices
            }
        ]
        ).then((answer: any) => {
            pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [answer.titleName, answer.salaryAmount, answer.departmentId], (err: Error, result: QueryResult) => {
                if (err) {
                  console.log(err);
                } else if (result) {
                    console.log('Role created successfully');
                    init();
                }
            });
        });
};
function viewDepartments() {
    pool.query('SELECT id, name FROM department', (err: Error, result: QueryResult) => {
        if (err) {
          console.log(err);
        } else if (result) {
            let departments = result.rows;
            console.log();
            console.table(departments);
            init();
        }
      });
    };
function addDepartment() {
        inquirer
         .prompt(
            [ 
                {
                    type: 'input',
                    name: 'departmentName',
                    message: 'What department would you like to add?'
                }
            ]
        ).then((answer: any) => {
            pool.query('INSERT INTO department (name) VALUES ($1)', [answer.departmentName], (err: Error, result: QueryResult) => {
                if (err) {
                  console.log(err);
                } else if (result) {
                    console.log('Department created successfully');
                    init();
                }
            });
        });
};
// Function call to intialize app
init();