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
            { name: 'View all Departments', value: 1},
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
        .then((data) => {
            if ( data.choices === 1 ) {
                viewAllDepartments();
            } else if (data.choices === 2 ) {
                viewAllRoles();
            } else if (data.choices === 3) {
                viewAllEmployees();
            } else if (data.choices === 4) {
                addDepartment();
            } else if (data.choices === 5) {
                addRole();
            } else if (data.choices === 6) {
                addEmployee();
            } else if (data.choices === 7) {
                updateEmployeeRole();
            } else if (data.choices === 8) {
                db.end();
            }
        })
    };

//Choose "View all Departments"
const viewAllDepartments = () => {
    const sql = 'SELECT * From department';
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        options();
    });
};
//When you choose to view roles
const viewAllRoles = () => {
    const sql = `SELECT roles.title, roles.id, roles.salary, department.name AS 'department' FROM roles 
    JOIN department ON roles.department_id = department.id`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        options();
    });    
};
//Chooses to view all employees
const viewAllEmployees = () => {
    const sql = `SELECT 
    concat(employees.first_name, " ", employees.last_name) AS Name,
    concat(manager.first_name, " ", manager.last_name) AS 'Manager Name',
    roles.title AS 'Job Title',
    roles.salary AS 'Salary',
    department.name AS 'Department'
    FROM employees 
    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN department ON roles.department_id = department.id
    LEFT JOIN employees manager ON employees.manager_id = manager.id`;
    
    db.query(Sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        options();
    })
 //Adding a department
  const addDepartment = () => {
    inquirer.prompt ([
        {
            type: 'input',
            name: 'addDepartment name',
            validate: newDepartment => {
                if (newDepartment) {
                    return true;
                } else {
                    console.log('You must enter a new department name!');
                    return false;
                }
            }
        }
    ])
    .then(data => {
        const sql = `INSERT INTO department (name) VALUES (?)`
        db.query(sql, data.addDepartment, (err, rows) => {
            if (err) throw err;
            console.table(rows);
            options();
        })
    })  
};
  }
  //Add a role
  const addRole = () => {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, res) => {
      if (err) throw err;
      let departments = res.map((department) => department.name);

      inquirer
        .prompt([
          {
            type: "input",
            name: "newRole",
            message: "Enter the new job title:",
            validate: (newRole) => {
              if (newRole) {
                return true;
              } else {
                console.log("You must enter a new job title!");
                return false;
              }
            },
          },
          {
            type: "input",
            name: "salary",
            message: "Enter the salary for this role:",
            validate: (salary) => {
              if (salary) {
                return true;
              } else {
                console.log("You must enter a salary for this new role");
              }
            },
          },
          {
            type: "list",
            name: "departmentIds",
            message: "Select a deparment for your new role:",
            choices: departments,
          },
        ])
        .then((data) => {
            let deparmentId;
            let newRole = [data.newRole, data.salary];
            for (let i = 0; i < res.length; i++) {
                if (data.departmentIds = res[i].name) {
                    deparmentId = res[i].id;
                }
            }
    
            const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,${deparmentId})`;
            db.query(sql, newRole, (err, rows) => {
              if (err) throw err;
              console.table(rows);
              options();
            });
          });
      });
    };
//Add and employee
addEmployee = () => {
    const sql = `SELECT * FROM roles`;
    db.query(sql, (err, res) => {
      if (err) throw err;
      let roleTitles = res.map((role) => role.title);
  
      inquirer
        .prompt([
          {
            type: "input",
            name: "first_name",
            message: "Enter the new employee's first name:",
            validate: (firstName) => {
              if (firstName) {
                return true;
              } else {
                console.log("You must enter a first name!");
                return false;
              }
            },
          },
          {
            type: "input",
            name: "last_name",
            message: "Enter the new employee's last name:",
            validate: (lastName) => {
              if (lastName) {
                return true;
              } else {
                console.log("You must enter a last name!");
              }
            },
          },
          {
            type: "list",
            name: "roleList",
            message: "Select a role for your new employee:",
            choices: roleTitles,
          },
          {
            type: "list",
            name: "managerList",
            message: "Select a manager's id for your new employee, (1 for Chef) (10 for General Manager):",
            choices: [1, 10],
          }, 
        ])
        .then((data) => {
          let roleId;
          for (let i = 0; i < res.length; i++) {
              if (data.roleList === res[i].title) {
                  roleId = res[i].id;
              }
          }
          const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) 
          VALUES ("${data.first_name}","${data.last_name}",${roleId},${data.managerList})`;
          db.query(sql, (err, rows) => {
            if (err) throw err;
            console.table(rows);
            options();
          });
        });
    });
};
//Choose to update an employee role
updateEmployeeRole = () => {
    const roleSql = `SELECT * FROM roles`;
    db.query(roleSql, (err, roleRes) => {
      if (err) throw err;
      let roleResults = roleRes.map((roles) => roles.title);
      const empSql = `SELECT * FROM employees`;
      db.query(empSql, (err, res) => {
        if (err) throw err;
        let employeeResults = res.map((employee) => `${employee.first_name} ${employee.last_name}`);
        inquirer.prompt([
            {
                type: "list",
                name: "employees",
                message: 'Choose which employee to update',
                choices: employeeResults,
            },
            {
                type: "list",
            name: "roles",
            message: 'Choose a new role for the employee',
            choices: roleResults,
          },
        ])
        .then((data) => {
          let roleId;
          let employeeId;
          for(let i = 0; i < roleRes.length; i++) {
            if (data.roles === roleRes[i].title) {
              roleId = roleRes[i].id;
            }
          }

          for (let i = 0; i < res.length; i++){
            if (data.employees === `${res[i].first_name} ${res[i].last_name}`) {
              employeeId = res[i].id;
            }
          }
          const sql = `UPDATE employees SET role_id = ${roleId} WHERE id = ${employeeId}`;
          db.query(sql, (err, res) => {
            if (err) throw err;
            options();
          })
        });
    });
  });
};
// Delete departments, roles, and employees.
options();