
# `不知道名字的商城`管理端商品api文档


+ # 管理端

    + ## 添加商品
        ### url: "/api/v1/admin/products"
        ### methods: POST
        ### header: Authorization
        ### params
        ```javascript
        {
            "title": String, // 标题,默认空
            "cover": [ String... ], // 封面图, 图片链接数组，默认空
            "desc": String, // 商品简单描述, 默认空
            "detail": [ String... ], // 详情,图片链接数组，默认空
            "price": Number, // 单价,默认0
            "tag": Number, // 分类,默认1
            "stock": Number, // 库存,默认0
            "discount": Number, // 折扣
            "isRecommend": Boolean, //推荐，true推荐，默认false
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
    + ## 编辑商品
        ### url: "/api/v1/admin/products/:id"
        ### methods: PUT
        ### header: Authorization
        ### id: 
            商品id
        ### params
        ```javascript
        {
            "title": String, // 标题,默认空
            "cover": [ String... ], // 封面图, 图片链接数组，默认空
            "desc": String, // 商品简单描述, 默认空
            "detail": [ String... ], // 详情,图片链接数组，默认空
            "price": Number, // 单价,默认0
            "tag": Number, // 分类,默认1
            "stock": Number, // 库存,默认0
            "discount": Number, // 折扣
            "isRecommend": Boolean, //推荐，true推荐，默认false
            "isShelf": Boolean, // 上下架，true，上架，默认false
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

    + ## 获取商品列表
        ### url: "/api/v1/admin/products"
        ### methods: GET
        ### header: Authorization
        ### query
        - 获取商品列表
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
            "title": String, // 商品名称
            "page": Number, required, // 页码，不带默认1
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
                "products": [{
                    "id": Number, //商品id,自增id
                    "title": String, // 标题,默认空
                    "cover": [ String... ], // 封面图, 图片链接数组，默认空
                    "desc": String, // 商品简单描述, 默认空
                    "detail": [ String... ], // 详情,图片链接数组，默认空
                    "price": Number, // 单价,默认0
                    "score": Number, // 评分, 待定，后端在何时更新评分状态，默认0
                    "count": Number, // 销售数量,默认0
                    "tag": Number, // 分类,默认1
                    "stock": Number, // 库存,默认0
                    "isShelf": Boolean, // 上下架，true，上架，默认false
                    "discount": Number, // 折扣
                    "isRecommend": Boolean, //推荐，true推荐，默认false
                    "sale": Number, // 总销售额, 默认0
                    "status": Number // 0：删除，默认1
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
        ### url: "/api/v1/admin/products/:id"
        ### methods: GET
        ### header: Authorization
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
                "count": Number, // 销售数量,
                "tag": Number, // 分类,
                "stock": Number, // 库存,默认0
                "isShelf": Boolean, // 上下架，true，上架，默认false
                "discount": Number, // 折扣
                "isRecommend": Boolean, //推荐，true推荐，默认false
                "sale": Number, // 总销售额, 默认0
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
    
    + ## 删除商品
        ### url: "/api/v1/admin/products/:id"
        ### methods: DELETE
        ### header: Authorization
        ### id:
            商品id

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
