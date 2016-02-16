<script type="text/javascript">
	var shippingDefault = '{$settings->shipping_info}';
	var level = 0;
	var dict = {literal}{}{/literal};
	var prices = {literal}{}{/literal};
	var pricesRegular = {literal}{}{/literal};
	var propertyMap = {literal}{}{/literal};
	var images = {literal}{}{/literal};
	var shipping = {literal}{}{/literal};
	var quantity = {literal}{}{/literal};
	// dla każdego wariantu produktu
	{foreach from=$variants item="variant"}
		// jeżeli wariant jest dostępny
		{if $variant->available}
			// przypisz informację o zdjęciu modelu
			images['{$variant->id}'] = '{$variant->main_image|product_img_url:th100}';
			// przypisz cenę
			prices['{$variant->id}'] = '{$variant->price|money_without_currency}';
			shipping['{$variant->id}'] = '{$variant->availability_description}';
			// przypisz cenę sprzed promocji
			quantity['{$variant->id}'] = '{$variant->quantity}';
			pricesRegular['{$variant->id}'] = '{$variant->price_regular|money_without_currency}';
			// dla każdego atrybutu wariantu
			{foreach from=$variant->properties key="property_name" item="property_value"}
				// 
				level = ('{$variant->property2}' && '{$variant->property3}') ? 3 : ('{$variant->property2}' ? 2 : 1);
				// mapa 
				propertyMap['{$property_value}'] = '{$property_name}';
				if ( typeof(dict['{$property_name}']) == 'undefined' )
				{
					dict['{$property_name}'] = {literal}{}{/literal};
				}
				if ( typeof(dict['{$property_name}']['{$variant->property1}']) == 'undefined' )
				{
					dict['{$property_name}']['{$variant->property1}'] = {literal}{}{/literal};
				}
				if ( level > 1 )
				{
					if ( typeof(dict['{$property_name}']['{$variant->property2}']) == 'undefined' )
					{
						dict['{$property_name}']['{$variant->property2}'] = {literal}{}{/literal};
					}
					if ( level > 2 && typeof(dict['{$property_name}']['{$variant->property3}']) == 'undefined' )
					{
						dict['{$property_name}']['{$variant->property3}'] = {literal}{}{/literal};
					}
					if ( typeof(dict['{$property_name}']['{$variant->property1}']['{$variant->property2}']) == 'undefined' )
					{
						dict['{$property_name}']['{$variant->property1}']['{$variant->property2}'] = {literal}{}{/literal};
					}
					if ( level > 2 && typeof(dict['{$property_name}']['{$variant->property1}']['{$variant->property3}']) == 'undefined' )
					{
						dict['{$property_name}']['{$variant->property1}']['{$variant->property3}'] = {literal}{}{/literal};
					}
					if ( typeof(dict['{$property_name}']['{$variant->property2}']['{$variant->property1}']) == 'undefined' )
					{
						dict['{$property_name}']['{$variant->property2}']['{$variant->property1}'] = {literal}{}{/literal};
					}
					if ( level > 2 && typeof(dict['{$property_name}']['{$variant->property2}']['{$variant->property3}']) == 'undefined' )
					{
						dict['{$property_name}']['{$variant->property2}']['{$variant->property3}'] = {literal}{}{/literal};
					}
					if ( level > 2 )
					{
						if ( typeof(dict['{$property_name}']['{$variant->property3}']['{$variant->property1}']) == 'undefined' )
						{
							dict['{$property_name}']['{$variant->property3}']['{$variant->property1}'] = {literal}{}{/literal};
						}
						if ( typeof(dict['{$property_name}']['{$variant->property3}']['{$variant->property2}']) == 'undefined' )
						{
							dict['{$property_name}']['{$variant->property3}']['{$variant->property2}'] = {literal}{}{/literal};
						}
	
						if ( typeof(dict['{$property_name}']['{$variant->property1}']['{$variant->property2}']['{$variant->property3}']) == 'undefined' )
						{
							dict['{$property_name}']['{$variant->property1}']['{$variant->property2}']['{$variant->property3}'] = {literal}{}{/literal};
						}
						if ( typeof(dict['{$property_name}']['{$variant->property1}']['{$variant->property3}']['{$variant->property2}']) == 'undefined' )
						{
							dict['{$property_name}']['{$variant->property1}']['{$variant->property3}']['{$variant->property2}'] = {literal}{}{/literal};
						}
						if ( typeof(dict['{$property_name}']['{$variant->property2}']['{$variant->property1}']['{$variant->property3}']) == 'undefined' )
						{
							dict['{$property_name}']['{$variant->property2}']['{$variant->property1}']['{$variant->property3}'] = {literal}{}{/literal};
						}
						if ( typeof(dict['{$property_name}']['{$variant->property2}']['{$variant->property3}']['{$variant->property1}']) == 'undefined' )
						{
							dict['{$property_name}']['{$variant->property2}']['{$variant->property3}']['{$variant->property1}'] = {literal}{}{/literal};
						}
						if ( typeof(dict['{$property_name}']['{$variant->property3}']['{$variant->property1}']['{$variant->property2}']) == 'undefined' )
						{
							dict['{$property_name}']['{$variant->property3}']['{$variant->property1}']['{$variant->property2}'] = {literal}{}{/literal};
						}
						if ( typeof(dict['{$property_name}']['{$variant->property3}']['{$variant->property2}']['{$variant->property1}']) == 'undefined' )
						{
							dict['{$property_name}']['{$variant->property3}']['{$variant->property2}']['{$variant->property1}'] = {literal}{}{/literal};
						}
					}
				}
	
				if ( level == 1 )
				{
					dict['{$property_name}']['{$variant->property1}'] = {$variant->id};
				}
				if ( level == 2 )
				{
					dict['{$property_name}']['{$variant->property1}']['{$variant->property2}'] = {$variant->id};
				}
				if ( level == 3 )
				{
					dict['{$property_name}']['{$variant->property1}']['{$variant->property2}']['{$variant->property3}'] = {$variant->id};
					
				}
			{/foreach}
		{/if}
	{/foreach}	
</script>	