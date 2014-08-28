module.exports = {
  index: function *(next){
    this.body = '/names/' + this.params.name + '/path';
  }
  , show: function *(next){
    this.body = '/names/' + this.params.name + '/path/' + this.params.path;
  }
};