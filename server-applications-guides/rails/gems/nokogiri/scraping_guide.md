## Scraping using Rails and Nokogiri

#### Create a brand new Rails app
- You can follow instructions here: https://github.com/wdi-hk-8/rails-basic-template
- Push to Github
- Push to Heroku

#### Get Kimono
1. Check out https://www.kimonolabs.com/
2. Sign up for an account
3. Install Kimono Chrome extension: https://chrome.google.com/webstore/detail/kimono/deoaddaobnieaecelinfdllcgdehimih?hl=en
4. Use the Kimono chrome extension to scrape a website
5. Use its tools to get matching html elements
  - screenshots

#### Add `nokogiri` gem to Rails app
1. `gem 'nokogiri'`
2. Install library with `bundle install`

#### Creating a rake task
1. First create a `task_file_name.rake` file in `lib/tasks` folder. (eg. scrape.rake)
2. Template for a Rails rake job:

```ruby
namespace :task_file_name do
  # this is a description of your task
  desc "Task Description Here"

  # this is your task function
  task :task_name => :environment do
    # do something
  end
end
```

#### To Run a Rake Task

```terminal
rake task_file_name:task_name
```

For example, you can do the following

```ruby
namespace :scrape do
  desc “Scrape Google Finance Fundamentals”
  task :google_finance => :environment do
    puts “hello world!”
  end
end
```

#### Access a website
- Add the following code snippets inside your task function

```ruby
require 'open-uri'

url = "http://www.google.com"
document = open(url).read
puts document
```

#### Parsing with Nokogiri

```ruby
html_doc = Nokogiri::HTML(document)

    # columns
puts html_doc.css("div.id-incannualdiv > table.gf-table.rgt > tbody > tr > td.lft.lm").text
puts html_doc.css("div.id-incannualdiv > table.gf-table.rgt > tbody > tr > td:nth-child(2).r").text
puts html_doc.css("div.id-incannualdiv > table.gf-table.rgt > tbody > tr > td:nth-child(3).r").text
puts html_doc.css("div.id-incannualdiv > table.gf-table.rgt > tbody > tr > td:nth-child(4).r").text
puts html_doc.css("div.id-incannualdiv > table.gf-table.rgt > tbody > tr > td.r.rm").text
```

#### Parsing Google Finance's row names with Nokogiri

```ruby
namespace :scrape do
  # this is a description of your task
  desc "Scraping Google Finance Fundamentals Data"

  # this is your task function
  task :google_finance => :environment do
    # In order to access a website, I need to require this
    require 'open-uri'

    # In order to scrape elements on a website, I need to require nokogiri
    require 'nokogiri'

    # this access the site
    url = "https://www.google.com/finance?q=NASDAQ%3AAAPL&fstype=ii"
    document = open(url).read

    # this parse the site using Nokogiri
    html_doc = Nokogiri::HTML(document)

    # this is the format of what we want. I get this from Kimono where you have highlighted these items
    data_format = "div.id-incannualdiv > table.gf-table.rgt > tbody > tr > td.lft.lm"

    # use nokogiri to get all the data that shares the common format
    row_names = html_doc.css(data_format)

    puts row_names
  end
end
```

#### Parsing CSV to get NASDAQ companies

```ruby
  desc "Scrape companies"
  task :make_companies => :environment do
    require 'open-uri'
    require 'csv'

    url = "http://s3.amazonaws.com/nvest/nasdaq_09_11_2014.csv"

    url_data = open(url)

    CSV.foreach(url_data) do |symbol, name|
      puts "#{name}: #{symbol}"
      # Company.create(:name => name, :symbol => symbol)
    end
  end
```

#### Storing data
1. Create migration files and models to change database
- rails g model company
- rails g model annualincome
2. Store data from the task file

#### Migration file for Annualincome

```ruby
class CreateAnnualincomes < ActiveRecord::Migration
  def change
    create_table :annualincomes do |t|
      t.integer :company_id

      t.string :currency
      t.date :period
      t.decimal :revenue
      t.decimal :other_revenue
      t.decimal :total_revenue
      t.decimal :total_cost_of_revenue
      t.decimal :gross_profit
      t.decimal :general_expense
      t.decimal :randd
      t.decimal :depreciation
      t.decimal :interest_expense
      t.decimal :unusual_expense
      t.decimal :other_operating_expense
      t.decimal :total_operating_expense
      t.decimal :operating_income
      t.decimal :interest_income
      t.decimal :gain_on_sale_of_asset
      t.decimal :other_income
      t.decimal :income_before_tax
      t.decimal :income_after_tax
      t.decimal :minority_interest
      t.decimal :equity_in_affiliates
      t.decimal :net_income_before_extra_item
      t.decimal :accounting_change
      t.decimal :discontinued_operations
      t.decimal :extra_item
      t.decimal :net_income
      t.decimal :preferred_dividends
      t.decimal :income_available_to_common_excl_extra
      t.decimal :income_available_to_common_incl_extra
      t.decimal :basic_weighted_average_shares
      t.decimal :basic_eps_excl_extra_items
      t.decimal :basic_eps_incl_extra_items
      t.decimal :dilution_adjustment
      t.decimal :diluted_weighted_average_shares
      t.decimal :diluted_eps_exclextra_items
      t.decimal :diluted_eps_inclextra_items
      t.decimal :dividends_per_share
      t.decimal :gross_dividends
      t.decimal :net_income_after_stock_expense
      t.decimal :basic_eps_after_stock_expense
      t.decimal :diluted_eps_after_stock_expense
      t.decimal :supplement_depreciation
      t.decimal :total_special_items
      t.decimal :normalized_income_before_taxes
      t.decimal :effect_of_special_items_on_income_taxes
      t.decimal :income_taxes_impact_of_special_items
      t.decimal :normalized_income_after_taxes
      t.decimal :normalized_income_avail_to_common
      t.decimal :basic_normalized_eps
      t.decimal :diluted_normalized_eps

      t.timestamps
    end
  end
end
```

