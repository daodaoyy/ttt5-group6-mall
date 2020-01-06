# 短信码表

+ # 设计表
    + ## 短信码表
        ```javascript
        {
            "id": Number, // 地址id,
            "uid": Number, // 用户id
            "createTime": String, // 时间
            "updateTime": String, // 更新时间
            "phone": String, // 手机号,
            "vcode": String, // code
            "status": Number, // 状态，0,删除,1正常
        }
        ```