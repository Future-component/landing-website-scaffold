import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic'
import App from '@/routes/App'

function RouterConfig({ history, app }) {
  const routes = [
    {
      path: '/',
      name: 'index',
      allowApp: true,
      models: () => [],
      component: () => import('./routes/Index/index')
    },
  ]

  return (
    <Router history={history}>
      <Switch>
        {
          routes.map(({ path, name, allowApp, other, ...dynamics }) => {
            return (<Route
              exact
              path={path}
              key={name}
              component={(props) => {
                const SubComponent = dynamic({ app, ...dynamics })
                if (allowApp) {
                  return (<App {...props} other={other}>
                    <SubComponent {...props} />
                  </App>)
                }
                return <SubComponent {...props} />
              }}
            />)
          })
        }
      </Switch>
    </Router>
  );
}

export default RouterConfig;
