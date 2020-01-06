
# `不知道名字的商城`管理端商品api文档

+ # 管理端

    + ## 获取活动列表
        ### url: "/api/v1/admin/activity"
        ### methods: GET
        ### header: Authorization
        ### return: code 200
        ```javascript
        {
            "data": [
              {
                "id": Number, //活动id,自增id
                "catime": String, // 时间
                "uptime": String, // 更新时间
                "time": String, // 活动时间，'2019-08-01T12:12:12 2019-08-04T12:12:12'
                "title": String, // 标题,默认空
                "cover": [ String... ], // 封面图, ，默认空
                "desc": String, // 活动简单描述, 默认空
                "detail": [ String... ], // 详情图片，默认空
                "isShelf": Boolean, // 上下架,
                "status": Number // 0：删除，默认1
              }
              ...
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
        ### url: "/api/v1/admin/activity/:id"
        ### methods: GET
        ### header: Authorization
        ### id:
            活动id
            
        ### return: code 200
        ```javascript
        {
            "data": {
                "id": Number, //活动id,自增id
                "createTime": String, // 时间
                "updateTime": String, // 更新时间
                "time": String, // 活动时间，'2019-08-01T12:12:12 2019-08-04T12:12:12'
                "title": String, // 标题,默认空
                "cover": String, // 封面图图片，默认空
                "desc": String, // 活动简单描述, 默认空
                "detail":  String, // 详情图片默认空
                "products": [{
                    "id": Number, // 商品id
                    "price": Number, // 单价
                    "desc": Number, // 实际总价
                    "cover": [ String... ], // 封面图
                    "discount": Number, // 折扣,100选择积分兑换的，0选择等级折扣，0-100活动折扣
                }], // 商品信息
                "isShelf": Boolean, // 上下架,
                "status": Number // 0：删除，默认1
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

    + ## 添加活动
        ### url: "/api/v1/admin/activity"
        ### methods: POST
        ### header: Authorization
        ### id:
        ```javascript 
        {
            "title": String, // 标题,默认空
            "cover": , // 封面图片默认空
            "desc": String, // 活动简单描述, 默认空
            "detail": String, // 详情图片链，默认空
            "products": String, // 商品ID (，拼接)
            "isShelf": Boolean, // 上下架,
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
            "status": 500/400
        }
        ```

    + ## 编辑活动
        ### url: "/api/v1/admin/activityInfo/:id"
        ### methods: PUT
        ### header: Authorization
        ### id:
        ```javascript 
        {
            "id": Number, //活动id,自增id
            "title": String, // 标题,默认空
            "cover": [ String... ], // 封面图, 图片链接数组，默认空
            "desc": String, // 活动简单描述, 默认空
            "detail": [ String... ], // 详情,图片链接数组，默认空
            "products": String, // 商品ID (，拼接)
            "isShelf": Boolean, // 上下架,
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
            "status": 500/400
        }
        ```

    + ## 删除活动
        ### url: "/api/v1/admin/activity/:id"
        ### methods: DELETE
        ### header: Authorization
        ### id:
            活动id
            
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
            "status": 500/400
        }
        ```


