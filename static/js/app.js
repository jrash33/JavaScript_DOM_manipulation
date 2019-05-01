//JOEY ASHCROFT 4/30/2019
//Automatic Table and Date Search

// Using the UFO dataset provided in the form of an array of JavaScript objects, 
// write code that appends a table to your web page and then adds new rows of data for each UFO sighting.

// Make sure you have a column for date/time, city, state, country, shape, and comment at the very least.


// Use a date form in your HTML document and write JavaScript code that will listen for events and
// search through the date/time column to find rows that match user input.
// *******************************************************************************************************


//CODE MAIN:
//import data from data.js
var tableData = data;

var tbody  = d3.select("tbody")


//function to create table using data object as input 
function create_table(data){
  data.forEach(function(d){

    //create row
    var row = tbody.append("tr");
  
    //unpack each row element into table
    Object.entries(d).forEach(function([key,value]){
      //append a cell to the row for each value
      var cell = tbody.append("td");
      //set cell value
      cell.text(value);
    });
  
  });
}

//create table with all data
create_table(tableData)



//button filter
var button = d3.select("#filter-btn");
var input_date = d3.select("#datetime");
var input_city = d3.select("#city");
var input_state = d3.select("#state");
var input_country = d3.select("#country");
var input_shape = d3.select("#shape");

//********CREATE DROP DOWN MENU FOR EACH VARIABLE*****
var datetime=[];
var city=[];
var state=[];
var country=[];
var shape=[];

function dropdown_options(data){
Object.entries(data).forEach(function([key,value]){
//push values to array  
datetime.push(value["datetime"])
city.push(value["city"])
state.push(value["state"])
country.push(value["country"])
shape.push(value["shape"])
});

//const to get unique values
const unique = (value, index, self) => {
  return self.indexOf(value) === index
}

//rewrite variable with only unique values
datetime = datetime.filter(unique)
city = city.filter(unique)
state = state.filter(unique)
country = country.filter(unique)
shape = shape.filter(unique)

//push values to drop down menu
datetime.map(i => d3.select("#datetime").append("option").text(i))
city.map(i => d3.select("#city").append("option").text(i))
state.map(i => d3.select("#state").append("option").text(i))
country.map(i => d3.select("#country").append("option").text(i))
shape.map(i => d3.select("#shape").append("option").text(i))

};

dropdown_options(data)

//function that outputs new filtered data by input date
function handleChange(){

  //create new data table that is going to be filtered
  var filtered = data;
  
  //prevent page refresh!
  d3.event.preventDefault();

  //clear previous table
  tbody.text("")

  //TEST
  if (input_date.property("value")){
  var date = input_date.property("value");
  //create new data object with filtered rows by input date
  filtered = data.filter(i => i.datetime == date);
  };

  //if a value is input for date filter the data
  if (input_date.property("value")){
  var date = input_date.property("value");
  //create new data object with filtered rows by input date
  filtered = data.filter(i => i.datetime == date);
  };

  //if a value is input for city filter the data
  if (input_city.property("value")){
  var city = input_city.property("value");
  //create new data object with filtered rows by input date
  filtered = filtered.filter(i => i.city == city);
  };

  //if a value is input for state filter the data
  if (input_state.property("value")){
  var state = input_state.property("value");
  //create new data object with filtered rows by input date
  filtered = filtered.filter(i => i.state == state);
  };

  //if a value is input for country filter the data
  if (input_country.property("value")){
  var country = input_country.property("value");
  //create new data object with filtered rows by input date
  filtered = filtered.filter(i => i.country == country);
  };

  //if a value is input for shape filter the data
  if (input_shape.property("value")){
  var shape = input_shape.property("value");
  //create new data object with filtered rows by input date
  filtered = filtered.filter(i => i.shape == shape);
  };

  //refresh dropdown options
  dropdown_options(filtered)


  //input this new data object into our function to output the table
  create_table(filtered)

}


//event
button.on("click", handleChange)