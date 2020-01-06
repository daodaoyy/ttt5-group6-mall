# 订单商品表

+ # 设计表
    + ## 订单商品表
        ```javascript
        {
            "id": Number, //订单id,自增id
            "createTime": String, // 时间
            "updateTime": String, // 更新时间
            "oid": String, // 订单号，13位时间+手机号后两位+3位随机数=18位
            "pid": Number, // 商品 id
            "title": String, // 商品title
            "cover": String, // 封面图, 图片链接数组，默认空
            "desc": String, // 商品简单描述, 默认空
            "price": Number, // 单价,默认0
            "count": Number, // 销售数量,默认0
            "tag": Number, // 分类,默认1
            "sale": Number, // 折扣后价格，实际价格
            "isAppraisal": Number, // 评价状态,0未评价,1评价
        }
        ```