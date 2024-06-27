const express = require('express');
const app = express();
module.exports = app;

// @路径配置
require('module-alias').addAlias('@', process.cwd());

// 数据库
require('@/config/database');

// 路由器
require('@/routes');

// 静态资源
require('@/config/staticFileRouter');

// 服务
require('@/config/serve')