// pages/user/user.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    movie:{
      title: "观影分析",
      mark: "标记10部影片",
      analyse: "开启观影分析"
    },
    read:{
      title: "读书分析",
      mark: "标记10本书",
      analyse: "开启读书分析"
    },
    music:{
      title: "音乐分析",
      mark: "标记10张唱片",
      analyse: "开启音乐分析"
    },
    userInfo: {
      nickName: '',
      avatar: ''
    },
    actionText: '登录查看'
  },
  login(e) {
    this.setData({
      userInfo: {
        nickName: e.detail.userInfo.nickName,
        avatar: e.detail.userInfo.avatarUrl
      },
      actionText: '全部'
    })
    wx.setStorage({
      key: 'userInfo',
      data: {
        userInfo: {
          avatar: e.detail.userInfo.avatarUrl,
          nickName: e.detail.userInfo.nickName
        }
      }
    })
  },
  out() {
    wx.removeStorageSync("userInfo");
    this.setData({
      userInfo: {
        nickName: '',
        avatar: ''
      },
      actionText: '登录查看'
    })
  },
  check() {
    wx.getStorage({
      key: 'userInfo',
      success: (res) => {
        if(res.data) {
          this.setData({
            actionText: '全部'
          })
        }else{
          this.setData({
            actionText: '登录查看'
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'userInfo',
      success: (res) => {
        this.setData({
          userInfo: {
            avatar: res.data.userInfo.avatar,
            nickName: res.data.userInfo.nickName
          },
          actionText: '全部'
        })
      }
    })
  }
})