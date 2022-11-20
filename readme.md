# Simple Select

## How to use

- 1. Download select.js and import to your html file
     ```
        <script defer src="select.js" type="application/javascript"></script>
     ```
- 2. Copy and paste default css

  ```
  [data-dropdown="true"] {
      display: none;
      flex-direction: column;
  }

  ```

  ```
  [data-selected="true"]:not([checkbox]) {
      background-color: green;
  }
  ```

  ```
      [checkbox] input {
          pointer-events: none;
      }

  ```

- 3. Example for html

```

      <p>dropdown</p>
    <button data-toggler="fruits" onclick="toggleDropdown(event)">
      Select
    </button>
    <ul data-context="fruits" data-multiple="true" data-dropdown="true">
      <li
        onclick="onOptionSelect(event)"
        data-member="fruits"
        data-selectall="true"
        onlick="onOptionSelect()"
      >
        All
      </li>
      <li
        data-member="fruits"
        data-value="apple"
        onclick="onOptionSelect(event)"
      >
        Apple
      </li>
      <li
        data-member="fruits"
        data-value="banana"
        onclick="onOptionSelect(event)"
      >
        Banana
      </li>
      <li
        data-member="fruits"
        data-value="mango"
        onclick="onOptionSelect(event)"
      >
        Mango
      </li>
    </ul>

    <p>checkbox mode</p>

    <ul
      data-context="fruits-checkbox"
      data-multiple="true"
      data-checkbox="true"
    >
      <li
        onclick="onOptionSelect(event)"
        data-member="fruits-checkbox"
        data-selectall="true"
        checkbox
        onlick="onOptionSelect()"
      >
        <input type="checkbox" /> All
      </li>
      <li
        data-member="fruits-checkbox"
        data-value="apple"
        checkbox
        onclick="onOptionSelect(event)"
      >
        <input type="checkbox" /> Apple
      </li>
      <li
        data-member="fruits-checkbox"
        data-value="banana"
        checkbox
        onclick="onOptionSelect(event)"
      >
        <input type="checkbox" /> Banana
      </li>
      <li
        data-member="fruits-checkbox"
        data-value="mango"
        checkbox
        onclick="onOptionSelect(event)"
      >
        <input type="checkbox" /> Mango
      </li>
    </ul>

    <button onclick="alert(JSON.stringify(getSelected()))">submit</button>

  </div>
```

## Attributes and functions

    ** data-checkbox and data-dropdown please select on of them don't use together.

    | attributes    | value         | use for                                                 |
    | ------------- |:-------------:|-------------------------------------------------------:|
    | data-toggler  | string        | to define which element is toggle dropdown button       |
    | data-context  | string        | to define a group of data                               |
    | data-dropdown | boolean       | to define which element is a dropdown                   |
    | data-member   | string        | to define a option is a member in a group               |
    | data-value    | string        | to define a option value                                |
    | data-checkbox | boolean       | true to use checkbox mode                               |
    | checkbox      | boolean       | to define a option has checkbox inside                  |
    | data-selectall| boolean       | to define select all option (you don't need to          |
    |               |               | put data-value along with this attr)                    |

    | functions     | arguments     | use for                                                 |
    | ------------- |:-------------:|-------------------------------------------------------:|
    | onOptionSelect| (event)       | use for select data when you onclick a option           |
    | getSelected   | ()            | to get all selected options                             |
