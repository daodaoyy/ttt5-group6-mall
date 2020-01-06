
# `不知道名字的商城`用户端会员api文档

+ # 用户端

    + ## 注册
        ### url: "/api/v1/account/register"
        ### methods: POST
        ### params:
        ```javascript
        {
            "phone": String, required, // 手机号, 11位
            "password": String, required, // 密码 0-9a-zA-Z.-
            "code": Number, required, // 验证码, 6位
        }
        ```
        ### return: code 200
        ```javascript
        {
            "data": {
                "token": String, // passport token,注册成功可直接登录
                "info": {
                    "phone": String, // 手机号,
                    "nickname": String, // 昵称,
                    "avatar": String, // 头像,
                }
            },
            "status": 200,
            "success": true,
            "message": '操作成功',
        }
        ```
        ### error:
        ```javascript
        {
            "message": error message,
            "success": false,
            "status": 500/400
        }
        ```

    + ## 登录
        ### url: "/api/v1/account/login"
        ### methods: POST
        ### params:
        ```javascript
        {
            "phone": String, required, // 11位手机号, 
            "password": String, required, // 密码,只能为 0-9a-zA-Z.-
        }
        ```
        ### return: code 200
        ```javascript
        {
            "data": {
                "token": String, // passport token
                "info": {
                    "phone": String, // 手机号,
                    "nickname": String, // 昵称,
                    "avatar": String, // 头像,
                }
            },
            "status": 200,
            "success": true,
            "message": '操作成功',
        }
        ```
        ### error:
        ```javascript
        {
            "message": error message,
            "success": false,
            "status": 500/400/401
        }
        ```
        ### forbidden: code 403

    + ## 忘记密码
        ### url: "/api/v1/account/forget"
        ### methods: POST
        ### params:
        ```javascript
        {
            "phone": String, required, // 手机号, 11位
            "code": Number, required, // 验证码, 6位
            "password": String, required, // 新密码, 0-9a-zA-Z.-
        }
        ```
        ### return: code 200
        ```javascript
        {
            "data": {
                "token": String, // passport token, 修改后可直接登录
                "info": {
                    "phone": String, // 手机号,
                    "nickname": String, // 昵称,
                    "avatar": String, // 头像,
                }
            },
            "status": 200,
            "success": true,
            "message": '操作成功',
        }
        ```
        ### error:
        ```javascript
        {
            "message": error message,
            "success": false,
            "status": 500/400/401
        }
        ```

    + ## 修改密码
        ### url: "/api/v1/users/password"
        ### methods: PUT
        ### header: Authorization
        ### params:
        ```javascript
        {
            "oldPassword": String, required, // 旧密码,  0-9a-zA-Z.-
            "newPassword": String, required, // 新密码, 0-9a-zA-Z.-
        }
        ```
        ### return: code 200
        ```javascript
        {
            "data": null,
            "status": 200,
            "success": true,
            "message": '操作成功',
        }
        ```
        ### error:
        ```javascript
        {
            "message": error message,
            "success": false,
            "status": 500/400/401/403
        }
        ```

    + ## 获取个人信息
        ### url: "/api/v1/users/info"
        ### methods: GET
        ### header: Authorization
        ### return: code 200
        ```javascript
        {
            "data": {
                "nickname": String, // 昵称,
                "avatar": String, // 头像,
                "sign": String, // 签名,
                "sex": Number, // 性别,
                "birthday": String, // 出生日期 
            },
            "status": 200,
            "success": true,
            "message": '操作成功',
        }
        ```
        ### error:
        ```javascript
        {
            "message": error message,
            "success": false,
            "status": 500/400/401/403
        }
        ```

    + ## 修改个人信息
        ### url: "/api/v1/users/info"
        ### methods: PUT
        ### header: Authorization
        ### params:
        ```javascript
        {
            "nickname": String, required, // 昵称
            "avatar": String, required, //头像
            "sign": String, required, // 签名
            "sex": Number, required, // 性别, 0女/1男/2保密
            "birthday": String, required, // 出生日期, 2019-08-01
        }
        ```
        ### return: code 200
        ```javascript
        {
            "data": null,
            "status": 200,
            "success": true,
            "message": '操作成功',
        }
        ```
        ### error: code 500/400/403
        ```javascript
        {
            "message": error message,
            "success": false,
            "status": 500/400/403/401
        }
        ```

    + ## 获取积分等级
        ### url: "/api/v1/users/score"
        ### methods: GET
        ### header: Authorization
        ### return: code 200
        ```javascript
        {
            "data": {
                "score": Number, // 积分,
                "level": Number, // 等级,
            },
            "status": 200,
            "success": true,
            "message": '操作成功',
        }
        ```
        ### error: code 500/400/403
        ```javascript
        {
            "message": error message,
            "success": false,
            "status": 500/400/403/401
        }
        ```


    + ## 新增地址
        ### url: "/api/v1/users/addresses"
        ### methods: POST
        ### header: Authorization
        ### params:
        ```javascript
        {
            "name": String, required, // 姓名
            "phone": String, required, // 手机号
            "address": String, required // 地址
            "isDefault": Boolean // 默认地址
        }
        ```
        ### return: code 200
        ```javascript
        {
            "data": null,
            "status": 200,
            "success": true,
            "message": '操作成功',
        }
        ```
        ### error: code 500/400/403
        ```javascript
        {
            "message": error message,
            "success": false,
            "status": 500/400/403/401
        }
        ```

    + ## 获取地址列表
        ### url: "/api/v1/users/addresses"
        ### methods: GET
        ### header: Authorization
        ### return: code 200
        ```javascript
        {
            "data": [{
                "id": Number, // 地址id, 
                "name": String, // 姓名,
                "phone": String, // 手机号,
                "address": String, // 地址
                "isDefault": Boolean // 默认地址
            },
            ...],
            "status": 200,
            "success": true,
            "message": '操作成功',
        }
        ```
        ### error: code 500/400/403
        ```javascript
        {
            "message": error message,
            "success": false,
            "status": 500/400/403/401
        }
        ```
    
    + ## 修改地址
        ### url: "/api/v1/users/addresses/:id"
        ### methods: PUT
        ### header: Authorization
        ### params:
        ```javascript
        {
            "name": String, // 姓名, 2-4位中文
            "phone": String, // 手机号, 11位
            "address": String, // 地址,
            "isDefault": Boolean // 默认地址
        }
        ```
        ### return: code 200
        ```javascript
        {
            "data": null,
            "status": 200,
            "success": true,
            "message": '操作成功',
        }
        ```
        ### error: code 500/400/403
        ```javascript
        {
            "message": error message,
            "success": false,
            "status": 500/400/403/401
        }
        ```

    + ## 删除地址
        ### url: "/api/v1/users/addresses/:id"
        ### methods: DELETE
        ### header: Authorization
        ### id:
        ```javascript
        id: Number, // 地址id,
         
        ```
        ### return: code 200
        ```javascript
        {
            "data": "删除成功",
            "status": 200,
            "success": true,
            "message": '操作成功',
        }
        ```
        ### error: code 500/400/403
        ```javascript
        {
            "message": error message,
            "success": false,
            "status": 500/400/403/401
        }
        ```

    + ## 更换绑定手机
        ### url: "/api/v1/users/phone"
        ### methods: PUT
        ### header: Authorization
        ### params:
        ```javascript
        {
            "code": Number, required, // 旧手机验证码
            "newPhone": String, required, // 新手机号
            "newCode": Number, required, // 新手机验证码
        }
        ```
        ### return: code 200
        ```javascript
        {
            "data": null,
            "status": 200,
            "success": true,
            "message": '操作成功',
        }
        ```
        ### error: code 500/400/403
        ```javascript
        {
            "message": error message,
            "success": false,
            "status": 500/400/403/401
        }
        ```


