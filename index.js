const db = require('./db/connection')
const inquirer = require('inquirer');
const consoleTable = require('console.table');

//Starting the application
//Presented with questions" View all departments, View all roles, View all employees, Add a department, Add a role, Add an employee, Update an employee role, Quit
const data = () => {
    inquirer.prompt([
        {
        type: 'list',
        name: 'choices',
        message: 'What would you like to do?',
        choices: [
            {name: 'View all Departments', value: 1},
            { name: 'View all Roles', value: 2 },
            { name: 'View all employees', value: 3 },
            { name: 'Add a department', value: 4 }, 
            { name: 'Add a Role', value: 5 },
            { name: 'Add an employee', value: 6 },
            { name: 'Update an employee role', value: 7 },
            { name: 'Quit' , value: 8},   
        ]
        }
    
    ])
}
