$books = $(".books");

var fetch = function (isbn) {
  $.ajax({
    method: "GET",
    url: "https://www.googleapis.com/books/v1/volumes?q=isbn:0439023521",
    dataType: "json",
    success: function(data) {
      $books.empty();
      console.log(data);
      $books.append("<h1>"+data.items[0].volumeInfo.title+"</h1>");
      $books.append("<p>"+data.items[0].volumeInfo.description+"</p>");
      $books.append("<h3>"+data.items[0].volumeInfo.authors[0]+"</h3>");
      $books.append("<img src="+data.items[0].volumeInfo.imageLinks.thumbnail+"/>");
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  });
};

$(".btn").on("click",function () {
  fetch();
});
