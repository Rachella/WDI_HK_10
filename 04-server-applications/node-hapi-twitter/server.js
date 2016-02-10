// Server

server.route([
  // Handle a PATCH Request
  {
    method: 'PATCH',
    path: '/tweets/{id}',
    handler: function(request, reply){
      request.params.id // -> 102
      request.payload // {message: "Message changed!" }
    }
  },
  // Handle a GET Request
  {
    method: 'GET',
    path: '/tweets',
    handler: function(request, reply){
      request.query // { keyword: "wdi" }
      request.query.keyword // wdi
    }
  }
]);