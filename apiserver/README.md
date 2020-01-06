# `绿色杂货铺`后端

+ ## 目录架构
  ```
  week1/
    |
    ├──app/                     * egg代码主目录
    │   │
    │   │──controller/          * 控制器主要代码
    │   │   │
    │   │   └──v1/              * 当前v1版本api控制器
    │   │ 
    │   │──extend/              * 扩展
    │   │ 
    │   │──middleware/          * egg中间件
    │   │ 
    │   │──model/               * 数据库schema
    │   │ 
    │   │──public/              * egg默认静态文件目录
    │   │ 
    │   │──routes/              * egg分路由文件
    │   │ 
    │   │──service/             * 服务代码主目录
    │   │ 
    │   └──router.js            * egg总路由文件
    │
    ├──bin/
    │   │ 
    │   └──startup.sh           * bash部署脚本
    │
    ├──config/
    │   │ 
    │   │──config.default.js    * egg默认配置文件
    │   │ 
    │   │──config.prod.js       * egg生产环境配置文件
    │   │ 
    │   └──plugin.js            * egg插件配置
    │ 
    ├──database/
    │   │ 
    │   │──migrations/          * sequelize初始化数据库文件夹
    │   │ 
    │   │──seeders/             * seeders初始化数据
    │   │ 
    │   └──config.json          * sequelize插件配置
    │
    ├──test/                    * egg测试目录
    │
    ├──.autod.conf.js           * autod配置文件
    │
    ├──.eslintignore            * Eslint忽略文件配置
    │
    ├──.eslintrc                * Eslint文件配置
    │
    ├──.sequelizerc             * sequelize文件配置
    │
    ├──.gitignore               * Git忽略文件配置
    │
    ├──.travis.yml              * travis文件配置
    │
    ├──appveyor.yml             * appveyor文件配置
    │
    ├──jsconfig.json            * jsconfig配置
    │
    ├──package.json             * 包信息
    │
    ├──package-lock.json        * 包信息
    │
    └──README.md                * readme

  ```

## 使用

本地开发
```
npm run dev
```
本地部署
```
./bin/startup.sh local
```
关闭服务
```
npm run stop
```

## 部署
```bash
bash ./bin/startup.sh prod
```


## 文档

[APIdoc](../docs/README.md)

## ORM
- .sequelizerc, 配置文件

- Migration创建我们的一个 users 表demo,其他表类似
```bash
npx sequelize migration:generate --name=init-users
```
执行完后会在 database/migrations 目录下生成一个 migration 文件(${timestamp}-init-users.js)，我们修改它来处理初始化 users 表

- 执行 migrate 进行数据库变更

```bash
npx sequelize db:migrate
```
- 具体文档[egg-sequelize](https://eggjs.org/zh-cn/tutorials/sequelize.html)
