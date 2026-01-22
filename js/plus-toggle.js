// FAQ accordion plus / minus toggle
$(document).ready(function () {

  // On page load – handle already opened accordions
  $('.collapse').each(function () {
    var $icon = $(this).prev('.card-header').find('i');

    if ($(this).hasClass('show')) {
      $icon.removeClass('ti-plus').addClass('ti-minus');
    } else {
      $icon.removeClass('ti-minus').addClass('ti-plus');
    }
  });

  // When accordion opens
  $('.collapse').on('shown.bs.collapse', function () {
    $(this)
      .prev('.card-header')
      .find('i')
      .removeClass('ti-plus')
      .addClass('ti-minus');
  });

  // When accordion closes
  $('.collapse').on('hidden.bs.collapse', function () {
    $(this)
      .prev('.card-header')
      .find('i')
      .removeClass('ti-minus')
      .addClass('ti-plus');
  });

});
