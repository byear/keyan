//--
var imgScrollNum2=new Array();
for(i=0;i<50;i++){
  imgScrollNum2[i]=0;	
}
function imgScrollRight2(a,b,c,d){
	    //a.stop();
		if(imgScrollNum2[d]<b){
			imgScrollNum2[d]++;
			a.animate({scrollLeft: imgScrollNum2[d]*c}, 300);
			}
	}	
function imgScrollLeft2(a,b,c,d){
	    //a.stop();
		if(imgScrollNum2[d]>0){
			imgScrollNum2[d]--;
			a.animate({scrollLeft: imgScrollNum2[d]*c}, 300);		
			}
	}
//--
var fadeFlashNow=new Array();
for(i=0;i<50;i++){
  fadeFlashNow[i]=0;	
}	
function fadeFlashFun(i){
	$('.fadeFlash').eq(i).find('.btnDiv').find('span').removeClass('spanNow');
	$('.fadeFlash').eq(i).find('li').eq(fadeFlashNow[i]).fadeOut(500);
	if(fadeFlashNow[i]<$('.fadeFlash').eq(i).find('li').length-1){
		fadeFlashNow[i]++;
		}else{
			fadeFlashNow[i]=0;
			}
	$('.fadeFlash').eq(i).find('li').eq(fadeFlashNow[i]).fadeIn(500);
	$('.fadeFlash').eq(i).find('.btnDiv').find('span').eq(fadeFlashNow[i]).addClass('spanNow');
	}
//--
function indexPart3Fun(){
	if(imgScrollNum2[0]==$('.indexPart3').find('.list').find('li').length-1){
		imgScrollNum2[0]=-1;
		}
	imgScrollRight2($('.indexPart3').find('.list'),$('.indexPart3').find('.list').find('li').length-1,352,0);
	}	