function init() {
  var $articles = $('.articles');

  $articles.on('mouseover', '.user_img', function(e) {
    var $this = $(e.currentTarget);
    hoverImage.show($this);
  })
  $articles.on('mouseout', '.user_img', function(e) {
      var box_id = $(e.currentTarget).attr('popups-owns').toString();
      var $box = $('#'+box_id);
      hoverImage.hide($box,e);
  })
  $articles.on('mouseover', '.comment_container .sub_wrapper', function() {
    $(this).children().not(':first-child').show();
  })
  $articles.on('mouseout', '.comment_container .sub_wrapper', function() {
    $(this).children().not(':first-child').hide();
  })


$articles.on('click','.articles_ctx',function(e){
  var $btn = $(e.currentTarget);
  readmore_btn.click($btn);

})

  $articles.on('click', 'button', function(e) {
    var $btn = $(e.currentTarget);
    //最开始的评论展开按钮
    if($btn.hasClass('comment_btn')){
      changeUI($(this).parents().next('.comment_container'))
    }
    //二级评论
    else if ($btn.is('.recomment_action .comment')) {
      recomment_btn.click($btn);
    }
    //一级评论
    else if ($btn.is('.comment_action .comment')) {
      comment_btn.click($btn);
    }


    //其他普通按钮
    else if ($btn.hasClass('comment_btn')) {
      changeUI($btn.parents().next('.recomment'));
    } else if ($btn.hasClass('like_btn')) {
      changeUI($btn);
    } else if ($btn.hasClass('dislike_btn') ) {
      changeUI($btn);
    } else if ($btn.hasClass('collect_btn')) {
        collect_btn.click($btn);
    } else if ($btn.hasClass('report_btn')) {
        report_btn.click($btn);
    }
  })
}

init();
