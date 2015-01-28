 /**********************************search page************************************/

$(document).on("pagebeforeshow", "#directory", function(e, data){ 
    //alert('search');
    jQuery('#stores_abcsearch').text('');
    jQuery('#stores').text('');
    var response = $('#stores');
	
    $.ajax({
        url: ''+sitefiles+'ajaxdb.php',
        dataType: 'jsonp',
        jsonp: 'jsoncallback',
        timeout: 5000,
        success: function(data){
            //alert(data);
                
            $.each(data, function(i,item){ 
                var landmark = '<li><a class href="#business?id=' + item.id + '"><h2>'+item.name+'</h2></a>'
                +'<a href="#"><img src="'+siteimages+item.image+'" alt="picture"/></a>'
                +'<div class ="store_more">'
                +'<a class="store_directions" href="#direction?lan='+item.latitude+'&lon='+item.longitude+'">Directions</a>'
                +'<a class ="store_number" href="tel:'+item.telefon+'">Call<br/> '+item.telefon+'</a><br />'
                + '<input id="post-id" type="hidden" value="'+item.id+'" />'
                +'</div>';
				
                response.append(landmark);
            });
        //response.append(data);
        },
        error: function(){
            $('.stores_search').text('There was an error loading the data.');
            alert('There was an error loading the data');
        }
    });
    
$(".letter_search").bind('click', function(){
//alert('ABC');
$("#Loading").fadeIn(); //show when submitting
var letter = $(".letter_search").val;
//alert(letter);
//var response = $('#stores');
jQuery('#stores_abcsearch').text('');
jQuery('#stores_abcsearch').empty('');
var response = $('#stores_abcsearch');
jQuery('#stores').text('');
jQuery( "#stores" ).empty();
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
                            +'<a href="#business?id=' + item.id + '"><img src="'+siteimages+item.image+'" width="340" height="240" alt="picture"/></a>'
                            +'<div class ="store_more">'
                            +'<a class="store_directions" href="#direction?lan='+item.latitude+'&lon='+item.longitude+'"><img src="img/button.png" alt="picture"/><span>Directions</span></a>'
                            +'<a class ="store_number" href="tel:'+item.telefon+'"><img src="img/button.png" alt="picture"/><span>Call<br/> '+item.telefon+'</span></a><br />'
                            + '<input id="post-id" type="hidden" value="'+item.id+'" />'
                            +'</div>';

                            response.append(landmark);
                        });
                        //response.append(data);
                },
                error: function(){
                        $('#stores_abcsearch').text('There was an error loading the data.');
                        alert('There was an error loading the data');
                }
        });
});

  $(document).on('click', '#submit', function() { // catch the form's submit event
                var textname = $('input[name="business_input"]').val(); 
               // alert(textname);
                var selectid = $('select[name="categories_search"]').val()
                $('#stores').text('');
                $('#stores_abc').text('');
                $('#stores').text('');
                var response_search = $('#stores');
                jQuery('#stores_abcsearch').text('');
                $.ajax({
                        url: ''+sitefiles+'search.php?id='+selectid+'&textname='+textname+'%',
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
                                                response_search.append(landmark);
                                        });
                                //response.append(data);
                        },
                        error: function(){
                                $('#stores').text('There was an error loading the data.');
                                alert('There was an error loading the data');
                        }
                });         
            return false; // cancel original event to prevent form submitting
        }); 
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
$('#stores').text('');
var response_search = $('#stores');
jQuery('#stores_abcsearch').text('');
$.ajax({
	url: ''+sitefiles+'search.php?id='+selectid+'&textname='+textname+'%',
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
                                response_search.append(landmark);
			});
                //response.append(data);
	},
	error: function(){
		$('#stores').text('There was an error loading the data.');
		alert('There was an error loading the data');
	}
});
} 
