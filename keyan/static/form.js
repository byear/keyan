var selectDivNow=0;	
$(function(){
	var req = getJsUrl();
	var dept_name = decodeURIComponent(req['dept_name']);
	var doctor_name = decodeURIComponent(req['doctor_name']);
	var request_date = decodeURIComponent(req['request_date']);
	var ampm = decodeURIComponent(req['ampm']);
	var drugs = decodeURIComponent(req['drugs']);
	var tid = decodeURIComponent(req['tid']);
	var str = location.href; 
	var autosearch = 0;
	if((str.indexOf("/html/jiuzhenzhinan/czxx/") > 0||str.indexOf("/html/yihutuandui/xunzhaoyisheng/") > 0)&&(doctor_name == "undefined"||doctor_name == ""))
	{
		autosearch = 1;
	}
 	if(dept_name != "undefined")
	{
		//$('.selectDiv').find('span').eq(0).text(dept_name);
		$("#dept_name").val(dept_name);
		//$("#dept_name").prepend("<option value='"+dept_name+"' selected>"+dept_name+"</option>"); 
	}
	if(doctor_name != "undefined")
	{
		$('.selectDiv').find('span').eq(1).text(doctor_name);
		//$("#doctor_name").prepend("<option value='"+doctor_name+"' selected>"+doctor_name+"</option>"); 
	}
	page = 1;
	if(doctor_name != "undefined"||dept_name != "undefined"||request_date!="undefined"||ampm!="undefined")
	{
		if(request_date =='请选择日期'||request_date=="undefined")
		{
			request_date='';
		}
		if(ampm=="undefined")
		{
			ampm="";
		}
		if(dept_name == "undefined")
			dept_name = "";
		if(doctor_name == "undefined")
			doctor_name = "";
		dosearch(dept_name,doctor_name,request_date,ampm,page);
	}
	else if(tid==103||autosearch==1)
	{
		dept_name =doctor_name=request_date=ampm="";
		searchcz(dept_name,doctor_name,request_date,ampm,page);

	}
 	if(drugs != "undefined")
	{
		dosearchdrugs(drugs);
	}
	$('.selectDiv').each(function(i){
		$(this).click(function(){
			var text = $(this).find('span').text()
			//if(text=='请输入科室名称'||text=='请输入医生姓名')
				$(this).find('span').text('');

		})
		
 		})
	 
	 $('.selectDiv').each(function(i){
		if(i>2)
		{
			$(this).find('span').text($(this).find('option:first').text());
			$(this).click(function(){
				selectDivNow=i;
				var selectList="";
				$(this).find('option').each(function(){
				
					selectList=selectList+"<li>"+$(this).text()+"</li>"
					})
				$('.selectLayer').find('ul').html(selectList);	
				$('.selectLayer').width($(this).width());
				$('.selectLayer').css('left',$(this).offset().left);
				$('.selectLayer').css('top',$(this).offset().top+$(this).height()+1);
				$('.selectLayer').show();
				selectLiFun();
				selectLiClick();
				selectLiClick2();
				})
		}
		})
		 
	$('.selectLayer').hover(
	    function(){
			$(this).show();
			},
		function(){
			$(this).hide();
			}
	)
	//--复杂框
	$('.check').toggle(
	   function(){
		   $(this).addClass('checkNow');
		   $(this).find('input').val(1);
		   },
	   function(){
		   $(this).removeClass('checkNow');
		   $(this).find('input').val(0);
		   }
	)
	//--单选
	$('.radio').click(
	   function(){
		   $('.radio').removeClass('radioNow');
		   $(this).addClass('radioNow');
		   $('.radio').find('input').val(0);
		   $(this).find('input').val(1);
		   }
	)
	//-------文本输入框文字消失显示
	$('.input_hover').focus(function(){
		if($(this).attr('value')==$(this).attr('title')){
			$(this).attr('value','');
			}
		})
	$('.input_hover').blur(function(){
		if($(this).attr('value')==$(this).attr('title')||$(this).attr('value')==""){
			$(this).attr('value',$(this).attr('title'));
			}
		})		
	//--数字框
	$('.numInput').each(function(i){
		$(this).find('.num').html($(this).find('input').val());
		$(this).find('.jiaBtn').click(function(){
			$('.numInput').eq(i).find('input').val(Number($('.numInput').eq(i).find('input').val())+1);
			$('.numInput').eq(i).find('.num').html($('.numInput').eq(i).find('input').val());
			})
		$(this).find('.jianBtn').click(function(){
			if(Number($('.numInput').eq(i).find('input').val())>0){
			$('.numInput').eq(i).find('input').val(Number($('.numInput').eq(i).find('input').val())-1);
			}
			$('.numInput').eq(i).find('.num').html($('.numInput').eq(i).find('input').val());
			})	
		})
	//--
	$('.input1').focus(function(){
		$(this).addClass('inputNow');
		})
	$('.input1').blur(function(){
		$(this).removeClass('inputNow');
		})		
	//
	})
	
