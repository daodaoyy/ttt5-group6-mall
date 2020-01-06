
# `不知道名字的商城`用户端购物车api文档

+ # 用户端

    + ## 提交购物车
        ### url: "/api/v1/shoppingcarts"
        ### methods: POST
        ### header: Authorization
        ### params:
        ```javascript
        {
            "products": [{
                "id": Number, // 商品id
                "count": Number, // 数量
                "discount": Number, // 折扣,100选择积分兑换的，0选择等级折扣，0-100活动折扣
                "score": Number, // 兑换的积分，默认0
            }], // 商品信息
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

    + ## 获取购物车
        ### url: "/api/v1/shoppingcarts"
        ### methods: GET
        ### header: Authorization
        ### query
        ```javascript
        {
            "page": Number, // 页码, 不带默认1
            "limit": Number, // 每页数量, 不带默认10
        }
        ```
            
        ### return: code 200
        ```javascript
        {
            "data": {
                "id": Number, // 购物车id,自增id
                "limit": Number, // 每页数量，默认10
                "page": Number, // 当前页，默认1
                "pages": Number, // 总页码
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