/*******************************directory page*************************************/
/*********search************/
$(document).ready(function () {
            $("#input").keyup(function () {
                var userInput = $(this).val();
                console.log("here");
                $("#stores li").map(function (index, value) {
                    $(value).toggle($(value).text().toLowerCase().indexOf(userInput) >= 0);
                });
            });
        });
/****************************/                    
$(document).on("pagebeforeshow", "#directory", function(e, data){ 
	winH = $(window).height();
	$("#directory #directory-content #stores").height(winH- 250);

	$("#directory #input_search").val('');
	$("#directory #categories").prop('selectedIndex', 0); 
	
	jQuery('#stores').text('');
	$('#stores').text('');
	var response = $('#stores');
	$.mobile.showPageLoadingMsg();
	$.ajax({
		url: ''+sitefiles+'ajaxdb.php',
		dataType: 'jsonp',
		jsonp: 'jsoncallback',
		timeout: 5000,
		success: function(data){
			$.mobile.hidePageLoadingMsg();
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
					+'<div class ="direction_button"><a class="store_directions" href="#direction?lan='+item.latitude+'&lon='+item.longitude+'"><img src="img/button.png" alt="picture"/><span>Directions</span></a></div>'
					+'<div class ="number_button"><a class ="store_number" href="tel:'+item.telefon+'"><img src="img/button.png" alt="picture"/><span>Call<br/> '+item.telefon+'</span></a></div><br />'
					+ '<input id="post-id" type="hidden" value="'+item.id+'" />'
					+'</div><div class="bottom_line"></div>';
					
					response.append(landmark);
				});
				//response.append(data);
				if (data == '' || data==undefined) {
					$('#stores').text('No result');
				}
		},
		error: function(){
			$.mobile.hidePageLoadingMsg();
			$('#stores').text('There was an error loading the data of directory.');
			alert('There was an error loading the data of directory.');
		}
	});
});

$(document).on('click', '#submit', function() { // catch the form's submit event
	var textname = $('input[name="username"]').val(); 
	var selectid = $('select[name="store_categories"]').val();
	searchDirectory(selectid, textname);
	return false; // cancel original event to prevent form submitting
}); 

/****************************************************************************/
function selectCategory(val) {
	var textname = $('input[name="username"]').val(); 
	var selectid = val.value;
	searchDirectory(selectid, textname);
}

function searchDirectory(selectid, textname) {
	$('#stores_search').text('');
	$('#stores_abc').text('');
	$('#stores').text('');
	jQuery('#stores').text('');
	jQuery("#stores").empty();
	var response_search = $('#stores');
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
					//alert(landmark);
				 });
				//response.append(data);
				if (data == '' || data==undefined) {
					$('#stores').text('No result');
				}
			},
			error: function(){
					$('#stores').text('There was an error loading the data.');
					alert('There was an error loading the data of directory');
			}
	});  
	
}