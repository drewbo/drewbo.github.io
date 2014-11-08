$(document).ready(function() {
  $( ".reference.external" ).attr('data-lightbox', function(index) {
    return "image-" + (index+1);
  });
});
