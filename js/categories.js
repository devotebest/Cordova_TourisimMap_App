/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(){
	var options = $('#categories');
	var options_search = $('#categories2');	
	$.ajax({
		url: ''+sitefiles+'categories.php',
		dataType: 'jsonp',
		jsonp: 'jsoncallback',
		timeout: 5000,
		success: function(data){
			//alert(data);
				$.each(data, function(i,item){ 
				var landmark = '<option value ="'+item.id+'">'+item.name+'</option>';			
				options.append(landmark);
				options_search.append(landmark);
			});
			//response.append(data);
		},
		error: function(){
			$('#categories').text('There was an error loading the data.');
			alert('There was an error loading the data of category');
		}
	});
});
function getbusiness()
{
	//alert('radi');
	//$('#stores').text('There was an error loading the data.');
	var textname = $("#input").val(); 
	//alert(textname);
	var selectid = $('select[name="categories"]').val()
	//alert(selectid);
	//alert(selectid);
	var response = $('#stores');
	$('#stores').text('');
	jQuery('#stores_abc').text('');
	jQuery( "#stores_abc" ).empty();
	jQuery('#stores_abc2').text('');
	$.ajax({
		url: ''+sitefiles+'search.php?id='+selectid+'&textname='+textname,
		dataType: 'jsonp',
		jsonp: 'jsoncallback',
		timeout: 5000,
		success: function(data){
			//alert(data);
					
					$.each(data, function(i,item){ 
					var landmark = '<li><a class href="#business?id=' + item.id + '"><h2>'+item.name+'</h2></a>'
									+'<a href="#business?id=' + item.id + '"><img src="'+siteimages+item.image+'" width="340" height="240" alt="picture"/></a>'
									+'<div class ="store_more">'
									+'<a class="store_directions" href="#direction?lan='+item.latitude+'&lon='+item.longitude+'"><img src="img/button.png" alt="picture"/><span>Directions</span></a>'
									+'<a class ="store_number" href="tel:'+item.telefon+'"><img src="img/button.png" alt="picture"/><span>Call<br/> '+item.telefon+'</span></a><br />'
									+ '<input id="post-id" type="hidden" value="'+item.id+'" />'
									+'</div>';
					
					response.append(landmark);
									response_search.append(landmark);
				});
					//response.append(data);
		},
		error: function(){
			$('#stores').text('There was an error loading the data.');
			alert('There was an error loading the data of category');
		}
	});
} 