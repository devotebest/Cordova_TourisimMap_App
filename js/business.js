/**********************************business************************************/
$(document).on("pagebeforeshow", "#business", function(e, data){ 
        
        if ($.mobile.pageData && $.mobile.pageData.id){
            console.log("Parameter id biznisa=" + $.mobile.pageData.id);
             var id_strane = $.mobile.pageData.id;
             //alert(id_strane);
            jQuery('#store').text('');
            jQuery( "#store" ).empty();
        }

                    /******ovde se trazi post na koji se klinulo na prethodnoj strani******/
                    var post = $('#store');
                    
                    $.ajax({
						url: ''+sitefiles+'post.php?id='+id_strane+'',
						dataType: 'jsonp',
						jsonp: 'jsoncallback',
						timeout: 5000,
						success: function(data){
								//alert(data);
						$.each(data, function(i,item){ 
						   var landmark = '<h2>'+item.name+'</h2>';
						   url = siteimages+item.image;
						   url = url.toLowerCase();
							if (/(jpg|gif|png|jpeg|bmp|gif)$/.test(url)){
								landmark += '<img src="'+siteimages+item.image+'" width="340" height="240" alt="picture"/>'
							}
							landmark += '<h2 class ="adresa">'+item.address+'</h2>'
							+'<div class ="store_more">'
							+'<div class ="direction_button"><a class ="store_directions" href="#direction?lan='+item.latitude+'&lon='+item.longitude+'"><img src="img/button.png" alt="picture"/><span>Directions</span></a></div>'
							+'<div class ="number_button"><a class ="store_number" href="tel:'+item.telefon+'"><img src="img/button.png" alt="picture"/><span>Call <br/>'+item.telefon+'</span></a></div>'
							+'<div class ="site_button"><a class ="store_site" onclick="visitWebSite('+item.web_site+')" target ="_blank" href="'+item.web_site+'"><img src="img/button.png" alt="picture"/><span>Visit our website</span></a></div>'
							+ '<input id="post-id" type="hidden" value="'+item.id+'" />'
							+'</div>'
							+'<h3>Member Information</h3>'
							+'<div class ="text"><p>'+item.content+'</p></div>'
							+'<h3>Our Current Offers</h3>';
								   
										post.append(landmark);
								});
					   // response.append(data);
						},
						error: function(){
								$('#store').text('There was an error loading the data.');
								alert('There was an error loading the data');
						}
                    });
                    /**********************end of post*******************************/
                    /*************************offers********************************/
                    if (id_strane){
                        jQuery('#offers').text('');
                        jQuery( "#offers" ).empty();
                    }
                    var offers = $('#offers');
                    $.ajax({
                            url: ''+sitefiles+'offers.php?id='+id_strane+'',
                            dataType: 'jsonp',
                            jsonp: 'jsoncallback',
                            timeout: 5000,
                            success: function(data){
                                    //alert(data);
                                    $.each(data, function(i,item){ 
                                                    var landmark = '<li><a id ="'+ item.id +'" class href="#offer?offer=' + item.id + '">'+item.name+'</a>'
                                                    +'<div class ="reedem_button"><a class ="reedem_offer" href="#offer?offer=' + item.id + '"><img src="img/button.png" alt="picture"/><span>Redeem</span></a></div></li>'
                                                    ;
                                                    offers.append(landmark);
                                            });
                                   // response.append(data);
                            },
                            error: function(){
                                    $('#offers').text('There was an error loading the data.');
                                    alert('There was an error loading the data');
                            }
                            
                    });
                    /**********************end of offers*******************************/
 });
 /**************************************************************************************/
 
 function visitWebSite(url) {
	if(url == undefined || url == null || url == "null")
		alert("This business does not have a website");
 }