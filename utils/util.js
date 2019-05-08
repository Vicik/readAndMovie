const starCount = (n) => {
  var num = Math.floor(n/10);
  var zero = n % 10;
  var array = []
  for(var i = 0; i < num; i++) {
    array.push(2)
  }
  if(zero) {
    array.push(1)
  }
  while(array.length < 5){
    array.push(0)
  }
  return array
}
function http(url, callBack) {
  wx.request({
    url: url,
    method: 'GET',
    header: {
      "Content-Type": "json"
    },
    success: function (res) {
      callBack(res.data);
    },
    fail: function (error) {
      console.log(error)
    }
  })
}
function convertToCastString(casts) {
  var castsjoin = "";
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}

function convertToCastInfos(casts) {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

module.exports = {
  starCount,
  http,
  convertToCastString,
  convertToCastInfos
}
