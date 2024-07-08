const app = require('@/app');

// 格式化body
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// @RouteName(文件)
app.use('/uploadFile', require('@/routes/uploadFile'));
// @RouteName(用户)
app.use('/user', require('@/routes/user'));
// @RouteName(漂流瓶)
app.use('/driftBottle', require('@/routes/driftBottle'));