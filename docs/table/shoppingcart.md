# 购物车表

+ # 设计表
    + ## 购物车表
        ```javascript
        {
            "id": Number, // 购物车id,自增id
            "phone": String, // 用户手机号，链接用户表
            "createTime": String, // 时间
            "updateTime": String, // 更新时间
            "products": [{
                "id": Number, // 商品id
                "title": String, // 标题,默认空
                "cover": [ String... ], // 封面图, 图片链接数组，默认空
                "desc": String, // 商品简单描述, 默认空
                "price": Number, // 单价,默认0
                "score": Number, // 评分, 待定，后端在何时更新评分状态，默认0
                "price": Number, // 单价
                "sale": Number, // 实际总价
                "count": Number, // 数量
                "discount": Number, // 折扣,100选择积分兑换的，0选择等级折扣，0-100活动折扣
                "score": Number, // 兑换的积分，默认0
            }], // 商品信息
        }
        ```