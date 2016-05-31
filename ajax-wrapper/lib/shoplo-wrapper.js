  var s,
    SHOPLOAJAX = {
        init: function(){
          console.log('SHOPLO AJAX init');
        },
        getProduct: function(productUrl){
          var ajax = $.ajax({
            url: '/products/'+ productUrl +'.js',
            dataType: "json",
            type: "GET",
          });
          return ajax;
        },
        getCart: function(){
          var ajax = $.ajax({
            url: '/cart.js',
            dataType: "json",
            type: "GET",
          });
          return ajax;
        },
        updateCart: function(productId,productQty){
           var ajax = $.ajax({
            url: '/cart/update.js',
            dataType: "json",
            type: "POST",
            data: {
              quantity: productQty,
              id: productId
            },
          });
          return ajax;
        },
        clearCart: function(){
          var ajax = $.ajax({
            url: '/cart/clear.js',
            dataType: "json",
            type: "POST",
          });
          return ajax;
        },
        addProductToCart: function(productId,productQty){
          var ajax = $.ajax({
            url: '/cart/add.js',
            data: {
              quantity: productQty,
              id: productId
            },
            dataType: "json",
            type: "POST",
          });
          return ajax;
        },
        addEmailToNewsletter: function(email){
          var ajax = $.ajax({
            url: '/newsletter/add.js',
            data: {
              email: email
            },
            dataType: "json",
            type: "POST",
          });
        }
    }
$(function(){
  SHOPLOAJAX.init();
});