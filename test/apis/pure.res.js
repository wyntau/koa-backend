module.exports = {
  index: function *(next){
    this.body = '/pure';
  }
  , show: function *(next){
    this.body = '/pure/' + this.params.pure;
  }
};
