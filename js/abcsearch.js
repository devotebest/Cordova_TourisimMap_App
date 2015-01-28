
    $(document).ready(function() {
        $("#Loading").hide();
        $(".letter").bind('click', function(){
            $("#Loading").fadeIn(); //show when submitting
            var letter = $(".letter").val;
        //alert(letter);
        var response = $('#stores');
        jQuery('#stores_abc').text('');
        jQuery('#stores').text('');
        //var response = $('#stores_abc');
        
        jQuery('#stores').text('');
        jQuery( "#stores" ).empty();
        if($(this).html() == '#'){
            var new_letter= 'broj';
        }else{
            var new_letter= $(this).html();
        }
        //alert(new_letter);
        //jQuery( "#stores" ).live();
        //jQuery("#stores_abc").html('');
                $.ajax({
					url: ''+sitefiles+'alphabeticalSearch.php?letter='+new_letter,
					dataType: 'jsonp',
					jsonp: 'jsoncallback',
					timeout: 5000,
					success: function(data){
							//alert(data);
						$.each(data, function(i,item){ 
							var landmark = '<li><a class href="#business?id=' + item.id + '"><h2>'+item.name+'</h2></a>' + '<a href="#business?id=' + item.id + '">';
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
						   /* if(landmark === ''|| landmark === null){
								landmark ="No results";
							}
							if(yourVariable === 'object'==null || landmark==undefined || landmark==''){
								 alert("No results");
							}*/
						   /* if(landmark){
								landmark =landmark;
							}else{
								landmark ='No results';
							}
							alert(typeof landmark);
							if (typeof landmark == 'undefined') {
								alert("No results");
							}
							if (landmark instanceof Object == false) {
								alert('Not an object');
							  }
							  else {
								alert('An object');
							  }
*/
							response.append(landmark);
		 
						});
						if (data == '' || data==undefined) {
							//$('#stores_abc').text('No result');
							$('#stores').text('No result');
						  }
						//response.append(data);
				},
				error: function(){
						$('#stores').text('There was an error loading the data.');
						alert('There was an error loading the data');
				}
			});
        });
    });
