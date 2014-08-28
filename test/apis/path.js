module.exports = {
  'GET /get': function *(next){
    this.body = '/get';
  }
  ,'POST /post': function *(next){
    this.body = '/post';
  }
  , 'PUT /put': function *(next){
    this.body = '/put';
  }
  , 'DELETE /delete': function *(next){
    this.body = '/delete';
  }
  , 'ALL /all': function *(next){
    this.body = '/all';
  }
};
