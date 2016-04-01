$(document).ready(function() {

    $.noConflict(); 
	
	// SWITCH TOGGLE	
	//var elem = document.querySelector('.js-switch');

	var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));

	$('.js-switch').each(function() {
	    new Switchery(this, { 
	    	color: '#37cf36', 
			secondaryColor: '#43bdcd', 
			jackColor: '#ffffff', 
			jackSecondaryColor: '#ffffff',
			size: 'small',
			disabled: false, 
			disabledOpacity: 0.5
	    })
	});

	elems.forEach(function(html) {
	  var switchery = new Switchery(html);
	});

	// default switch toggle OFF
	$(".accordion").hide();

    // Activate switch
	$('#activate-content-1').change(function(){
        if(this.checked) {
            $("#tab-default-1 .accordion").show();
            $('.innertree').attr('style','display:block');
        } else {
            $("#tab-default-1 .accordion").hide();
            $('.innertree').attr('style','display:none');
        }
    });

    $('#activate-content-2').change(function(){
        if(this.checked)
            $("#tab-default-2 .accordion").show();
        else
            $("tab-default-2 .accordion").hide();

    });

    $('#activate-content-3').change(function(){
        if(this.checked)
            $("#tab-default-3 .accordion").show();
        else
            $("tab-default-3 .accordion").hide();

    });

    $('#activate-content-4').change(function(){
        if(this.checked)
            $("#tab-default-4 .accordion").show();
        else
            $("tab-default-4 .accordion").hide();

    });

    $('#activate-content-5').change(function(){
        if(this.checked)
            $("#tab-default-5 .accordion").show();
        else
            $("tab-default-5 .accordion").hide();

    });

    $('#activate-content-6').change(function(){
        if(this.checked)
            $("#tab-default-6 .accordion").show();
        else
            $("tab-default-6 .accordion").hide();

    });

	//Add switch toggle after ID setting-accordion--section

    $('ul.innertree li a').click(function(){

        $('.accordion-1').attr('style','display:block');

    });

    // $('#bodyCell span:first', this).prop('class', 'omar');

    $('#bodyCell span').eq(1).attr('id','SFSettingContainer');

    // Convert SF Span to Div
    // Get all the span's inside #bodyCell
    //var $span = $("span#SFSettingContainer");

    // // Replace all the span's with a div
    // $span.replaceWith(function () {
    //     return $('<div/>', {
    //         class: 'SFSettingContainer',
    //         html: this.innerHTML
    //     });
    // });
    
    //  SEARCH
    (function($){
        $(document).ready(function() {
            $("#searchsettings").keyup(function(){
                
                // Retrieve the input field text and reset the count to zero
                var filter = $(this).val();

                // Loop through the comment list
                $("#searchList li").each(function(){
                    
                    // If the list item does not contain the text phrase fade it out
                    if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                        $(this).addClass('hidden');
                    // Show the list item if the phrase matches and increase the count by 1
                    } else {
                        $(this).removeClass('hidden');
                        
                    }
                });

            
            });
        })
    })(jQuery);

});