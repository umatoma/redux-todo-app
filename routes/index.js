'use strict';

const path = require('path');
const express = require('express');
const Promise = require('bluebird');
const ApiTodosCtrl = require('../controllers/api-todos');
const ApiUsersCtrl = require('../controllers/api-users');

const router = express.Router(); // eslint-disable-line new-cap
const isGenerator = (obj) => typeof obj.next === 'function' && typeof obj.throw === 'function';
const isGeneratorFunction = (obj) => {
  const constructor = obj.constructor;
  if (!constructor) return false;
  if (constructor.name === 'GeneratorFunction') return true;
  if (constructor.displayName === 'GeneratorFunction') return true;
  return isGenerator(constructor.prototype);
};
const exec = (fn) => {
  if (isGeneratorFunction(fn)) {
    return (req, res, next) => {
      Promise.coroutine(fn)(req, res, next)
        .catch((err) => next(err));
    };
  }

  return fn;
};

/**
 * Actions:
 *   - index    GET     /users           ユーザー一覧取得
 *   - new      GET     /users/new       新規ユーザー作成フォーム
 *   - show     GET     /users/:id       ユーザー情報取得
 *   - edit     GET     /users/:id/edit  ユーザー情報編集フォーム
 *   - create   POST    /users           新規ユーザー作成
 *   - update   PUT     /users/:id       ユーザー情報編集
 *   - destroy  DELETE  /users/:id       ユーザー情報削除
 */

// api/users
router.get('/api/users/current', ApiUsersCtrl.showCurrent);

// api/todos
router.get('/api/todos', exec(ApiTodosCtrl.index));
router.post('/api/todos', exec(ApiTodosCtrl.create));
router.put('/api/todos/:id', exec(ApiTodosCtrl.update));
router.get('/api/todos/not_generator', exec(ApiTodosCtrl.notGenerator));

router.all('/api/*', (req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

module.exports = router;
