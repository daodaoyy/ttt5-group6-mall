# 目录架构

```

client/
  |
  ├── app/                        # egg
  │   ├── public/                 # build出口文件
  │   └── ...
  |
  ├── bin/                        # 部署脚本
  │   └── startup.sh
  |
  ├── config/                     # 项目配置文件
  │   ├── config.default.js
  │   └── ...
  |
  ├── client/                     # 前端代码
  |   |
  │   ├── public                  # html模板
  |   |                
  │   └── src/                    # 代码目录文件
  │     |
  │     ├── api/                  # 统一接口请求
  │     |
  │     ├── common/               # 公共函数
  │     |
  │     |—— images/               # 静态资源
  │     |
  │     ├── shop/                 # 前端代码
  │     |    |
  │     │    ├── components       # 公共组件
  │     |    |
  │     │    ├── pages            # 页面代码
  │     |    |
  │     │    ├── reducer          # redux
  │     |    |           
  │     │    ├── entry.jsx        # 页面加载
  │     |    |             
  │     │    └── index.jsx        # 入口文件
  │     │
  │     |—— style/                # 公共样式
  │     |
  │     └── utils/                # 公共方法
  |
  │ 
  ├── .babelrc                    # babel 配置
  |
  ├── .editorconfig               # editor 配置
  |
  ├── .eslintconfig               # eslint 配置
  |
  ├── .gitignore                  # git 配置
  |
  |—— package-lock.json           # 安装包版本来源
  |
  ├── package.json                # 构建脚本和依赖关系
  |
  ├── webpack.config.js           # webpack 配置
  |
  └── yarn.lock                    # yarn 配置
```

## Build Setup

```bash
# install dependencies
npm install

# build for production with minification
npm run build

# npx egg-bin dev | npx webpack --mode development --watch
npm run dev

# npx webpack --mode development --watch
dev:client

# npx egg-bin dev
dev:server