$(document).ready(function() {
  $( ".reference.external" ).attr('data-lightbox', function(index) {
    if (index != 1){
      return "image-" + (index+1);
    }
  });
});
