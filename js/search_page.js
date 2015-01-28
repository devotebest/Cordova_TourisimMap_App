 /**********************************search page************************************/

$(document).on("pagebeforeshow", "#search_page", function(e, data){ 
	winH = $(window).height();
	$("#search_page #directory-content #stores_search").height(winH- 250);
	
	$('#search_page #input_search').val('');
	$("#search_page #categories2").prop('selectedIndex', 0); 
	
    //alert('search');
    jQuery('#stores_abcsearch').text('');
    jQuery('.stores_search').text('');
    $('#stores_search').text('');
    $('#stores_abc').text('');
    $('#stores').text('');
   /* var response = $('#stores_search');
	
    $.ajax({
        url: ''+sitefiles+'ajaxdb.php',
        dataType: 'jsonp',
        jsonp: 'jsoncallback',
        timeout: 5000,
        success: function(data){
            //alert(data);
                
            $.each(data, function(i,item){ 
                var landmark = '<li><a class href="#business?id=' + item.id + '"><h2>'+item.name+'</h2></a>'
                +'<a href="#">';
				url = siteimages+item.image;
				if (/(jpg|gif|png|jpeg|bmp|gif)$/.test(url)){
					landmark += '<img src="'+siteimages+item.image+'" width="340" height="240" alt="picture"/>' 
				}
				landmark += '</a>'
                +'<div class ="store_more">'
                +'<a class="store_directions" href="#direction?lan='+item.latitude+'&lon='+item.longitude+'">Directions</a>'
                +'<a class ="store_number" href="tel:'+item.telefon+'">Call<br/> '+item.telefon+'</a><br />'
                + '<input id="post-id" type="hidden" value="'+item.id+'" />'
                +'</div>';
				
                response.append(landmark);
            });
        //response.append(data);
            if (data == '' || data==undefined) {
                $('#stores_search').text('No result');
            }
        },
        error: function(){
            $('.stores_search').text('There was an error loading the data.');
            alert('There was an error loading the data of search');
        }
    });*/
 });
 
