//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    bonus:0,
    typhoon:0,
    tax:0,

  },
  //事件处理函数
  
  tips:function(){
    wx.showModal({
      title: 'Tips',
      content: '1.福利会让人口增加，但是会让人均产值降低；\r\n2.台风应急基金用来减少每年的台风损失；\r\n3.税率越高，人均产值越低，但是岛主的收入又依赖于税率',
      confirmText: '好',
      showCancel: false,
    })

  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      }),
        wx.setStorage({
          key: 'userInfo',
          data: app.globalData.userInfo,
          success: function () {
            console.log(app.globalData.userInfo);
          }
        })
      
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        }),
          wx.setStorage({
            key: 'userInfo',
            data: res.userInfo,
            success: function () {
              console.log(res.userInfo);
            }
          })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: function(res){
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          }),
            wx.setStorage({
              key: 'userInfo',
              data: res.userInfo,
              success: function () {
                console.log(res.userInfo);
              }
            })
        }
      })
    }
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.setStorage({
      key: 'userInfo',
      data: e.detail.userInfo,
      success:function(){
        console.log(e.detail.userInfo);
      }
    })
  },

  getinfo:function(e){
    var bonus=this.data.bonus;
    var typhoon=this.data.typhoon;
    var tax=this.data.tax;
    var next=true;
    var sum=bonus+typhoon;
    console.log(typeof sum)
    

    if(sum>1000){
      wx.showModal({
        title: '钱不够哦',
        content:'福利和台风应急基金加起来不能超过1000万美金',
        confirmText:'知道了',
        showCancel:false,
        
      })
      next = false;
      console.log(next),
      console.log(sum)

    }

    if (bonus + typhoon== 0) {
      wx.showModal({
        title: '太吝啬了',
        content: '一点钱都不肯出么，请设置福利和台风应急基金吧',
        confirmText: '知道了',
        showCancel: false,

      })
      next=false;

    }
    if(tax==0){
      wx.showModal({
        title: '不收税是没钱的哦',
        content: '请设置1%-99%的税吧',
        confirmText: '知道了',
        showCancel: false,

      })
      next = false;
    }

    if(next){
      wx.navigateTo({
        url: '../result/result?bonus=' + bonus + '&typhoon=' + typhoon + '&tax=' + tax,
      })
      console.log('../result/result?bonus='+bonus+'&typhoon='+typhoon+'&tax='+tax)

    }
   

    

    





  },

  inputbonus:function(e){

    if (isNaN(parseInt(e.detail.value))) {
      this.setData({
        bonus: 0,

      })

    }

    else {

    
    this.setData({
      bonus: parseInt(e.detail.value),
    }),
    console.log(this.data.bonus)
    }
  },
  inputtyph:function(e){
    
    if (isNaN(parseInt(e.detail.value))){
      this.setData({
        typhoon:0,

      })
      
    }

    else{
      this.setData({

        typhoon: parseInt(e.detail.value),

      }),
        console.log(this.data.typhoon)

    }
    
    
  },
  inputtax:function(e){
    if (isNaN(parseInt(e.detail.value))) {
      this.setData({
        tax: 0,

      })

    }

    else {

    this.setData({
      tax: parseInt(e.detail.value),
    }),
    console.log(this.data.tax)
  }
  },

  onShareAppMessage: function () {
  }
})
