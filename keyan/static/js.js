$(function(){
	//--
	$('.pageBanner').find('li').hover(
	   function(){
		   $(this).addClass('liNow');
		   },
	   function(){
		   $(this).removeClass('liNow');
		   }
	)
	//--
	$('.pageBanner').find('.btn').toggle(
	   function(){
		   $(this).addClass('btnNow');
		   $('.pageBanner').find('.form').animate({right: -212}, 200);
		   },
	   function(){
		   $(this).removeClass('btnNow');
		   $('.pageBanner').find('.form').animate({right: 0}, 200);
		   }
	)
	//--
	var seriveListNow=0;
	$('.seriveList').find('li:first').addClass('liNow');
	$('.seriveList').find('li').each(function(i){
		$(this).find('h1').click(function(){
			$('.seriveList').find('li').removeClass('liNow');
			$('.seriveList').find('li').eq(i).addClass('liNow');
			})
		})
	//--
	$('.videoShow').find('.btnDiv').find('li').find('img:first').show();	
	$('.videoShow').find('.btnDiv').find('li').hover(
	   function(){
		   $(this).find('img').hide();
		   $(this).find('img:last').show();
		   },
	   function(){
		   $(this).find('img').hide();
		   $(this).find('img:first').show();
		   }
	)
	//--
	// $('.newsList').find('li:last').css('background','none');
	$('.DoctorList').find('tr:even').find('td').addClass('tdOdd');
	$('.DoctorList').find('tr').hover(
	   function(){
		   $(this).find('td').addClass('tdNow');
		   },
	   function(){
		   $(this).find('td').removeClass('tdNow');
		   }
	)
	//--
	$('.Survey').find('h1:first').addClass('h1Now');
	$('.Survey').find('.list:first').show();
	$('.Survey').find('h1').each(function(i){
		$(this).click(function(){
			$('.Survey').find('h1').removeClass('h1Now');
			$(this).addClass('h1Now');
			$('.Survey').find('.list').hide();
			$('.Survey').find('.list').eq(i).show();
			})
		})
	//--
	var fadeFlashTime=new Array();
	$('.fadeFlash').find('li:first').fadeIn(500);
	$('.fadeFlash').each(function(i){
		fadeFlashTime[i] = setInterval("fadeFlashFun("+i+")",5000);
		$(this).find('.btnDiv').find('span').each(function(ii){
			$(this).hover(
			function(){
				clearInterval(fadeFlashTime[i]);
				$('.fadeFlash').eq(i).find('.btnDiv').find('span').removeClass('spanNow');
				$(this).addClass('spanNow');
				$('.fadeFlash').eq(i).find('li').eq(fadeFlashNow[i]).fadeOut(500);
				fadeFlashNow[i]=ii;
				$('.fadeFlash').eq(i).find('li').eq(fadeFlashNow[i]).fadeIn(500);
				fadeFlashTime[i] = setInterval("fadeFlashFun("+i+")",5000);
				},
			function(){}	
				)
			})
		$(this).find('.rightBtn').click(function(){
			clearInterval(fadeFlashTime[i]);
			$('.fadeFlash').eq(i).find('.btnDiv').find('span').removeClass('spanNow');
			$('.fadeFlash').eq(i).find('li').eq(fadeFlashNow[i]).fadeOut(500);
			if(fadeFlashNow[i]<$('.fadeFlash').eq(i).find('li').length-1){
				fadeFlashNow[i]++;
				}else{
					fadeFlashNow[i]=0;
					}
			$('.fadeFlash').eq(i).find('.btnDiv').find('span').eq(fadeFlashNow[i]).addClass('spanNow');
			$('.fadeFlash').eq(i).find('li').eq(fadeFlashNow[i]).fadeIn(500);
			fadeFlashTime[i] = setInterval("fadeFlashFun("+i+")",5000);
			})	
		$(this).find('.leftBtn').click(function(){
			clearInterval(fadeFlashTime[i]);
			$('.fadeFlash').eq(i).find('.btnDiv').find('span').removeClass('spanNow');
			$('.fadeFlash').eq(i).find('li').eq(fadeFlashNow[i]).fadeOut(500);
			if(fadeFlashNow[i]>0){
				fadeFlashNow[i]--;
				}else{
					fadeFlashNow[i]=$('.fadeFlash').eq(i).find('li').length-1;
					}
			$('.fadeFlash').eq(i).find('.btnDiv').find('span').eq(fadeFlashNow[i]).addClass('spanNow');
			$('.fadeFlash').eq(i).find('li').eq(fadeFlashNow[i]).fadeIn(500);
			fadeFlashTime[i] = setInterval("fadeFlashFun("+i+")",5000);
			})	
		})
	//--
	$('.aboutPart2').find('li').hover(
	   function(){
		   $(this).find('.imgDiv').fadeTo(10,0.5);
		   },
	   function(){
		   $(this).find('.imgDiv').fadeTo(10,1);
		   }
	)
	//--
	$('.team').find('li').hover(
	   function(){
		   $(this).css('background','#fafafc');
		   },
	   function(){
		   $(this).css('background','#fff');
		   }
	)
	//--
	$('.servicePart1').find('li').hover(
	   function(){
		   $(this).find('.ico').animate({top: 0}, 200);
		   },
	   function(){
		   $(this).find('.ico').animate({top: 10}, 200);
		   }
	)
	//--
	$('.tabContentDiv').find('.tabContent:first').show();
	$('.tab').each(function(i){
		$(this).find('li').each(function(ii){
			$(this).hover(
			function(){
				$('.tab').eq(i).find('li').removeClass('liNow');
				$(this).addClass('liNow');
				$('.tabContentDiv').eq(i).find('.tabContent').hide();
				$('.tabContentDiv').eq(i).find('.tabContent').eq(ii).show();
				},
			function(){}	
				)
			})
		})
	//--
	var indexPart3Time;
	if($('.indexPart3').length>0){
		indexPart3Time = setInterval("indexPart3Fun()",5000);
		}
	$('.indexPart3').find('.rightBtn').click(function(){
		clearInterval(indexPart3Time);
		imgScrollRight2($('.indexPart3').find('.list'),$('.indexPart3').find('.list').find('li').length-1,352,0);
		indexPart3Time = setInterval("indexPart3Fun()",5000);
		})	
	$('.indexPart3').find('.leftBtn').click(function(){
		clearInterval(indexPart3Time);
		imgScrollLeft2($('.indexPart3').find('.list'),$('.indexPart3').find('.list').find('li').length-1,352,0);
		indexPart3Time = setInterval("indexPart3Fun()",5000);
		})
	//--
	$('.footLink').find('.rightBtn').click(function(){
		imgScrollRight2($('.footLink').find('.wal'),$('.footLink').find('li').length-4,251,0);
		})	
	$('.footLink').find('.leftBtn').click(function(){
		imgScrollLeft2($('.footLink').find('.wal'),$('.footLink').find('li').length-4,251,0);
		})
	//--
	/*$('.History').find('li').each(function(i){
		$(this).find('h1').click(function(){
			$('.History').find('li').removeClass('liNow');
			$('.History').find('li').eq(i).addClass('liNow');
			})
		})
	*/
	//--
	var HistoryNow=0;
	$('.History').find('li').each(function(i){
		$(this).find('h1').click(function(){
			if(HistoryNow==i){
				HistoryNow=100;
				$('.History').find('li').removeClass('liNow');
				}else{
					HistoryNow=i;
					$('.History').find('li').removeClass('liNow');
					$('.History').find('li').eq(i).addClass('liNow');
					}
			})
		})
	//--
	
	$('.indexPart1').find('li').each(function(i){
		$(this).hover(
		   function(){
			   $('.indexPart1Layer').eq(i).css('left',$(this).offset().left);
			   if(i==3){
				   $('.indexPart1Layer').eq(i).css('left',$(this).offset().left-135);
				   }
			   if(i==4){
				   $('.indexPart1Layer').eq(i).css('left',$(this).offset().left-341);
				   } 
			   $('.indexPart1Layer').eq(i).css('top',$(this).offset().top+120);
			   $('.indexPart1Layer').eq(i).show();
			   $('.indexPart1').find('li').eq(i).find('.bg').show();
			   },
		   function(){
			   $('.indexPart1Layer').hide();
			   $('.indexPart1').find('li').find('.bg').hide();
			   }
		)
		})
	$('.indexPart1Layer').each(function(i){
		$(this).hover(
		   function(){
			   $('.indexPart1').find('li').eq(i).find('.bg').show();
			   $(this).show();
			   },
		   function(){
			   $('.indexPart1').find('li').find('.bg').hide();
			   $(this).hide();
			   }
		)
		})	
/*	$('.aNow').each(function(i){
		$(this).hover(
		   function(){
			   $('.sNav').show();
			  
			   $('.sNav').find('div').eq(i).show();
			   },
		   function(){
			   $('.sNav').hide();
			   $('.sNav').find('div').hide();
			   }
		)
		})*/
	//--
	$('.sNavA').each(function(i){
		$(this).hover(
		   function(){
			   $('.sNav').show();
			 
			   $('.sNav').find('div').eq(i).show();
			   
			   },
		   function(){
			   $('.sNav').hide();
			  
			   $('.sNav').find('div').hide();
			   }
		)
		})
	$('.sNav').find('div').each(function(i){
		$(this).hover(
		   function(){
			   $('.sNavA').eq(i).addClass('aNow1');
			   $('.sNav').show();
			   $(this).show();
			   },
		   function(){
			   $('.sNavA').eq(i).removeClass('aNow1');
			   $('.sNav').hide();
			   $(this).hide();
			   }
		)
		})		
	//
	$(function (){
		$(".aboutPart1 a img").hover(
			function (){
				$(this).fadeTo(10,0.5);
					},
			function (){
				$(this).fadeTo(10,1);
			});	
});

	$(function(){
		$(".sideBar ul li").eq(0).click(function(){
		$(".gwewmLayer").show();
		});
	$(".close").click(function(){
		$(".gwewmLayer").hide();
	});
	
});


	$(function(){
		$(".sideBar ul li").eq(2).click(function(){
		$(".ewmLayer").show();
		});
	$(".close").click(function(){
		$(".ewmLayer").hide();
	});
	
});

//

var href=location.href;

var arr = href.split("/");

var len = arr.length-4;
if(arr[len]=="kexueyanjiu"){
$(".wal.nav ul li").eq(3).find("a").attr("class","aNow");
}
if(arr[len] == "jiaoyujiaoxue"){
$(".wal.nav ul li").eq(2).find("a").attr("class","aNow");
}


})