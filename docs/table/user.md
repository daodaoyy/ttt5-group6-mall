# 用户表
+ # 设计表
    + ## 会员表
        ```javascript
        {
            "id": Number, //订单id,自增id
            "createTime": String, // 时间
            "updateTime": String, // 更新时间
            "phone": String, // 用户手机号
            "password": String, // 密码
            "nickname": String, // 昵称
            "avtor": String, // 头像，默认为一个链接，待定
            "sign": String, // 签名
            "sex": Number, // 0女1男2保密
            "birthday": String, // 1990-01-01
            "status": Number, // 状态，
            // 0：删除/禁用，1，正常
            "totalScore": Number, // 总积分, 默认0
            "score": Number, // 可用积分，默认0
            "defaultAddress": Number, // 默认地址id
        }
        ```