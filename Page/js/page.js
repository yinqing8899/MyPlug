(function(root,factory,plug){
	factory(root.jQuery,plug);
})(window,function($,plug){
	var me = this;
	var _ROOT_ = {
		pages:5,//总页数
		curr:1,//当前页
		jumpOpen:false,//是否开启跳页
		style:1,//风格 1 是显示首尾页  2是不显示首尾页而是显示第一页和最后页的页码数
		jump:function(curr){}
	}
	$.fn[plug] = function(options){
		var $this = $.extend(this,_ROOT_, options);
		me.init($this);
	};
	//初始化
	me.init = function(params){
		var dom = params.selector;
		var style = parseInt(params.style);
		var pages = params.pages;
		var ul = $('<ul class="my-page"></ul>');
		var liArr = me.loadPageList(params)
		ul.append(liArr);
		$(dom).append(ul);
		$("a[data-page="+params.curr+"]").parent().addClass("active");
		var firstPage = $(".first-page").length;//查看是是否是首尾页模式
		var lastPage = $(".last-page").length;//查看是是否是首尾页模式
		if(firstPage===1 && !$(".first-page").hasClass("hide")){
			$(".first-page").parent().next().find("a").addClass("hide");
		}
		if(lastPage===1 && !$(".last-page").hasClass("hide")){
			$(".last-page").parent().prev().find("a").addClass("hide");
		}
		$(".my-page > li > a").on("click",function(){
			var curr = $(this).data("page");
			var active = $("a[data-page="+params.curr+"]");
			$(this).parent().siblings().removeClass("active");
			switch(curr) {
				case "prev-page"://上一页
					$(".my-page").empty();
					params.curr -= 1;
					me.init(params);
					break;
				case "next-page"://下一页
					$(".my-page").empty();
					params.curr += 1;
					me.init(params);
					break;
				case "first-page"://首页
					$(".my-page").empty();
					params.curr = 1;
					me.init(params);
					break;
				case "last-page"://尾页
					$(".my-page").empty();
					params.curr = pages;
					me.init(params);
					break;
				default://点击任意页
					$(".my-page").empty();
					params.curr = curr;
					me.init(params);
			}
			params.jump(params.curr);
		});
		//跳页 如果查询的页码是符合规则的，则进行跳页 否则不做任何改变
		$(".jumpPageBtn").on("click",function(){
			var jumpPage = parseInt($(".jump-num").val());
			if(jumpPage && jumpPage>0 && jumpPage<=pages){
					$(".my-page").empty();
					params.curr = jumpPage;
					me.init(params);
					params.jump(params.curr);
			}
		});
	}
	//加载页码
	me.loadPageList = function(params){
		var curr = params.curr;
		var pages = params.pages;
		var ul = $('<ul class="my-page"></ul>');
		var li = [];
		var liArr = [];
		var _curr = curr;
		var prevHide = curr===1?"hide":"";
		var nextHide = curr===pages?"hide":"";
		for (var i=0;i<pages;i++) {
			if (curr-2<=2) {
				if(pages>7 && i>=6){
					li.push('<li><span>...</span></li>');
					li.push('<li><a href="#" data-page="'+pages+'">'+pages+'</a></li>');
					break;
				}else{
					li.push('<li><a href="#" data-page="'+(i+1)+'">'+(i+1)+'</a></li>');
				}
				prevHide = "hide";
			}
			else if (curr-2>2 && curr+2<pages-1) {
				if(i===0){
					li.push('<li><a href="#" data-page="'+(i+1)+'">'+(i+1)+'</a></li>');
					li.push('<li><span>...</span></li>');
				}else if(i>0 && i<pages-1){
					i = _curr-3;
					li.push('<li><a href="#" data-page="'+(i+1)+'">'+(i+1)+'</a></li>');
					_curr++;
					if(i==curr+1){
						i = pages-2;
					}
				}else{
					li.push('<li><span>...</span></li>');
					li.push('<li><a href="#" data-page="'+pages+'">'+pages+'</a></li>');
				}
			}
			else if(curr+2>=pages-1){
				if(pages>7){
					if(i===0){
						li.push('<li><a href="#" data-page="'+(i+1)+'">'+(i+1)+'</a></li>');
						li.push('<li><span>...</span></li>');
					}
					else{
						switch(pages-curr) {
							case 3:
								i = _curr-3;
								break;
							case 2:
								i = _curr-3;
								break;
							case 1:
								i = _curr-4;
								break;
							default:
								i = _curr-5;
						}
						nextHide = "hide";
						_curr++;
						li.push('<li><a href="#" data-page="'+(i+1)+'">'+(i+1)+'</a></li>');
					}
				}else{
					li.push('<li><a href="#" data-page="'+(i+1)+'">'+(i+1)+'</a></li>');
				}
			}
		}
		liArr = li;
			switch(params.style) {
				case  1 :
				liArr.unshift('<li><a class="prev-page '+prevHide+'" data-page="prev-page" title="上一页">上一页</a></li>'+
						'<li><a class="first-page '+prevHide+'" data-page="first-page" title="首页">首页</a></li>'
				);
				liArr.push('<li><a class="last-page '+nextHide+'" data-page="last-page" title="尾页">尾页</a></li>'+
						'<li><a class="next-page '+nextHide+'" data-page="next-page" title="下一页">下一页</a></li>'
				);
				break;
				case 2 :
				liArr.unshift('<li><a class="prev-page '+prevHide+'" data-page="prev-page" title="上一页">上一页</a></li>');
				liArr.push('<li><a class="next-page '+nextHide+'" data-page="next-page" title="下一页">下一页</a></li>');
			}
			//是否开启跳页显示
			if(params.jumpOpen){
				liArr.push('<span class="jump-page"><label class="page-label">到第 </label><input type="number" class="jump-num" min=1 onkeyup="this.value=this.value.replace(/[^\\d]/,\'\')"><label class="page-label"> 页</label><button class="jumpPageBtn">确定</button></span>');
			}
			return liArr;
	}
},"yqPage")
