// ACCORDION
jQuery(document).ready(function() {

	function close_accordion_section() {
		jQuery('.accordion .accordion-section-title').removeClass('active');
		jQuery('.accordion .accordion-section-content').slideUp(300).removeClass('open');
	}

	jQuery('.accordion-section-title').click(function(e) {
		// Grab current anchor value
		var currentAttrValue = jQuery(this).attr('href');

		if(jQuery(e.target).is('.active')) {
			close_accordion_section();
		} else {
			close_accordion_section();

			// Add active class to section title
			jQuery(this).addClass('active');
			// Open up the hidden content panel
			jQuery('.accordion ' + currentAttrValue).slideDown(300).addClass('open'); 
		}

		e.preventDefault();

	});

	// Letting Tree View to Access Accordion
	jQuery('.amazon').click(function(e) {

		// Grab current anchor value
		var currentAttrValue = jQuery('.amazonsettings').attr('href');

		if(jQuery(e.target).is('.active')) {
			close_accordion_section();
		} else {
			close_accordion_section();
			jQuery('.accordion ' + currentAttrValue).slideDown(300).addClass('open'); 
		}

		e.preventDefault();
		
	});
	jQuery('.avalara').click(function(e) {
		
		// Grab current anchor value
		var currentAttrValue = jQuery('.avalarasettings').attr('href');

		if(jQuery(e.target).is('.active')) {
			close_accordion_section();
		} else {
			close_accordion_section();
			jQuery('.accordion ' + currentAttrValue).slideDown(300).addClass('open'); 
		}

		e.preventDefault();
		
	});
	jQuery('.bigcommerce').click(function(e) {
		
		// Grab current anchor value
		var currentAttrValue = jQuery('.bigcommercesettings').attr('href');

		if(jQuery(e.target).is('.active')) {
			close_accordion_section();
		} else {
			close_accordion_section();
			jQuery('.accordion ' + currentAttrValue).slideDown(300).addClass('open'); 
		}

		e.preventDefault();
		
	});

});

// TABS
$(document).ready(function(){
	
	$('ul.slds-tabs--default__nav li').click(function(){

		$('ul.slds-tree--default__nav li').removeClass('active');

	});

});