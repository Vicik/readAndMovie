// pages/article/article.js
const app = getApp();
Page({
  data: {
    id: '',
    article: [],
    collected: ''
  },
  collection() {
    var postsCollected = wx.getStorageSync("postsCollected");
    var postCollected = postsCollected[this.data.id];
    postCollected = !postCollected;
    postsCollected[this.data.id] = postCollected;
    wx.setStorageSync("postsCollected", postsCollected)
    this.setData({
      collected: postCollected,
    })
    wx.showToast({
      title: this.data.collected ? '收藏成功' : '取消收藏'
    })
  },
  share() {
    var itemList = [
      "分享给微信好友",
      "分享到朋友圈",
      "分享到QQ"
    ]
    wx.showActionSheet({
      itemList: itemList,
      itemColor: '#405f80',
      success: function(res) {
        wx.showModal({
          title: '用户分享' + itemList[res.tapIndex],
          content: '用户是否取消分享'
        })
      }
    })
  },
  onLoad: function (options) {
    this.data.id = options.id
    var that = this;
    wx.request({
      url: 'https://easy-mock.com/mock/5cd256df4b170036725e06c6/read/read',
      success: function (res) {
        that.setData({
          article: res.data.data[that.data.id]
        })
      }
    })
    var postsCollected = wx.getStorageSync("postsCollected");
    if (postsCollected) {
      var collected = postsCollected[this.data.id];
      if (!collected){
        collected = false;
      }
      this.setData({
        collected: collected
      })
    } else {
      var postsCollected = {};
      postsCollected[this.data.id] = false;
      wx.setStorageSync("postsCollected", postsCollected);
    }
  }
})