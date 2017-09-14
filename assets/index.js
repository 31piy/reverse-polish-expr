// Don't corrupt the global namespace. Use a closure instead.
(function ($) {

  // jQuery's document.ready function
  $(function () {

    // Bind our handler to form's submit event
    $('#expression-parser-form').submit(function (e) {
      e.preventDefault();

      var expression = $('#expression').val();

      // Validate if the expression is valid
      if (!expression) {
        return alert('Expression cannot be empty');
      }

      // Fire AJAX call to evaluate expression. Prevents page refresh.
      $.ajax({
        url: '/evaluate',
        data: {
          expression: expression.slice(1, -1)
        }
      }).then(function (data) {
        $('#result').text('Result: ' + data).removeClass('error');
      }).catch(function () {
        $('#result').text('The expression contains error(s).').addClass('error');
      });
    });

  });

})(jQuery);
