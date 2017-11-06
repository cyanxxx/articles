function Validator($el, rules) {
  var $el = $el;
  var val = "";
  //检验规则
  var methods = {
    pre_string:function(){
      val = val.toString();
    },
    minLength: function() {
      this.pre_string();
      return val.length >= rules.minLength;
    },
    maxLength: function() {
      this.pre_string();
      return val.length <= rules.maxLength;
    },
    pattern: function() {
      var reg = new RegExp(rules.pattern);
      if (!reg.test(val)) return false;
      return true;
    },
    required: function() {
      if (val == "") {
        return false;
      }
      return true;
    },
    confirm: function() {
      return $el.parents('form').find('#password').val() == val;
    }
  }

  this.is_valid = function(new_val) {
    var key;
    if (new_val != undefined) {
      val = new_val;
    }
    for (key in rules) {
      if (!methods[key]()) {
        return false;
      }
    }
    return true;
  }
}
