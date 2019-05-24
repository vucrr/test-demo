export default {
  '/common/getNavIcons': (req) => {
    if (req.query.festival) {
      return [
        {
          icon: 'https://res.bestcake.com/m-images/ww/foot/foot-menu-a-1.png',
          select_icon: 'https://res.bestcake.com/m-images/ww/foot/foot-menu-a-2.png',
          text: '首页',
        },
        {
          icon: 'https://res.bestcake.com/m-images/ww/foot/foot-menu-b-1.png',
          select_icon: 'https://res.bestcake.com/m-images/ww/foot/foot-menu-b-2.png',
          text: '分类',
        },
        {
          icon: 'https://res.bestcake.com/m-images/ww/foot/foot-menu-d-1.png',
          select_icon: 'https://res.bestcake.com/m-images/ww/foot/foot-menu-d-2.png',
          text: '我的',
        },
      ]
    }

    return []
  },
}
