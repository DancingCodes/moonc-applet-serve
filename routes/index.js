const app = require('@/app');

// 格式化body
const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.use('/driftBottle', require('@/routes/driftBottle'));
app.use('/uploadFile', require('@/routes/uploadFile'));
app.use('/user', require('@/routes/user'));