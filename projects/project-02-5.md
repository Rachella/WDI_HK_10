# Project 2.5 - Your Project 2 on Rails

## Overview

It is time to get some hands-on experience to build a Rails application. Your task is to convert your Project 2 Hapi.js application into a **Ruby on Rails** application. You also need to use **PostgreSQL** database to replace **MongoDB**, which means you can **no longer rely on embedded documents** to store your data. 

You should not expect any big change in your front-end code except for very syntax changes from **ejs** (Embedded JavaScript) to **erb** (Embedded Ruby). You also need to put your previous **jQuery** code into the appropriate files inside Rails' folder structure.

|               |      Project 2      |     Project 2.5     |
--------------- | ------------------- | ------------------- |
|  Framework    |      Hapi.js        |    Ruby on Rails    |
|  Database     |      MongoDB        |     PostgreSQL      |
|  Template     |        EJS          |        ERB          |

## Things NOT required

You **DO NOT** need to implement these in the Rails version
  - Authentication 
  - Session & Cookie
  - User Sign Up

We will cover these topics next week so right now you don't need to worry about them yet. For this exercise, you just need to create some user accounts using `rails c` and you can also assume the user can logon successfully.

In the `app/controllers/application_controller.rb` file, you can do this to ensure that the **FIRST** user from your `users` table is **always** the current user.

```ruby
class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  #protect_from_forgery with: :exception

  # Just use default (:null_session) for this super simple app
  protect_from_forgery

  before_action :set_current_user

  private
 
  def set_current_user
    @current_user = User.find(1)
  end
end
```

Then in **ANY** of your ERB file, you can use `@current_user` to refer to the user who is currently logon.

## Very rough guideline

Some ideas on how you can start doing this:

### Design your PostgreSQL schema 
If you are using embedded documents in MongoDB, then you need to translate that data model into a relational database model, meaning, the previously embedded documents have to be stored in a separate table. And you also need to determine the **associations** between different type of objects and reflect this in your schema design.

### Data Preparation
You can either use SQL to directly add some test data to your PostgreSQL DB or you can do it via the Rails console. However, there is a better way to do this if you feel like exploring something we haven't fully covered in class. Try to prepare some **seed data** in your project by following [this guide](http://guides.rubyonrails.org/v4.2/active_record_migrations.html#migrations-and-seed-data).

### Create the Rails project
You should know how to do this by now. If not, review the steps in the [Rails Intro Lesson](../04-server-applications/rails-intro-lesson).

## Deliverables
Just create your own repo to do this. No need to fork from this one.

