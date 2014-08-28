module.exports = {
  option: {
    id: 'user_id'
  }
  , index: function *(next){
    this.body = '/users';
  }
  , show: function *(next){
    this.body = '/users/' + this.params.user_id;
  }
};
