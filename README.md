## Getting started
```
git clone git@code.aihuishou.com:minggao.pan/mobile-nextjs.git
cd mobile-nextjs
yarn install
yarn run dev
```

Then open `http://localhost:3005/` to see your app.

## Structure overview
```
├── README.md
├── next.config.js
├── package.json
├── pages
│   ├── _document.js
│   ├── about.js
│   └── index.js
├── routes.js
├── server
│   └── index.js
├── src
│   ├── actions
│   │   └── index.js
│   ├── components
│   │   └── index.js
│   ├── config.js
│   ├── containers
│   │   └── index.js
│   ├── reducers
│   │   ├── index.js
│   ├── store
│   │   └── createStore.js
└── yarn.lock
```
## Code Guidelines
### TypeScript
https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines