$( "#selectable" ).selectable({
  selected: function( event, ui ) {
    var sel = jQuery(ui.selected).text();
    var re = new RegExp(sel,"gi");
    if( $( "#ms_input" ).val().match(re) ) return;

    // if blank then add to input
    if( $( "#ms_input" ).val() == "" ) {
      $( "#ms_input" ).val(sel);
      return;
    }

    // if All selected
    if( sel.match(/All/gi) ) {
      $( "#selectable .ui-selected").removeClass("ui-selected");
      $( "#selectable li:eq(0)").addClass("ui-selected");
      $( "#ms_input" ).val(sel);
      return;
    }

    // if input contains All then add present selected to input and clear All selection 
    if( $( "#ms_input" ).val().match(/All/gi) ) {
      $( "#ms_input" ).val(sel);
      $( "#selectable .ui-selected:eq(0)" ).removeClass("ui-selected");
      return;
    }
    
    $( "#ms_input" ).val( $( "#ms_input" ).val() + "," + sel );

  },
  
  unselected: function( event, ui ) {
    var unsel = jQuery(ui.unselected).text();
    var re = new RegExp(unsel + ",|," + unsel + "|" + unsel,"gi");
    $( "#ms_input" ).val( 
      $( "#ms_input" ).val() ? $( "#ms_input" ).val().replace(re, "") : "" );
  }
});

$( "#ms_input" ).focusin( function(){
  $( "#selectable" ).show();
});

$( "#ms_input" ).focusout( function(){
  $( "#selectable" ).hide();
});