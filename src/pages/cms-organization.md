---
title: "CMS Organization"
date: "2017-08-04"
---

## Structure of Shopify

Shopify provides an e-commerce optimized content management system (CMS) that we can use to build highly customized online commerce solutions. 

What does this mean for us as developers? Well, the Shopify platform gives us out of the box access to space to store certain types of data. Let’s consider, for example, a product.

### Object Examples - The Product Object

High level, a product is a single object available for sale on a store. It is easy to assume that whoever is running the store is going to want to display a title for the product, maybe a picture, and some product details. In order to have this information available in the shop it needs to be stored in the database of our Shopify store. In the case of the Shopify platform, what information we can readily store for each product has been pre-defined. 

For example: If we want to add a description to our product we can store this in the description for our product and access it using **product.description**. 

There are a ton of available values that we can store on the product. Let’s take a moment to look further at some of them. Find the reference [here](https://help.shopify.com/themes/liquid/objects/product).

### What about storing extra info on each product?

The product has a pretty robust set of fields we can add data to. Let’s say, however, we want to store a size chart on our product. There is no size chart column on the product so we do not have a readily available space to store that information. This is one of the limitations of using a Content Management platform like Shopify. It doesn’t mean our products can’t have size charts, it just means we have to be more creative in the way we store them. One way to store additional information not already in an object's schema is the metafield object. Metafields allow you to store addtional information on products, collections, orders, blogs, pages, and the shop. We are not going to go into detail on metafield use today, but if you want to learn more check out the reference for the metafield object [here](https://help.shopify.com/themes/liquid/objects/metafield). There is also a handy chrome extension [here](https://chrome.google.com/webstore/detail/shopifyfd-dashboard-tool/lffljkleilfpjlmcdnoaghhcbnemelge?hl=en).

## What is Liquid?
[Liquid Cheat Sheet](https://www.shopify.ca/partners/shopify-cheat-sheet)

As touched on in the previous section the Shopify content management system allows you to input data that relates to your store.  This info is organized into **Objects** and made available in your Shopify theme through the **Liquid templating language**.

[Liquid](http://shopify.github.io/liquid/)  is an open source templating language developed by Shopify. It is used in Shopify themes, but has also been adopted by many other platforms include Zendesk, Jekyll, and 500px.

We use Liquid to display information and to perform logic within the theme. There are two types of brackets in Liquid for this; **Output Statment Brackets** are used to display information on the page and uses `{{ }}` and **Logic Statment Brackets** are used to perform logic and uses `{% %}`.

Example:
```
{% if product.available %}

	{{ product.title }}

{% endif %}
```

### Template variable 

Template Variables are used to access the attributes of Shopify objects. You can access these attributes through dot notation or bracket notation (similar to a JSON Object).   For example to get the product title, the code would be ` product.title` or `product['title']`

### The Handle

The main way to select a specific Object is the Handle. By default, it is the object’s title in lowercase with any spaces and special characters replaced by hyphens (-). Every object in Liquid (product, collection, blog, menu) has a handle.   

Generally you will use the plural of the thing you want.  So for a specific collection, use collections.  One notable exceptions is that for product you'll use all_products. Again, you can use either dot notation or bracket notation. For example, if you wanted to get the Frontpage Collection you'd use: 

Example: 

`{{ collections['frontpage'].description}}`

or

`{{ collections.frontpage.description}}`


Without adding one of the attributes you'd just see **collectionDrop** on your page because liquid will only display one piece of information at a time.

Most Objects in Shopify will have the following attributes: 
* handle 
* image.src 
* url 
* title 
* tags 
* description

Each type of Object will also have attributes specific to it.

For example:

#### Product
 * **selected\_or\_first\_availble\_variant** - returns the variant object of the currently-selected variant if there is a valid ?variant= query parameter in the URL. If there is no selected variant, the first available variant is returned.
 * **variant** - returns an array the product's variants.
 * **options** - Returns an array of the product's option names. Ie. size or colour
 * **featured_image** - Returns the relative URL of the product's featured image.

#### Collection
* **all\_products\_count** - Returns the number of products in a certain collection
* **products**  - Returns all of the products in a collection. You can show a maximum of 50 products per page.

### Tags

Tags are the programming logic of Liquid, responsible for conditional statements, assignments and iteration.  They are wrapped with `{% %}`
Below, we'll go over the most common tags used when building themes.

#### examples

* **for** - Repeatedly executes a block of code.

    ```
    {% for product in collection.products %}
        {{ product.title }}
    {% endfor %}
    ```

* **if** - Acts as a standard **if** statement and executes a block of code only if a certain condition is met

    ```
    {% if product.title == 'the blue book' %}
        You are buying the blue book!
    {% endif %}
    ```

### Filters

Liquid filters are like **Methods** that can be performed on Shopify Objects and other Classes such as Strings and Numbers. They allow us to modify the output of an object.  They are preceded by a pipe **|** and can be chained. The following example shows how we can append more than one filter to an object.  There are two filters, **strip_html**, which removes the html tags from the content, and **truncatewords**, which takes in a value and returns up to that number of words. 

#### example

`{{ article.content | strip_html | truncatewords: 30}}`

## Blank Slate Theme

### Slate File Logic

#### Scaffolding a theme with Slate

There have been a couple of different tools for local Shopify Development. There are some great desktop GUIs that have been developed to facilitate local dev for example Motifmate which has a monthly subscription fee. There are also command line tools, some common ones include the **theme gem** and **themekit**. Today we are going to be setting up one such command line tool developed by Shopify called Slate. Slate provides the ability to generate a paired down scaffolded Shopify theme as well as a command line tool for local theme development, today we will focus on the latter. Check out the [Slate Documentation](https://shopify.github.io/slate/).

#### Slate Installation

Let's go ahead and install slate on our computers so we can start using it for our theme development. Slate works on Linux, WIndows, and OSX. We are going to use **npm** to install Slate so make sure you have that installed before running the Slate install command. Open a terminal window and run the following command:

`npm install -g @shopify/slate`

This will install Slate globally on your computer so you can use it for all future theme development

To confirm it is indeed working. Type in

`slate -v`

and you should see a version number associated with your installed version of Slate.

#### Slate Theme Scaffold

Once slate has been installed globally, we'll want to move into the directory where we want to create the theme files in our terminal.  Once there we'll want to run the following command (where [name] is replaced by the whatever you'd like to name your theme):

`slate theme [name]`

When it's finished running you'll see the line ` [name] theme is ready`.  At that point you can move into that directory to see all the files slate has generated.  It might be easiest to open it up into your text editor.

All of Slate’s source theme files are in the root **src** directory. These are the files we will be editing. Using Slate commands, we compile to the theme into the **dist** directory. In order for us to be able to upload our themes, we use the build command or zip commands.

Running the following command will compile all of your changes into the **dist** folder.  You'll notice that since this is a new theme there is no **dist** folder to begin with.  This command will also create it.

`slate build`

We need to zip the files in order to be able to upload the theme to our Shopify store.  To do this we simply run: 

`slate zip`

The zipped version of your theme can be found in the **upload** folder.

To upload the theme, we now go back to the Shopify store admin to **online store** , scroll down a bit and there's a button to **upload theme**.  Click that and upload the zipped version of the theme.  When it's upload, click on actions then publish.

Everthing we'll be doing in th Slate files will be in be in the **src** folder (with the exception of updating the config.yml file one time).  The **dist** folder is where all the transpiled and processed code lives.  So from here on out, file references will assume to be in the **src** folder.

The first place we want to start when jumping into slate is the `layout > theme.liquid`.  This is the wrapper for the site.  You'll notice the <head> tag here.   All the usual information one would put in the <head>.  We won't go through all the details, but will point out a few notable things.

`{% include 'social-meta-tags' %}`

This includes the snippet call social-meta-tags and has a bunch of dynamic meta tags that will change based on what page/product of the store you're on.

`{{ 'theme.scss.css' | asset_url | stylesheet_tag }}`

This is the _liquid_ way to bring in style sheets into your theme.  This comes automatically, but you'd want to use the same principle if you were bringing a different style sheet.

`{{ content_for_header }}`

This inserts the required Shopify scripts into the <head> which includes scripts for Google Analytics, Shopify analytics, for Shopify apps, and more.

Once we get into the <body> of the theme, we'll see that the header and footer sections are being brought in:

`{% section 'header' %}`

`{% section footer' %}`

You can find the code for this in the Sections folder.

In between those two, we'll find the:

`{{ content_for_layout }}`

This outputs dynamic content generated by all of the other templates, meaning whatever page you navigate to, Shopify will insert the template to that page.

This brings us the the **Homepage**.  

`templates > index.liquid` is the template for the Homepage.   You'll notice that when you get there all you'll see is `{{ content_for_index }}`.

This contains the content of dynamic sections to rendered on the homepage.  Slate builds these sections out for you for the homepage.  We will be going into how to create your own sections in the advanced course.  For now, we'll just go to the online theme editor to see how we can customize them for there.


#### Slate and Javascript
Slate has a quite a bit of JavaScript built in for the common things you may want to do in a store.

For example, when a user selects a variant (ie small, medium) of a product, Slate automatically updates the price for the user. Try it now in your store.
