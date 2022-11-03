// topLinks
var swiper = new Swiper(".topLinksSwiper", {
  slidesPerView: "auto",
  spaceBetween: 30,
  navigation: {
    nextEl: ".topLink-next",
    prevEl: ".topLink-prev",
  },
});

// increase decrease qty
function increaseValue(button, limit) {
  const numberInput = button.parentElement.querySelector('.qty');
  var value = parseInt(numberInput.innerHTML, 10);
  if(isNaN(value)) value = 0;
  if(limit && value >= limit) return;
  numberInput.innerHTML = value+1;
}
function decreaseValue(button) {
  const numberInput = button.parentElement.querySelector('.qty');
  var value = parseInt(numberInput.innerHTML, 10);
  if(isNaN(value)) value = 0;
  if(value < 1) return;
  numberInput.innerHTML = value-1;
}


$('.proDetailQty .qtyBtn').click(function(){
  var tParent = $(this).parents('.quantityField');
  var inputVal = $(this).parents('.quantityField').find('.qty').text();
  if (inputVal == 0) {
    tParent.addClass('vRed');
  } else if (inputVal > 1) {
    tParent.addClass('vGreen');
  } else {
    tParent.removeClass('vRed vGreen');
  }
})



$('#cardFld').on('input propertychange paste', function() {
  var value = $('#cardFld').val();
  var formattedValue = formatCardNumber(value);
  $('#cardFld').val(formattedValue);
});

function formatCardNumber(value) {
  var value = value.replace(/\D/g, '');
  var formattedValue;
  var maxLength;
  // american express, 15 digits
  if ((/^3[47]\d{0,13}$/).test(value)) {
    formattedValue = value.replace(/(\d{4})/, '$1 ').replace(/(\d{4}) (\d{6})/, '$1 $2 ');
    maxLength = 17;
  } else if((/^3(?:0[0-5]|[68]\d)\d{0,11}$/).test(value)) { // diner's club, 14 digits
    formattedValue = value.replace(/(\d{4})/, '$1 ').replace(/(\d{4}) (\d{6})/, '$1 $2 ');
    maxLength = 16;
  } else if ((/^\d{0,16}$/).test(value)) { // regular cc number, 16 digits
    formattedValue = value.replace(/(\d{4})/, '$1 ').replace(/(\d{4}) (\d{4})/, '$1 $2 ').replace(/(\d{4}) (\d{4}) (\d{4})/, '$1 $2 $3 ');
    maxLength = 19;
  }

  $('#cardFld').attr('maxlength', maxLength);
  return formattedValue;
}
