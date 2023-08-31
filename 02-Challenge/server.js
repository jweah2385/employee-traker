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
      console.log(data);

      const { value } = data;
      const ourValue = JSON.stringify(value);
      console.log(ourValue);
     
       if ( ourValue.replace(/"/g,'') === 'View All Departments') {
        // Retrieve and display departments
       
        db.query('SELECT id, name FROM department', (error, results) => {
          if (error) throw error;

          console.log('Departments:');
          results.forEach((department) => {
            console.log(`ID: ${department.id}, Name: ${department.name}`);
          });
        });
      } else if (ourValue.replace(/"/g,'') == 'View All Roles') {
        db.query()
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
