import jQuery from "jquery";

export let Svg = {
	addClass: function (element, className) {
		let newClasses = '';
		let hasClass = false;
		jQuery.each(element.attr('class').replace(/[\s]+/g, ' ').trim().split(' '), function( index, value ) {
			newClasses += ' ' + value;
			if (className === value)
			{
				hasClass = true;
			}
		});

		if (!hasClass)
		{
			newClasses += ' ' + className;
		}

		element.attr('class', jQuery.trim(newClasses));
	},
	addClassWithDuration: function (element, className, duration) {
		jQuery(element).addClass(className, duration);
	},
	removeClassWithDuration: function (element, className, duration) {
		jQuery(element).removeClass(className, duration);
	},
	removeClass: function (element, className) {
		let newClasses = '';
		jQuery.each(element.attr('class').replace(/[\s]+/g, ' ').trim().split(' '), function( index, value ) {
			if (className !== value) {
				newClasses += ' ' + value;
			}
		});
		element.attr('class', jQuery.trim(newClasses));
	},
	hasClass: function (element, className) {
		let hasClass = false;
		jQuery.each(element.attr('class').replace(/[\s]+/g, ' ').trim().split(' '), function( index, value ) {
			if (className === value) {
				hasClass = true;

				return false;
			}
		});

		return hasClass;
	},
	replaceClass: function (element, newClassName, oldClassName) {
		Svg.removeClass(element, oldClassName);
		Svg.addClass(element, newClassName);
	},
	printClass: function (element) {
		console.log(element.attr('class'));

		return element.attr('class');
	}
}
