let url;
const fetchData = function(url, object){
    fetch(url)
    .then(res => res.json()) //for this exercise, just do this
    .then(data => {
     // Inside this callback, AND ONLY HERE the response data is available
     console.log("data",data);
     if(object === "cars"){
        const formattedData = formatCarData(data);
        document.querySelector("#show-all-data").innerHTML = formattedData;
     }else if(object === "oneCar"){
        const formattedData = formatCarData(data);
        document.querySelector("#show-single-data").innerHTML = formattedData;
     } else if(object === "members"){
        const formattedData = formatMemberData(data);
        document.querySelector("#show-all-data").innerHTML = formattedData;
     } else if(object === "oneMember"){
        const formattedData = formatMemberData(data);
        document.querySelector("#show-single-data").innerHTML = formattedData;
     }

    /* data now contains the response, converted to JavaScript
       Observe the output from the log-output above
       Now, just build your DOM changes using the data inside this block*/       
  })
}
const fetchAllCars = () => {
    url = "http://localhost:8080/api/cars";
    fetchData(url, "cars");
}
const fetchAllMembers = () => {
    url = "http://localhost:8080/api/members"
    fetchData(url, "members");
}
const fetchDataFromId = () => {
    const searchId = document.querySelector("#text-for-id").value;
    const selected = document.querySelector(`input[name="result"]:checked`);
    let searchType;
    if(selected.value === "Car"){
        url = "http://localhost:8080/api/cars/"+searchId;
        searchType = "oneCar";
    } else if(selected.value === "Member"){
        url = "http://localhost:8080/api/members/"+searchId;
        searchType = "oneMember";
    }
    fetchData(url, searchType);
}

const formatCarData = (data) => {
    let dataString = "";
    if(data instanceof Array){
        dataString = data.map(car => `Id: ${car.id}, Brand: ${car.brand}, Model: ${car.model}, Price: ${car.pricePrDay}`).join("<br>")
    } else if(data instanceof Object){
        dataString = `Id: ${data.id}, Brand: ${data.brand}, Model: ${data.model}, Price: ${data.pricePrDay}`
    }
    return dataString;
}

//Reservations not included yet, but is available to grab from API
const formatMemberData = (data) => {
    let dataString = "";
    if(data instanceof Array){
        dataString = data.map(member => `Username: ${member.username}, Email: ${member.email}, Name: ${member.firstName} ${member.lastName}, Address: ${member.street}, ${member.zip} ${member.city}`).join("<br>")
    } else if(data instanceof Object){
        dataString = `Username: ${data.username}, Email: ${data.email}, Name: ${data.firstName}" "${data.lastName}, Address: ${data.street}, ${data.zip} ${data.city}`
    }
    return dataString;
}

document.querySelector("#btn-get-all-cars").addEventListener("click", fetchAllCars);
document.querySelector("#btn-get-all-members").addEventListener("click", fetchAllMembers);
document.querySelector("#search-for-id-btn").addEventListener("click", fetchDataFromId);