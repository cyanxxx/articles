$(function() {
    var $input = $('input');
    var inputs = [];
    var $form = $('#sign');
    var $submit = $('.submit');
    var $nav = $('nav');
    var $icon = $('#title');
    var $header_name = $('#header_name');

    (function init(){
      $header_name.text(document.title);
    })()

    $icon.click(function() {
      $nav.toggleClass('active');
    })

    $input.each(function() {
      var tmp = new Input($(this));
      inputs.push(tmp);
    })
    
    $submit.click(function(e) {
      e.preventDefault();
      $input.trigger('blur');
      for (let i = 0; i < inputs.length; i++) {
        if (!(inputs[i].validate.is_valid())) {
          alert("请填写后在提交");
          return;
        }
      }
      signup();
      alert("sucess");
    })
    //提交表单
    function signup() {
      $form.submit();
    }
  }

)
