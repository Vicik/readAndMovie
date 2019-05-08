//read.js
Page({
  data: {
    imgUrls: [
      '/imgs/wx.png',
      '/imgs/vr.png',
      '/imgs/iqiyi.png'
    ],
    articleList: []
  },
  moveToDetail(e) {
    var postId = e.currentTarget.dataset.postid;
    wx.navigateTo({
      url: '../article/article?id=' + postId 
    })
  },
  onSwiper(e) {
    var postId = e.target.dataset.postid;
    wx.navigateTo({
      url: '../article/article?id=' + postId
    })
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'https://easy-mock.com/mock/5cd256df4b170036725e06c6/read/read',
      success:function(res){
        that.setData({
          articleList: res.data.data
        })
      }
    })
  }
})
