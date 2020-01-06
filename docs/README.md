# `不知道名字的商城`api文档

+ # 全局
    + ## 接口返回结构
        ### json:
            {
                "data": object/array, 数据
                "status": number, 状态码，200成功/401无权限/403认证过期/500服务端错误/400客户端错误,
                "success": boolean, false失败/true成功,
                "message": string, 操作信息提示
            }
    + ## 时间格式
        - 2019-09-01 12:12:12
        - 2019-09-01

    + ## 图片文件
        - url，七牛sdk

    + ## Auth
        - token: header添加Authorization字段，前端记得添加前缀'bearer '
    + ## Boolean
        - 所有双状态布尔值均采用isTrue类似的驼峰规范
    + ## restful API
        - get,获取资源
        - post,提交资源
        - put,更新资源
        - delete,删除资源
        - 获取列表和搜索合并采用同一个api地址，query参数不一样区分过滤
  
+ # 用户端

    + ## 统一接口前缀：/api/v1/

        - [会员接口文档](normal/user.md)
        - [购物车接口文档](normal/shoppingcart.md)
        - [商品接口文档](normal/product.md)
        - [活动接口文档](normal/operation.md)
        - [订单接口文档](normal/order.md)
        - [基础设施接口文档](normal/others.md)


+ # 管理端

    + ## 统一接口前缀：/api/v1/admin

        - [管理员接口文档](admin/user.md)
        - [会员接口文档](admin/member.md)
        - [商品接口文档](admin/product.md)
        - [活动接口文档](admin/operation.md)
        - [订单管理接口文档](admin/order.md)

+ # 数据表

    + ## ORM

        - [用户表](table/user.md)
        - [管理员表](table/admin.md)
        - [商品表](table/product.md)
        - [订单表](table/order.md)
        - [购物车表](table/shoppingcart.md)
        - [地址表](table/address.md)
        - [活动页面表](table/operation.md)

+ # 项目README文档

    - [客户端](../client/README.md)
    - [管理端](../manage/README.md)
    - [服务端](../apiserver/README.md)