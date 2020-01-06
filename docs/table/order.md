# 订单表

+ # 设计表
    + ## 订单表
        ```javascript
        {
            "id": Number, //订单id,自增id
            "createTime": String, // 时间
            "updateTime": String, // 更新时间
            "oid": String, // 订单号，13位时间+手机号后两位+3位随机数=18位
            "uid": Number, // user id
            "name": String, // 订单收货人的名字
            "phone": String, // 订单收货人手机号
            "address": String, // 收货人地址
            "status": Number, // 状态，
            // 0：删除，1，待付款，2，已付款/待发货，3，已发货/未收货。4.已收货，
            // 5，失效订单，包括退货啊之类的结单，6，用户端删除了，不想显示
            "discount": Number, // 0:不折扣 0-100.等级折扣
            "sale": Number, // 总销售额, 默认0
            "score": Number, // 总兑换积分，默认0
        }
        ```