function selectLiClick(){
	$('.selectLayer').find('li').each(function(i){
		$(this).click(function(){
			$('.selectDiv').eq(selectDivNow).find('span').text($(this).text());
			$('.selectDiv').eq(selectDivNow).find('option').attr('selected',false);
			$('.selectDiv').eq(selectDivNow).find('option').eq(i).attr('selected',true);
			})
		})	
	}	
function selectLiFun(){
	$('.selectLayer').find('li').hover(
	    function(){
			$(this).css('background','#f2f2f2');
			},
		function(){
			$(this).css('background','none');
			}
	)
	}	
//--
function selectLiClick2(){
	$('.selectLayer').find('li').each(function(i){
		if($('.ForgotStep2Div').length>0){
		$(this).click(function(){
			$('.ForgotStep2Div').hide();
			$('.ForgotStep2Div').eq(i).show();
			})
		}
		//--	
		})	
	}	
function getJsUrl(){

	var pos,str,para,parastr; 

	var array =new Array();

	str = location.href; 
	if(str.indexOf("?") > 0)
	{
		parastr = str.split("?")[1]; 
		var arr = parastr.split("&");
		for (var i=0;i<arr.length;i++){
			array[arr[i].split("=")[0]]=arr[i].split("=")[1];
		}
	}
	
	return array;

}

