(function(root,factory,plug){
	factory(root.jQuery,plug);
})(window,function($,plug){
	var _this = this;
	var __SETTING__ = {
		"title":"信息",
		"content":"",
		"buttons":[]
	}
	$.fn[plug] = function(options,callback){
		var $this = $.extend(this,__SETTING__,options);
		var _btn = $this.buttons;
		var yesBtn = "hidden",noBtn = "hidden",cancelBtn = ""; 
		if(_btn.length!==0){
			yesBtn = (_btn.indexOf("yes")!==-1)?"":"hidden";
			noBtn = (_btn.indexOf("no")!==-1)?"":"hidden";
		    cancelBtn = (_btn.indexOf("cancel")!==-1)?"":"hidden";
		}
		var _dialog = 
		  '<div class="myModal">'+
          '   <div class="mydialog">'+
          '      <div class="header">'+
          '        <span class="header-title">'+$this.title+'</span>'+
          '        <span class="modal-closeBtn" id="close-btn" title="关闭">x</span>'+
          '      </div>'+
          '      <div class="content">'+$this.content+'</div>'+
          '      <div class="footer">'+
	      '    		<button class="mydialog-btn modal-yesBtn '+yesBtn+'" value="yes">是</button>'+
          '    		<button class="mydialog-btn modal-noBtn '+noBtn+'" value="no">否</button>'+
          '         <button class="mydialog-btn modal-closeBtn modal-cancelBtn '+cancelBtn+'" value="cancel">取消</button>'+
          '      </div>'+
          '    </div> '+
      	  '	</div>';
      	   $(document.body).append(_dialog);
     	   if($this.content.length<=50){
     	   		$(".mydialog").css({maxWidth:"300px"})
     	   	}else if($this.content.length<=130&&$this.content.length>50){
     	   		$(".mydialog").css({maxWidth:"418px"})
 	   		}else if($this.content.length>130){
 	   			$(".mydialog").css({maxWidth:"700px"})
 	   		}
      	   $(".modal-closeBtn").on("click",function(e){
                $(this).parents().find(".mydialog:first").addClass("out");
                _this.closeDialog($(this));
            });
            $("button:not(.modal-closeBtn)").on("click",function(){
            	var v = $(this).attr("value");
            	var obj = {
            		"btn":v,
            		"obj":_this,
            		"params":$this
            	}
            	callback(obj);
            });
	}
	//关闭对话框
	_this.closeDialog = function(thiz){
		var h = thiz.parents().find(".mydialog:first").height();
		thiz.parents().find(".mydialog:first").animate({top:-h},200).fadeOut(1,function(){
                  $(".myModal").remove();
                });
	}
},"myModal")
