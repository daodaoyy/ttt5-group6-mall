# 收货地址表

+ # 设计表
    + ## 管理员表
        ```javascript
        {
            "id": Number, // 地址id,
            "uid": Number, // 用户id
            "createTime": String, // 时间
            "updateTime": String, // 更新时间
            "name": String, // 收货人姓名,
            "phone": String, // 手机号,
            "address": String, // 收货地址
            "isDefault": Boolean, // 默认地址,mysql转为0/1
            "status": Number, // 状态，0,删除,1正常
        }
        ```