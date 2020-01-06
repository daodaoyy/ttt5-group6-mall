
# `不知道名字的商城`用户端订单api文档

+ # 用户端

    + ## 提交订单
        ### url: "/api/v1/orders"
        ### methods: POST
        ### header: Authorization
        ### params:
        ```javascript
        {
            "address": String, // 收货人信息，链接地址表id，
            "name": String, // 收货人姓名
            "phone": String, // 收货人手机号
            "score": Number, // 积分
            "discount": Number, // 折扣
            // discount 和score同时为0，表示既不折扣，也不积分
            // score = 0, discount 不为0，表示采用折扣，不采用积分。
            // 0:不折扣,0-100.等级折扣
            "products": [{
              "id": Number, // 商品id
              "count": Number, // 数量
            }],
        }
        ```
        ### return: code 200
        ```javascript
        {
            "data": {
                "oid": String, // 订单号，13位时间+手机号后两位+3位随机数=18位
                "createTime": String, // 时间
                "updateTime": String, // 时间
                "discount": Number,
                "name": String, // 姓名,
                "phone": String, // 手机号,
                "address": String, // 地址
                "products": [{
                    "title": String, // title
                    "cover": [ String... ], // 封面图
                    "desc": String,// 描述
                    "status": 1, // 是否退货
                    "tag": Number， // 分类
                    "pid": Number, // 商品id
                    "price": Number, // 单价
                    "sale": Number, // 实际总价
                    "count": Number, // 数量
                    "discount": Number, // 折扣,100选择积分兑换的，0选择等级折扣，0-100活动折扣
                    "isAppraisal": Boolean, // 评价状态
                }], // 商品信息
                "status": Number, // 状态，
                // 0：删除，1，待付款，2，已付款/待发货，3，已发货/未收货。4.已收货，
                // 5，失效订单，包括退货啊之类的结单，6，用户端删除了，不想显示，7，退款中
                "sale": Number, // 总销售额, 默认0
                "score": Number, // 总兑换积分，默认0
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
            "status": 500/400/401/403
        }
        ```

    + ## 获取订单列表/搜索订单
        ### url: "/api/v1/orders"
        ### methods: GET
        ### header: Authorization
        ### query
        - 获取订单列表
        ```javascript
        {
            "type": Number, // 类型，1，待付款，2，已付款/待发货，3，已发货/未收货。4.已收货，不带或者事0为全部，默认为0
            "page": Number, // 页码, 不带默认1
            "limit": Number, // 每页数量, 不带默认10
        }
        ```
        - 搜索订单(废弃)
        ```javascript
        {
            "type": Number, required, // 1，商品信息，2收货人，3，订单时间范围
            "keyword": Number, required, // 状态
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
                "orders": [{
                   "oid": String, // 订单号，13位时间+手机号后两位+3位随机数=18位
                    "createTime": String, // 时间
                    "updateTime": String, // 时间
                    "discount": Number,
                    "name": String, // 姓名,
                    "phone": String, // 手机号,
                    "address": String, // 地址
                    "products": [{
                        "title": String, // title
                        "cover": [ String... ], // 封面图
                        "desc": String,// 描述
                        "status": 1, // 是否退货
                        "tag": Number， // 分类
                        "pid": Number, // 商品id
                        "price": Number, // 单价
                        "sale": Number, // 实际总价
                        "count": Number, // 数量
                        "discount": Number, // 折扣,100选择积分兑换的，0选择等级折扣，0-100活动折扣
                        "isAppraisal": Boolean, // 评价状态
                    }], // 商品信息
                    "status": Number, // 状态，
                    // 0：删除，1，待付款，2，已付款/待发货，3，已发货/未收货。4.已收货，
                    // 5，失效订单，包括退货啊之类的结单，6，用户端删除了，不想显示
                    "sale": Number, // 总销售额, 默认0
                    "score": Number, // 总兑换积分，默认0
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

    + ## 获取订单详情
        ### url: "/api/v1/orders/:id"
        ### methods: GET
        ### header: Authorization
        ### id:
        ```javascript
        order id
        ```
        ### return: code 200
        ```javascript
        {
            "data": {
                "oid": String, // 订单号，13位时间+手机号后两位+3位随机数=18位
                "createTime": String, // 时间
                "updateTime": String, // 时间
                "discount": Number,
                "name": String, // 姓名,
                "phone": String, // 手机号,
                "address": String, // 地址
                "products": [{
                    "title": String, // title
                    "cover": [ String... ], // 封面图
                    "desc": String,// 描述
                    "status": 1, // 是否退货
                    "tag": Number， // 分类
                    "pid": Number, // 商品id
                    "price": Number, // 单价
                    "sale": Number, // 实际总价
                    "count": Number, // 数量
                    "discount": Number, // 折扣,100选择积分兑换的，0选择等级折扣，0-100活动折扣
                    "isAppraisal": Boolean, // 评价状态
                }], // 商品信息
                "status": Number, // 状态，
                // 0：删除，1，待付款，2，已付款/待发货，3，已发货/未收货。4.已收货，
                // 5，失效订单，包括退货啊之类的结单，6，用户端删除了，不想显示
                "sale": Number, // 总销售额, 默认0
                "score": Number, // 总兑换积分，默认0
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
            "status": 500/400/401/403
        }
        ```

    + ## 修改订单状态
        ### url: "/api/v1/orders"
        ### methods: PUT
        ### header: Authorization
        ### params:
        ```javascript
        {
            "id": Number, required， // order id
            "status": Number, required， // 状态
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

    + ## 删除订单
        ### url: "/api/v1/orders/:id"
        ### methods: DELETE
        ### header: Authorization
        ### id:
        ```javascript
        {
            "id": Number, required， // order id
           
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
    + ## 退货
        ### url: "/api/v1/orders/:id"
        ### methods: PUT
        ### header: Authorization
        ### id:
        ```javascript
        {
            "id": Number, required， // order id
           
        }
        ```
        ### params:
        ```javascript
        {
            "pid": Number, required， // 商品id
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
