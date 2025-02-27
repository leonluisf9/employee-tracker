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
        // case 'ADD_EMPLOYEE':
        //     addEmployee();
        //     break;
        // case 'UPDATE_EMPLOYEE_ROLE':
        //     updateEmployee();
        //     break;
        case 'VIEW_ALL_ROLES':
            viewRoles();
            break;
        // case 'ADD_ROLE':
        //     addRole();
        //     break;
        case 'VIEW_ALL_DEPARTMENTS':
            viewDepartments();
            break;
        case 'ADD_DEPARTMENT':
            addDepartment();
            break;
        // default:
        //     quit();
    }
});
};

function viewAllEmployee() {
    pool.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id', (err: Error, result: QueryResult) => {
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

    // function init() {
    //     inquirer
    //      .prompt([
    //  {

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