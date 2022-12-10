let selected = {};

function toggleDropdown(event) {
  const context = event.target.dataset.toggler;
  const dropdownWrapper = document.querySelector(`[data-context="${context}"]`);

  if (dropdownWrapper.style.display !== "flex") {
    dropdownWrapper.style.display = "flex";
  } else {
    dropdownWrapper.style.display = "none";
  }
}

function changeCheckbox(element, checked) {
  checked
    ? element?.setAttribute("checked", "true")
    : element.removeAttribute("checked");
}

function addOrRemove(list, value, element, checkboxMode) {
  if (list.has(value)) {
    list.delete(value);
    element.removeAttribute("data-selected");
    checkboxMode && changeCheckbox(element.children[0], false);
  } else {
    list.add(value);
    element.setAttribute("data-selected", "true");
    checkboxMode && changeCheckbox(element.children[0], true);
  }
}

function getIsCheckboxMode(context) {
  const isCheckBoxMode = document.querySelector(`[data-context="${context}"]`)
    ?.dataset.checkbox;

  return isCheckBoxMode === "true";
}

function deSelectAll(context) {
  const allOptions = document.querySelectorAll(`[data-member="${context}"]`);
  selected[context]?.clear();
  allOptions.forEach((item) => {
    item.removeAttribute("data-selected");
    getIsCheckboxMode(context) && changeCheckbox(item.children[0], false);
  });
}

function selectAll(context, selectAllElement) {
  if (selectAllElement.dataset.selected === "true") {
    deSelectAll(context);
    return;
  }

  const allOptions = document.querySelectorAll(`[data-member="${context}"]`);
  allOptions.forEach((element) => {
    const value = element.dataset.value;
    if (value) {
      if (selected[context]) {
        selected[context].add(value);
      } else {
        selected[context] = new Set().add(value);
      }
    }
    element.setAttribute("data-selected", "true");
    getIsCheckboxMode(context) && changeCheckbox(element.children[0], true);
  });
}

function shouldUnCheckSelectAll(context, value) {
  const selectAll = document.querySelector(
    `[data-member="${context}"][data-selectall="true"]`
  );
  const isCheck = selectAll.getAttribute("data-selected");
  if (isCheck === "true" && !selected[context].has(value)) {
    selectAll.removeAttribute("data-selected");
    getIsCheckboxMode(context) && changeCheckbox(selectAll.children[0], false);
  }
}

function onOptionSelect(event) {
  const element = event.target;
  const context = element.dataset.member;
  const value = element.dataset.value;
  const isSelectAll = element.getAttribute("data-selectall");
  const isCheckboxMode = getIsCheckboxMode(context);
  if (isSelectAll === "true") {
    selectAll(context, element);
  } else {
    if (selected[context]) {
      addOrRemove(selected[context], value, element, isCheckboxMode);
      // shouldUnCheckSelectAll(context, element);
    } else {
      selected[context] = new Set().add(value);
      isCheckboxMode && changeCheckbox(element.children[0], true);
    }
  }

  console.log(selected);
}

function getSelected() {
  const keys = Object.keys(selected);

  const convertedData = keys.map(function (key) {
    return { [key]: Array.from(selected[key]) };
  });
  return convertedData;
}
