// Initialize Tree		
$( document ).ready( function( ) {

    j$ = jQuery.noConflict();

    j$( '.tree li' ).each( function() {
        if( j$( this ).children( 'ul' ).length > 0 ) {
            j$( this ).addClass( 'parent' );     
        }
    });
 
    j$( '.tree li.parent > a' ).click( function( ) {
        j$( this ).parent().toggleClass( 'active' );
        j$( this ).parent().children( 'ul' ).slideToggle( 'fast' );
    });
 
    j$( '#all' ).click( function() {		 
        j$( '.tree li' ).each( function() {
            j$( this ).toggleClass( 'active' );
            j$( this ).children( 'ul' ).slideToggle( 'fast' );
        });
    });

    // Initialize Tabs
    j$('[data-ccjs="tabs"]').tabs();

    // Initialize Tooltips
    j$('[data-ccjs="tooltip"]').tooltip();

});