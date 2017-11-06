var collect_btn = (function() {
  //1.弹窗
  var popups_config = {
    height: 398,
    width: 533,
    conent: `
      <div class="title">
      <h3>添加收藏</h3>
      <div class="sub_title">
        请选择需要添加到的文件夹
        </div>
        </div>
        <ul class="collect_list">
        </ul>
        <button class="new_collect">
        创建新文件夹
        </button>
        `
  };
  //2.发送ajax
  var user_id = 1;
  var ajax_config = {
    url: 'http://localhost:1337',
    type: 'get',
    conent: {
      [user_id]: user_id
    },
    method: 'changeData',
    successConent: `
      <li>
      <div class="inner">
      <p class="list_name">
      {{list_name}}
      </p>
      <p class="list_num">
      {{list_num}}
      </p>
      </div>
      <button class="button collect">
      收藏
      </button>
      </li>
      `,
    successMethod: function() {
      $('.collect').click(function() {
        $this = $(this);
        if ($this.hasClass('active')) {
          $this.removeClass('active');
          $this.text('收藏');
        } else {
          $this.addClass('active');
          $this.text('已收藏');
        }

        //发送到数据库收藏的内容
        //$.get(localhost,{'user_id':user_id,'collect_id:collect_id'})
      })
    }
  }
  return {
    click: function($btn) {
      var collect = new Popups($btn, popups_config).excute();
      ajax_config.target = $('.collect_list');
      sendAjax(ajax_config);
    }
  }
})();


var report_btn = (function(){
  //1.弹窗
  var popups_config = {
    height: 400,
    width: 426,
    conent: `
    <form onSubmit="return false">
      <h3 class="titile">
        请输入你举报的理由
      </h3>
      <textarea class="report" name="reportConent" required='required'></textarea>
      <div class="sub_wrapper">
        <input type="submit" class="submit button value="提交"">
        <input type="reset" class="reset button" value="清空">
      </div>
    </form>
        `
  };
  return{
    click:function($btn){
      var report = new Popups($btn,popups_config).excute();
      $('form').on('submit', function() {
        var self = $(this);
        var key = this.elements[0].name;
        var val = this.elements[0].value;
        var config = {
          url: 'http://localhost:1337',
          type: 'post',
          conent: {
            [key]: val
          },
          target: this,
          method: 'delData',
          successConent: "<p>感谢你的支持，我们将尽快处理</p>"
        }

        //1.验证是否为空
        if (!($.trim(self.find('.report').val()))) {
          return false;
        }
        //2.发送get请求 ,移除文本框,loading文本框,显示新的html
        else {
          sendAjax(config);
        }
      })
    }
  }
})()

var readmore_btn = (function(){
  //模拟数据
  var articles_id = 4399;
  var config = {
    url: 'http://localhost:1337',
    type: 'get',
    conent: {
      'articles_id': articles_id
    },
    method: 'delData',
    successConent:'',
    successMethod:function(){
      $container.css({'overflow':'visible','max-height':'none',"height":"auto"});
    }
  }

  return{
    click:function($btn){
      config.target = $btn;
      sendAjax(config);
    }
  }
})();

var recomment_btn = (function(){
  return{
    click:function($btn){
      var $recomment = $btn.parents('.recomment');
      var $input = $recomment.children('input[type=text]');
      var val = '回复{{username}}:' + $input.val();
      //整个回复面板回收
      $recomment.removeClass('active');
      var box = $btn.parents('.comment_wrapper');
      addMessage(box, val);
    }
  }
})()

var comment_btn = (function(){
  return{
    click:function($btn){
      var $input = $btn.parent().prev(".add_comment input[type=text]");
      var val = $input.val();
      var $add_comment = $($btn.parents('.add_comment'));
      var box = $add_comment.prevAll('.comment_wrapper');
      addMessage(box, val);
      $input.val("");
    }
  }
})()

function addMessage(dom, val) {
  //定义模板
  var add_data;
  var tpl_html = [];
  var $dom = $(dom);
  var model = `<div class="comment_item">
                <div class="clearf">
                  <a href="" class="user_img" data-load='false' popups-owns='{{popups-owns}}'>
                    <img src="pic/user.png" alt="">
                  </a>
                  <a href="">{{username}}</a>
                  <span class="fr comment_date">{{comment_date}}</p>
                </div>
                <p class="comment_text">{{comment_text}}</p>
                <div class="sub_wrapper">
                  <button type="button" class="like_btn hover_action">
                      <i class="iconfont icon-like"></i>
                      {{like_num}}
                    </button>
                  <button type="button" class="comment_btn">
                      <i class="iconfont icon-comment"></i>
                      回复
                    </button>
                  <button type="button" class="dislike_btn">
                      <i class="iconfont icon-dislike"></i>
                      踩
                    </button>
                  <button type="button" class="report_btn">
                      <i class="iconfont icon-jubao"></i>
                      举报
                    </button>
                </div>
                <div class="recomment">
                  <input type="text" placeholder="回复{{username}}">
                  <div class="recomment_action">
                    <button type="button" class="comment_cancel">取消</button>
                    <button type="button" class="comment">评论</button>
                  </div>
                </div>
              </div>`

  //提交数据，并检测有没有新的评论，一并渲染出来
  $.post('http://localhost:1337', {
    'comment_item': val
  }).done(function() {
    $.getJSON('data/user.json').done(function(data) {
      add_data = data['user'];
      for (i in add_data) {
        tpl_html.push(model.replace(/\{\{comment_text\}\}/, add_data[i]['comment_text']).replace(/\{\{username\}\}/, add_data[i]['username']).replace(/\{\{comment_date\}\}/, add_data[i]['comment_date']).replace(/\{\{like_num\}\}/, add_data[i]['like_num']).replace(/\{\{popups-owns\}\}/,
        add_data[i]['popups-owns']));
      }
      $dom.append(tpl_html.join(""));
    }).fail(function() {
      alert('发送失败');
    })
  }).fail(function() {
    alert('连接失败');
  })
}

var changeUI = function(dom) {
  dom.toggleClass('active');
}
