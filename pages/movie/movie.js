// pages/movie/movie.js
var util = require('../../utils/util.js')
var app = getApp();
Page({
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {},
    searchResult: {},
    containerShow: true,
    searchPanelShow: false,
    input_code: ""
  },
  
  more(e){
    var category = e.currentTarget.dataset.category;
    wx.navigateTo({
      url: '../more-movie/more-movie?category=' + category
    })
  },

  getMovieListData(url,settedKey, categoryTitle) {
    var that = this;
    wx.request({
      url: url,
      success:function(res){
        that.updateData(res,settedKey, categoryTitle)
      }
    })
  },

  updateData(res,settedKey, categoryTitle) {
    var temps = [];
    for (var i = 0; i < res.data.subjects.length; i++) {
      var movieItem = res.data.subjects[i];
      var tem = {
        movieId: movieItem.id,
        title: movieItem.title,
        img: movieItem.images.small,
        stars: util.starCount(movieItem.rating.stars),
        rating: movieItem.rating.average
      }
      temps.push(tem);
    }
    var readyData = {};
    readyData[settedKey] = {
      categoryTitle: categoryTitle,
      movies: temps
    }
    this.setData(readyData)
  },

  focus() {
    this.setData({
      containerShow: false,
      searchPanelShow: true
    })
  },

  close() {
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      searchResult:[],
      input_code: ""
    })
  },

  search(e) {
    var text = e.detail.value;
    // var searchUrl = "https://easy-mock.com/mock/5cb5e0ea4117351b6a67b2ac/demo/search";
    var searchUrl = app.globalData.g_dataUrl + "/v2/movie/search?q=" + text;
    this.getMovieListData(searchUrl, 'searchResult','')
  },

  movieDetail(e) {
    var movieId = e.currentTarget.dataset.movieid
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + movieId
    })
  },

  onLoad: function (options) {
    // var inTheatersUrl = "https://easy-mock.com/mock/5cb5e0ea4117351b6a67b2ac/demo/in_theaters";
    // var comingSoonUrl = "https://easy-mock.com/mock/5cb5e0ea4117351b6a67b2ac/demo/coming_soon";
    // var top250Url = "https://easy-mock.com/mock/5cb5e0ea4117351b6a67b2ac/demo/top250";
    var inTheatersUrl = app.globalData.g_dataUrl + '/v2/movie/in_theaters?start=0&count=3';
    var comingSoonUrl = app.globalData.g_dataUrl + '/v2/movie/coming_soon?start=0&count=3';
    var top250Url = app.globalData.g_dataUrl + '/v2/movie/top250?start=0&count=3';
    this.getMovieListData(inTheatersUrl,"inTheaters", "正在热映");
    this.getMovieListData(comingSoonUrl,"comingSoon", "即将上映");
    this.getMovieListData(top250Url,"top250", "豆瓣Top250");
  }
})