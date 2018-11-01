// pages/result/result.js
Page({
  

  /**
   * 页面的初始数据
   */
  data: {
    //读取过来的数据
    bonus:0,
    typhoon:0,
    tax:0,

    //用户数据
    userInfo: {},

    //数据比例矩阵
    
    bonusrate:[0,0.1,0.2,0.4,0.6,0.8,1],
    bonusratio:[1.1,1.4,1.2,1.6,1.3,0.95],
    typhoonrate:[0,0.1,0.2,0.3,0.5,0.7,10],//特殊一点
    typhoonratio:[1.2,1.35,1.45,1.55,1.65,1.8],
    taxrate:[0,0.1,0.2,0.3,0.4,0.6,0.8,1],
    taxratio:[3,2.6,2.3,1.1,1,0.4,0.1],

    //总产值
    output:0,
    people: 1000,
    persongdp: 100,
    typhoon_realdamage:0,
    typhoondamage:0,
    persongdp_real:0,
    
    


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var that=this;
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        that.setData({
          userInfo:res.data,
        })
      },
    })
    
    


    var typhoondamage = parseInt(500 + Math.random() * (1500 - 500));//真实数据,随机从500-1500
    var bonus = option.bonus;
    var typhoon = parseInt(option.typhoon);
    var tax = option.tax/100;

    var bonus_rate=bonus/this.data.people;
    var typhoon_rate=typhoon/typhoondamage;
    var bonus_ratio;//真实数据
    var typhoon_ratio;//真实数据
    var tax_ratio;//真实数据
    var typhoon_realdamage;//真实数

    
    for (var i=0;i<(this.data.bonusrate.length-1);i++){

      if (bonus_rate>this.data.bonusrate[i] && bonus_rate<=this.data.bonusrate[i+1]){

        bonus_ratio=this.data.bonusratio[i];
        console.log("bonus_ratio"+bonus_ratio)
      }
      
    }

    for (var i = 0; i < (this.data.typhoonrate.length - 1); i++) {

      if (typhoon_rate>this.data.typhoonrate[i] && typhoon_rate <= this.data.typhoonrate[i + 1]) {

        typhoon_ratio = +this.data.typhoonratio[i];
        console.log("typhoon_ration" + typhoon_ratio + typeof typhoon_ratio)
      }

    }

    for (var i = 0; i < (this.data.taxrate.length - 1); i++) {

      if (tax>this.data.taxrate[i]  && tax <= this.data.taxrate[i + 1]) {

        tax_ratio = +this.data.taxratio[i];
        console.log("tax_ratio"+tax_ratio)
      }

    }

    

    typhoon_realdamage=parseInt(typhoondamage - typhoon * typhoon_ratio);

    if (typhoon_realdamage < 0) {
      typhoon_realdamage = 0;
    }


    var output = ((this.data.people * this.data.persongdp * bonus_ratio*tax_ratio-typhoon_realdamage)*tax).toFixed(2);
    
    console.log("typhoonreal"+typhoon_realdamage);

    this.setData({

      output:+output,
      typhoondamage: typhoondamage,
      typhoon_realdamage:typhoon_realdamage,
      persongdp_real: +(this.data.persongdp * bonus_ratio * tax_ratio).toFixed(2),
    }

    )

    
   




  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    console.log(e);

    return{
      title: this.data.userInfo.nickName + '在土豪小岛赚了' + this.data.output+'美金，你也来玩玩吧',
      path:"/pages/share/share?username="+this.data.userInfo.nickName+'&userimg='+this.data.userInfo.avatarUrl+'&output='+this.data.output,
    }

  }
})