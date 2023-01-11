<!--
 * @Author: Mr.Cong Wei
 * @Date: 2023-01-09 17:26:53
 * @LastEditTime: 2023-01-11 15:51:03
  -->

# mini-vue-analyze

## vue core 初始化运行单测步骤

- 通过 jest 文档安装 Babel 和 TypeScript 支持，并创建配置文件（babel.config.js）且复制文档配置代码。

- 修改 jest.config.js 中 transform 为空对象。 // 禁用ts-jest

- 修改 tsconfig.json 中 sourceMap 为 true。 // 启用debugger调试sourceMap
