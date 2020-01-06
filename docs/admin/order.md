# `不知道名字的商城`管理端订单api文档

+ # 管理端

    + ## 获取订单列表
        ### url: "/api/v1/admin/orders"
        ### methods: GET
        ### header: Authorization
        ### query
        ```javascript
        {
            "page": Number, // 页码, 不带默认1
            "limit": Number, // 每页数量, 不带默认10
        }
        ```
        - 搜索订单
        ```javascript
        {
            "type": Number, required, // 1,订单号 2，收货人手机号
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
<<<<<<< HEAD
                "orders": [{
                    "oid": String, // 订单号，13位时间+手机号后两位+3位随机数=18位
                    "time": String, // 订单时间
                    "address": {
                        "id": Number, // 地址id, 
                        "name": String, // 姓名,
                        "phone": String, // 手机号,
                        "address": String, // 地址
                    }, // 收货人信息，链接地址表id
                    "status": Number, // 状态，
                    // 0：删除，1，待付款，2，已付款/待发货，3，已发货/未收货。4.已收货，
                    // 5，失效订单，包括退货啊之类的结单，6，用户端删除了，不想显示
                    "aftersale": Boolean, // true,退款中
                    "sale": Number, // 总销售额, 默认0
                    "score": Number, // 总兑换积分，默认0
                }...]
=======
                "sum": Number, // 总条数
                "orderList":[{
                "createTime": String, // 订单创建时间
                "name": String, // 收货人姓名
                "phone": String, // 收货人电话号码
                "address": String, // 收货人地址
                "oid": String, // 订单号
                "status": 1, // 订单状态
                "discount": 0, // 打折
                "score": 0, // 使用积分
                "sale": 20 // 订单总价
                }]
>>>>>>> d051d966993f1b0d20a0c0e6784df259ea3ec689
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
        ### url: "/api/v1/admin/orders/:id"
        ### methods: GET
        ### header: Authorization
        ### id:
        ```javascript
        订单id
        ```
        ### return: code 200
        ```javascript
        {
<<<<<<< HEAD
            "data": {
                "oid": String, // 订单号，13位时间+手机号后两位+3位随机数=18位
                "createTime": String, // 订单时间
                "address": String // 收货人地址
                "phone": String // 收货人手机号
                "name": String // 收货人姓名
                "products": [{
                    "id": Number, // 商品id
                    "price": Number, // 单价
                    "title": String, // 标题,默认空
                    "cover": [ String... ], // 封面图, 图片链接数组，默认空
                    "desc": String, // 商品简单描述, 默认空
                    "sale": Number, // 实际总价
                    "count": Number, // 数量
                    "discount": Number, // 折扣,100选择积分兑换的，0选择等级折扣，0-100活动折扣
                    "score": Number, // 兑换的积分，默认0
                    "appraisal": Boolean, // 评价状态
                }], // 商品信息
                "status": Number, // 状态，
                // 0：删除，1，待付款，2，已付款/待发货，3，已发货/未收货。4.已收货，
                // 5，失效订单，包括退货啊之类的结单，6，用户端删除了，不想显示
                "aftersale": Boolean, // true,退款中
                "sale": Number, // 总销售额, 默认0
                "score": Number, // 总兑换积分，默认0
            },
=======
        "data": {
            "oid": String, // 订单号
            "createTime": String, // 创建时间
            "status": 3, // 订单状态
            "name": String , // 收货人姓名
            "sale": 20, // 订单总价
            "phone": String, // 收货人手机号
            "score": 0, // 积分
            "address": String, // 收货人地址
            "products": [
            {
                "createTime": String, //购买时间
                "oid": String,
                "pid": Number,
                "title": "test 0001",
                "cover": [...], // 商品图
                "desc": String, // 商品描述
                "price": Number, // 商品单价 
                "count": Number, // 购买数量
                "status": Number, // 订单中商品状态   0退款成功 1正常 2退款中
                "sale": Number, // 总价
            }
         ]
         },
>>>>>>> d051d966993f1b0d20a0c0e6784df259ea3ec689
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
        ### url: "/api/v1/admin/orders/:id"
        ### methods: PUT
        ### header: Authorization
        ### params:
        ```javascript
        {
            "id": Number, required， // order id
            "status": Number, required， // 状态
            "isRefund": Boolean, required // 是否售后
        }
        ```
        ### return: code 200
        ```javascript
        {
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
    + ## 订单中单个商品退货
        ### url: "/api/v1/admin/orders/:id"
        ### methods: PUT
        ### header: Authorization
        ### params:
        ```javascript
        {
            "id": Number, required， // order id
            "status": Number, required， // 状态
            "pid": Number, required， // 商品ID
        }
        ```
        ### return: code 200
        ```javascript
        {
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