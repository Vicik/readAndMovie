// pages/more-movie/more-movie.js
var util  = require('../../utils/util.js')
var app = getApp();
Page({
  data: {
    movies:[],
    isEmpty: true,
    requestUrl: "",
    totalCount: 0
  },
  updateData(res) {
    var temps = [];
    var movies = res.subjects;
    for (var i = 0; i < movies.length; i++) {
      var movieItem = movies[i];
      var tem = {
        movieId: movieItem.id,
        title: movieItem.title,
        img: movieItem.images.medium,
        stars: util.starCount(movieItem.rating.stars),
        rating: movieItem.rating.average
      }
      temps.push(tem);
    }
    var totalMovies = [];
    if (!this.data.isEmpty) {
      totalMovies = this.data.movies.concat(temps)
    } else {
      totalMovies = temps;
      this.data.isEmpty = false;
    }
    this.setData({
      movies: totalMovies
    })
    this.setData({
      totalCount: this.data.totalCount + 20
    })
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },
  scroll(e) {
    // var nextUrl = this.data.requestUrl;
    var nextUrl = this.data.requestUrl + '?start=' + this.data.totalCount + '&count=20';
    util.http(nextUrl, this.updateData);
    wx.showNavigationBarLoading();
  },
  onPullDownRefresh: function (e) {
    var refreshUrl = this.data.requestUrl + "?start=0&count=20";
    this.data.movies = {};
    this.setData({
      isEmpty: true
    });
    this.setData({
      totalCount: 0
    });
    util.http(refreshUrl, this.updateData);
    wx.showNavigationBarLoading();
  },
  movieDetail(e) {
    var movieId = e.currentTarget.dataset.movieid
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + movieId
    })
  },
  onLoad: function (options) {
    wx.stopPullDownRefresh();
    var category = options.category;
    wx.setNavigationBarTitle({
      title: category
    })
    var dataUrl = '';
    switch (category) {
      case "正在热映":
        // dataUrl = "https://easy-mock.com/mock/5cb5e0ea4117351b6a67b2ac/demo/in_theaters";
        dataUrl = app.globalData.g_dataUrl + '/v2/movie/in_theaters';
        break;
      case "即将上映":
        // dataUrl = "https://easy-mock.com/mock/5cb5e0ea4117351b6a67b2ac/demo/coming_soon";
        dataUrl = app.globalData.g_dataUrl + '/v2/movie/coming_soon';
        break;
      case "豆瓣Top250":
        // dataUrl = "https://easy-mock.com/mock/5cb5e0ea4117351b6a67b2ac/demo/top250";
        dataUrl = app.globalData.g_dataUrl + '/v2/movie/top250';
        break;
    }
    this.setData({
      requestUrl: dataUrl
    });
    util.http(dataUrl, this.updateData)
  }
})