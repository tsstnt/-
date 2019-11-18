// pages/detail/detail.js
let datas = require('../../datas/list-data.js');
console.log(datas, typeof datas);

let appDatas = getApp();
console.log(appDatas.data, typeof appDatas)

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailObj: {}, // 详情页默认数据
    isCollected: false, // 标识页面是否收藏
    isMusicPlay: false, // 标识音乐是否播放
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let index = options.index * 1
    // 更新detailObj的状态数据
    this.setData({
      detailObj: datas.list_data[index],
      index
    })
    // 根据本地存储的状态修改data中isCollected的状态值
    wx.getStorage({
      key: 'isCollected',
      success: (res) => {
        console.log(res.data);
        this.setData({
          isCollected: res.data[index]
        })
      }
    })

    // 监听页面音乐停止
    wx.onBackgroundAudioStop(() => {
      console.log('我监听到音乐停止了。。。')
      // 修改全局的播放状态
      appDatas.data.isPlay = false;
    })

    // 预处理音乐播放的状态
    if (appDatas.data.isPlay && appDatas.data.pageIndex === index) {
      // 当前页面音乐在播放
      this.setData({
        isMusicPlay: true
      })
    }


  },
  /* 处理收藏的功能函数 */
  handleCollection() {
    let isCollected = !this.data.isCollected
    this.setData({
      isCollected
    })
    let title = isCollected ? '收藏成功' : '取消收藏'
    // 显示消息提示框
    wx.showToast({
      title
    })

    // 将收藏的状态数据缓存到本地,有问题：多个页面共享一个收藏状态
    // wx.setStorageSync('isCollected', isCollected)
    // 思考: 存储的数据包含 ： 页面的标识及是否收藏的状态
    // 答案： {index: isCollected} -- {0: true,  4: false}
    let index = this.data.index;
    // let obj = {} 会导致本地存储的状态永远只有一条
    console.log(wx.getStorageSync('isCollected'), 'xxxxxxxxxxxxxx')
    let obj = wx.getStorageSync('isCollected') || {}
    obj[index] = isCollected
    wx.setStorageSync('isCollected', obj)

  },


  /* 处理音乐播放 */
  handleMusicPlay() {

    let isMusicPlay = !this.data.isMusicPlay
    this.setData({
      isMusicPlay
    })

    // 实现音乐播放
    let index = this.data.index;
    if (isMusicPlay) {
      // 音乐播放
      let { dataUrl, title, coverImgUrl } = this.data.detailObj.music;
      wx.playBackgroundAudio({
        dataUrl,
        title,
        coverImgUrl
      })

      // 修改全局的播放状态
      appDatas.data.isPlay = true;
      appDatas.data.pageIndex = index;
    } else {
      // 停止音乐播放
      wx.stopBackgroundAudio()
      // 修改全局的播放状态
      appDatas.data.isPlay = false;

      // appDatas.data.pageIndex = index;
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    console.log(res)
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/pages/detail/detail',
      imageUrl: '/images/index/cart.jpg'
    }

  }
})