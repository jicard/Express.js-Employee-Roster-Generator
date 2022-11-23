const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const DIST_DIR = path.resolve(__dirname, 'dist');
const distPath = path.join(DIST_DIR, 'team.html');

const render = require('./src/page-template.js');

const employees = [];
const idArray = [];

// Inform user of usage
console.log('\nWelcome to the team generator!\nUse `npm run reset` to reset the dist/ folder\n');

async function appMenu() {
    console.log('Please build your team 👥');
    await inquirer
      .prompt([
        {
          type: 'input',
          name: 'managerName',
          message: "What is the team manager's name?",
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Please enter at least one character.';
          },
        },
        {
          type: 'input',
          name: 'managerId',
          message: "What is the team manager's id?",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              return true;
            }
            return 'Please enter a positive number greater than zero.';
          },
        },
        {
          type: 'input',
          name: 'managerEmail',
          message: "What is the team manager's email?",
          validate: (answer) => {
            const pass = answer.match(/\S+@\S+\.\S+/);
            if (pass) {
              return true;
            }
            return 'Please enter a valid email address.';
          },
        },
        {
          type: 'input',
          name: 'managerOfficeNumber',
          message: "What is the team manager's office number?",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              return true;
            }
            return 'Please enter a positive number greater than zero.';
          },
        },
      ])
      .then((answers) => {
        const manager = new Manager(
          answers.managerName,
          answers.managerId,
          answers.managerEmail,
          answers.managerOfficeNumber
        );
        employees.push(manager);
        idArray.push(answers.managerId);
        createTeam();
      });
  }
  function createTeam() {
    inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "Would you like to add another member to your squad?",
        choices: ["Intern", "Engineer", "None"],
      },
    ])
    .then((answer) => {
      if (answer.role === "Engineer") {
        return inquirer
          .prompt([
            {
              type: "input",
              name: "name",
              message: `What is the engineer's name?`,
            },
            {
              type: "input",
              name: "id",
              message: `What is the engineer's ID number?`,
            },
            {
              type: "input",
              name: "email",
              message: `What is the engineer's email?`,
            },
            {
              type: "input",
              name: "github",
              message: `What is the engineer's Github?`,
            },
          ])
          .then((responses) => {
            let engineer = new Engineer(
              responses.name,
              responses.id,
              responses.email,
              responses.github
            );
            employees.push(engineer);
            createTeam();
          });
      }
      if (answer.role === "Intern") {
        return inquirer
          .prompt([
            {
              type: "input",
              name: "name",
              message: `What is the intern's name?`,
            },
            {
              type: "input",
              name: "id",
              message: "What is the intern's id?",
            },
            {
              type: "input",
              name: "email",
              message: `What is the intern's email?`,
            },
            {
              type: "input",
              name: "school",
              message: `Where did/does the intern go to school?`,
            },
          ])
          .then((responses) => {
            let intern = new Intern(
              responses.name,
              responses.id,
              responses.email,
              responses.school
            );
            employees.push(intern);
            createTeam();
          });
      }
      if (answer.role === "None") {
        console.log(employees);
        if (!fs.existsSync(DIST_DIR)) {
          fs.mkdirSync(DIST_DIR);
        }
        fs.writeFileSync(distPath, render(employees), 'utf-8');
      }
    });
  };

appMenu();