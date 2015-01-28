/**********************************offers page************************************/

$(document).on("pagebeforeshow", "#offers_page", function(e, data){ 
    $('#all_offers').text('');
        var all_offers = $('#all_offers');
        $.ajax({
                url: ''+sitefiles+'offers.php',
                dataType: 'jsonp',
                jsonp: 'jsoncallback',
                timeout: 5000,
                success: function(data){
                        //alert(data);
                        $.each(data, function(i,item){
									
									var landmark = '<li><h3>'+item.name+'</h3>';
									if(item.image.length > 1) {
										landmark += '<img src="'+siteimages+item.image + '" alt=""/>';
									}else{
										landmark += '<img src="" alt=""/>';
									}						
									
									landmark += '<div class ="end_store"><p>'+item.subtitle+'</p></div>'+ '<div class ="offer_right"><div class= "expire">(expires '+item.expire+')</div>'
									+'<div class ="redeem_button2"><a class= "redeem" href="#offer?offer=' + item.id + '"><img src="img/button.png" alt="picture"/><span>Redeem</span></a></div></div>'
									//+'<div class= "text">'+item.content+'</div>'
									+'<div class= "bottom_line"></div></li>'
									;
									all_offers.append(landmark);
                                });
                       // response.append(data);
                },
                error: function(){
                        $('#all_offers').text('There was an error loading the data.');
                        alert('There was an error loading the data of offer');
                }

        });
        /**********************end of offers*******************************/
 });
 /**************************************************************************************/