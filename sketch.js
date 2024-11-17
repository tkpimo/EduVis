// let data;
// let url = "Education.csv";
// let table;
// let filteredRows = [];

// function preload() {
//   data = loadTable(url, 'csv', 'header');
//   table = loadTable('Education.csv', 'csv', 'header');
//   imgUSA = loadImage('USAmap.png');
// }

// function setup() {
//   createCanvas(1000, 1000); // Adjust canvas size as needed
//   textSize(16); // Set text size for readability

//   // Loop through each row in the table
//   for (let i = 0; i < table.getRowCount(); i++) {
//     let row = table.getRow(i);

//     // Check if any column in the row contains "2019"
//     let contains2019 = false;
//     for (let j = 0; j < table.getColumnCount(); j++) {
//       let cellValue = row.getString(j);
//       if (cellValue.includes("2019")) {
//         contains2019 = true;
//         break;
//       }
//     }

//     // If the row contains "2019", extract relevant columns
//     if (contains2019) {
//       let geoName = row.getString("GeoName");
//       let noHigh = row.getString("C_EA_GT25_WODIS_EDUATTAIN_LHSG");
//       let yesHigh = row.getString("C_EA_GT25_WODIS_EDUATTAIN_HSGIE");
//       let someCol = row.getString("C_EA_GT25_WODIS_EDUATTAIN_SCAG");
//       let yesBA = row.getString("C_EA_GT25_WODIS_EDUATTAIN_BDH");
      
//       // Push an object with only the relevant columns
//       filteredRows.push([geoName, noHigh, yesHigh, someCol, yesBA]);
//     }
//   }

//   // Log the filtered rows to the console (for debugging)
//   console.log(filteredRows);
// }

// function draw() {
//   //image(imgUSA,0,0, 1000,1000);
// background(1000,1000);
//   // Display the filtered rows on the canvas
//   let y = 30; // Start position for the text
//   for (let i = 0; i < filteredRows.length; i++) {
//     let rowText = filteredRows[i].join(", "); // Combine row values into a string
//     text(rowText, 10, y); // Draw the row text
//     y += 20; // Move down for the next row
//   }
// }
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
  createCanvas(1000, 1000); // Adjust canvas size as needed
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

      // Push an object with only the relevant columns
      filteredRows.push([geoName, noHigh, yesHigh, someCol, yesBA]);
    }
  }

  // Log the filtered rows to the console (for debugging)
  console.log(filteredRows);

  // Set the initial column selection (default to "GeoName")
  selectedColumn = "GeoName";
}

function draw() {
  background(220);

  // Display the selected column's values on the canvas
  let y = 30; // Start position for the text

  // Find the index of the selected column in filtered rows
  let columnIndex;
  switch (selectedColumn) {
    case "GeoName":
      columnIndex = 0;
      break;
    case "NoHigh":
      columnIndex = 1;
      break;
    case "YesHigh":
      columnIndex = 2;
      break;
    case "SomeCol":
      columnIndex = 3;
      break;
    case "YesBA":
      columnIndex = 4;
      break;
  }

  // Display values from the selected column
  for (let i = 0; i < filteredRows.length; i++) {
    let rowText = filteredRows[i][columnIndex]; // Get the value of the selected column
    text(rowText, 10, y); // Draw the row text
    y += 20; // Move down for the next row
  }
}