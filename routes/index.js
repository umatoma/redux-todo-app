'use strict';

const path = require('path');
const Express = require('express');
const ApiTodosCtrl = require('../controllers/api-todos.js');
const ApiUsersCtrl = require('../controllers/api-users.js');

const router = Express.Router(); // eslint-disable-line new-cap

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
router.get('/api/todos', ApiTodosCtrl.index);
router.post('/api/todos', ApiTodosCtrl.create);
router.put('/api/todos/:id', ApiTodosCtrl.update);

router.all('/api/*', (req, res) => {
  res.status(404).send({
    error: {
      status: 404,
      message: 'Not Found'
    }
  });
});

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

module.exports = router;
