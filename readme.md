# Webpack 4: React with hot reload

> 🔨 Webpack with React. From Grafikart.fr '[Comprendre Webpack: React avec hot reload](https://www.youtube.com/watch?v=0AJ0Ro6DeYw&list=PLjwdMgw5TTLVzGXGxEBdjwHXCeYnBb7n8&index=11)'.
>
> Webpack with a focus on *hot reload* using Hot Module Replacement (HMR).

For a general Webpack overview, see my [webpack-overview](https://github.com/Raigyo/webpack-overview) repository.

![Webpack logo](./img-readme/react-webpack-logo.png)



## Init project

**React**

Project init:

 `npm init`

Install React:

`npm i react`

Install DOM code injection: 

`npm i react react-dom` 

**Webpack**

Install Webpack, DevServ and Cross Env (to define cross platforms environment variables)

`npm i -D webpack webpack-cli webpack-dev-server cross-env`

In **package.json**:

````json
  "scripts": {
    "dev": "cross-env NODE_ENV=development webpack-dev-server --hot --open",
    "build": "cross-env NODE_ENV=production webpack --mode=none"
  },
````

**webpack.config.js**:

````js
const path = require('path')

let config =  {
  entry: './src/main.jsx',
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: 'main.js',
    publicPath: '/assets/'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)/, // use babel for js and jsx
        use: [
          {
            loader: 'babel-loader'
          },
        ],
      },
    ],
  },
}
module.exports = config
````

**Babel**

Install Babel and some presets

`npm install --save-dev @babel/core @babel/register @babel/preset-env @babel/preset-react babel-loader`

**.babelrc**:

````json
{
  "presets": ["@babel/preset-env", "@babel/react"]
}
````



## Launch development server

**Create**

**src/mains.js**

````jsx
import React from 'react'
import ReactDom from 'react-dom'

ReactDom.render(
    <div>Hello world!</div>,
    document.getElementById('app')
)
````

**index.html**

````html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="app"></div>
  <script src="/assets/main.js"></script>
</body>
</html>
````

Test using:

`npm run dev`

It should open [http://localhost:8080/](http://localhost:8080/) and display *Hello World!* .



## Adding children components

**components/App.jsx**

````jsx
import React from 'react'
import Hello from './Hello'

export default class App extends React.Component {
  render () {
    return <Hello name={'world'}/>
  }
}
````

**components/Hello.jsx**

````jsx
import React from 'react'

export default class Hello extends React.Component {
  render () {
    return <div>Hello {this.props.name}!</div>
  }
}
````

**main.jsx** 

````jsx
import React from 'react'

export default class Hello extends React.Component {
  render () {
    return <div>Hello {this.props.name}!</div>
  }
}
````

Test using:

`npm run dev`

It should open [http://localhost:8080/](http://localhost:8080/) and display *Hello World!* .

But, if we try to build running `npm run build` it won't because the production environment is not set yet.

The file *main.js* in *assets* will still be seen as development build.



## Production environment

In package.json:

````json
  "scripts": {
    "dev": "cross-env NODE_ENV=development webpack-dev-server --hot --open",
    "build": "cross-env NODE_ENV=production webpack --mode=production"
  },
````

In , **webpack.config.js** below modules add:

````js
const webpack = require('webpack')

//...

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }, //we send env var to JS
    })
  ]
````

It will use the installed *node_module react/index.js*:

````js
'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/react.production.min.js');
} else {
  module.exports = require('./cjs/react.development.js');
}
````

It's also possible to take actions according to the type of environment.

````js
// Filter to add plugin according to process.env.NODE_ENV
if (process.env.NODE_ENV === 'production'){
  config.optimization.push(
    //add plugin /action
  )
  config.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin()
  )
} else {
	// action
}
````



## React Hot Loader

Without Hot Loader if we make any changes in the code the page will reload and we will loose our(s) state(s).

In a big application It could involve to loose a lot of time to retrieve exactly the same the state in that application.

`npm i -D react-hot-loader`

For instance if we add a counter and then make any change in the code, the state counter comes back to zero.

**components/Hello.jsx**

````js
import React from 'react'

export default class Hello extends React.Component {
  constructor (props) {
    super(props)
    this.increment = this.increment.bind(this)
    this.state = {
      counter: 0
    }
  }

  render () {
    return <div>
      Hello {this.props.name}!
      Counter: {this.state.counter}
      {this.state.counter > 10 && <div>You have exceeded 10!</div>}
      <button onClick={this.increment}>Increment</button>
    </div>
  }

  increment () {
    this.setState({counter: this.state.counter + 1})
  }
}
````

Let's configurate Hot Relaod!

In **package.json**:

````json
  "scripts": {
    "dev": "cross-env NODE_ENV=development webpack-dev-server --hot -- open --inline",
    "build": "cross-env NODE_ENV=production webpack --mode=production"
  },
````

[Inline](https://webpack.js.org/configuration/dev-server/#devserverinline) mode added with flag  is recommended for [Hot Module Replacemen](https://webpack.js.org/concepts/hot-module-replacement/)t as it includes an HMR trigger from the websocket.

In **webpack.config.js**, add hot-loader in *entry* and in *rules*:

````js
  module: {
    entry: [
        'react-hot-loader/patch',
        './src/main.jsx'
    ],
    //...
    rules: [
      {
        test: /\.(js|jsx)/, // use babel for js and jsx
        exclude: /node_modules/,
        loaders: ["react-hot-loader/webpack", "babel-loader"],
      },
    ],
  },
````

In Chrome, [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools) (components) should display that Hot Module Replacement and is enabled.



![chrome capture](./img-readme/chrome-hot reload.png)







## Useful links

- [Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/)
- [react-hot-loader](https://www.npmjs.com/package/react-hot-loader)
- [gaearon/react-hot-loader](gaearon/react-hot-loader)