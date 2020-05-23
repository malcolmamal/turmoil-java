import jQuery from "jquery";

export function svgAddClass(element, className)
{
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
}

export function svgRemoveClass(element, className)
{
	let newClasses = '';
	jQuery.each(element.attr('class').replace(/[\s]+/g, ' ').trim().split(' '), function( index, value ) {
		if (className !== value)
		{
			newClasses += ' ' + value;
		}
	});
	element.attr('class', jQuery.trim(newClasses));
}

export function svgHasClass(element, className)
{
	let hasClass = false;
	jQuery.each(element.attr('class').replace(/[\s]+/g, ' ').trim().split(' '), function( index, value ) {
		if (className === value)
		{
			hasClass = true;
			return false;
		}
	});
	return hasClass;
}

export function svgPrintClasses(element)
{
	console.log(element.attr('class'));
}
