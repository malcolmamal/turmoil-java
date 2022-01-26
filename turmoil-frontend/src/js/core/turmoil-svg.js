import jQuery from 'jquery';

export const Svg = {
  addClass(element, className) {
    let newClasses = '';
    let hasClass = false;
    jQuery.each(element.attr('class').replace(/[\s]+/g, ' ').trim().split(' '), (index, value) => {
      newClasses += ` ${value}`;
      if (className === value) {
        hasClass = true;
      }
    });

    if (!hasClass) {
      newClasses += ` ${className}`;
    }

    element.attr('class', jQuery.trim(newClasses));
  },
  addClassWithDuration(element, className, duration) {
    jQuery(element).addClass(className, duration);
  },
  removeClassWithDuration(element, className, duration) {
    jQuery(element).removeClass(className, duration);
  },
  removeClass(element, className) {
    let newClasses = '';
    jQuery.each(element.attr('class').replace(/[\s]+/g, ' ').trim().split(' '), (index, value) => {
      if (className !== value) {
        newClasses += ` ${value}`;
      }
    });
    element.attr('class', jQuery.trim(newClasses));
  },
  hasClass(element, className) {
    let hasClass = false;
    jQuery.each(element.attr('class').replace(/[\s]+/g, ' ').trim().split(' '), (index, value) => {
      if (className === value) {
        hasClass = true;

        return false;
      }
    });

    return hasClass;
  },
  replaceClass(element, newClassName, oldClassName) {
    Svg.removeClass(element, oldClassName);
    Svg.addClass(element, newClassName);
  },
  printClass(element) {
    console.log(element.attr('class'));

    return element.attr('class');
  },
};
