$books = $(".books");
$search = $("#book-name");

var fetch = function (searchword) {
  $.ajax({
    method: "GET",
    url: "https://www.googleapis.com/books/v1/volumes?q="+searchword,
    dataType: "json",
    success: function(data) {
      console.log(data);
      $books.empty();
      // turn our "template" into html and compile
      var source = $('#book-template').html();
      var template = Handlebars.compile(source);

      for(i=0;i<data.items.length;i++) {
      		var newHTML = template({
        	Title: data.items[i].volumeInfo.title,
        	Description: data.items[i].volumeInfo.description,
        	Author: data.items[i].volumeInfo.authors[0],
        	Image: data.items[i].volumeInfo.imageLinks.thumbnail
      	});
		$(".books").append(newHTML);
      }
      // fill our template with information
      
	$search.val('');
      // append our new html to the page
      
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  });
};

//fetch AJAX on click using content of text box is argument
$(".btn").on("click",function () {
  fetch($search.val());
});
