

const countryList = {
    EUR: "FR",
    USD: "US",
    JPY: "JP",
    BGN: "BG",
    CZK: "CZ",
    DKK: "DK",
    GBP: "GB",
    HUF: "HU",
    PLN: "PL",
    RON: "RO",
    SEK: "SE",
    CHF: "CH",
    ISK: "IS",
    NOK: "BV",
    HRK: "HR",
    RUB: "RU",
    TRY: "TR",
    AUD: "AU",
    BRL: "BR",
    CAD: "CA",
    CNY: "CN",
    HKD: "HK",
    IDR: "ID",
    ILS: "IL",
    INR: "IN",
    KRW: "KR",
    MXN: "MX",
    MYR: "MY",
    NZD: "NZ",
    PHP: "PH",
    SGD: "SG",
    THB: "TH",
    ZAR: "ZA",
  };
  

  
const base_url= "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_OqOMJguPwibRW68EOrcLMPoYwchxTNWeJ7NSomo7&currencies=EUR&base_currency=INR";
const dropdowns = document.querySelectorAll(".left");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const finalMsg= document.querySelector(".endMsg");

for(let select of  dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==='from' && currCode ==='USD'){
            newOption.selected = "selected";
        }
        else if(select.name==='to' && currCode ==='INR'){
            newOption.selected = "selected";
        }
        
        select.append(newOption);
        
    }
    select.addEventListener("change",(evt) =>{
        updateFlag(evt.target);
    });
}
const updateFlag = (element)=>{
    let currCode = element.value;
    console.log('currCode:',currCode);
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    element.parentElement.querySelector("img").src=newSrc;  
    
}

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal==='' ||  amtVal<0){
        amtVal =1;
        amount.value =1;
    }
    // console.log(fromCurr.value,toCurr.value);
    const URL = `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_OqOMJguPwibRW68EOrcLMPoYwchxTNWeJ7NSomo7&currencies=${toCurr.value}&base_currency=${fromCurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    Val = toCurr.value;
    let rate = data.data[Val];
    // console.log(data.data[Val]);
    // console.log(toCurr.value);


    let finalAmount = (amtVal * rate);
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
    // finalMsg.innerText = data.data;
});