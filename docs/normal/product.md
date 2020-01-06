
# `不知道名字的商城`用户端商品api文档

+ # 用户端

    + ## 获取商品列表/搜索商品,共用api
        ### url: "/api/v1/products"
        ### methods: GET
        ### query
        - 获取列表
        ```javascript
        {
            "tag": Number, required, // 约定好分类,不带默认所有
            "page": Number, required, // 页码，不带默认1
            "limit": Number, required, // 数量，不带默认10
        }
        ```
        - 搜索商品
        ```javascript
        {
            "keyword": String, required, // 关键字
            "page": Number, required, // 页码，不带默认1
            "limit": Number, required, // 数量，不带默认10
        }
        ```
        - 热销商品
        ```javascript
        {
            "count": Number, required, // 关键字
            "limit": Number, required, // 数量，不带默认10
        }
        ```
        ### return: code 200
        ```javascript
        {
            "data": {
                "limit": Number, // 每页数量，默认10
                "page": Number, // 当前页，默认1
                "pages": Number, // 总页码
                "sum": Number, // 商品总数
                "products": [{
                    "id": Number, // 商品id,
                    "title": String, // 标题,
                    "cover": [ String... ], // 封面图, 图片链接数组
                    "desc": String, // 商品简单描述,
                    "detail": [ String... ], // 详情, 图片链接数组
                    "price": Number, // 单价,
                    "score": Number, // 评分, 待定，后端在何时更新评分状态
                    "count": Number, // 销售数量,
                    "tag": Number, // 分类,
                    "stock": Number, // 库存,前后端均需判定,
                    "discount": Number, // 折扣,
                }...]
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

    + ## 获取商品详情
        ### url: "/api/v1/products/:id"
        ### methods: GET
        ### id:
            商品id
            
        ### return: code 200
        ```javascript
        {
            "data": {
                "id": Number, // 商品id,
                "title": String, // 标题,
                "cover": [ String... ], // 封面图, // 图片链接数组,
                "desc": String, // 商品简单描述,
                "detail": [ String... ], // 详情, // 图片链接数组,
                "price": Number, // 单价,
                "score": Number, // 评分, // 待定，后端在何时更新评分状态
                "appraisalCount": Number, // 商品评价总数
                "appraisal": [{
                    "content": String, // 最新评价内容,
                    "createTime": String, // 最新评价时间, // 2019-08-01 12:31:12
                    "score": Number, // 最新评价的评分,
                    "nickname": String, // 最新评价的用户昵称
                    "avatar": String, // 最新评价用户头像
                }...],,
                "count": Number, // 销售数量,
                "tag": Number, // 分类,
                "stock": Number, // 库存,
                "discount": Number, // 折扣
                "isRecommend": Boolean, //推荐，true推荐
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

    + ## 填写商品评价
        ### url: "/api/v1/products/appraisals"
        ### methods: POST
        ### header: Authorization
        ### params
        ```javascript
        {
            "score": Number, // 评分
            "content": String, // 评价内容
            "pid": Number, // 商品id
            "oid": Number // 订单id
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
    + ## 获取商品全部评价api
        ### url: "/api/v1/products/:id/appraisals"
        ### methods: GET
        ### id:
            商品id
        ### query
        - 获取列表
        ```javascript
        {
            "page": Number, required, // 页码，不带默认1
            "limit": Number, required, // 数量，不带默认10
        }
        ```
        ### return: code 200
        ```javascript
        {
            "data": [{
                "id": Number, // 评价id,
                "content": String, // 评价内容,
                "createTime": String, // 评价时间, // 2019-08-01 12:31:12
                "score": Number, // 评价分,
                "nickname": String, //用户昵称
                "avatar": String, // 用户头像
            }...],
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

