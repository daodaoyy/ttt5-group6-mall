# `绿叶杂货铺` ttt5-group6-mall


+ # 项目需求

    - 包含面向顾客的前台（移动端或网站或小程序），面向管理的WEB后台，保证前后台通讯的API

        * 面向顾客的前台应用 react.js + react-router-dom + redux

        * 面向管理的后台应用 vue.js + vue-router + vuex

        * 前后台通讯的 API 服务器应用 Node.js + egg.js + MySQL

    - 完成 会员 订单 商品 积分 四个后台管理模块；完成 注册 登录 下单 查看账户信息 四个前台基本功能

    - 不同子应用分开部署

+ # 规范

    + ## 分支规范

        - master - 上线分支
        - develop - 开发分支，所有新开发代码合并进这个分支，所有新开发分支从这里分立出去
        - feature/'功能名'-'姓名缩写，eg:gm'-0801 - 主要是开发时候
        - bugfix/'bug名'-'姓名缩写，eg:gm'-0801 - 主要是联调时候
        - commit - Add 新功能/Update 更新功能/Fix 修改bug
    
    + ## 代码规范
        - eslint
    
+ # 目录结构
        ```
        ttt5-group6-mall/
          |
          ├──client/                  * 用户端
          │
          ├──manage/                  * 管理端
          │
          ├──apiserver/               * api接口服务
          │
          ├──docs                     * 文档目录
          │
          └──README.md                * readme

        ```

+ # 结语
- 本人负责：客户端登录注册、个人中心
- 成员：
    * 文梦月      
    * 王智宇
    * 李二闯
    * 纪道艳
    * 封虎虎
    * 陶壹丰
    * 高敏
    * 董显林



---
