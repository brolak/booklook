$books = $(".books");
$isbn = $("#book-name");

var fetch = function (isbn) {
  $.ajax({
    method: "GET",
    url: "https://www.googleapis.com/books/v1/volumes?q=isbn:"+isbn,
    dataType: "json",
    success: function(data) {
      $books.empty();
      // turn our "template" into html and compile
      var source = $('#book-template').html();
      var template = Handlebars.compile(source);

      // fill our template with information
      var newHTML = template({
        Title: data.items[0].volumeInfo.title,
        Description: data.items[0].volumeInfo.description,
        Author: data.items[0].volumeInfo.authors[0],
        Image: data.items[0].volumeInfo.imageLinks.thumbnail
      });

      // append our new html to the page
      $(".books").append(newHTML);
      //clear text field
      $isbn.val('');
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  });
};

//fetch AJAX on click using content of text box is argument
$(".btn").on("click",function () {
  fetch($isbn.val());
});