#### Storing Annualincome data for each company in our database

```ruby
namespace :scrape do
  desc "Scraping Google Finance Fundamentals Data"
  task :google_finance => :environment do
    Company.all.each do |company|
      record_data(company)
    end
  end

  def record_data(company)
    require 'open-uri'
    require 'nokogiri'

    url = "http://www.google.ca/finance?q="+company.symbol.upcase+"&fstype=ii"

    document = open(url).read
    html_doc = Nokogiri::HTML(document)

    # columns
    # puts html_doc.css("div.id-incannualdiv > table.gf-table.rgt > tbody > tr > td.lft.lm").text
    # puts html_doc.css("div.id-incannualdiv > table.gf-table.rgt > tbody > tr > td:nth-child(2).r").text
    # puts html_doc.css("div.id-incannualdiv > table.gf-table.rgt > tbody > tr > td:nth-child(3).r").text
    # puts html_doc.css("div.id-incannualdiv > table.gf-table.rgt > tbody > tr > td:nth-child(4).r").text
    # puts html_doc.css("div.id-incannualdiv > table.gf-table.rgt > tbody > tr > td.r.rm").text

    details = html_doc.css("div.id-incannualdiv > table.gf-table.rgt > tbody > tr > td.r.rm")

    if not details.any?
      return
    end

    new_record = company.annualincomes.new

    Annualincome.columns[4..52].each_with_index do |column, index|
      new_record["#{column.name}"] = details[index].text
      new_record.save
    end
  end
end
```

#### Class notes with commenting

```ruby
namespace :scrape do
  # this is a description of your task
  desc "Scraping Google Finance Fundamentals Data"

  # this is your task function
  task :google_finance => :environment do
    require 'open-uri'
    require 'nokogiri'

    # Loop through all the companies and extract each company symbol. An example of a symbol is 'AAPL' for Apple Inc.

    # Company.all # what data type does it return to me?

    # What are data types?
    # - strings
    # - integers
    # - hash
    # - array <-------
    # - boolean

    all_companies = Company.all # this is an array

    all_companies.each do |company|
      # puts company.symbol
    end

    # Open the corresponding websites for each company based on a set of URLs

    # Open the Apple website
    url = "https://www.google.com/finance?q=AAPL&fstype=ii"
    site = open(url).read

    # Getting the site ready to be parse using Nokogiri
    html_doc = Nokogiri::HTML(site)

    # Identify the data structure that I would like to scrape. This can be found from Kimono
    data_structure = "div.id-incannualdiv > table.gf-table.rgt > tbody > tr > td:nth-child(2).r"

    # Parse the site using the data structure format
    income_statement = html_doc.css(data_structure)

    # print it to see if it's correct!
    # puts income_statement

    # Create a new record
    new_record = AnnualIncome.new

    # what data type does new_record have?
    # array?
    # hash? <----
    # integer?
    # string?
    # boolean?

    # retrieve all the columns name in AnnualIncome table

    # AnnualIncome.columns -> what data type do I get? Array of Hashes

    # cat_count = 1

    # puts "I have " + cat_count.to_s + " cat."
    # puts "I have #{cat_count} cat."

    puts income_statement

    AnnualIncome.columns[4..52].each_with_index do |column, index|
      # puts "#{index} - #{column.name}"

      # I want to store this annual incomes to my database
      # new_record.currency # this is correct

      # An example of assigning values to revenue
      # new_record["revenue"] = income_statement[0].text

      new_record[column.name] = income_statement[index].text
    end

    new_record.save
  end

  desc "Scrape companies"
  task :make_companies => :environment do
    require 'open-uri'
    require 'csv'

    url = "http://s3.amazonaws.com/nvest/nasdaq_09_11_2014.csv"

    url_data = open(url)

    CSV.foreach(url_data) do |symbol, name|
      puts "#{name}: #{symbol}"
      Company.create(:name => name, :symbol => symbol)
    end
  end
end
```

#### Displaying data
  - Create views to index and show company