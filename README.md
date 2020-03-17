# template

> 后台模版工程

## 开发环境配置

- Node & npm

 > node >= 10.12.0 & npm >= 3.0.0

- 格式化提交，采用 `commitizen` 来做标准化的commit message
  - 安装 commitizen
  > npm install -g commitizen
  - 使用 angular 的 commit 规范
  > commitizen init cz-conventional-changelog --save-dev --save-exact 
  - 重新安装 husky 与 lint-staged
  > npm i -D husky lint-staged
  - 使用 `git cz` 代替 `git commit`

  > ⚠️： 实际项目中， husky 很可能由于各种原因，导致不能很好的工作；这多半是由于 .git/hooks/pre-commit 与期待目标不匹配所致，您可以手动修改，也可以采取如下办法 (备注：如果您的 husky 版本在 0.14 及以上)：

  ```shell
    rm -rf .git/hooks/*
    node node_modules/husky/lib/installer/bin install
  ```

- 提交规则
  - feat：新功能（feature）
  - fix：修补bug
  - docs：文档（documentation）
  - style： 格式（不影响代码运行的变动）
  - refactor：重构（即不是新增功能，也不是修改bug的代码变动）
  - test：增加测试
  - chore：构建过程或辅助工具的变动

## 自动化格式代码

> 开发环境下可以实现保存自动格式化

- 自动化格式 `js` 代码

> npm run lint

- 自动化格式化 `style` 代码

> npm run stylelint

## 开发或者打包

- 启动开发

> npm run dev

- 启动打包

> npm run build

- 分析代码组成

> npm run analyzer

- 本地预览打包后代码, 配合 `nginx` 实现反向代理

> npm run server
