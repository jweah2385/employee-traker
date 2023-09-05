const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql');
const db = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3001;
// inquirer.registerPrompt('loop', require('inquirer-loop')(inquirer));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let questions = () => {
  const inputs = inquirer
    .prompt({
      type: 'list',
      name: 'value',
      loop: true,
      choices: [
        'View All Employees',
        'Add Employee',
        'View All Roles',
        'Add Roles',
        'View All Departments',
        'Add Department',
        'Update an Employee Role',
      ],
    })
    .then((data) => {
      const { value } = data;
      const ourValue = JSON.stringify(value);

      if (ourValue.replace(/"/g, '') === 'View All Departments') {
        // Retrieve and display departments

        db.query('SELECT id, name FROM department', (error, results) => {
          if (error) throw error;

          console.log(`id  department `);
          console.log(`--  ----------`);
          results.forEach((department) => {
            console.log(`${department.id}   ${department.name}`);
          });
          questions();
          // process.exit(0);
        });
      } else if (ourValue.replace(/"/g, '') == 'View All Roles') {
        db.query(
          `SELECT 
        role.title,
        role.id,
        department.name,
        role.salary
        FROM role
        JOIN department ON role.department_id = department.id;
        `,
          (error, results) => {
            if (error) throw error;

            const data = [];

            for (const row of results) {
              const columns = ['Title', 'ID', 'Department', 'Salary'];
              console.log(
                `${row.title}, ${row.id}, ${row.name}, ${row.salary}`
              )

            }
            questions();
          }
        );
      } else if (ourValue.replace(/"/g, '') == 'View All Employees') {
        db.query(
          `SELECT
          employee.id,
          employee.first_name,
          employee.last_name,
          role.title,
          manager.id AS manager_id
        FROM employee
        JOIN role ON employee.role_id = role.id
        LEFT JOIN employee AS manager ON employee.manager_id = manager.id;
        `,
          (error, results) => {
            if (error) throw error;
            const row = [];
            for (const row of results) {
              console.log(
                `${row.id}, ${row.first_name}, ${row.last_name}, ${row.title}`
              );
            }
            questions();
          }
        );
      } else if (ourValue.replace(/"/g, '') == 'Add Department') {
        const departmentInput = inquirer
          .prompt({
            type: 'input',
            name: 'addDepartment',
            message: 'Enter the name of the department',
          })
          .then((data) => {
            departmentName = data.addDepartment;
            db.query(
              `INSERT INTO department (name)
         VALUES ('${departmentName}');
         `,
              (error, results) => {}
            );
            questions();
          });
      } else if (ourValue.replace(/"/g, '') == 'Add Roles') {
        const departmentInput = inquirer
          .prompt([
            {
              type: 'input',
              name: 'addRoleName',
              message: 'Enter the role name',
            },
            {
              type: 'input',
              name: 'addSalary',
              message: 'Enter the salary',
            },
            {
              type: 'list',
              name: 'addDepartment',
              message: 'Enter a department name by choising a number',
              choices: ['1 For Sales', '2 Engineering', '3 Finance', '4 Legal'],
            },
          ])
          .then((data) => {
            let role = data.addRoleName;
            let departmentName = data.addDepartment;
            let salary = data.addSalary;
            if (departmentName == '1 For Sales') {
              departmentName = '1';
            } else if (departmentName == '2 Engineering') {
              departmentName = '2';
            } else if (departmentName == '3 Finance') {
              departmentName = '3';
            } else departmentName == '4 Legal';
            // console.log(role, departmentName, salary);
            // console.log(departmentName);
            db.query(
              `INSERT INTO role (title, salary, department_id)
         VALUES ('${role}', '${salary}', '${departmentName}');
         `,
              (error, results) => {}
            );
            questions();
          });
      } else if (ourValue.replace(/"/g, '') == 'Add Employee') {
        const departmentInput = inquirer
          .prompt([
            {
              type: 'input',
              name: 'firstName',
              message: 'Enter the first name',
            },
            {
              type: 'input',
              name: 'lastName',
              message: 'Enter the last name',
            },
            {
              type: 'list',
              name: 'role',
              message: 'Select the role',
              choices: [
                'Sales',
                'Marketing',
                'Sowftware',
                'Accountant',
              ],
            },
            {
              type: 'list',
              name: 'manager_id',
              choices: ['1 ', '2', '3', '4'],
            },
          ])
          .then((data) => {
            let role = Number(data.role);
            let first_name = data.firstName;
            let last_name = data.lastName;
            let manager = Number(data.manager_id);

            if (data.role == 'Sales') {
              role = 1;
            } else if (data.role == 'Marketing') {
              role = 2;
            } else if (data.role == 'Sowftware') {
              role = 3;
            } else if (data.role == 'Accountant') {
              role = 4;
            }

            db.query(
              `INSERT INTO employee (first_name, last_name, role_id, manager_id)
         VALUES ('${first_name}', '${last_name}', ${role}, ${manager})`,
              (error, results) => {}
            );
            questions();
          });
      } else if (ourValue.replace(/"/g, '') == 'Update an Employee Role') {
        let updatedRoleID = 0;
        let updatedEmployeeID = 0;
       
        function getRoles() {
          return new Promise((resolve, reject) => {
            db.query('SELECT id, title FROM role', (error, results) => {
              if (error) {
                reject(error);
              } else {
                const roles = results.map((row) => ({
                  name: row.title,
                  value: row.id,
                }));
                resolve(roles);
              }
            });
          });
        }

        // Function to prompt the user to select a role
        async function selectRole() {
          try {
            const roles = await getRoles();
            const roleChoice = await inquirer.prompt({
              type: 'list',
              name: 'selectedRole',
              message: 'Select the new role for the employee:',
              choices: roles,
            });
            updatedRoleID = roleChoice.selectedRole;
            
        // Function to retrieve a list of employees from the database
        function getEmployees() {
          return new Promise((resolve, reject) => {
            db.query(
              'SELECT id, first_name, last_name FROM employee',
              (error, results) => {
                if (error) {
                  reject(error);
                } else {
                  const employees = results.map((row) => ({
                    name: `${row.first_name} ${row.last_name}`,
                    value: row.id,
                  }));
                  resolve(employees);
                }
              }
            );
          });
        }

        selectEmployee();
        // Function to prompt the user to select an employee
        async function selectEmployee() {
          try {
            const employees = await getEmployees();
            const employeeChoice = await inquirer.prompt({
              type: 'list',
              name: 'selectedEmployee',
              message: 'Select an employee:',
              choices: employees,
            });
            updatedEmployeeID = employeeChoice.selectedEmployee;
            db.query(`UPDATE employee
            SET role_id = ${updatedRoleID}
            WHERE id = ${updatedEmployeeID};
            `, (error, result) => {
              console.error(
                'Error', error
              )
            })
          } catch (error) {
            console.error('Error:', error);
          }
          questions();
        }

            db.query(``, (error, result) => {});
           
          } catch (error) {
            console.error('Error:', error);
          }
        }
 selectRole();
      }
      
    })
    .catch((error) => {
      console.log(error);
    });
};
questions();

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
