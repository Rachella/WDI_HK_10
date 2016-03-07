#MVC Framework With CSRF

###How it works:
- Cross-Site Request Forgery (CSRF) is a type of attack that occurs when a malicious Web site, email, blog, instant message, or program causes a user's Web browser to perform an unwanted action on a trusted site for which the user is currently authenticated.

#####Cookie-to-Header Token

- Web applications that use JavaScript for the majority of their operations may use an anti-CSRF technique that relies on same-origin policy:

- On login, the web application sets a cookie containing a random token that remains the same for the whole user session

```
Set-Cookie: Csrf-token=i8XNjC4b8KVok4uw5RftR38Wgp2BFwql; expires=Thu, 23-Jul-2015 10:25:33 GMT; Max-Age=31449600; Path=/
```

- JavaScript operating on the client side reads its value and copies it into a custom HTTP header sent with each transactional request

```
X-Csrf-Token: i8XNjC4b8KVok4uw5RftR38Wgp2BFwql
```

```ruby
class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  after_filter :set_csrf_cookie

  def set_csrf_cookie
    cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
  end

  protected

  # In Rails 4.2 and above
  def verified_request?
    super || valid_authenticity_token?(session, request.headers['X-XSRF-TOKEN'])
  end

  # In Rails 4.1 and below
  # def verified_request?
  #   super || form_authenticity_token == request.headers['X-XSRF-TOKEN']
  # end
end
```
