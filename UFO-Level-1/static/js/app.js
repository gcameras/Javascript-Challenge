// From data.js
var tableData = data;

// Function to display UFO sightings in the table
function showTableData(ufoSightings) {
    var tbody = d3.select("tbody");
    ufoSightings.forEach((ufoRecord) => {
        var row = tbody.append("tr");
        Object.entries(ufoRecord).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.html(value);
        });
    });
};

// Function to clear the table
function clearTable() {
    d3.select("tbody")
        .selectAll("tr").remove()
        .selectAll("td").remove();
};

// Initial display of all UFO sightings
console.log(tableData);
showTableData(tableData);

// Select filter button
var button = d3.select("#filter-btn");

// Use D3 `.on` to attach a click handler for the filter table button
button.on("click", function(event) {

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Clear the table from the previous filtered query
    clearTable();

    // Select date input field element
    var dateInput = d3.select("#datetime").property("value");

    // If date input field is empty, show all rows
    if (dateInput === "") {
        var filteredData = tableData;
    }

    // Otherwise, show results matching the user's date input
    else {
        var filteredData = tableData.filter(ufoSighting => ufoSighting.datetime === dateInput);
    };

    // Display message if no records found
    if (filteredData.length == 0) {
        d3.select("tbody")
            .append("tr")
            .append("td")
            .attr("colspan", 7)
            .html("<h5>No Data Found</h5>");
    };

    console.log(filteredData);
    showTableData(filteredData);
});