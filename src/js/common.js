export function replaceBlock(toHidden, toVisible) {
  visibilityChange('hide', toHidden);
  visibilityChange('show', toVisible);
}

export function ifLocalStorageIsNull(NAME, item, btn, name) {
  if (
    localStorage.getItem(NAME) === '' ||
    localStorage.getItem(NAME) === null
  ) {
    item.classList.add('make-absolute');
    btn.innerHTML = `Set current ${name}`;
  }
}

export function visibilityChange(action, item) {
  if (action === 'hide') {
    item.classList.add('is-hidden');
    item.classList.add('make-absolute');
  } else if (action === 'show') {
    item.classList.remove('is-hidden');
    item.classList.remove('make-absolute');
  }
}
