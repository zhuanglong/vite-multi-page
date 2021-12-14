const { program } = require('commander') // 命令行
const inquirer = require('inquirer') // 终端交互工具
const chalk = require('chalk') // 样式化描述文字
const shell = require('shelljs') // shell 执行

// 执行 shell 语句
function handleShell(params) {
  const { projectName, runType, mode } = params
  // console.log({ projectName, runType, mode })

  // 设置 node 环境变量
  process.env.PROJECT_NAME = projectName

  // 区分构建方式
  let shellCommond = ''
  if (runType === 'build') {
    shellCommond += 'vite build'
  } else {
    shellCommond += 'vite'
  }
  shellCommond += ` --mode ${mode}`

  console.log(chalk.green('你选择构建的项目: ', chalk.blue.underline.bold(projectName)))
  console.log(chalk.cyanBright('------------------------- 开始构建 -------------------------'))
  console.log(chalk.cyan.underline(`shell: ${shellCommond}`))

  shell.exec(shellCommond)
}

// 生成交互选项
function openInquirer(runType, options) {
  const projectNames = ['projectA', 'projectB']

  const questions = {
    type: 'list',
    message: '请选择需要构建的项目: ',
    name: 'projectName',
    // filter(answer) {
    //   return answer.toLowerCase()
    // },
    validate(answer) {
      if (!answer) {
        return '请选择项目'
      }
      return true
    },
    choices: projectNames,
  }

  inquirer.prompt(questions).then((answers) => {
    handleShell({
      projectName: answers.projectName,
      runType,
      mode: options.mode,
    })
  })
}

// 执行命令行
program
  .command('run <runType>')
  .option('--mode <envName>', '[string] .env 环境变量') // https://cn.vitejs.dev/guide/env-and-mode.html#env-variables-and-modes
  .option('--project <projectName>', '[string] 项目名')
  .action((runType, options) => {
    openInquirer(runType, options)
  })

program.parse(process.argv)