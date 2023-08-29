const express = require('express');
const inquirer = require('inquirer');
inquirer.registerPrompt('loop', require('inquirer-loop')(inquirer));

let questions = () => {
  const inputs = inquirer
    .prompt({
      type: 'loop',
      name: 'items',
      message: 'Would like another request?',
      questions: [
        {
          type: 'list',
          name: 'value',
          loop: 'true',
          choices: [
            'View All Employees',
            'Add Employee',
            'View All Roles',
            'Add Roles',
            'View All Departments',
            'Add Department',
          ],
        },
      ],
    })
    .then((data) => {
      const { value } = data;
      const ourValue = JSON.stringify(value);
      console.log(`${ourValue}`);
    });
  //    inquirer
  //     .prompt([
  //       {
  //         type: 'input',
  //         name: 'textAns'
  //       },
  //       {
  //         type: 'list',
  //         name: 'shapeAns',
  //         message: 'Choose the shape of the logo.',
  //         loop : ['circle', 'triangle', 'square'],
  //       },
  //     ])
  //     .then((data) => {
  //     })
  //     .then((data) => {

  //     });
};
questions();
