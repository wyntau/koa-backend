module.exports = [function *(next){
  this.body = 'pre';
  yield next;
}, {
  index: function *(next){
    this.body += '/pre';
  }
  , show: function *(next){
    this.body += '/pre/' + this.params.pre;
  }
}];