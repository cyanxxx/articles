$(function(){
  window.sendAjax = function(config){
    //.inner_pop
    var container = $(config.target).parent();
    ajaxLoading(config.target);

    //模拟(返回得到的数据)
    // var data = {
    //   list_name : "123",
    //   list_num : 5
    // }
    var data ={
      username:'xiaoming',
      signature:'asdfasdfasdf',
      rnum:7,
      fnum:5,
      anum:6,
      ah:'#',
      rh:'#',
      fh:'#'
    }
    // var data = {
    //   articles_id:`<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    //   quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
    //   in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
    //    sunt in culpa qui officia deserunt mollit anim id est laborum.
    //    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    //    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
    //    in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
    //     sunt in culpa qui officia deserunt mollit anim id est laborum.</p>`
    // }

    var method = {
      changeData:function(data){
        var tpl = config.successConent;
        for (var key in data) {
          tpl = tpl.replace(eval('/\{\{'+key+'\}\}/'),data[key]);
        }
        config.target.append(tpl);
      },
      delData:function(data){
        //container.empty();
        if(!config.successConent){
          for (var key in data) {
              config.successConent += data[key];
          }
        }
        container.append(config.successConent);
      },
    }
    $.ajax({
      type:config.type,
      url:config.url,
      data:config.conent,
      //a.成功后返回数据更改模板b.删除原有的数据直接替换新的html
      success:function(){
        console.log("hi");
        //var data = JSON.parse(data);
        //回收菊花图
        $('.loading').remove();

        method[config.method](data);
        //后续操作
        if(config.successMethod){
          config.successMethod();
        }

      },
      error:function(){
        alert('发送失败');
      }
    })
    //要删除才删除
    function ajaxLoading(place){
      var tpl = `<img class="loading" src="pic/loading.gif" alt="loading" style="display:block;margin:0 auto"/>
      `
      if(config.method=='delData'){
        place.remove();
        //删除当前元素
          container.append(tpl);
      }
      else{
        place.append(tpl);
      }

    }
  }
})
