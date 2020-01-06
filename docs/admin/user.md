
# `不知道名字的商城`管理端用户api文档

+ # 管理端

     + ## 添加工作人员
        ### url: "/api/v1/admin/users/join"
        ### methods: POST
        ### header: Authorization
        ### params:
        ```javascript
        {
            "username": String, required,
            "password": String, required, // 0-9a-zA-Z.-
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
            "status": 500/400
        }
        ```

    + ## 登录
        ### url: "/api/v1/admin/users/login"
        ### methods: POST
        ### params:
        ```javascript
        {
            "username": String, required, // 账号，唯一
            "password": String, required, // 0-9a-zA-Z.-
        }
        ```
        ### return: code 200
        ```javascript
        {
            "data": {
                "token": String, token, // passport token
                "info": {
                    "username": String,
                    "role": Number, // 昵称,
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
    
    + ## 编辑管理员
        ### url: "/api/v1/admin/users"
        ### methods: PUT
        ### header: Authorization
        ### params:
        - 修改密码
        ```javascript
        {
            "username": String, required, // 账号，唯一
            "password": String, // 0-9a-zA-Z.-
        }
        ```
        - 修改权限
        ```javascript
        {
            "username": String, required, // 账号，唯一
            "role": Number, // 0普通管理/1超级管理
        }
        ```
        - 修改账号状态
        ```javascript
        {
            "username": String, required, // 账号，唯一
            "status": Number, // 状态，0,删除,1正常，2禁用
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
            "status": 500/400/401
        }

    + ## 删除管理员
        ### url: "/api/v1/admin/users/:id"
        ### methods: DELETE
        ### header: Authorization
        ### params:
        ```javascript
        id: String // 也就是username
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
            "status": 500/400/401
        }
        ```

    + ## 获取管理员列表
        ### url: "/api/v1/admin/users"
        ### methods: GET
        ### header: Authorization
        ### query
        ```javascript
        {
            "page": Number, // 页码, 不带默认1
            "limit": Number, // 每页数量, 不带默认10
        }
        ```
        ### return: code 200
        ```javascript
        {
            "data": {
                "limit": Number, // 每页数量，默认10
                "page": Number, // 当前页，默认1
                "pages": Number, // 总页码
                "data": [
                    {
                        "id": Number, // 自增id
                        "username": String, // 唯一
                        "createTime": String, // 时间
                        "updateTime": String, // 更新时间
                        "role": Number, // 权限 0,普通管理，1，超级管理
                        "status": Number, // 状态，0,删除,1正常，2禁用
                    }
                ]
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