$(document).ready(function() {
	$(".letter_search").bind('click', function(){
		//alert('ABC');
		$("#Loading").fadeIn(); //show when submitting
		var letter = $(".letter_search").val;
		//alert(letter);
		//var response = $('#stores');
		jQuery('#stores_abcsearch').text('');
		jQuery('#stores_abcsearch').empty('');
		var response = $('#stores_search');
		jQuery('#stores_search').text('');
		jQuery( "#stores_search" ).empty();
		//jQuery( "#stores" ).live();
		//jQuery("#stores_abc").html('');
		if($(this).html() == '#'){
			var new_letter= 'broj';
		}else{
			var new_letter= $(this).html();
		}
		//alert(new_letter);
				$.ajax({
						url: ''+sitefiles+'alphabeticalSearch.php?letter='+new_letter,
						dataType: 'jsonp',
						jsonp: 'jsoncallback',
						timeout: 5000,
						success: function(data){
								//alert(data);
								$.each(data, function(i,item){ 
									var landmark = '<li><a class href="#business?id=' + item.id + '"><h2>'+item.name+'</h2></a>'
									+'<a href="#business?id=' + item.id + '">';
									url = siteimages+item.image;
									url = url.toLowerCase();
									if (/(jpg|gif|png|jpeg|bmp|gif)$/.test(url)){
										landmark += '<img src="'+siteimages+item.image+'" width="340" height="240" alt="picture"/>' 
									}
									landmark += '</a>'									
									+'<div class ="store_more">'
									+'<a class="store_directions" href="#direction?lan='+item.latitude+'&lon='+item.longitude+'"><img src="img/button.png" alt="picture"/><span>Directions</span></a>'
									+'<a class ="store_number" href="tel:'+item.telefon+'"><img src="img/button.png" alt="picture"/><span>Call<br/> '+item.telefon+'</span></a><br />'
									+ '<input id="post-id" type="hidden" value="'+item.id+'" />'
									+'</div><div class="bottom_line"></div>';

									response.append(landmark);
								});
								//response.append(data);
								if (data == '' || data==undefined) {
											$('#stores_search').text('No result');
								}
						},
						error: function(){
								$('#stores_search').text('There was an error loading the data.');
								alert('There was an error loading the data of search');
						}
				});
		});
 });
  $(document).on('click', '#search_page #submit', function() { // catch the form's submit event
		var textname = $('input[name="business_input"]').val(); 
		var selectid = $('select[name="categories_search"]').val()
        searchDirectoryOnSearchPage(selectid, textname)
        return false; // cancel original event to prevent form submitting
}); 

 /**************************************************************************************/
 function getbusiness_serch()
{
//alert('radi');
//$('#stores').text('There was an error loading the data.');
var textname = $("#input_search").val(); 
//alert(textname);
var selectid = $('select[name="categories_search"]').val()
//alert(selectid);
//alert(selectid
$('#stores_search').text('');
var response_search = $('#stores_search');
jQuery('#stores_abcsearch').text('');
$.ajax({
	url: ''+sitefiles+'search.php?id='+selectid+'&textname='+textname,
	dataType: 'jsonp',
	jsonp: 'jsoncallback',
	timeout: 5000,
	success: function(data){
		//alert(data);
                
                $.each(data, function(i,item){ 
				var landmark = '<li><a class href="#business?id=' + item.id + '"><h2>'+item.name+'</h2></a>'
				+'<a href="#business?id=' + item.id + '">';
				url = siteimages+item.image;
				url = url.toLowerCase();
				if (/(jpg|gif|png|jpeg|bmp|gif)$/.test(url)){
					landmark += '<img src="'+siteimages+item.image+'" width="340" height="240" alt="picture"/>' 
				}
				landmark += '</a>'
				+'<div class ="store_more">'
				+'<a class="store_directions" href="#direction?lan='+item.latitude+'&lon='+item.longitude+'"><img src="img/button.png" alt="picture"/><span>Directions</span></a>'
				+'<a class ="store_number" href="tel:'+item.telefon+'"><img src="img/button.png" alt="picture"/><span>Call<br/> '+item.telefon+'</span></a><br />'
				+ '<input id="post-id" type="hidden" value="'+item.id+'" />'
				+'</div><div class="bottom_line"></div>';
				
				response_search.append(landmark);
			});
		//response.append(data);
		if (data == '' || data==undefined) {
			$('#stores_search').text('No result');
		}
	},
	error: function(){
		$('#stores_search').text('There was an error loading the data.');
		alert('There was an error loading the data of search');
	}
});
} 

function searchCategory(val) {
	var textname = $('input[name="username"]').val(); 
	var selectid = val.value;
	searchDirectoryOnSearchPage(selectid, textname);
}

function searchDirectoryOnSearchPage(selectid, textname) {
	$('#stores_search').text('');
	$('#stores_abc').text('');
	$('#stores').text('');
	var response_search = $('#stores_search');
	jQuery('#stores_abcsearch').text('');
	var url = sitefiles+'search.php?id='+selectid+'&textname=' + textname;
	$.ajax({
			url: url,
			dataType: 'jsonp',
			jsonp: 'jsoncallback',
			timeout: 5000,
			success: function(data){
					//alert(data);
					$.each(data, function(i,item){ 
								var landmark = '<li><a class href="#business?id=' + item.id + '"><h2>'+item.name+'</h2></a>'
								+'<a href="#business?id=' + item.id + '">';
								url = siteimages+item.image;
								url = url.toLowerCase();
								if (/(jpg|gif|png|jpeg|bmp|gif)$/.test(url)){
									landmark += '<img src="'+siteimages+item.image+'" width="340" height="240" alt="picture"/>' 
								}
								landmark += '</a>'
								+'<div class ="store_more">'
								+'<a class="store_directions" href="#direction?lan='+item.latitude+'&lon='+item.longitude+'"><img src="img/button.png" alt="picture"/><span>Directions</span></a>'
								+'<a class ="store_number" href="tel:'+item.telefon+'"><img src="img/button.png" alt="picture"/><span>Call<br/> '+item.telefon+'</span></a><br />'
								+ '<input id="post-id" type="hidden" value="'+item.id+'" />'
								+'</div><div class="bottom_line"></div>';
								response_search.append(landmark);
					});
					//response.append(data);
					if (data == '' || data==undefined) {
						$('#stores_search').text('No result');
					}
			},
			error: function(){
					$('#stores_search').text('There was an error loading the data.');
					alert('There was an error loading the data of search');
			}
	}); 
}