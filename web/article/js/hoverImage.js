var hoverImage = (function(){
  return {
    show:function($this){
      var load = JSON.parse($this.attr('data-load'));
      if(!load){
        var box = `<div class = "hover_img" id="{{id}}">
                    </div>`;
        var box_id = $this.attr('popups-owns');
        var $box = $(box.replace(/\{\{id\}\}/,box_id));
        $(".container").append($box);
        $box.css({
          'position': 'absolute',
          'top': $this.offset().top+$this.height()/2,
          'left': $this.offset().left+$this.width()/2,
        })
        var config = {
            url: 'http://localhost:1337',
            type: 'get',
            conent: {
              user_id: box_id
            },
            target: $('#'+box_id),
            method: 'changeData',
            successConent:`
            <div class="top clearf">
              <img src="pic/user.png" alt="imgggggggg" class="user_img">
            <div class="intro">
             <div class="username">{{username}}</div>
            <div class="user_signature">{{signature}}</div>
            </div>
            </div>
            <div class="info">
              <a href="{{rh}}" class="user_replys">
                回答
              <p>{{rnum}}</p>
              </a>
              <a href="{{ah}}" class="user_articles">文章
              <p>{{anum}}</p></a>
              <a href="{{fh}}" class="user_followers">关注者
              <p>{{fnum}}</p></a>
            </a>
            <div class="sub_button">
              <button class="follow">+&nbsp&nbsp关注</button>
              <button class="chat">私信</button>
            </div>
            `}
        sendAjax(config);
        $this.attr('data-load',true);
        $box.show();
        $box.mouseleave(function(){
          $(this).hide();
        })
      }
      else{
        var box_id = $this.attr('popups-owns').toString();
        var $box = $('#'+box_id);
        //两次img的值不等
        var left =$this.offset().left+$this.width()/2;
        var top =$this.offset().top+$this.height()/2;
        if($box.offset().left != left || $box.offset().top!= top){
          $box.css({
            'position': 'absolute',
            'top': top,
            'left': left
          })
        }
        $box.show();
      }
    },
    hide:function($box,e){
      var clientX = e.clientX;
      var clientY = e.clientY;
      var x = $box.offset().left;
      var y = $box.offset().top;
      var width = $box.width();
      var height = $box.height();
      var deviation = 16;
      if (clientX < x - deviation || clientX > x + width || clientY < y - deviation || clientY > y + height) {
        $box.hide();
      }
    }
  }
})()
