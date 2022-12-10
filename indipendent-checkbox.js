let selected = {};

/**
 * data:{
 *      parent: {
 *          data-group: []
 *      }
 * }
 *
 *
 * **/

function isObjectEmpty(object) {
  return object === undefined;
}

const toggleCheck = (elem, checked) => {
  if (checked) {
    elem.checked = true;
  } else {
    elem.checked = false;
  }
};

function onSelectAll(parent, group) {
  const allCheckboxes = document.querySelectorAll(
    `[checkbox][data-parent="${parent}"][data-group="${group}"]`
  );
  allCheckboxes.forEach((elem) => {
    const value = elem.dataset.value;
    addDataToObject(parent, group, value);
    toggleCheck(elem, true);
  });
}

function addDataToObject(parent, group, value) {
  if (isObjectEmpty(selected[parent])) {
    Object.assign(selected, {
      [parent]: {
        [group]: new Set([value]),
      },
    });
    return;
  }

  if (isObjectEmpty(selected[parent][group])) {
    Object.assign(selected, { ...selected, [group]: new Set([value]) });
    return;
  }
  selected[parent][group].add(value);
}

function removeData(element, parent, group) {
  const value = element.dataset.value;
  toggleCheck(element, false);
  selected[parent][group].delete(value);
}

function uncheckAll(parent, group) {
  const allCheckboxes = document.querySelectorAll(
    `[checkbox][data-parent="${parent}"][data-group="${group}"]`
  );

  allCheckboxes.forEach((element) => {
    toggleCheck(element, false);
  });

  selected[parent][group] = new Set([]);
}

function addData(element, parent, group) {
  const selectAll = element.dataset.selectall;
  const value = element.dataset.value;
  if (selectAll === "true") onSelectAll(parent, group);

  addDataToObject(parent, group, value);
}

function onSelectCheckbox(event) {
  const element = event.target;
  const parent = element.dataset.parent;
  const group = element.dataset.group;
  const value = element.dataset.value;
  const isSelectAllOption = element.dataset.selectall;
  const selectAllElement = document.querySelector(
    `[data-parent="${parent}"][data-group="${group}"][data-selectall="true"]`
  );
  const selectAllValue = selectAllElement.dataset.value;

  if (!selected?.[parent]?.[group].has(value)) {
    toggleCheck(element, true);
    addData(element, parent, group);
    addDataToObject(parent, group, selectAllValue);
    toggleCheck(selectAllElement, true);
    return;
  }

  if (isSelectAllOption === "true") {
    uncheckAll(parent, group);
    return;
  }

  removeData(element, parent, group);
}

function getSelectedOptions() {
  const keys = Object.keys(selected);
  const newObject = {};
  keys.forEach((key) => {
    const childKeys = Object.keys(selected[key]);
    Object.assign(newObject, { [key]: {} });
    childKeys.forEach((childKey) => {
      newObject[key][childKey] = Array.from(selected[key][childKey]);
    });
  });

  console.log({ newObject });
}
