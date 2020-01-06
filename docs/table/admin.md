# 管理员表
+ # 设计表
    + ## 管理员表
        ```javascript
        {
            "id": Number, // 自增id
            "username": String, // 唯一
            "password": String,
            "createTime": String, // 时间
            "updateTime": String, // 更新时间
            "role": Number, // 权限问题, 0,普通管理，1，超级管理
            "status": Number, // 状态，0,删除,1正常，2禁用
        }
        ```