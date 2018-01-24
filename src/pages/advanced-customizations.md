---
title: "Advanced Customizations"
date: "2017-08-03"
---

## The Settings File

When creating a theme to sell, or even just one for a client, it's nice to be able to give the end user the ability to customize the store a little.

Shopify offers a simple yet extensive way to do this with the settings_schema.json file. Found in the config folder of your Shopify theme, this file allows you to use json objects to define options for the end user to pick from. You can see the options from the admin panel when you select `online store > themes` and click customize theme button on the top right hand side. Here there should be a left hand side panel showing you the customization options.

## Types of Settings

* Regular
* Specialized
* Informational


🔥WARNING🔥  - If you add settings in the Shopify admin and then later start using the settings_schema.json file ALL your admin settings will be wiped out and replaced by the files setting.
2. Sections
3. Customizer

In the settings_schema.json file, all the data is enclosed by [ ].  Essentially, it is an array of Objects.  Within that, you can group related options together. Each group will have a name and then a group of settings defined in an array. So your file will start something like this:

	[
		   {
		   "name" : "Colors",
		   "settings" : [ ]
		   }
		]
		
Each option is then an object inside the settings array. Something like this:

	[
		   {
		    "name" : "Colors",
		    "settings" : [
			{
			   "type": "color",
			   "id": "color_borders",
			   "label": "Border Colors",
			   "default": "#e5e5e5",
			   "info" : "this will be the colors for borders"
		        },
			{
			   "type": "color",
			   "id": "color_body_text",
			   "label": "Body Text",
			   "default": "#2980b9"
			}
		      ]
		   }
		]

In the case above, on the sidebar for the customization settings you'll see a label "Colors". When you click on that, the options will slide in and you can choose from a color picker a new color for either "Border Colors" or "Body Text".

In the case below, the sidebar will have two labels "Colors" and "Logo". This allows you to group customizations into logical sections making it easier for the end user to find all the options.

	[
		   {
		    "name" : "Colors",
		    "settings" : [
			{
			   "type": "color",
			   "id": "color_borders",
			   "label": "Border Colors",
			   "default": "#e5e5e5",
			   "info" : "this will be the colors for borders"
		        },
			{
			   "type": "color",
			   "id": "color_body_text",
			   "label": "Body Text",
			   "default": "#2980b9"
			}
		      ]
		   },
				 {
					"name": "Logo",
					"settings": [
							{
								 "type": "image_picker",
								 "id": "logo",
								 "label": "Logo",
								 "max-width": 480,
								 "min-width": 200,
								 "info": "This is the logo for the store"
							}
					 ]
				 }
		]

Each regular setting has 5 attributes : type, id, label, default, info

| Type    | Requirement | Description                                                        |
|---------|-------------|--------------------------------------------------------------------|
| type    | mandatory   | defines the type of input option it takes                          |
| id      | mandatory   | must be unique. It is how the settings are referenced in the theme |
| label   | mandatory   | describes to the user what the option is for.                      |
| default | optional    | to define a default value for the option                           |
| info    | optional    | to provide additional info about the option to the end user.       |

## Regular Setting Types

The following table describes regular input types allowed. The value of each is set in the type attribute

| Value    | Explanation                                                 |
|----------|-------------------------------------------------------------|
| text     | Allows the user to input a single line text field           |
| textarea | Allows the user to input multi line text                    |
| image_picker    | Allows the user to upload images                            |
| radio    | Allows the user to select from radio buttons                |
| select   | Allows the user to select from a drop-down                  |
| checkbox | Allows the user to check a box return a true or false value |

### image_picker Type

It is noteworthy that images uploaded this way are no longer saved in the themes Assets folder. It also not required to put the suffix (.jpg or .png) in the id.  Now Shopify uploads the images to their own file storage.  To access it you would use the settings.id and also use the img_url filter.  for example if the image setting id was 'logo':

	{{ settings.logo | img_url }}

### Radio & Select Types

