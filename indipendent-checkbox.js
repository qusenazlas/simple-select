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

const toggleCheck = (elem, changeTo) => {
  const checked = elem.checked;
  if (checked === changeTo) return;
  elem.checked = changeTo;
};

function onSelectAll(parent, group) {
  console.log("onSelectAll");
  const allCheckboxes = document.querySelectorAll(
    `[checkbox][data-parent="${parent}"][data-group="${group}"]`
  );
  allCheckboxes.forEach((elem) => {
    const value = elem.dataset.value;
    addDataToObject(parent, group, value);
    toggleCheck(elem, "true");
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

  if (!selected?.[parent]?.[group].has(value)) {
    toggleCheck(element, "true");
    addData(element, parent, group);
  } else {
    removeData(element, parent, group);
  }
  console.log(parent, group);
  console.log({ selected });
}
