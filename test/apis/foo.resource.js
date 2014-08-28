module.exports = {
  index: function *(next){
    this.body = '/foo';
  }
  , private: true
};