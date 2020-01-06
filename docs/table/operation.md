# 活动表

+ # 设计表
    + ## 活动表
        ```javascript
        {
            "id": Number, //活动id,自增id
            "createTime": String, // 时间
            "updateTime": String, // 更新时间
            "time": String, // 活动时间，'2019-08-01 12:12:12-2019-08-04 12:12:12'
            "title": String, // 标题,默认空
            "cover": String, // 封面图, 图片链接数组，默认空
            "desc": String, // 活动简单描述, 默认空
            "detail": String, // 详情,图片链接数组，默认空
            "products": String, // 商品信息
            "isShelf": Boolean, // 上下架,
            "status": Number // 0：删除，默认1
        }
        ```