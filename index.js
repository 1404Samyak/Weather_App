//here when we load the dom we dont need the information to be retained from local storage with each load the content reappears
//we want to display the city name

const API_KEY="3a04f53f3039ceb1ed2c999167fefd77"
//Note the fetchdata will always be an async function with await as fetch url is an async function just like promise
async function fetchweatherinfo(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
    try {
        const response = await fetch(url);
        //fetch request succeeded now check the response.ok
        if (!response.ok) {
            throw new Error(`City not found: ${response.status}`); //will also exit the function like return 
        }
        const weatherdata = await response.json(); //to convert the weather data into javascript object
        console.log(weatherdata);
        return weatherdata;
    } catch (error) {
        //fetch request only failed
        console.error("Fetch failed:", error.message);
        throw error; // Re-throw to let the caller handle it
    }
}


function displaydata(data){
    let div=document.getElementById('weather-info')
    const cityname=data.city.name
    const temp=data.list[0].main.temp
    const description=data.list[0].weather[0].description
    let p1=document.createElement('p')
    p1.innerHTML=`City: ${cityname}`
    div.appendChild(p1)
    let p2=document.createElement('p')
    p2.innerHTML=`Temperature :${temp}°C`
    div.appendChild(p2)
    let p3=document.createElement('p')
    p3.innerHTML=`Description: ${description}`
    div.appendChild(p3)

}

s=new Set()
document.addEventListener('DOMContentLoaded', () => {
    let button = document.getElementById('getWeather');
    button.addEventListener('click', async () => {
        let city= document.getElementById('city').value.trim();
        if (city && !(s.has(city))) {
            try {
                s.add(city)
                const weatherdata=await fetchweatherinfo(city)
                displaydata(weatherdata)
            } 
            catch (error) {
                let div=document.getElementById('weather-info')
                let p=document.createElement('p')
                p.innerHTML=`City named ${city} not found`
                div.appendChild(p)  
            }            
        } 
        else if(s.has(city))alert(`Weather updates of the city ${city} is already uploaded`)
        else {
            alert("Kindly enter a city name");
        }
    });
});