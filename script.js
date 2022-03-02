const input=document.querySelector('.entry-city')
const button=document.querySelector('.search-icon')
const list=document.querySelector('.items')
const footer=document.querySelector('.footer')
const buttonDelete=document.createElement('button')

button.addEventListener("click",()=>{  //добавляем кнопку очистки и переходим к функции формирования виджета
    getWeather()
    buttonDelete.classList.add('btn-delete')
    buttonDelete.innerHTML='Очистить'
    footer.appendChild(buttonDelete)

})


input.addEventListener("keydown",(e)=>{  //добавляем кнопку очистки и переходим к функции формирования виджета
    if(e.keyCode==13){
        getWeather()
        buttonDelete.classList.add('btn-delete')
        buttonDelete.innerHTML='Очистить'
        footer.appendChild(buttonDelete)
    }
})


function getWeather(){
    let city=input.value
    input.value=''  // получаем наименование города и вставляем в ссылку на api
    fetch(`https://api.weatherapi.com/v1/current.json?key=0023282d696c468da1095804220302 &q=${city}&aqi=no`)
    .then(response=>response.json())
    .then(data=>createWidjet(data)) //получаем данные с сервера


    function createWidjet(data){
        icon=data.current.condition.icon
        temp=data.current.temp_c
        feel=data.current.feelslike_c
        text=data.current.condition.text  //присваиваем переменным нужные значения
        

        let widjet=document.createElement('section') // создаем элементы присваиваем классы и задаем значения 
        let img=document.createElement('img')
        let cityTitle=document.createElement('div')
        let textCity=document.createElement('div')
        let tempCity=document.createElement('div')
        let feelCity=document.createElement('div')


        tempCity.classList.add('temp')
        cityTitle.classList.add('title')
        widjet.classList.add('item')
        img.classList.add('img')
        feelCity.classList.add('feel')
        textCity.classList.add('text-city')

    
        cityTitle.innerHTML=city
        tempCity.innerHTML=`${temp}°`
        img.src=icon
        feelCity.innerHTML=`Ощущается как ${feel}°C`
        textCity.innerHTML=text

        
        widjet.appendChild(cityTitle)
        widjet.appendChild(img)
        widjet.appendChild(tempCity)
        widjet.appendChild(textCity)
        widjet.appendChild(feelCity)
        list.appendChild(widjet)
          
      

        buttonDelete.addEventListener("click",()=>{
            widjet.remove()
            buttonDelete.remove()
        })
    }
}