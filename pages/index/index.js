//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    movie: {
      poster: '/images/poster.jpg',
      title: '复仇者联盟4：终局之战',
      intro: '一声响指，宇宙间半数生命灰飞烟灭。几近绝望的复仇者们在惊奇队长（布丽·拉尔森 Brie Larson 饰）的帮助下找到灭霸（乔什·布洛林 Josh Brolin 饰）归隐之处，却得知六颗无限宝石均被销毁，希望彻底破灭。如是过了五年，迷失在量子领域的蚁人（保罗·路德 Paul Rudd 饰）意外回到现实世界，他的出现为幸存的复仇者们点燃了希望。与美国队长（克里斯·埃文斯 Chris Evans 饰）冰释前嫌的托尼（小罗伯特·唐尼 Robert Downey Jr. 饰）找到了穿越时空的方法，星散各地的超级英雄再度集结，他们分别穿越不同的时代去搜集无限宝石。而在这一过程中，平行宇宙的灭霸察觉了他们的计划。'
    },
    review: {
      author: {
        name: '徐燕',
        avatar: '/images/avatar.jpg'
      }
    }
  },
  onLoad: function () {
    console.log('started')
  },
  
})
