const { exec } = require('child_process');

// const SideBarLeft = ['ActionBar', 'ActionList', 'ActionItem'];
// const Main = ['NavBar', 'NavItem', 'MainContainer', 'Main'];
// const List = ['MainList', 'ListItem'];
// const AsideContent = ['AsideContent'];

// const Test = [
//   'Help',
//   'List',
//   'MainContent',
//   'SideContent',
//   'SimpleRoundedButton',
//   'Navigation',
//   'Main',
//   'Test',
// ];

function generate(components) {
  components.forEach((component) => {
    exec(`npx generate-react-cli component ${component}`, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });
  });
}

// generate(AsideContent);
// generate(List);
// generate(Main);
// generate(SideBarLeft);
