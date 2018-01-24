---
title: "APIs"
date: "2017-08-02"
---

## JavaScript SDK
The Buy Button Channel provides three ways to sell products outside of the shopify online store that we will discuss below. These can add further sales opportunities and complement your already existing Shopify store. Also, if you don’t have a full online store and/or you only want to sell a few products on a site that already exists, you can even get a pared down version of Shopify that is only $9 per month and use just the Buy Button Channel.

Going to `SALES CHANNEL > Buy Button` will bring you to the 3 options:

![](https://d1o9o9r2qlybfc.cloudfront.net/contain/900/600/b5a75a87-ed67-45ea-ab37-d784735b507d.png)

**1. Embed a product in email**

This option allows you to choose a product and add a link into emails that will allow recipients to purchase it directly from their email. Shopify will create the link to embed and track the inventory and revenue.

**2. Buy Button**

This option allows you to choose a product or collection.  Once you’ve made your selection, you’ll be brought to a page that will allow you to customize your buy button.  You’ll be able to choose fonts, colours, layout and cart options.  Once you’ve created the look that you want, click the “Generate Code” button and Shopify will provide you with an embed code.  Put this embed code in your already existing website and people will be able to purchase your product there!

**3. JavaScript Buy SDK**

The buy button provides a lot of options for customization, but you might find that you want to be able to make a completely unique experience for your customers from within your existing website. This is where the JavaScript Buy SDK comes in.  The JS SDK is a lightweight library that allows you to build e-commerce into any website. It is based on Shopify’s API and provides the ability to retrieve products and collections from your shop, add products to a cart, and checkout. 

The API allows you to pull products into your site, create a cart experience and insert a link to the Shopify checkout.

## Why use the Shopify SDK?

The Shopify Buy Button gives you a lot of flexibility in the look and feel and functionality of what you embed into your site.  So why use the Shopify SDK?

Well, the programmers at Shopify found that they had a lot of people wanting finer tuned control over what they could do.  So much so, that they felt it was worth creating this SDK.

One example, is a client wanted to have a product on another website, but when they went to buy, instead of using the Buy Button cart, they wanted the client to be taken to the full store and have the item they chose included in the stores cart (each buy button experience creates it's own cart).  The client wanted this to encourage the purchase of more products.  A solution to this would not be possible with the Buy Button alone.  With the SDK, however, the client could sub in a link to the store with the product as a parameter, once inside the store, could use the parameter and the Ajax API to update the stores cart.

Creating these very unique experiences really allows store owners to set themselves apart and create seamless experiences for their shoppers, hopefully leading to increased sales.

## What can the Shopify SDK do?

* fetch information about a single product or a collection of products
* create a shopping cart
* allow customers to select options and quantities
* generate a checkout URL for a single product or an entire cart.

## The JavaScript SDK Basics

**1.  Create a Shop Client**

The Client is the primary interface through which you make requests using the JS Buy SDK.

**2.  Make a Request for Product(s)**

You can now call a fetch method on your client to retrieve products or collections
Create a Cart

**3.  Create a Cart or Go to Checkout**

You can also create a cart, add products to the card and generate a link for that cart to go to the Shopify checkout

### shopify-buy Module Classes

Shopify provides a bunch of utilities for certain actions and accessing info.  They have a great reference [here](http://shopify.github.io/js-buy-sdk/)

 * **ShopifyBuy**
	 * ShopifyBuy only defines one function **buildClient** which can be used to build a ShopClient to query your store using the provided **apiKey** , **appId**, and **domain**. Returns a client for the shop using your api credentials which you can use to query your store.
	 * METHOD
		 * buildClient
 * **ShopClient**
	 * Once the ShopClient has been build, then the following methods can be run on that client
		 * createCart
		 * fetchAllCollections
		 * fetchAllProducts
		 * fetchCart
		 * fetchCollection
		 * fetchProduct
		 * fetchQueryCollections
		 * fetchQueryProducts
		 * fetchRecentCart
 * **ProductModel**
	 *  **Class** for products returned by fetch('product').  Allows access to the properties of the Product
	 *  PROPERTIES
		 *  Description
		 *  Id
		 *  Images
		 *  Options
		 *  selectedVariant
		 *  selectedVariantImage
		 *  Selections
		 *  Title
		 *  Variants
 *  **ProductVariantModel**
	 *  **Model** for product variant.  Allows access to variant properties.  It also provides a method **checkoutUrl** to get a checkout url for a specific product variant.  You can optionally pass a quantity.  If no quantity is passed the it will default to 1.
	 *  METHODS
		 *  checkoutUrl
	 *  PROPERTIES
		 *  available
		 *  compareAtPrice
		 *  formattedPrice
		 *  grams
		 *  id
		 *  image
		 *  imageVariant
		 *  optionValues
		 *  price
		 *  productId
		 *  productTitle
		 *  title
 *  **ProductOptionModel**
	 *  **Class** for product option.  Allows access to product option properties.
		 *  name
		 *  selected
		 *  values
 *  **CartModel**
	 *  **Class** for the cart model.  Provides methods and properties for the cart.
	 *  METHODS
		 *  clearLineItems
		 *  createLineItemsFromVariants
		 *  removeLineItem
		 *  updateLineItem
		 *  updateModel
	 *  PROPERTIES
		 *  checkoutUrl
		 *  id
		 *  lineItemCount
		 *  lineItems
		 *  subtotal
 *  **CartLineItemModel**
	 *  A cart stores an Array of CartLineItemModel's in it's lineItems property. The following are properties available on each lineItem.
	 *  PROPERTIES
		 *  compareAtPrice
			* grams
			* id
			* image
			* line\_price
			* price
			* product\_id
			* quantity
			* title
			* variant\_id
			* variant\_title

### The Setup

In order to be able to access all these properties and methods, Shopify provides a JavaScript SDK CDN that can be brought into any website you are working on.

	<script src="http://sdks.shopifycdn.com/js-buy-sdk/v0/latest/shopify-buy.umd.polyfilled.min.js"></script>
	
We'll also be bringing a jQuery CDN in order to manipulate the DOM using jQuery.

	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
	
Once those two scripts are added to your website, you have the power to access everything available to start putting products on the page.

## Admin API

## The Admin API

This is the most complete of the Shopify APIs and requires authentication. Its great for building Shopify apps. You can read up on all of the available actions and endpoints in the [API Reference](https://help.shopify.com/api/reference).

## The Shopify AJAX API
Though all of the APIs we are going to discuss today can be called using an ajax request this one has the request explicitly in the name. The Ajax API is great for use in theme development as it allows you to access certain actions for a limited number of endpoints, but there is no need to authenticate so you can interact with the API entirely on the client side. 

Here is a list of the available endpoints:

* GET /products.json
* GET /products/<\product-handle>\.js
* POST /cart/add.js
* GET /cart.js
* POST /cart/update.js
* POST /cart/change.js
* POST /cart/clear.js
* GET /cart/shipping_rates.json

Essentially, using the Ajax API you can complete actions involved in updating and retrieving cart information and also accessing base information about products. This can allow you to add functionality like automatic cart updates, product filtering (on certain parameters), estimated shipping rates, etc.

### Exercise : Ajax Shipping Cost Estimates on the Cart Page

To test out the potential of the Ajax API we are going to create a shipping cost estimating form on the cart page. This will allow customers to see the approximate shipping costs based on their items and location and can help reduce abandoned carts when they are surprised with the shipping costs on the checkout page :). 

**/cart/shipping_rates.json**

There are a couple of different parameters you can pass to the get request for your store’s shipping rates in order to get an accurate shipping rate estimate. 

* **shipping_address[zip]** - the zip code or postal code for the shipping address
* **shipping_address[country]** - the country you are having the product shipped to
* **shipping_address[province]** - the province / state the product is being shipped to

This will return all shipping options for that address. So for example if in the Shopify admin you have entered the option for standard and express shipping in Canada and the customer enters a canadian address the returned data will include the details for both the standard and express shipping. 

Here is a sample response with two available shipping options:

![](https://d1o9o9r2qlybfc.cloudfront.net/contain/900/600/2a705f3a-652d-45f1-89ba-cd97f9600b3c.png)

**Creating the Shipping Info Form**
On the cart page of your site create a new form that asks the customer for their postal code, country, and province / state. 

```
<div class="shipping-calculator">
	<form id="shipping-calculator">
		<label for="zip">Postal / Zip Code</label>
		<input type="text" name="zip" id="zip">
		<label for="country">Country</label>
		<input type="text" name="country" id="country">
		<label for="province">Province / State</label>
		<input type="text" name="province" id="province">
		<input type="submit" value="check shipping rate">
	</form>
</div>
```

You can put this anywhere on your cart page. 

**Setting up your AJAX request to get shipping info**
Next, create a function called **getShippingRate** that takes in one parameter, an object with all the data passed from the form you just created. 

Using jQuery, here is what the code would look like to make a request to the shipping rates endpoint from your store.

	$.ajax({
		Type: ‘GET’,
		url: '/cart/shipping_rates.json', 
		dataType: 'json', 
		data: {
			'shipping_address[zip]': the_zip_or_postal_code, 
			'shipping_address[country]' : the_country, 
			'shipping_address[province]' : the_state_or_province
		}, 
			success: (res) => {
			console.log(res)
		},
			error: (err) => {
			console.log(err)
		}

	})
	
Swap out *the_zip_or_postal_code*, *the_country*, and *the_state_or_province* for each respective value passed in through the data object.

**Listen for form submit and call getShippingRate**
Inside of your document ready function create a new listener for the submit of your shipping calculator form. 

```
$('#shipping-calculator').on('submit', function(e) {
		// prevent page refresh on form submit
		e.preventDefault()

		//select the form and serialize the form data
		var form = $(this)
		var form_data = form.serializeArray()
		var data = {};

		$(form_data).each(function(index, obj){
		    data[obj.name] = obj.value;
		});

		// pass the form data to the getShippingRate function to make the Ajax request
		getShippingRate(data)

		$(form)[0].reset()

	})
```	
	
**Create an element to append the shipping rate results to**
Inside the shipping calculator div add the following:

```
<div id="shipping-estimate"></div>
```

Now, in the success function for the ajax request in **getShippingRate**, append the shipping rate to the newly created shipping-estimate div:

```
success: (res) => {
			console.log(res)
			$('#shipping-estimate').html('<p>the estimated shipping cost for current items is $' + res.shipping_rates[0].price + '</p>' )
}
```

***BONUS*** Modify the success function to account for multiple shipping rate possibilities and display all possible shipping rate options to the customer. 

***BONUS 2*** Account for if no items have been added to the cart and therefore there is no shipping rate information available. 

Download sample answers for this exercise [2.3-ajax-for-estimated-shipping-costs](https://s3-us-west-2.amazonaws.com/shopify-hy/2.3-ajax-shipping-cost-estimates-on-cart-page.zip)


## Other APIs available on Shopify

### The Analytics API

This API is only available to shops on the[ Advanced Shopify Plan](https://www.shopify.ca/pricing). This API serves data about the shop, for example the number of page views in a day. You can read more about the Analytics API [here](https://help.shopify.com/api/tutorials/analytics-api).

### Draft Order API - Beta

Draft orders allow merchants to create orders on behalf of customers. This is useful for Shopify merchants who receive orders through outside channels, such as chat, on the phone, through sales and support tools, or in person. The Draft Orders API gives developers the ability to build apps that create and update Shopify orders, and send invoices enabling secure payments.

	
## Storefront API