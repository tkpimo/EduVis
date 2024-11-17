let data;
let url = "Education.csv";
let table;
let filteredRows = [];
let selectedColumn;  // Variable to hold the selected column
let columnNames = ["GeoName", "NoHigh", "YesHigh", "SomeCol", "YesBA"];

function preload() {
  data = loadTable(url, 'csv', 'header');
  table = loadTable('Education.csv', 'csv', 'header');
}

function setup() {
  createCanvas(1000, 600); // Adjust canvas size for graph
  textSize(16); // Set text size for readability

  // Create a dropdown menu for selecting a column
  let dropdown = createSelect();
  dropdown.position(10, 10);
  
  // Add the column options to the dropdown
  for (let i = 0; i < columnNames.length; i++) {
    dropdown.option(columnNames[i]);
  }
  
  // Set default selection to 'GeoName'
  dropdown.selected('GeoName');
  
  // Update selected column when dropdown changes
  dropdown.changed(() => {
    selectedColumn = dropdown.value();
    drawBarGraph(); // Redraw the bar graph when selection changes
  });

  // Loop through each row in the table
  for (let i = 0; i < table.getRowCount(); i++) {
    let row = table.getRow(i);

    // Check if any column in the row contains "2019"
    let contains2019 = false;
    for (let j = 0; j < table.getColumnCount(); j++) {
      let cellValue = row.getString(j);
      if (cellValue.includes("2019")) {
        contains2019 = true;
        break;
      }
    }

    // If the row contains "2019", extract relevant columns
    if (contains2019) {
      let geoName = row.getString("GeoName");
      let noHigh = row.getString("C_EA_GT25_WODIS_EDUATTAIN_LHSG");
      let yesHigh = row.getString("C_EA_GT25_WODIS_EDUATTAIN_HSGIE");
      let someCol = row.getString("C_EA_GT25_WODIS_EDUATTAIN_SCAG");
      let yesBA = row.getString("C_EA_GT25_WODIS_EDUATTAIN_BDH");

      // Push the row data for each column into filteredRows
      filteredRows.push({
        geoName: geoName,
        noHigh: parseFloat(noHigh),  // Ensure it's a number
        yesHigh: parseFloat(yesHigh), // Ensure it's a number
        someCol: parseFloat(someCol), // Ensure it's a number
        yesBA: parseFloat(yesBA) // Ensure it's a number
      });
    }
  }

  // Set the initial column selection (default to "GeoName")
  selectedColumn = "GeoName";

  // Draw the initial bar graph for GeoName
  drawBarGraph();
}

function draw() {
  background(220);
}

function drawBarGraph() {
  clear(); // Clear the canvas before redrawing

  // Determine the index of the selected column
  let columnIndex;
  let columnData = [];
  switch (selectedColumn) {
    case "GeoName":
      return; // GeoName is not a numeric value, so no graph for it
    case "NoHigh":
      columnIndex = 1;
      columnData = filteredRows.map(row => row.noHigh);
      break;
    case "YesHigh":
      columnIndex = 2;
      columnData = filteredRows.map(row => row.yesHigh);
      break;
    case 
