function Input(el) {
  var $el = $(el);
  var self = this;
  //获得错误信息
  var $error = $el.parent().find('.error');
  //验证规则
  this.validate = new Validator($el, get_rule($el));
  //得到值
  this.get_val = function() {
    return $el.val();
  }
  //得到规则
  function get_rule() {
    var rules = {};
    var ruleArr = $el.data('rule').split('|');
    //为每一个input提取出他们的rule
    for (var i = 0; i < ruleArr.length; i++) {
      var eachArr = ruleArr[i].split(":");
      var key = eachArr[0]; //minLength key
      var val = JSON.parse(eachArr[1]); //2 val
      // rule = {
      //   minLength:2,
      //   maxlength:15
      //   required
      // }
      rules[key] = val;
    }
    return rules;
  }

  //绑定事件
  $el.focus(function() {
    el.parent().addClass('add');
  })

  $el.blur(function() {
    var valid = self.validate.is_valid(self.get_val());
    if (!valid) {
      $error.show();
      return false;
    }
    $error.hide();
    return true;
  })

}
