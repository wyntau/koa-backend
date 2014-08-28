var request = require('supertest')
  , koa = require('koa')
  , async = require('async')

  , backend = require('..')

  , createApp = function(){
    var app = koa();
    app.use(backend(app, __dirname + '/apis'));
    return app;
  }

  ;

describe('koa-backend', function(){
  it('should dispath path file', function(done){
    app = createApp();
    var req = request(app.listen());

    async.parallel([
      function(done){
        req.get('/get').expect('/get', done);
      }
      , function(done){
        req.post('/post').expect('/post', done);
      }
      , function(done){
        req.put('/put').expect('/put', done);
      }
      , function(done){
        req.delete('/delete').expect('/delete', done);
      }
      , function(done){
        req.get('/all').expect('/all', done);
      }
      , function(done){
        req.post('/all').expect('/all', done);
      }
      , function(done){
        req.put('/all').expect('/all', done);
      }
      , function(done){
        req.delete('/all').expect('/all', done);
      }
      ], done);
  });

  it('should dispath dir file', function(done){
    app = createApp();
    var req = request(app.listen());

    async.parallel([
      function(done){
        req.get('/dir/get').expect('/dir/get', done);
      }
      , function(done){
        req.post('/dir/post').expect('/dir/post', done);
      }
      , function(done){
        req.put('/dir/put').expect('/dir/put', done);
      }
      , function(done){
        req.delete('/dir/delete').expect('/dir/delete', done);
      }
      , function(done){
        req.get('/dir/all').expect('/dir/all', done);
      }
      , function(done){
        req.post('/dir/all').expect('/dir/all', done);
      }
      , function(done){
        req.put('/dir/all').expect('/dir/all', done);
      }
      , function(done){
        req.delete('/dir/all').expect('/dir/all', done);
      }
      ], done);
  });

  it('should dispath pure resource file', function(done){
    app = createApp();
    var req = request(app.listen());

    async.parallel([
      function(done){
        req.get('/pure').expect('/pure', done);
      }
      , function(done){
        req.get('/pure/name').expect('/pure/name', done);
      }
    ], done);
  });

  it('should dispath defined name resource file', function(done){
    app = createApp();
    var req = request(app.listen());

    async.parallel([
      function(done){
        req.get('/names').expect('/names', done);
      }
      , function(done){
        req.get('/names/name').expect('/names/name', done);
      }
    ], done);
  });

  it('should dispath predefine middleware resource file', function(done){
    app = createApp();
    var req = request(app.listen());

    async.parallel([
      function(done){
        req.get('/pre').expect('pre/pre', done);
      }
      , function(done){
        req.get('/pre/sub').expect('pre/pre/sub', done);
      }
    ], done);
  });

  it('should dispath child resource file', function(done){
    app = createApp();
    var req = request(app.listen());

    async.parallel([
      function(done){
        req.get('/names/a/path').expect('/names/a/path', done);
      }
      , function(done){
        req.get('/names/a/path/b').expect('/names/a/path/b', done);
      }
    ], done);
  });

  it('should dispath pure resource file with option', function(done){
    app = createApp();
    var req = request(app.listen());

    async.parallel([
      function(done){
        req.get('/users').expect('/users', done);
      }
      , function(done){
        req.get('/users/1').expect('/users/1', done);
      }
    ], done);
  });
});
