const selected = {};

function toggleDropdown(event) {
  const context = event.target.dataset.toggler;
  const dropdownWrapper = document.querySelector(`[data-context="${context}"]`);

  if (dropdownWrapper.style.display !== "flex") {
    dropdownWrapper.style.display = "flex";
  } else {
    dropdownWrapper.style.display = "none";
  }
}

function addOrRemove(list, value, element, checkboxMode) {
  if (list.has(value)) {
    list.delete(value);
    element.removeAttribute("data-selected");
    if (checkboxMode) {
      element.children[0].removeAttribute("checked");
    }
  } else {
    list.add(value);
    element.setAttribute("data-selected", "true");
    if (checkboxMode) {
      element.children[0].setAttribute("checked", "true");
    }
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
    if (getIsCheckboxMode(context)) {
      item.children[0].removeAttribute("checked");
    }
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
    if (getIsCheckboxMode(context)) {
      element.children[0].setAttribute("checked", "true");
    }
  });
}

function shouldUnCheckSelectAll(context, value) {
  const selectAll = document.querySelector(
    `[data-member="${context}"][data-selectall="true"]`
  );
  const isCheck = selectAll.getAttribute("data-selected");
  if (isCheck === "true" && !selected[context].has(value)) {
    selectAll.removeAttribute("data-selected");
    if (getIsCheckboxMode(context)) {
      selectAll.children[0].removeAttribute("checked");
    }
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
      shouldUnCheckSelectAll(context, element);
    } else {
      selected[context] = new Set().add(value);
      if (isCheckboxMode) {
        element.children[0].setAttribute("checked", "true");
      }
    }
  }

  console.log(selected);
}

function getSelected() {
  return selected;
}
