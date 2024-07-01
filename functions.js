
const apikey="730aff8303646607ee826df771ea6357"

const textinput= document.getElementById('textInput');
const submitButton = document.getElementById('submitButton');
const image=document.querySelector('.mainimg')
const errmsg=document.querySelector('.error')
const msg=document.querySelector('.weather')
const sr=document.querySelector('.sunrise')
const ss=document.querySelector('.sunset')

submitButton.addEventListener('click', function() {
    const inputValue = textinput.value;
    checkWeather(inputValue);
});

const findtime=(unixTimestamp)=>{

    const date = new Date(unixTimestamp * 1000);

    const istOffset = 5.5 * 60 * 60 * 1000; 
    const istDate = new Date(date.getTime() + istOffset);

    const hours = istDate.getUTCHours();
    const minutes = "" + istDate.getUTCMinutes();
    const seconds = "" + istDate.getUTCSeconds();
    const formattedTime = `${hours}:${minutes.substring(-2)}:${seconds.substring(-2)}`;

    return formattedTime;
}

async function checkWeather(city){
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`
    const responce=await fetch(url);
    
    if(responce.status===404){
        document.querySelector('.error').style.display="block"
        document.querySelector('.weather').style.display="none"
    }
    else if(city.length>0){
        let data= await responce.json()
        document.querySelector(".temp").innerHTML=Math.round(data.main.temp)+" °C"
        document.querySelector(".city").innerHTML=data.name
        document.querySelector(".humidity").innerHTML=data.main.humidity+" %"
        document.querySelector(".wind").innerHTML=data.wind.speed+" Km/h"

        console.log(data)
        const sunrise = findtime(data.sys.sunrise);
        const sunset=findtime(data.sys.sunset);
        const sunriseTime=document.createElement('p')
        sunriseTime.textContent=sunrise+"   "+sunset

        sr.textContent="Sunrise : "+ sunrise+" AM"
        ss.textContent="Sunset : "+sunset+" PM"
        // time.appendChild(sunrise)

        console.log(data.sys.sunrise)
        console.log(findtime(sunrise));
        console.log(findtime(sunset));

        if(data.weather[0].main==="Clouds"){
            image.src="/images/clouds.png"
        }
        else if(data.weather[0].main==="Clear"){
            image.src="/images/clear.png"
        }
        else if(data.weather[0].main==="Rain"){
            image.src="/images/rain.png"
        }
        else if(data.weather[0].main==="Snow"){
            image.src="/images/snow.png"
        }
        else if(data.weather[0].main==="Drizzle"){
            image.src="/images/drizzle.png"
        }
        else if(data.weather[0].main==="Mist"){
            image.src="/images/mist.png"
        }
        
        document.querySelector('.error').style.display="none"
        document.querySelector('.weather').style.display="block"
    }else{
       alert("Please enter city name") 
    }
    
}
