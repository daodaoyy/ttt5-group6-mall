# 商品表
+ # 设计表
    + ## 商品表
        ```javascript
        {
            "id": Number, //商品id,自增id
            "createTime": String, // 时间
            "updateTime": String, // 更新时间
            "title": String, // 标题,默认空
            "cover": [ String... ], // 封面图, 图片链接数组，默认空
            "desc": String, // 商品简单描述, 默认空
            "detail": [ String... ], // 详情,图片链接数组，默认空
            "price": Number, // 单价,默认0
            "score": Number, // 评分, 待定，后端在何时更新评分状态，默认0
            "count": Number, // 销售数量,默认0
            "tag": Number, // 分类,默认1
            "stock": Number, // 库存,前后端均需判定,默认0
            "isShelf": Boolean, // 上下架，true，上架，默认false
            "discount":, Number, // 折扣
            /*
             * 0-100，0表示积分等级折扣，100表示不折扣，不采用积分等级折扣，可采用积分兑换
             * 0~100之间，代表着可以采用积分兑换或者是活动折扣，不可以使用等级折扣
             * 折扣是三选一，等级折扣，活动折扣，永远不折扣商品
             * 可以通过这个判定是否是活动商品
             */
             "isRecommend": Boolean, //推荐，true推荐，默认false
             "sale": Number, // 总销售额, 默认0
             "status": Number // 0：删除，默认1

        }
        ```