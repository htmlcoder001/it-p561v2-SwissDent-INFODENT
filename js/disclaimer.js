(function ($, Drupal, drupalSettings) {

  $(document).ready(() => {

    $('#modalDisclaimer').modal({
      show: true,
      backdrop: 'static',
      keyboard: false
    });
    $('#modalDisclaimer').modal('show');

    $('.acceptModal').click(() =>{
      $('#modalDisclaimer').modal('hide');
      $('#modalDisclaimer').remove();

    });

    $('.dismissModal').click(() =>{
      window.location.href = '/';
    })
  })

})(jQuery, Drupal, drupalSettings);
