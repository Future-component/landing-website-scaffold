import dva from 'dva';
import createLoading from 'dva-loading'
import common from '@/plugins/common'
import "antd/dist/antd.less";
import "antd-landing/dist/index.css";
import './style/index.less'

const createHistory = require("history").createBrowserHistory

// 1. Initialize
const app = dva({
  history: createHistory(),
  initialState: [],
  onError: common.onError
});

// 2. Plugins
app.use(createLoading());

// 3. Model
// app.model(require('./models/example').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
