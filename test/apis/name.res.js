module.exports = [{
  index: function *(next){
    this.body = '/names';
  }
  , show: function *(next){
    this.body = '/names/' + this.params.name;
  }
}, 'names'];
