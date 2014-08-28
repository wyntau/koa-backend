module.exports = {
  'GET /dir/get': function *(next){
    this.body = '/dir/get';
  }
  ,'POST /dir/post': function *(next){
    this.body = '/dir/post';
  }
  , 'PUT /dir/put': function *(next){
    this.body = '/dir/put';
  }
  , 'DELETE /dir/delete': function *(next){
    this.body = '/dir/delete';
  }
  , 'ALL /dir/all': function *(next){
    this.body = '/dir/all';
  }
};
