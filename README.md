# Michelin

The one and only TypeScript + React + Redux + Flask boilerplate!

## Main Features

#### [JWT](https://jwt.io/) Based User Management

Users are managed in the app's SQL DB, utilizing standard Flask libraries like `flask-sqlalchemy` and `flask-bcrypt`.

In the frontend, all user information is stored in the app's `Redux` store, and the authentication is based on [JWT](https://jwt.io/).  

#### Fully Typed React App

By enforcing the `no-implicit-any` Typescript rule, all components, layouts, routes, actions and reducers are now fully typed.

#### [Ant-Pro](http://preview.pro.ant.design) Design

Components styling, routing algorithm and layouts structure were adopted from the great [Ant-Pro](http://preview.pro.ant.design) example. 

#### Dynamic Layouts Support

The app supports multiple layouts, in which each component is dynamically loaded upon access.

## Installation

#### Backend

This app requires Python 3.6+ to run properly.

In the `backend` directory, run: 
    
    python setup.py develop
    python app.py

#### Frontend

This app runs best with [yarn](https://yarnpkg.com/en/).

In the `frontend` directory, run:

    yarn install
    yarn start

## Development

The app currently has a single route, with a simple text and pie chart in it.
In order to add a new one, follow these few simple steps:

1. WIP
