export default {
  // 支持值为 Object 和 Array
  'GET /api/users/c': { users: [1, 2, 3, 4, 5] },

  // GET POST 可省略
  '/api/users/1/c': { id: 1 },

  // 支持自定义函数，API 参考 express@4
  'POST /api/users/create/c': (req, res) => {
    res.json({
      a: req.query.key,
      b: req.body.key,
    })
  },
}
