$(function() {
  window.Popups = function($btn, c) {
    var self = this;
    this.config = {
      width: c.width,
      height: c.height,
      conent: c.conent,
      method: c.method
    }
    var init = function(){
    //1.模板加载
    var $pop_inner = template().interface;
    //2.加样式
    var $del = $pop_inner.find('.del');
    addUI($pop_inner,self.config);
    //3.绑事件（a.删除 b.表单提交）
    $del.click(function(){
      $('.laywer').remove();
      $('html').removeClass('popups');
    })
    //4.元素本身想做的事情
    if(self.config.method){
      self.config.method();
    }
  }
  var addUI = function($pop_inner,config){
    var $laywer = $pop_inner.parents('.laywer');
    $laywer.height(window.innerHeight);
    $laywer.width(window.innerWidth);
    $pop_inner.height(config.height);
    $pop_inner.width(config.width);
    var h = (window.innerHeight-config.height)/2;
    var w = (window.innerWidth-config.width)/2;
    $pop_inner.css({
      top:h,
      left:w
    })
    $pop_inner.append(config.conent);
    $('html').addClass('popups');
  }
  var template=function(){
    var model = `<div class="laywer">
      <div class="pop_inner">
       <div class="del">
         x
       </div>
       </div>
     </div>`;
     $("body").append(model);
     var $pop_inner = $('.pop_inner');
     return{
       interface: $pop_inner
     }
  }
  this.excute = init;
  }
})
