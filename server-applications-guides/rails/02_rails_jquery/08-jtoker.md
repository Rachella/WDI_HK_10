## Learning Rails + jQuery with Instagram

###What Is jToker

[jToker](https://github.com/lynndylanhurley/j-toker) is a client side module for jQuery. This module is designed to work out-of-the-box with Devise-Token-Auth.

**IF you are using jquery, you can use [NG-Token-Auth](https://github.com/lynndylanhurley/ng-token-auth)**

---
###How It Works
![how-token-works](https://github.com/lynndylanhurley/ng-token-auth/raw/master/test/app/images/flow/token-update-detail.jpg)

---
###Installing jToker

steps:

1. run `bower install j-toker --save`
2. In `app/assets/javascripts/application.js`
    3. add `//= require jquery-deparam/jquery-deparam.js`
    3. add `//= require jquery-cookie/jquery.cookie.js`
    3. add `//= require pubsub-js/src/pubsub.js`
    3. add `//= require j-toker/dist/jquery.j-toker.js`

---
###Configuring jToker

In `app/assets/javascripts/application.js`

```js
$.auth.configure({
  // By default, you only need to configure apiUrl
  // Note that if you put a '/' at the end of the link, there will be errors when calling the api
  apiUrl: 'http://localhost:3000'
})
```

For more configurations go [here](https://github.com/lynndylanhurley/j-toker#configuration)

---
### jToker API

#### API Usage
First of all, keep in mind that all API methods are asynchronous. Each method returns a jQuery.Deferred() promise that will be resolved upon success, or rejected upon failure.

- example usage

  ```
    $.auth
    .oAuthSignIn({provider: 'github'})
    .then(function(user) {
      alert('Welcome ' + user.name + '!');
    })
    .fail(function(resp) {
      alert('Authentication failure: ' + resp.errors.join(' '));
    });
  ```

<a name="signup"></a>
####Signup

1. Create a form. You need `email`, `password`, and `password_confirmation`

  ```
    <form id="signup-form">
      <input type="email" name="email">
      <input type="password" name="password">
      <input type="password" name="password_confirmation">
      <button type="submit"></button>
    </form>
  ```


2. In your javascript, setup event listener for the form and use the following code

  ```javascript
    $('#signup-form').on('submit', function(){
      $.auth.emailSignUp({
        email: $('#signup-form input[name="email"]').val(),
        password: $('#signup-form input[name="password"]').val(),
        password_confirmation: $('#signup-form input[name="password_confirmation"]').val()
      }).then(function(user){
        alert('Welcome ' + user.name + '!');
      }).fail(function(resp){
        alert('Authentication failure: ' + resp.errors.join(' '));
      });
    });
  ```

3. You can also pass any arbitrary attrubute / values to be assigned to the user at account creation:

  ```javascript
    $.auth.emailSignUp({
      email: 'test@test.com',
      password: '*****',
      password_confirmation: '*****',
      favorite_color: 'black'
    });
  ```

###Logout

1. setup the logout button

  ```
    <button id="logout-button">Logout</button>
  ```

2. in your javascript, setup the event listener

  ```
    $('#logout-button').on('click', function(){
      $.auth.signOut();
    });
  ```

###Login

Setup the form like the one in [Signup](#signup) and use `$.auth.emailSignIn` instead of `$.auth.emailSignUp`

---
###Extra Information. There are more stuff you can do!

Aside from signup, login, and logout, there is actually many more functions like forget password, reset password, facebook login...etc. For more read [this](https://github.com/lynndylanhurley/j-toker#api)