function dosearch(dept_name,doctor_name,request_date,ampm,page)
{
	$.post('http://www.pkuph.cn/sqlserv.php', {action:'getexpert',dept_name:dept_name,doctor_name:doctor_name,request_date:request_date,ampm:ampm,page:page}, function(ret){ 
			$('#DoctorList').html(ret.html);
			$('#pageNum').html(ret.pagehtml);
 		},'json' );
}
function dosearchdrugs(drugs)
{
	$.post('http://www.pkuph.cn/api.php', {action:'getdrugs',drugs:drugs ,page:page}, function(ret){ 
			$('#pagelist').html(ret.html);
			$('#pageNum').html(ret.pagehtml);
 		},'json' );
}
function searchstop(dept_name,doctor_name,request_date,ampm,page)
{
	$.post('http://www.pkuph.cn/sqlserv.php', {action:'getstop',dept_name:dept_name,doctor_name:doctor_name,request_date:request_date,ampm:ampm,page:page}, function(ret){ 
			$('#DoctorList').html(ret.html);
			$('#pageNum').html(ret.pagehtml);
 		},'json' );
}
function searchcz(dept_name,doctor_name,request_date,ampm,page)
{
	$.post('http://www.pkuph.cn/sqlserv.php', {action:'getcz',dept_name:dept_name,doctor_name:doctor_name,request_date:request_date,ampm:ampm,page:page}, function(ret){ 
			$('#DoctorList').html(ret.html);
			$('#pageNum').html(ret.pagehtml);
 		},'json' );
}
function getdoctor(alpha,page)
{
  
	var jobhtml = "";
	var pagehtml = "";
	$.post('/ajax/getdoctor.php?alpha='+alpha, {page:page}, function(ret){ 
         	$('#DoctorList').html(ret.html);
			$('#pageNum').html(ret.pagehtml);
			return;
		jobhtml = "<table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><th width=\"166\">医生姓名</th><th width=\"138\">所在科室</th><th width=\"155\">职称</th><th>专长</th></tr></table>";
		for (var i = 0; i<ret.datas.length; i++)
		{
			 jobhtml +="<tr><td><a href=\"\">"+ret.datas[i].title+"</a></td><td>"+ret.datas[i].typename+"</td><td>"+ret.datas[i].rank+"</td><td><div>"+ret.datas[i].specialty+"</div></td></tr>";
		}
		if(ret.prepage>=0)
			pagehtml += "<a  href=\"javascript:;\" onclick=\"getdoctor("+ret.prepage+")\">&lt;</a>";
		for(var i = 0; i<ret.pages.length;i++)
		{
			
			if(page==ret.pages[i])
				pagehtml += "<a  class=\"aNow\" href=\"javascript:;\" onclick=\"getdoctor("+ret.pages[i]+")\">"+ret.pages[i]+"</a>";
			else
				pagehtml += "<a href=\"javascript:;\" onclick=\"getdoctor("+ret.pages[i]+")\">"+ret.pages[i]+"</a>";
		
		}
		if(ret.nextpage>=0)
			pagehtml += "<a  href=\"javascript:;\" onclick=\"getdoctor("+ret.nextpage+")\">&gt;</a>";
		jobhtml += "</table>";
		
 		$('#DoctorList').html(jobhtml);
		$('#pageNum').html(pagehtml);
	},'json' );
 
}
$(function(){ 
　　 filldate();
}); 
function filldate()
{
	/*var date = Date();
	for(i=0;i<=30;i++)
	{
		var d = new Date(date); 
		d.setDate(d.getDate()+i); 
		curdate = d.getDate();
		if(curdate<10)
			curdate = '0'+curdate;
		var m = d.getMonth()+1; 
		if(m<10)
			m = '0'+m;
		var y = d.getFullYear();
		fulldate = y+'-'+m+'-'+curdate;
		$("#request_date").append("<option value='"+fulldate+"'>"+fulldate+"</option>"); 
	}*/
}

 function gosearch(page)
 {
	 var dept_name = $("#dept_name").val();
	 var doctor_name = $("#doctor_name").val();
	 var request_date =  $("#request_date").val();
	 var ampm =  $("#ampm").val();
	 if(request_date =='请选择日期')
	 {
		request_date='';
	 }
 	 dosearch(dept_name,doctor_name,request_date,ampm,page);
 }
function search()
{
	dept_name = $('#dept_name').val();
	doctor_name = $('#doctor_name').val();
	location.href="/html/yihutuandui/xunzhaoyisheng/index.html?dept_name="+dept_name+"&doctor_name="+doctor_name;
	//location.href="/tools/list.php?tid=103&dept_name="+dept_name+"&doctor_name="+doctor_name;
}
 function gosearchcz(page)
 {
	 var dept_name = $("#dept_name").val();
	 var doctor_name = $("#doctor_name").val();
	 var request_date =  $("#request_date").val();
	 var ampm =  $("#ampm").val();
	 if(request_date =='请选择日期')
	 {
		request_date='';
	 }
 	 searchcz(dept_name,doctor_name,request_date,ampm,page);
 }
function searchdrugs()
{
	var drugs='[object HTMLInputElement]';
 	if($('#drugs').val()!=null&&$('#drugs').val()!="undefined"&&$('#drugs').val()!="药物查询")
	{ 
		
		drugs = $('#drugs').val();
 	}
	else if($('#drugs_name').val()!=null&&$('#drugs_name').val()!="undefined"&&$('#drugs_name').val()!="药品查询")
	{
		drugs = $('#drugs_name').val();
	}
	else if($('#drugs_price').val()!=null&&$('#drugs_price').val()!="undefined"&&$('#drugs_price').val()!="价格查询")
	{
		drugs = $('#drugs_price').val();
	}
	
   	location.href="/search.php?drugs="+drugs;
}
