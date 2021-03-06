function handleStepClick(event) {
  // alert('TODO: prepare warning modal, submit in background?!');
  console.log(event);
  return true;
}

function toggleExpandArrowForSiblingClass($clickedElement, $parentElement, siblingClass) {
  $parentElement
    .siblings(siblingClass).first()
    .slideToggle(function() {
      $clickedElement.toggleClass('fa-caret-down');
      $clickedElement.toggleClass('fa-caret-up');
    });
}

function handleExpandArrowClick(event) {
  event.preventDefault();
  var $clickedElement       = $(event.target);
  var $questionInputElement = $clickedElement.parent().parent();
  var $questionElement      = $questionInputElement.parent();
  if ($questionElement.is('fieldset')) {
    toggleExpandArrowForSiblingClass($clickedElement, $questionInputElement, 'div.question-explanation');
  } else {
    toggleExpandArrowForSiblingClass($clickedElement, $questionInputElement, 'div.predefined-message-preview');
  }
  return true;
}

function registerStepHoverEvent(id, addClassName, removeClassName) {
  $(id).hover(function() {
    if (!$(this).hasClass('active')) {
      $(this).find('i').addClass(addClassName);
      $(this).find('i').removeClass(removeClassName);
      $(this).find('i').addClass('fa-5x');
      $(this).find('i').removeClass('fa-3x');
    }
  }, function() {
    if (!$(this).hasClass('active')) {
      $(this).find('i').addClass(removeClassName);
      $(this).find('i').removeClass(addClassName);
      $(this).find('i').addClass('fa-3x');
      $(this).find('i').removeClass('fa-5x');
    }
  });
}

if (typeof handleLanguageSelect === 'undefined') {
  function handleLanguageSelect(event) {
    console.log('LANGUAGE SELECT');
    return true;
  }
}

if (typeof handleCountrySelect === 'undefined') {
  function handleCountrySelect(event) {
    console.log('COUNTRY SELECT');
    return true;
  }
}

window.iFrameResizer = {
  readyCallback: function() {
    parentIFrame.sendMessage('loaded');
    if ('parentIFrame' in window) {
      $('.questions-form__header__navigation button, .bottom-container button')
      .on('click', function() {
        parentIFrame.scrollToOffset(0, -30);
        parentIFrame.sendMessage('loading');
      });
    }
  }
}

$(document).ready(function() {
  registerStepHoverEvent('#questions-form__header__navigation__step-1', 'fa-check-square-o', 'fa-check-square');
  registerStepHoverEvent('#questions-form__header__navigation__step-2', 'fa-pencil-square-o', 'fa-pencil-square');
  registerStepHoverEvent('#questions-form__header__navigation__step-3', 'fa-pencil-square-o', 'fa-pencil-square');
  registerStepHoverEvent('#questions-form__header__navigation__step-4', 'fa-envelope-o', 'fa-envelope');

  addClickHandlersForClassName(handleStepClick, 'questions-form__header__navigation__step__content');
  addClickHandlersForClassName(handleExpandArrowClick, 'expand-arrow');
  addClickHandlersForClassName(handleLanguageSelect, 'select-picker');

  // the passed handler functions must be prepended globally
  $('#questions-form__header__locality__language__select').on('changed.bs.select', handleLanguageSelect);
  $('#questions-form__header__locality__country__select').on('changed.bs.select', handleCountrySelect);
});