Because radio and select types have multiple values to choose from, the settings definition will also require an options attribute. This will take an array of objects with a value and label each.

	{
		  "type":      "radio",
		  "id":        "id",
		  "label":     "Text",
		  "options": [
		    { "value": "one", "label": "Radio One" },
		    { "value": "two", "label": "Radio Two" }
		  ],
		  "default":   "one",
		  "info":      "Text"
		}
		
## Specialized Setting Types

Specialized settings are defined the same way as regular settings. The difference is that these settings offer specialized and pre-selected info for the user to choose from. For example the product type is a dropdown but only allows the user to select from products already defined in the store.

| Value      | Explanation                                                           |
|------------|-----------------------------------------------------------------------|
| color      | Allows the user to choose a color with a color picker widget          |
| font       | Allows the user to select from a list of fonts available              |
| collection | Allows the user to choose a product collection available in the store |
| product    | Allows the user to select a product available in the store            |
| blog       | Allows the user to select from a list of blogs set up in the store    |
| link_list  | Allows the user to select from available menus                        |
| page       | Allows the user to select a certain page defined in the store         |
| snippets   | Allows the user to select a specific snippet available in the theme   |

### Blog Type

in Blog posts section of your online store you can add blog posts. You also have the ability to add these blog posts (articles) to different blogs. The blogs setting dropdown allows you to choose which blog you'll be using for that setting.

### Snippet Type

Snippets are defined in the theme and are found in the snippets folder. They are bits of code you would bring (possibly multiple times) into the templates. A common example of a snippet would be a product loop.

## Informational Settings

Shopify also allows you to create purely informational settings to go into the sidebar (they refer to these as sidebar settings). The configuration is very similar to all the other settings, but they only have 3 attribute : type, content, info

| Type    | Requirement | Description                                                        |
|---------|-------------|--------------------------------------------------------------------|
| type    | mandatory   | defines the type of input the option takes. For sidebar settings this can only be either header or paragraph                          |
| content   | mandatory   | text content                      |
| info    | optional    | provide additional info about the option to the end user.       |


In order to reference the settings in the theme you use the liquid templating language. You can access the settings info in both the logic tags {% %} and the display tags {{ }}. In either case, you would use settings.id where id is the attribute defined in the setting.

For example if the settings looked like this:

	[
      {
        "name" : "Colors",
        "settings" : [
          {
            "type": "color",
            "id": "color_borders",
            "label": "Border Colors",
            "default": "#e5e5e5",
            "info" : "this will be the colors for borders"
          },
          {
            "type": "color",
            "id": "color_body_text",
            "label": "Body Text",
            "default": "#2980b9"
          }
        ]
      }
    ]

You would reference the Border Colors like :

	 {{ settings.color_borders }}
	 
## Regular Setting Types
 
Regular settings include the following types: text, textarea, image_picker, radio, select, check. Each type allows the user to choose some information to modify the theme. These settings are referenced with either set of liquid tags.
 
 The `{{ }}` places the information on the page

	{{ settings.id }}
  
The `{% %}` allows you to use the settings information to inform logic of the theme.


    {% if settings.product_order == true %}
      <p>we're ordering now!</p>
    {% else %}
      <p>we're not ordering :(</p>
    {% endif %}

## Specialized Setting Types

Specialized settings include the following types: color, font, collection, product, blog, page, link_list, and snippet. To reference these, it is a little more complicated than the regular settings.

### Colors & Fonts

Colors and fonts are referenced the same way as mentioned above

	{{ settings.color_borders }}

Of course, if you did this on a page, what would show up is the name of the color or the hex code. This probably isn't very helpful in most cases. However, if you save your sass file as styles.scss.liquid you can use the liquid tags right in your styles!

	.link {
      border: 2px solid {{ settings.color_borders }};
    }
		
Fonts would probably also be more useful referenced in the styles.scss.liquid file rather than right on the page

	.link {
      font-family: {{ settings.header_font }};
    }
		

### Collections

Collections can get a little more complicated. First thing to note is that when you set the type of setting to collection what shows up to the end user in the side panel of options is a dropdown with all of the collections already defined in the store. This means for there to be a choice at least 2 collections must be defined.

