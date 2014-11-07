module.exports = {
  index: function *(next){
    this.body = '/foo/' + this.params.foo + '/bar';
  }
  , show: function *(next){
    this.body = '/foo/' + this.params.foo + '/bar/' + this.params.bar;
  }
};