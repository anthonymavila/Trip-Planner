//////////////////////////////////////////////
/// page_handler.js
///----------------------
/// Version: 0.1 (Beta)
///----------------------
/// This JavaScript Library is used for manipulating 
/// the web page elements for abstersive.com

var PageHandler = function () {
  this.viewport      = {};
    this.viewport.width  = $(window).width();
    this.viewport.height = $(window).height();
};

PageHandler.prototype.ShowLoading = function() {

	//Put up the load box..
	$("#load_box").css("margin-top", ((this.viewport.height-$("#load_box").height())/2)+"px");



		nw = $("nav").width();
		$("#page_container").width(PageHandler.viewport.width - nw);
		$("#page_container").height(PageHandler.viewport.height);



}

PageHandler.prototype.ShowNavigationBar = function() {

	if ( PageHandler.viewport.width < 800 ) {
		$("nav").width( PageHandler.viewport.width/10 );
		$("nav > ul > li").each(function(index){
			$(this).width( PageHandler.viewport.width/10 );
			$(this).height( PageHandler.viewport.width/10 );
		});
	} else {
		$("nav > ul > li").each(function(index){
			$(this).width( "3vw" );
			$(this).height( "3vw" );
		});
	}
	//Adjust the nav icon sizes..
	$("nav > ul > li > i").each( function(index) {
		container_box = $(this).parent().height();
		start_size_em = 0.5;
		while ( $(this).width() <= (container_box*0.4) ) {
			start_size_em += 0.5;
			$( this ).css("font-size", start_size_em+"em");
		}
	});

	$("#load_box").css("animation", "none").fadeOut();
	//roll up the nav bar..
	$("nav").height(0);
	$("nav").css("opacity", 1);
	$("nav").animate({
		height: this.viewport.height
	}, 1500, function(){
		PageHandler.BringUpLogo();
	});
}

PageHandler.prototype.ClearLoading = function() {
	$("#load_box").css("animation", "none");
	$("#load_box").animate({
		"opacity": 0
	}, 1000, function(){
		PageHandler.ShowNavigationBar();
	});
}

PageHandler.prototype.BringUpLogo = function() {
	$("#logo_bg").height(this.viewport.width/2.5);
	$("#logo_bg").width(this.viewport.width/2.5);

	$("#logo_bg").css("margin-top", ((this.viewport.height-$("#logo_bg").height())/2)+"px");
	$("#logo_bg").css("margin-left", ((this.viewport.width-$("#logo_bg").width())/2)+"px");

	$("#logo_bg").animate({
		"opacity": 0.5
	}, 1000);
}

PageHandler.prototype.DisableMenu = function(opt) {
	if ( opt ) { $("#"+opt).addClass("menu-active-item"); }
	$("nav > ul > li").each( function(index) {
		$(this).addClass("eventless");
	});
}

PageHandler.prototype.EnableMenu = function(opt) {
	if ( opt ) { $("#"+opt).removeClass("menu-active-item"); }
	$("nav > ul > li").each( function(index) {
		$(this).removeClass("eventless");
	});
}

PageHandler.prototype.SlideOut = function(opt) {
	if ( PageHandler.is_animating == true ) { return false; }
	if ( $("#"+opt+"_slide").length ) {
		temp_w = $("#"+opt).width();
		temp_p = $("#"+opt).position();
		temp_p.left += temp_w - 1; 
		$( "#"+opt+"_slide" ).stop().animate({
			"left": temp_p.left+"px"
		}, 500);
		return;
	}

	temp_w = $("#"+opt).width();
	temp_h = $("#"+opt).height();
	temp_p = $("#"+opt).position();
	temp_p.left += temp_w - 1;
	temp_p.top += 1;
	temp_s = -1 * temp_w;
	text = $("#"+opt).attr("ltext");
	$( "#load_box" ).after( "<div id='"+opt+"_slide' style='height:"+temp_h+"px;position:absolute;top: "+temp_p.top+"px;left: "+temp_s+"px;' class='slider'>"+text+"</div>" );
	$( "#"+opt+"_slide" ).stop().animate({
		"left": temp_p.left+"px"
	}, 500);
}

PageHandler.prototype.SlideIn = function(opt) {
	if ( PageHandler.is_animating == true ) { return false; }
	temp_w = -1 * $( "#"+opt+"_slide" ).width();
	$( "#"+opt+"_slide" ).stop().animate({
		"left": temp_w+"px"
	}, 800, function(){
		//$("#"+opt+"_slide").remove();
	});	
}



PageHandler.prototype.StickOut = function(opt) {
	temp_w = $("#"+opt).width();
	temp_p = $("#"+opt).position();
	temp_p.left += temp_w - 1; 
	$( "#"+opt+"_slide" ).stop().animate({
		"left": temp_p.left+"px"
	}, 750, function(){

		$.get("views/"+$("#"+opt).attr("page")+".html", function(data){
			//PageHandler.UpdateLocation(opt);

			$("#page_container").html("");
			$("#page_container").removeClass("has_animation");
			$("#page_container").css("opacity", 0);
			$("#page_container").css("transform", "none");

			$("#page_container").height(1);
			$("#page_container").css("opacity", 1);
			$("#page_container").animate({
				"height": PageHandler.viewport.height
			}, 1000, function(){
				$("#page_container").html(data);
				PageHandler.is_animating = false;
				PageHandler.SlideIn(opt);
				PageHandler.EnableMenu(opt);
				page_init();
			});
		});

	});
}

PageHandler.prototype.ShowPage = function(opt) {
	if ( PageHandler.is_animating == true ) { return false; }
	PageHandler.is_animating = true;
	PageHandler.DisableMenu(opt);
	$("#logo_bg").remove();
	PageHandler.ShowLoading(opt);
	$("#load_box").css("display", "block");
	$("#load_box").css("opacity", 1);
	$("#load_box").css("animation", "LoadTextBlinkAnimation 3s infinite");
	PageHandler.HidePage();
	PageHandler.StickOut(opt);
}

PageHandler.prototype.HidePage = function(opt) {
	$("#page_container").addClass("has_animation");
	$("#page_container").css("transform", "perspective(400px) rotateY(90deg)");
}








PageHandler.prototype.ShowPageEx = function(opt) {
	$("#logo_bg").remove();
	PageHandler.ShowLoading(opt);
	$("#load_box").css("display", "block");
	$("#load_box").css("opacity", 1);
	$("#load_box").css("animation", "LoadTextBlinkAnimation 3s infinite");
	$.get("views/"+$("#"+opt).attr("page")+".html", function(data){
		PageHandler.UpdateLocation(opt);
		$("#page_container").height(1);
		$("#page_container").css("opacity", 1);
		$("#page_container").animate({
			"height": PageHandler.viewport.height
		}, 1000, function(){
			$("#page_container").html(data);
			$("#page_container").addClass("has_animation");
			$("#page_container").css("transform", "perspective(400px) rotateY(90deg)");
		});
	});
}




PageHandler.prototype.UpdateLocation = function(opt) {
	pageurl = $("#"+opt).attr('page');
	if(pageurl!=window.location){
	   window.history.pushState({path:pageurl},'',pageurl);	
	}
	return false;
}



PageHandler = new PageHandler;
PageHandler.ShowLoading();

$( document ).ready(function() {
	PageHandler.ClearLoading();

	$(function(){
		$("#page_container").on('transitionend webkitTransitionEnd', function(e){
			//do nothing anymore...
		});
	});

});

