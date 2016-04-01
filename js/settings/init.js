// Initialize Tree		
$( document ).ready( function( ) {

    $( '.tree li' ).each( function() {
        if( $( this ).children( 'ul' ).length > 0 ) {
            $( this ).addClass( 'parent' );     
        }
    });
 
    $( '.tree li.parent > a' ).click( function( ) {
        $( this ).parent().toggleClass( 'active' );
        $( this ).parent().children( 'ul' ).slideToggle( 'fast' );
    });
 
    $( '#all' ).click( function() {		 
        $( '.tree li' ).each( function() {
            $( this ).toggleClass( 'active' );
            $( this ).children( 'ul' ).slideToggle( 'fast' );
        });
    });

    // Initialize Tabs
    // $('[data-ccjs="tabs"]').tabs();
    $('ul.slds-tabs--default__nav li').click(function(){
        $('ul.slds-tree--default__nav li').removeClass('active');
    });

    // Initialize Tooltips
    $('[data-ccjs="tooltip"]').tooltip();

});
