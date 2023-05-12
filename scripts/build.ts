const { program } = require('commander'); // 命令行
const inquirer = require('inquirer'); // 终端交互工具
const chalk = require('chalk'); // 样式化描述文字
const shell = require('shelljs'); // shell 执行

// 执行 shell 语句
function handleShell(runType: RunType, options: InquirerAnswers) {
  const { mode, projectName, report } = options;

  // 设置编译时环境变量
  process.env.projectName = projectName;
  process.env.report = report;

  // 区分构建方式
  let shellCommond = '';
  if (runType === 'build') {
    shellCommond += 'vite build';
  } else {
    shellCommond += 'vite';
  }
  // 带上 .env.xx 全局环境变量
  shellCommond += ` --mode ${mode}`;

  console.log(chalk.green('你选择构建的项目: ', chalk.blue.underline.bold(projectName)));
  console.log(chalk.cyanBright('------------------------- 开始构建 -------------------------'));
  console.log(chalk.cyan.underline(`shell: ${shellCommond}`));

  shell.exec(shellCommond);
}

// 生成交互选项
function openInquirer(runType: RunType, options: InquirerAnswers) {
  const projectList: ProjectList = ['projectA', 'projectB'];
  const { mode, projectName, report } = options;

  // 手动输入且存在则直接执行，不需要列表选择
  if (projectName) {
    const errorNames: string[] = [];
    const nameList = projectName.split(',') as ProjectList;

    nameList.forEach((name) => {
      if (!projectList.includes(name)) {
        errorNames.push(name);
      }
    });

    if (runType === 'serve' && nameList.length > 1) {
      console.log(chalk.red(`！开发模式只能指定一个模块`));
      return;
    }

    if (errorNames.length > 0) {
      console.log(chalk.red(`！指定模块'${errorNames.join(',')}'不存在，请手动选择`));
    } else {
      nameList.forEach((name) => {
        handleShell(runType, { projectName: name, mode, report });
      });
      return;
    }
  }

  const questions = {
    type: 'list',
    message: '请选择需要构建的项目: ',
    name: 'projectName',
    // filter(answer) {
    //   return answer.toLowerCase()
    // },
    choices: projectList,
  };

  inquirer.prompt(questions).then((answers: InquirerAnswers) => {
    handleShell(runType, { projectName: answers.projectName, mode, report });
  });
}

// 执行命令行
// <> 必选，[] 可选
program
  .command('run <runType>')
  .option('--mode <envName>', '[string] .env 环境变量') // https://cn.vitejs.dev/guide/env-and-mode.html#env-variables-and-modes
  .option('--projectName <projectName>', '[string] 项目的文件夹名')
  .option('--report [report]', '[string] 可视化分析')
  .action((runType: RunType, options: InquirerAnswers) => {
    openInquirer(runType, options);
  });

program.parse(process.argv);
