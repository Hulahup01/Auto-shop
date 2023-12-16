class MatrixTable {
  #table;
  #selectedCells;

  constructor() {
    this.#table = document.createElement("table");
    this.#selectedCells = new Set();
  }


  addRowsAndColumns(rows, columns) {
    for (let i = 0; i < rows; i++) {
      this.addRow();
    }

    for (let i = 0; i < columns; i++) {
      this.addColumn();
    }
  }

  get maxSelectedCells() {
    const maxSelectedItemsInput = document.getElementById("max-selected-items");
    return Number(maxSelectedItemsInput?.value || 1);
  }

  addRow(content) {
    const row = this.#table.insertRow();
    const columnsLength = this.#table.rows[0]?.cells?.length ?? 0;

    for (let i = 0; i < columnsLength; i++) {
      const cell = row.insertCell();
      cell.textContent = content?.at(i) ?? Math.floor(Math.random() * 10).toString();
      cell.addEventListener("click", this.handleCellClick.bind(this, cell));
    }
  }

  addColumn(content) {
    for (let i = 0; i < this.#table.rows?.length; i++) {
      const cell = this.#table.rows[i].insertCell();
      cell.textContent = content?.at(i) ?? Math.floor(Math.random() * 10).toString();
      cell.addEventListener("click", this.handleCellClick.bind(this, cell));
    }
  }
 
  transpose() {
    const rowsLength = this.#table.rows?.length ?? 0;
    const columnsLength = this.#table.rows[0]?.cells?.length ?? 0;
    const newData = [];

    for (let j = 0; j < rowsLength; j++) {
      const newColumns = [];
      for (let i = 0; i < columnsLength; i++) {
        newColumns.push(this.#table.rows[j].cells[i].textContent);
      }
      newData.push(newColumns);
    }

    this.clearTable();
    for (let i = 0; i < columnsLength; i++) {
      this.addRow();
    }

    for (const columnData of newData) {
      this.addColumn(columnData);
    }
  }


  handleCellClick(cell) {
    const rowIndex = cell.parentElement.rowIndex;
    const colIndex = cell.cellIndex;

    if (this.#selectedCells.has(cell)) {
      // Deselect the cell
      this.#selectedCells.delete(cell);
      cell.style.backgroundColor = "";
    } else {
      // Check if max selected cells in row/column is reached
      if (
        this.countSelectedCellsInRow(rowIndex) < this.maxSelectedCells &&
        this.countSelectedCellsInColumn(colIndex) < this.maxSelectedCells &&
        this.areNeighborsUnselected(cell, rowIndex, colIndex)
      ) {
        // Select the cell
        this.#selectedCells.add(cell);
        cell.style.backgroundColor =
          Number(cell.textContent) % 2 === 0 ? "#4b4a4a" : "lightblue";
      }
    }
  }


  countSelectedCellsInRow(rowIndex) {
    let count = 0;
    for (const cell of this.#selectedCells) {
      if (cell.parentElement.rowIndex === rowIndex) {
        count++;
      }
    }
    return count;
  }

  
  countSelectedCellsInColumn(colIndex) {
    let count = 0;
    for (const cell of this.#selectedCells) {
      if (cell.cellIndex === colIndex) {
        count++;
      }
    }
    return count;
  }


  areNeighborsUnselected(cell, rowIndex, colIndex) {
    const neighbors = [-1, 0, 1];
    for (const neighbor of neighbors) {
      if (
        this.#selectedCells.has(
          this.#table.rows[rowIndex + neighbor]?.cells[colIndex]
        ) ||
        this.#selectedCells.has(
          this.#table.rows[rowIndex]?.cells[colIndex + neighbor]
        )
      ) {
        return false; // At least one neighbor is selected
      }
    }
    return true; // No neighbors are selected
  }


  clearTable() {
    while (this.#table.rows.length > 0) {
      this.#table.deleteRow(0);
    }
  }


  render(targetElement) {
    if (targetElement instanceof HTMLElement) {
      targetElement.appendChild(this.#table);
    } else {
      throw new Error("Invalid target element");
    }
  }
}

function init() {
  const myTable = new MatrixTable();

  const tableSizeForm = document.forms.namedItem("table-size-form");

  const addRowButton = document.getElementById("add-row-button");
  const addColumnButton = document.getElementById("add-column-button");
  const transposeButton = document.getElementById("transpose-button");

  addColumnButton.addEventListener("click", (e) => {
    e.preventDefault();
    myTable.addColumn();
  });
  addRowButton.addEventListener("click", (e) => {
    e.preventDefault();
    myTable.addRow();
  });
  transposeButton.addEventListener("click", (e) => {
    e.preventDefault();
    myTable.transpose();
  });

  tableSizeForm.onsubmit = (e) => {
    e.preventDefault();

    
    const tableSizeInput = document.getElementById("table-size");

    const tableSize = Number(tableSizeInput.value);
    myTable.addRowsAndColumns(tableSize, tableSize);
    myTable.render(document.getElementById("table-container"));

    tableSizeForm.style.display = "none";
    console.log(tableSizeForm);

    document.getElementById("table-buttons-container").hidden = false;
  };
}

init();
