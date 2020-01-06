
# `不知道名字的商城`管理端会员api文档

+ # 管理端

    + ## 获取会员列表
        ### url: "/api/v1/admin/members"
        ### methods: GET
        ### header: Authorization
        ### query
        - 获取会员列表
        ```javascript
        {
            "page": Number, // 页码, 不带默认1
            "limit": Number, // 每页数量, 不带默认10
        }
        ```
        - 搜索会员
        ```javascript
        {
            "type": Number, required, // 1,用户手机号，2，用户名
            "keyword": Number, required, // 关键字
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
                "data": [{
                    "phone": String, // 用户手机号
                    "nickname": String, // 昵称
                    "avatar": String, // 头像，默认为一个链接，待定
                    "sign": String, // 签名
                    "sex": Number, // 0女1男2保密
                    "birthday": String, // 1990-01-01
                    "status": Number, // 状态，
                    // 0：禁用，1，正常
                    "createTime": String, // 时间
                    "updateTime": String, // 更新时间
                    "totalScore": Number, // 总积分, 默认0
                    "score": Number, // 可用积分，默认0
                }...]
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

    + ## 获取会员详情
        ### url: "/api/v1/admin/members/:id"
        ### methods: GET
        ### header: Authorization
        ### id:
        ```javascript
        id: phone手机号
        ```
        ### return: code 200
        ```javascript
        {
            "data": {
                "phone": String, // 用户手机号
                "nickname": String, // 昵称
                "avatar": String, // 头像，默认为一个链接，待定
                "sign": String, // 签名
                "sex": Number, // 0女1男2保密
                "birthday": String, // 1990-01-01
                "status": Number, // 状态，
                // 0：禁用，1，正常
                "createTime": String, // 时间
                "updateTime": String, // 更新时间
                "totalScore": Number, // 总积分, 默认0
                "score": Number, // 可用积分，默认0
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

    + ## 修改会员状态
        ### url: "/api/v1/admin/members"
        ### methods: PUT
        ### header: Authorization (超级管理员)
        ### params:
        ```javascript
        {
            "phone": Number, required， // 用户手机号
            "status": Number, required， // 状态
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
