export default {
  // 支持值为 Object 和 Array
  'GET /api/users': { users: [1, 2, 3, 4, 5] },

  // GET POST 可省略
  '/api/users/1': { id: 1 },

  'GET /api/users/create': (req) => {
    return {
      a: 1,
    }
  },

  'GET /api/users/create/1': async (req) => {
    return await new Promise(resolve => {
      setTimeout(function() {
        resolve({
          a: 2,
        })
      }, 1000)
    })
  },
}
