import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [city, setCity] = useState()
  const [cityList, setCityList] = useState(["Tokyo"])
  const [countryList, setCountryList] = useState(["Afghanistan"])
  const [cityParam, setCityParam] = useState("Tokyo")
  const [searchTerm, setSearchTerm] = useState("");
  const [output, setOutput] = useState([])
  const [res, setRes] = useState("")

  useEffect(() => {
      fetch(`https://openweathermap.org/data/2.5/weather?q=${cityParam}&appid=439d4b804bc8187953eb36d2a8c26a02`)
      .then(res => res.json())
      .then(res =>{
        console.log(res)
        setRes(res)
      })
      .catch((err) => {
        console.log(err.message);
      });
    
  },[])

  //search item
  useEffect ( ()=> {

    console.log(searchTerm.length)
    if(searchTerm.length >=3){
      setOutput([]);
      countryList.filter(val=>{
        if(val.includes(searchTerm)){
          setOutput(output=>[...output, val])
        }
      })
    }

  }, [searchTerm])

  useEffect(() => {
    const newCountries = [...countryList]
    fetch(`https://countriesnow.space/api/v0.1/countries/population/cities`)
    .then(res => res.json())
    .then(res =>{
      res.data.map((city)=>{
        //console.log(city.city)
        newCountries.push(city.city)
        setCountryList(newCountries)
      })
    })
    .catch((err) => {
      console.log(err.message);
    });
  
  },[])
  
  //Add city to array in React
  const handleAddCity = (city) =>{
    if (city==="" || city === undefined || city===null){
      console.log("please enter a name")
    }
    else{
      console.log(city)
      const newCities = [...cityList];
      newCities.push(city);
      setCityList(newCities);
    }
  }

  //change params when clicking on city name
  useEffect(()=>{
    console.log(cityParam)
    fetch(`https://openweathermap.org/data/2.5/weather?q=${cityParam}&appid=439d4b804bc8187953eb36d2a8c26a02`)
      .then(res => res.json())
      .then(res =>{
        console.log(res)
        setRes(res)
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [cityParam])

  //add city to list by pressing enter
  const listener = event => {
    if ((event.code === "Enter" || event.code === "NumpadEnter") && city!=="") {
      event.preventDefault();
      const addCity = event.target.value;
      handleAddCity(addCity);
    }
};

  return (
    <div className="App">

        {res ? (
          <div>
            <h2 className='city-name'>{res.name}</h2>
            <div className='main'>{res.weather[0].main}</div>
            <div className='description'>{res.weather[0].description}</div>
            <div className='temperature'>{res.main.temp} <span className='o-temperature'> o </span> C</div>
            <div className='search'>
              <div className='inner'>
                <input type="text" onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={(e) => listener(e) }/>
              </div>
              <div>
                <button className='search-btn' type="submit" onClick={()=>handleAddCity(city)}>Submit</button>     
              </div>
            </div>         
          </div>
        )
        :(
          <h2>no results</h2>
        )
        }

        <div className='country-list'>
                  {searchTerm ?                   
                        (output.map((city)=>
                        <div onClick={()=>handleAddCity(city)}>
                          <div className='search-item' >
                            {city}
                          </div>
                        </div>))
                        :
                        (
                          <div></div>
                        )
                  }
        </div>  

        <div className='tag-list'>
         { cityList ? 
          (cityList.map((city)=>
              <button className='city-tag' onClick={(e)=>setCityParam(city)}>
                <div>{city}</div>
              </button>
            )):
            (
              <div>no cities</div>
            )
          }
        </div>

    </div>
  );
}

export default App;
