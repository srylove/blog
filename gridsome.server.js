// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const axios = require('axios')
module.exports = function(api) {
  // api.loadSource(async ({ addCollection }) => {
  //   // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
  //   const { data } = await axios.get(
  //     'https://api.github.com/users/GitHub-Laziji/gists?page=1&per_page=1'
  //   )
  //   const collection = addCollection({
  //     typeName: 'BlogPosts'
  //   })

  //   for (const item of data) {
  //     collection.addNode({
  //       id: item.id,
  //     })
  //   }
  // })
  api.createPages(({ createPage }) => {
    createPage({
      path: '/user/new/',
      component: './src/views/new/Main.vue',
    })
    createPage({
      path: '/user/blog/',
      component: './src/views/blog/Main.vue',
    })
    // createPage({
    //   path: '/user/blog/add',
    //   component: './src/views/blog/Add.vue',
    // })
    // createPage({
    //   path: '/user/blog/edit',
    //   component: './src/views/blog/Edit.vue',
    // })
    createPage({
      path: '/user/blog/details',
      component: './src/views/blog/Details.vue',
    })
    createPage({
      path: '/user/social/',
      component: './src/views/social/Main.vue',
    })
    createPage({
      path: '/user/social/details',
      component: './src/views/social/Details.vue',
    })
    createPage({
      path: '/user/project/',
      component: './src/views/project/Main.vue',
    })
    createPage({
      path: '/user/project',
      component: './src/views/project/Details.vue',
    })
  })

  api.loadSource(async (store) => {
    const storeData = {
      githubUsername: 'GitHub-Laziji',
      blogTitle: 'Laziji',
      blogDescribe: '欢迎来到辣子鸡的个人博客。',
      htmlTitle: '辣子鸡的博客',
      fontColor: '#ffffff',
      useBackgroundImage: false,
      backgroundColorLeft: '#2690F9',
      backgroundColorRight: '#FC2D2D',
      audioUrl:
        'http://sc1.111ttt.cn:8282/2018/1/03m/13/396131232171.m4a?tflag=1519095601&pin=6cd414115fdb9a950d827487b16b5f97#.mp3',
      mini: false,
      webSites: [{ name: 'segmentfault', url: 'https://segmentfault.com/' }],
      audioAutoPlay: false,
      avatarUrl: '',
      location: '',
    }
    for (const key in storeData) {
      if (storeData.hasOwnProperty(key)) {
        store.addMetadata(key, storeData[key])
      }
    }
  })

  // api.createPages(({ createPage }) => {
  //   // Use the Pages API here: https://gridsome.org/docs/pages-api/
  // })
}
