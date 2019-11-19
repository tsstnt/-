# 小程序

## 1. 小程序特点

1. 小程序没有DOM，一切基于组件化
2. 体积小，压缩包的体积要求不能大于2M
3. 小程序适配方案: iphone6下： 1rpx = 1物理像素 = 0.5px
4. 小程序中推荐使用flex布局

## 2.  小程序语法

 1. 数据绑定

     	1. 单项数据流： Model ---> View
     	2. 使用数据: 同Vue不一样，小程序没有实现数据代理，使用的时候this.data.key = value
     	3. 更新状态数据： this.setData({key: value}), 同步修改

 2. 事件绑定

     	1. 冒泡事件: bind + 事件名 = 事件的回调
     	2. 非冒泡事件: catch + 事件名 = 事件的回调

 3. 路由跳转

     	1. wx.navigateTo()
     	2. wx.redirectTo()

 4. 列表渲染

     	1. 遍历数据: wx:for='遍历的目标数据'
     	2. 默认的个体item， 默认的下标index
     	3. 提供一个wx:key，对应的应该是唯一值

 5. 如何向事件对象传参

     	1. 语法: data-key = value
     	2. 获取： event.target.dataset|| event.currentTarget.dataset
     	3. event.target指向的触发事件的对象不一样是绑定事件的元素，比如： 冒泡
     	4. event.currentTarget指向的对象一定是绑定事件的元素

 6. 如何实现路由传参

     	1. 语法: query形式 ---> url?key=value
     	2. 获取: 目标页面的onLoad生命周期函数中的实参options

 7. 实现分享功能

     1. 语法: <button  open-type=share>

     2. 自定义分享内容: 

        ```
        // onShareAppMessage需要通过绑定在实例对象身上 
            this.onShareAppMessage = function (res) {
              console.log(res)
              if (res.from === 'button') {
                // 来自页面内转发按钮
                console.log(res.target)
              }
              return {//  分享的回调return一个对象: title(分享内容的标题), path(分享页面的path)
                title: '自定义转发标题',
                path: '/pages/detail/detail',
                imageUrl: '/images/index/cart.jpg'
              }
            }
        ```

        

 8. 事件委托

     	1. 是什么
          	1. 将子元素的事件委托(绑定)给父元素
     	2. 原理
          	1. 事件冒泡
     	3. 作用
          	1. 减少绑定的次数，提高性能，只需要绑定一次
          	2. 后添加的子元素也可以享用之前绑定的同类型事件
     	4. 触发的事件的元素是谁
          	1. 子元素
     	5. 如何找到触发事件的元素
          	1. event.target = 子元素