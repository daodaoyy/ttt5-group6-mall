
# `不知道名字的商城`基础设施api文档

+ # 基础设施

    + ## 七牛token
        ### url: "/api/v1/basic/qiniu"
        ### methods: POST
        ### header: Authorization
        ### params:
        ```javascript
        {
          "bucket": String, // 直接填'vadxq'
        }
        ```
        ### return: code 200
        ```javascript
        {
            "data": {
                "token": String, // 七牛token
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

    + ## 触发短信验证码
        ### url: "/api/v1/sms/code"
        ### methods: POST
        ### header: Authorization
        ### params:
        ```javascript
        {
          "phone": String, // 手机号,默认只能触发自己绑定手机号，如果此参数存在，表示更换新的绑定手机号
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
    + ## 验证短信验证码
        ### url: "/api/v1/sms/code"
        ### methods: PUT
        ### header: Authorization
        ### params:
        ```javascript
        {
          "phone": String, // 手机号,默认只能触发自己绑定手机号，如果此参数存在，表示更换新的绑定手机号
          "code": Number, // 验证码
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
