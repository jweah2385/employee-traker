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

            // for (const row of results) {
            //   const columns = ["Title", "ID", "Department", "Salary"];
            //   console.log('title        id          name          salary')
            //   console.log(`${row.title},   ${row.id},   ${row.name}, ${row.salary}`)
            // }

            const data = [];

            for (const row of results) {
              const columns = ['Title', 'ID', 'Department', 'Salary'];

             
                console.log(`
                ${columns[0]}: ${row.title},
                ${columns[1]}: ${row.id},
                ${columns[2]}: ${row.name},
                ${columns[3]}: ${row.salary}
              `)
              
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
      } else if (true) {

      }
      return ourValue;
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
