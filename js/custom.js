$(document).bind("mobileinit", function(){
    $.mobile.page.prototype.options.domCache = true ;
    $.mobile.allowCrossDomainPages = true;
});
$(document).bind("pagebeforechange", function( event, data ) {
    $.mobile.pageData = (data && data.options && data.options.pageData)
        ? data.options.pageData
        : null;
});
$.mobile.allowCrossDomainPages = true;


/*var sitefiles = 'http://173.249.152.96/~phpdev/tourgeauga-admin/ajax_mobile/';
var siteimages = 'http://173.249.152.96/~phpdev/tourgeauga-admin/images/';
var sitemaps = 'http://173.249.152.96/~phpdev/tourgeauga-admin/';
*/
var sitefiles = 'http://1485.tekk3.com/tourgeauga-admin/ajax_mobile/';
var siteimages = 'http://1485.tekk3.com/tourgeauga-admin/images/';
var sitemaps = 'http://1485.tekk3.com/tourgeauga-admin/';


/*
$(document).on('pagebeforeshow', '#directory', function(){  
     $.mobile.ignoreContentEnabled=true;
        $(document).on('click', '#submit', function() { // catch the form's submit event
                var textname = $('input[name="username"]').val(); 
               // alert(textname);
                var selectid = $('select[name="categories"]').val()
                $('#stores_search').text('');
                $('#stores_abc').text('');
                $('#stores').text('');
                var response_search = $('#stores');
                jQuery('#stores_abcsearch').text('');
                $.ajax({
                        url: 'http://173.249.152.96/~phpdev/tourgeauga-admin/ajax_mobile/search.php?id='+selectid+'&textname='+textname+'%',
                        dataType: 'jsonp',
                        jsonp: 'jsoncallback',
                        timeout: 5000,
                        success: function(data){
                                //alert(data);

                                $.each(data, function(i,item){ 
                                                var landmark = '<li><a class href="#business?id=' + item.id + '"><h2>'+item.name+'</h2></a>'
                                                +'<a href="#business?id=' + item.id + '"><img src="http://173.249.152.96/~phpdev/tourgeauga-admin/images/'+item.image+'" width="340" height="240" alt="picture"/></a>'
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
                                $('#stores_search').text('There was an error loading the data.');
                                alert('There was an error loading the data');
                        }
                });         
            return false; // cancel original event to prevent form submitting
        });    
});
*/