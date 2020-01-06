
# `不知道名字的商城`用户端商品api文档

+ # 用户端

    + ## 获取活动列表
        ### url: "/api/v1/activities"
        ### methods: GET
        ### return: code 200
        ```javascript
        {
            "data": [
              {
                "id": Number, //活动id,自增id
                "time": String, // 活动时间，'2019-08-01T12:12:12 2019-08-04T12:12:12'
                "title": String, // 标题,默认空
                "cover": String, // 封面图, 图片链接数组，默认空
                "desc": String, // 活动简单描述, 默认空
                "detail": String, // 详情,图片链接数组，默认空
              }
            ]
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

    + ## 获取活动详情
        ### url: "/api/v1/activity/:id"
        ### methods: GET
        ### id:
            活动id
            
        ### return: code 200
        ```javascript
        {
            "data": {
                "id": Number, //活动id,自增id
                "time": String, // 活动时间，'2019-08-01T12:12:12 2019-08-04T12:12:12'
                "title": String, // 标题,默认空
                "cover": String, // 封面图片链接数组，默认空
                "desc": String, // 活动简单描述, 默认空
                "detail": String, // 详情图片，默认空
                "products": [{
                    "id": Number, // 商品id
                    "price": Number, // 单价
                    "desc": Number, // 实际总价
                    "cover": [ String... ], // 封面图
                    "discount": Number, // 折扣,100选择积分兑换的，0选择等级折扣，0-100活动折扣
                }], // 商品信息
            }
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


