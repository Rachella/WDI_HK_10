// Client

// Update the tweet with tweet_id=102
$.ajax({
  type: 'PATCH',
  url: 'tweets/102',
  data: {
    message: "Message changed!"
  }
})

// Get all tweets with keyword=wdi
$.ajax({
  type: 'GET',
  url: 'tweets?keyword=wdi'
})