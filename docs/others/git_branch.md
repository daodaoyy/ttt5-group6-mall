# git branch文档

+ # git ssh key
    + ## 全局唯一ssh key
        ```bash
        ssh-keygen -t rsa -C "dongxianlin@vadxq.com"
        clip < ~/.ssh/id_rsa.pub
        git config --global user.name "vadxq"
        git config --global user.email "dongxianlin@vadxq.com"
        ```
    + ## 多个ssh key存在，一般分为个人和公司：参考[git-ssh-key多账户配置](https://blog.vadxq.com/article/more-git-ssh-key)
      
+ # 切换分支

    + ## 克隆项目后，进入项目即可git checkout 分支名
        ```bash
        git checkout develop
        ```
        大部分情况新起分支只能通过develop切分出去。合并代码只能合进develop分支
        
+ # develop分三端为基础

    - develop分三端为基础apiServer/Client/Manage
    - 再从三端为基础，从本地分立分支出去进行开发
    - 开发完成后，本地合并，切勿推送本地开发分支
    - push前，请记得pull代码至本地，查看是否有冲突
    - 三端分支名参考feature/apiServer


+ # 新建开发/修复分支

    + ## 请确保当前分支在develop分支下

        ```bash
        git checkout -b feature/serverSkeleton-dxl-0912
        ```
    + ## 分支规范

        - master - 上线分支
        - develop - 开发分支，保证最新代码
        - feature/'功能名'-'姓名缩写，eg:gm'-0801 - 主要是开发时候,功能名为大家投票的驼峰名
        - bugfix/'bug名'-'姓名缩写，eg:gm'-0801 - 主要是联调时候
        - commit - Add 新功能/Update 更新功能/Fix 修改bug

+ # 合并分支

    + ## 本地开发分支合并进三端分支，无注释规范

    + ## gitlab合并进develop

        请确保源分支为自己分支，目标分支为develop分支。有冲突请在本地合并。合并分支需写明注释

        注释内容参考：
        ```markdown
        ## Feature/server skeleton

        ============================================

        开发负责人：董显林(xianlin.dong)

        开发起始时间: 20190912-20190912

        更新内容：

            添加api server端骨架

        ============================================
        ```

+ # 提交分支


    确保本地分支对应，如果在要提交的分支下，则使用orgin，不在的话，记得写明.请记得pull代码至本地，查看是否有冲突
    ```bash
    git pull origin feature/apiServer
    git push origin feature/apiServer
    ```