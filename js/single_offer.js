/**********************************offer************************************/
$(document).on("pagebeforeshow", "#offer", function(e, data){ 
        if ($.mobile.pageData && $.mobile.pageData.offer){
            console.log("Parameter long=" + $.mobile.pageData.offer);
             var id_ponude = $.mobile.pageData.offer;
             //alert(id_ponude);
             jQuery('#single_offer').text('');
             jQuery( "#single_offer" ).empty();
        }
        /*************************single offer********************************/
        var offer = $('#single_offer');

        $.ajax({
                url: ''+sitefiles+'offer.php?id='+id_ponude+'',
                dataType: 'jsonp',
                jsonp: 'jsoncallback',
                timeout: 5000,
                success: function(data){
                        //alert(data);

                        $.each(data, function(i,item){
                                        var landmark = '<h3>'+item.name+'</h3>'
                                        +'<img src="'+siteimages+item.image+'" width="340" height="240" alt="picture"/>'
                                        +'<p>'+item.subtitle+'</p>'
                                        +'<div class= "expire">(expires '+item.expire+')</div>'
                                        +'<div class= "text"><p>'+item.content+'</p></div>'
                                        ;
                                        offer.append(landmark);
                                });
                       // response.append(data);
                },
                error: function(){
                        $('#single_offer').text('There was an error loading the data.');
                        alert('There was an error loading the data');
                }

        });
        /**********************end of offer*******************************/
 });
 /**************************************************************************************/