/*jslint browser: true*/
/*global $, jQuery, alert, console, dict, prices, pricesRegular, images, shipping*/

(function ($) {
    'use strict';

    $.fn.productVariants = function (options) {
        var s,
            gs = $.extend({}, $.fn.productVariants.defaults, options),
            ProductVariants = {
                settings: {
                    inputVariantId: $(gs.inputVariantId),
                    newPriceWrapper: $(gs.newPriceWrapper),
                    oldPriceWrapper: $(gs.oldPriceWrapper),
                    thumbsWrapper: $(gs.thumbsWrapper),
                    shippingInfoWrapper: $(gs.shippingInfoWrapper),
                    shippingInfo: gs.shippingInfo,
                    propertyHandler: $(gs.propertyHandler),
                    propertiesHandler: $(gs.propertiesHandler),
                    propertyContainer: $(gs.propertyContainer),
                    firstOption: $(gs.variantsContainer).find(gs.propertyContainer).eq(0),
                    secondOption: $(gs.variantsContainer).find(gs.propertyContainer).eq(1),
                    thirdOption: $(gs.variantsContainer).find(gs.propertyContainer).eq(2),
                    addToCartButton: $(gs.addToCartButton),
                    changeAddToCartButtonState: gs.changeAddToCartButtonState,
                    selectricSelect: gs.selectricSelect
                },

                init: function () {
                    s = this.settings;

                    this.bindUIActions();
                    this.initForm();
                },

                bindUIActions: function () {
                    s.propertyHandler.on('click', function () {
                        var $this = $(this);

                        /** if property is disabled do nothing */
                        if ($this.hasClass('unavailable')) {
                            return false;
                        } else {
                            ProductVariants.selectProperty($this);
                        }
                    });

                    s.propertiesHandler.on('change', function () {
                        var $this = $(this);

                        if (!$this.hasClass('selectricWrapper')) {
                            ProductVariants.selectProperty($this);
                        }
                    });
                },

                selectProperty: function (property) {
                    var propertyName = property.data('property-name'),
                        /** propertyValue depends of its element type: 1.li element 2. select input */
                        propertyValue = property.data('property-value') || property.val(),
                        propertyNode = property.prop('tagName'),
                        activeProperty = dict[propertyName][propertyValue],
                        firstActivePropertyObject,
                        secondActivePropertyObject,
                        secondActiveProperty,
                        activeProperties,
                        propertyIndex;

                    /** if we clicked on a box property */
                    if (propertyNode !== 'SELECT') {
                        /** deactivate all atributes in this option */
                        $(s.propertyContainer).find("[data-property-name='" + propertyName + "']").removeClass('active');

                        /** make current active */
                        property.addClass('active');
                    }


                    if (s.firstOption.has(property).length) {
                        if (activeProperty === undefined) {
                            if (s.secondOption.length !== 0) {
                                ProductVariants.deactivateAllProperies(s.secondOption);
                            }
                            if (s.thirdOption.length !== 0) {
                                ProductVariants.deactivateAllProperies(s.thirdOption);
                            }
                            if (s.changeAddToCartButtonState === true) {
                                ProductVariants.setAddToCartButton(true);
                            }
                        } else {
                            if (s.secondOption.length !== 0) {
                                /** go to second option and deactivate properies */
                                ProductVariants.deactivateUnavailableProperties(s.secondOption, activeProperty);

                                /** go to second option and choose first available property */
                                ProductVariants.setFirstAvailebleProperty(s.secondOption);
                            }
                            if (s.thirdOption.length !== 0) {
                                firstActivePropertyObject = ProductVariants.getActiveProperty(s.firstOption);
                                secondActivePropertyObject = ProductVariants.getActiveProperty(s.secondOption);
                                secondActiveProperty = dict[secondActivePropertyObject.name][firstActivePropertyObject.value][secondActivePropertyObject.value];

                                ProductVariants.deactivateUnavailableProperties(s.thirdOption, secondActiveProperty);
                                ProductVariants.setFirstAvailebleProperty(s.thirdOption);
                            }
                        }
                        propertyIndex = 1;
                        ProductVariants.setActiveVariant(property, propertyIndex);
                    }

                    if (s.secondOption.has(property).length) {
                        if (s.thirdOption.length) {
                            firstActivePropertyObject = ProductVariants.getActiveProperty(s.firstOption);
                            secondActivePropertyObject = ProductVariants.getActiveProperty(s.secondOption);
                            activeProperties = dict[secondActivePropertyObject.name][firstActivePropertyObject.value][secondActivePropertyObject.value];

                            ProductVariants.deactivateUnavailableProperties(s.thirdOption, activeProperties);
                            ProductVariants.setFirstAvailebleProperty(s.thirdOption);
                        }
                        propertyIndex = 2;
                        ProductVariants.setActiveVariant(property, propertyIndex);
                    }

                    if (s.thirdOption.has(property).length) {
                        propertyIndex = 3;
                        ProductVariants.setActiveVariant(property, propertyIndex);
                    }
                },

                getActiveProperty: function (property) {
                    var selectProperties = property.find('select'),
                        activePropertyObject;

                    if (selectProperties.length) {
                        activePropertyObject = {
                            name: selectProperties.data('property-name'),
                            value: selectProperties.val()
                        };
                    } else {
                        property.find(s.propertyHandler).each(function () {
                            if ($(this).hasClass('active')) {
                                var $this = $(this);
                                activePropertyObject = {
                                    name: $this.data('property-name'),
                                    value: $this.data('property-value')
                                };
                            }
                        });
                    }
                    return activePropertyObject;
                },

                setActiveVariant: function (property, propertyIndex) {
                    var propertyName = property.data('property-name'),
                        /** propertyValue depends of its element type: 1.li element 2. select input */
                        propertyValue = property.data('property-value') || property.val(),
                        search = dict[propertyName][propertyValue],
                        levels = s.propertyContainer.length,
                        variantId = '',
                        firstOptionValue,
                        secondOptionValue,
                        thirdOptionValue;

                    // if(search !== undefined){                
                        if (propertyIndex !== 1 && s.firstOption.length !== 0) {
                            firstOptionValue = s.firstOption.find('select').val() || s.firstOption.find('.property.active').data('property-value');
                        }
                        
                        if (propertyIndex !== 2 && s.secondOption.length !== 0) {
                            secondOptionValue = s.secondOption.find('select').val() || s.secondOption.find('.property.active').data('property-value');
                        }
                        
                        if (propertyIndex !== 3 && s.thirdOption.length !== 0) {
                            
                            thirdOptionValue = s.thirdOption.find('select').val() || s.thirdOptionValue.find('.property.active').data('property-value');
                        }
                        
                        if (propertyIndex === 1) {
                            if (levels === 1) {
                                variantId = dict[propertyName][propertyValue];
                            } else if (levels === 2) {
                                variantId = dict[propertyName][propertyValue][secondOptionValue];
                            } else if (levels === 3) {
                                variantId = dict[propertyName][propertyValue][secondOptionValue][thirdOptionValue];
                            }
                            
                        } else if (propertyIndex === 2) {
                            if (levels === 2) {
                                variantId = dict[propertyName][firstOptionValue][propertyValue];
                            } else if (levels === 3) {
                                variantId = dict[propertyName][firstOptionValue][propertyValue][thirdOptionValue];
                            }
                            
                        } else if (propertyIndex === 3) {
                            if (levels === 3) {
                                variantId = dict[propertyName][firstOptionValue][secondOptionValue][propertyValue];
                            }
                        }
                        
                        if (typeof (variantId) !== 'undefined') {
                            
                            console.log('variantId', variantId);
                            /** set variant id */
                            s.inputVariantId.val(variantId);

                            ProductVariants.setNewPrice(variantId);
                            ProductVariants.setNewImage(variantId);
                            ProductVariants.setNewShippingInfo(variantId);
                            if (s.changeAddToCartButtonState === true) {
                                ProductVariants.setAddToCartButton(false);
                            }
                        }
                    // }
                },

                setFirstAvailebleProperty: function (option) {
                    var selectProperties = option.find('select');

                    if (selectProperties.length) {
                        selectProperties.find('option').removeAttr('selected', 'selected');
                        selectProperties.find('option:enabled').first().attr('selected', 'selected');
                        if (s.selectricSelect === true) {
                            selectProperties.selectric('refresh');
                        }
                    } else {
                        option.find(s.propertyHandler).not('.unavailable').first().addClass('active');
                    }
                },

                deactivateUnavailableProperties: function (option, activeProperty) {
                    var selectProperties = option.find('select');

                    /** Check if option has select properties*/
                    if (selectProperties.length) {
                        selectProperties.find('option').each(function () {
                            var $this = $(this);
                            if (typeof (activeProperty[$this.data('property-value')]) === 'undefined') {
                                $this.prop('disabled', true);
                            } else {
                                if (typeof (activeProperty[$this.data('property-value')]) === 'undefined') {
                                    $this.prop('disabled', true);
                                } else {
                                    $this.prop('disabled', false);
                                }
                            }
                            if (s.selectricSelect === true) {
                                selectProperties.selectric('refresh');
                            }
                        });
                    } else {
                        option.find(s.propertyHandler).each(function () {
                            var $this = $(this);
                            $this.removeClass('active');
                            if (typeof (activeProperty[$this.data('property-value')]) === 'undefined') {
                                $this.addClass('unavailable');
                            } else {
                                $this.removeClass('unavailable');
                            }
                        });
                    }

                },

                deactivateAllProperies: function (option) {
                    var selectProperties = option.find('select');
                    /** Check if option has select properties*/
                    if (selectProperties.length) {
                        selectProperties.find('option').each(function () {
                            $(this).prop('disabled', true);
                        });
                    } else {
                        option.find(s.propertyHandler).each(function () {
                            $(this).addClass('unavailable').removeClass('active');
                        });
                    }
                },

                setAddToCartButton: function (condition) {
                    s.addToCartButton.prop('disabled', condition);
                },

                setNewPrice: function (variantId) {
                    s.newPriceWrapper.text(prices[variantId]);
                    if (s.oldPriceWrapper) {
                        s.oldPriceWrapper.text(pricesRegular[variantId]);
                    }
                },

                /**
                    Probably we have to find better solution for replacing images.
                    There are too many variables, that have to be set correctly.

                    #images in product matrix
                    #it has to be carousel with thumbs
                */
                setNewImage: function (variantId) {
                    var thumb = s.thumbsWrapper.find('li'),
                        i;

                    for (i = 0; i < thumb.length; i += 1) {
                        if ($(thumb[i]).find('img').attr('src') === images[variantId]) {
                            $(thumb[i]).find('img').trigger('click');
                        }
                    }
                },

                setNewShippingInfo: function (variantId) {
                    var shippingDefault = s.shippingInfoWrapper.data('shipping-default');
                    if (s.shippingInfoWrapper.length) {
                        if (shipping[variantId].length) {
                            s.shippingInfoWrapper.find(s.shippingInfo).html(shipping[variantId]);
                        } else {
                            s.shippingInfoWrapper.find(s.shippingInfo).html(shippingDefault);
                        }
                    }
                },

                /**
                * @param {object} property - property object
                * @param {string} type - node type, we have to distingue nodes for diferent functions
                */
                initHelper: function (property, type, single) {

                },


                initForm: function () {
                    var selectProperties = s.firstOption.find('select'),
                        properties,
                        i,
                        active = false,
                        currentProperty,
                        currentPropertyId;
                    /** if second option exist, run regular init, else run single option one */
                    if (s.secondOption.length) {
                        console.log('second option');
                        throw new Error("my error message");
                        if (selectProperties.length) {
                            properties = selectProperties.find('option');
                            for (i = 0; i < properties.length; i += 1) {
                                currentProperty = $(properties[i]);
                                    if (dict[selectProperties.data('property-name')] !== undefined) {
                                        currentPropertyId = dict[selectProperties.data('property-name')][currentProperty.data('property-value')];
                                    } else {
                                        currentPropertyId = undefined;
                                    }
                            
                                if (currentPropertyId !== undefined && active === false) {
                                    currentProperty.prop('selected', true);
                                    currentProperty.change();
                                    active = true;
                                }
                                if (currentPropertyId === undefined) {
                                    currentProperty.prop('disabled', true);
                                }
                                
                            }

                        } else {
                            properties = s.firstOption.find(s.propertyHandler);
                            for (i = 0; i < properties.length; i += 1) {
                                currentProperty = $(properties[i]);
                                if (dict[currentProperty.data('property-name')] !== undefined) {
                                    currentPropertyId = dict[currentProperty.data('property-name')][currentProperty.data('property-value')];
                                } else {
                                    currentPropertyId = undefined;
                                }
                                if (currentPropertyId !== undefined && active === false) {
                                    currentProperty.trigger('click');
                                    active = true;
                                }
                                if (currentPropertyId === undefined) {
                                    currentProperty.addClass('unavailable');
                                }
                            }
                        }
                    } else {
                        
                        if (selectProperties.length) {
                            /** disable disabled properties, and select firs available */
                            properties = selectProperties.find('option');

                            for (i = 0; i < properties.length; i += 1) {
                                currentProperty = $(properties[i]);
                                    if (dict[selectProperties.data('property-name')] !== undefined) {
                                        currentPropertyId = dict[selectProperties.data('property-name')][currentProperty.data('property-value')];
                                    } else {
                                        currentPropertyId = undefined;
                                    }
                                
                                if (currentPropertyId === undefined) {
                                    currentProperty.prop('disabled', true);
                                } else if (active === false) {
                                    currentProperty.prop('selected', true);
                                    currentProperty.change();
                                    active = true;
                                }
                            }
                        } else {
                            properties = s.firstOption.find(s.propertyHandler);

                            /** add unavailable class to disabled properties */
                            for (i = 0; i < properties.length; i += 1) {
                                currentProperty = $(properties[i]);
                                if (dict[selectProperties.data('property-name')] !== undefined) {
                                    currentPropertyId = dict[currentProperty.data('property-name')][currentProperty.data('property-value')];
                                } else {
                                    currentPropertyId = undefined;
                                }
                                if (currentPropertyId === undefined) {
                                    currentProperty.addClass('unavailable');
                                } else if (active === false) {
                                    currentProperty.trigger('click');
                                    active = true;
                                }
                            }
                        }

                    }
                    if (s.selectricSelect === true) {
                        selectProperties.selectric('refresh');
                    }
                }
            };

        return ProductVariants.init();

    };

    $.fn.productVariants.defaults = {
        variantsContainer: '#variants',
        propertyContainer: '.option',
        propertyHandler: '.property',   // for box properties
        propertiesHandler: 'select.properties', //for properties in select input
        addToCartButton: '#addToCart',
        changeAddToCartButtonState: true, //if active, we change add to cart button to disable when current variant i disabled
        inputVariantId: 'input[name=id]',
        newPriceWrapper: '.new-price',
        oldPriceWrapper: '.old-price',
        thumbsWrapper: '#thumbsGallery',
        shippingInfoWrapper: '#shippingInfo',
        shippingInfo: 'p',
        selectricSelect: true
    };

}(jQuery));