Second thing to note is that going forward in order to figure out how to reference each special setting the [Liquid Quick Ref](http://liquid.codeshopify.com/) will be helpful. For instance, if you take a look at the template variables collection section  the first thing is how to access a specific collection anywhere by the handle.

	collections['the-handle'].variable
	
'the-handle' is the name of the collection, or more specifically the slug of the collection. In the case of the settings file, you insert the settings.id, where id is the name of the setting as defined by the id attribute. So if the settings file is defined:

	 [
        {
          "name": "Collection",
          "settings" : [
            {
           "type": "collection",
           "id": "feature_collection",
           "label": "Feature collection"
            }
          ]
        }
      ]

The setting would be referenced by:

	 {{ collections[settings.feature_collection] }}
	 
However, the above code will only show up as CollectionDrop. To get something meaningful, you'll need to select an attribute of collection (which is available on the liquid quick ref) such as title or products.

	{{ collections[settings.feature_collection].title }}
	
You may also want to access info about each product in that collection. This is easily achieved by referencing the products attributes on the collection and then looping through those.

	{% for product in collections[settings.feature_collection].products %}
      <p>{{ product.title }} | {{ product.price }}</p>
    {% endfor %}
	
This simple liquid for loop sets each product in the collections products to the variable product and then prints the title and price onto the page.

### Products

Products are referenced similarly to collections. Again we'll use the Liquid Quick Ref see how we access products. If you take a look at the product.liquid section of the cheat sheet the first thing is how to access a specific product anywhere.

	all_products['the-handle'].variable
	
Note that the term all_products is used instead of products.

Thus to access information associated with the feature_product, for example the title and price.

	{{ all_products[settings.feature_product].title }} | {{ all_products[settings.feature_product].price }}
	

### Blog

The blog works very much the same as the other specialized settings. Reference the Liquid Quick Ref for blog.liquid.

	blogs['the-handle'].variable

In a single store there may be many blogs, so the title is referring to the name of the whole blog. However, to access the blog posts within each blog, the key word is articles. So in order to loop through all the articles the code would look like this.

	{% for blog in blogs[settings.blog_thing].articles %}
        <p>{{ blog.title }}</p>
      {% endfor %}

### Page

The page works very much the same as the other specialized settings. 

      pages['the-handle'].variable
    
Creating a link to go back to whatever page is set to the homepage is now as easy as the following code.


       <a href="{{ pages[settings.homepage].url }}">{{ pages[settings.homepage].title }}</a>

### Link List

The link list is a dropdown of all the menus available in the store. For example the main menu or the footer menu. Accessing these is the same as the previous examples.


      linklists['the-handle'].variable
    

      {{ linklists[settings.link_thing].title }}
    
And similar to the blogs and collections you can also loop through the links in each link list.


      {% for link in linklists[settings.link_thing].links %}
        <p>{{ link.title }} | {{ link.url }}</p>
      {% endfor %

### Snippet

You may notice that snippets are not referenced in the Liquid Quick Ref. This is probably because snippets are referenced more similarly to the regular settings. For example the snippet set with an id this_snippet would be this:


      {{ settings.this_snippet }}
    
The thing that makes them specialized is you create snippets in the theme. They are found in the snippets folder of the theme. So they can be whatever you want and bringing them into the theme will be unique to what you create. For example a product-loop is probably a very popular one. To bring it in as a setting:


      {{ include settings.this_snippet }}
    
This won't work for my product-loop because it requires a collection of products to be looped over outside of the snippet. So I had to modify the code to look something like this:


      {% for product in collections[settings.feature_collection].products %}
	       {% include settings.this_snippet %}
      {% endfor %}
    
This has the added advantage of being variable based on the collection chosen as well.
 
 All of these settings provide the opportunity to give your client a lot of options to be able to customize their own store and make on the fly changes for things like holidays and special event.
 

 ## Sections

 If you have played around with metafield editor extensions, explored shortcodes, and created content editing Shopify apps you may be a part of a group wondering - how can you give the shop owner more control over shop customization and still maintain an intuitive admin system. We've got one word for you: Sections.

🔥 TIP - more and more themes in the Shopify Theme Store support sections. If you are looking to get into theme development, building out themes with modular customizable sections is a great direction to head in!

### Why Sections
Sections answer a lot of development and end user requests. They allow you to create reusable templates that the shop owner can continuously add and re-arrange. Sections are also a great tool for uploading and displaying additional media content. For example, on the collection, where you are limited to one featured image, you can create a highly customizable image gallery of product looks. Moreover, they offer a wonderfully integrated and streamlined user interface for the shop owner to interact with.

### The anatomy of a Section
Three new liquid tags were introduced with the advent of sections: {% schema %}, {% javascript %}, and {% stylesheet %}. Today we are going to focus on the schema tag. All three of these tags will be included in the base template for each section.


{% schema %}
{% endschema %}

{% stylesheet %}
{% endstylesheet %}

{% javascript %}
{% endjavascript %}

You can probably extrapolate that the stylesheet and javascript tags can hold your css and js respectively. You can write Sass directly in the stylesheet tags by adding {% stylesheet 'scss' %}. Both the code in the stylesheet and javascript tags respectively will be concatenated into a single file and injected in the `content_for_header` by Shopify. 

If you want to learn more about writing specific styles and js for your section blocks you can check out the [section docs](https://help.shopify.com/themes/development/theme-editor/sections#javascript-and-css). 

Sections live in a sections folder in the root of your theme. In that folder create a new section with a .liquid extension. The name of the file will be the name you reference when you include your section in your template file.

The folder structure will look a little something like this

	your-theme
		- assets
		- config
		- layout
		- sections
			- - gallery.liquid
		- templates

We want to include the gallery on our home page to allow shop owners to create a gallery of highlighted products and images. To do so add the following to the templates > index.liquid file:
	
	{% section 'gallery'%}
	
This is how you would go about including what is refered to as a static section. What this means is that the section exists once in the theme and is included into a template the same way you would include the header or footer. If the shop owner changes the configurations of the section it will change all instance of the section displayed in the theme. For our purposes we are only including this section once on the homepage, so any changes made will only affect that one template.
	
### The Section Template File

#### The Base Setup

Now that you have all the bone structure set up, it's time to create the actual code that will make up the section.

In your `gallery.liquid` file add the following:

	{% schema %}
	{% endschema %}
	
	{% stylesheet %}
	{% endstylesheet %}
	
	{% javascript %}
	{% endjavascript %}
	

#### The Schema Tags

The schema tag expects valid JSON. Your entire section schema can be defined in one JSON object comprised of different settings and blocks. Let's take a look at an example section schema and break it down from there.

```
{% schema %}
  {
    "name": "Hero",
    "settings": [{
      "type": "header",
      "content": "Title"
    },
    {
    	"type": "paragraph", 
    	"content": "Add a custom title and image to specialize your theme for holidays, sales, etc."
    },
    {
      "type": "color",
      "id": "hero_text_color",
      "label": "Text color",
      "default": "#000"
    },
    {
			"type": "text", 
			"id": "title_text",
			"label": "Custom Title", 
			"info" : "This title will appear in the top header section of your shop"
    },
    {
      "type": "image_picker",
      "id": "hero_bg",
      "label": "Background image",
      "info": "1600 x 1000px recommended"
    }]
  }
{% endschema %}
```
	
Directly nested inside of the overarching object is the information for the section. Let's look at the different components that make up this section.


* **name** 

defined in the section schema, this is the name that the section will be referred to in the sidebar.

* **class** 

each section will be rendered in a div with a class of shopify-section. Class allows you to specify an additional class name to add to the section div.

* **settings** 

similar to the settings_schema file, sections have their own settings. For more general info on available settings check out our blog post on Theme Customization - Implementing Your Settings. The id in the settings needs to be unique within a section, but not necessarily across sections.

* **blocks** 

these are repeatable, well, blocks available in a section. The shop owner can add, remove, and reorder these 👌.

* **max_blocks** 

allows you to limit the number of blocks the shop owner can create in a section. If not set the shop owner can keep creating blocks... forever. You can only set the max_blocks property on a section that has blocks.

Those are all of the properties we are going to go over, but you can check out the section documentation for more.
