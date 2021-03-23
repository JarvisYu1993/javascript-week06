let data = [];
  
const url = 'https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json';
const addTicketForm = document.querySelector('.addTicket-form')
const ticketName = document.querySelector("#ticketName");
const ticketImgUrl = document.querySelector("#ticketImgUrl");
const ticketRegion = document.querySelector("#ticketRegion");
const ticketPrice = document.querySelector("#ticketPrice");
const ticketNum = document.querySelector("#ticketNum");
const ticketRate = document.querySelector("#ticketRate");
const ticketDescription = document.querySelector("#ticketDescription");
const addTicketBtn = document.querySelector(".addTicket-btn");
const regionSearchOption = document.querySelector(".regionSearch");
const searchResultText = document.querySelector("#searchResult-text");
const ticketCard = document.querySelector(".ticketCard-area");

// 串接axios
function init(){
  axios.get(url).then((res)=>{
    data = res.data.data;
    render(data);
    console.log(data)
  })
}
init();

//渲染畫面
function render(data) {
  let card = "";
  data.forEach((item) => {
    card += `<li class="ticketCard">
    <div class="ticketCard-img">
        <a href="#">
            <img src="${item.imgUrl}" alt="">
        </a>
        <div class="ticketCard-region">${item.area}</div>
        <div class="ticketCard-rate">${item.rate}</div>
    </div>
    <div class="ticketCard-content">
        <div>
            <h3>
                <a href="#" class="ticketCard-name">${item.name}</a>
            </h3>
            <p class="ticketCard-description">
                ${item.description}
            </p>
        </div>
        <div class="ticketCard-info">
            <p class="ticketCard-num">
                <span><i class="fas fa-exclamation-circle"></i></span>
                剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
            </p>
            <p class="ticketCard-price">
                TWD <span id="ticketCard-price">$${item.price}</span>
            </p>
        </div>
    </div>
`;
  });
  ticketCard.innerHTML = card;
}
//增加資料
function addTicket() {
  let obj = {};
  obj.id =  data.length;
  obj.name =  ticketName.value;
  obj.imgUrl =  ticketImgUrl.value;
  obj.area =  ticketRegion.value;
  obj.description =  ticketDescription.value;
  obj.group =  ticketNum.value;
  obj.price = ticketPrice.value;
  obj.rate =  ticketRate.value;
  data.push(obj);
  render(data);
}
//搜尋資料筆數
function regionSearch() {
  let dataLength = data.length;
  if (this.value == "全部地區"){
      render(data);
      searchResultText.textContent = `本次搜尋共 ${dataLength} 筆資料`;
  } else {
      let filterDate = data.filter((item) => item.area === this.value);
      render(filterDate);
      dataLength = filterDate.length;
      searchResultText.textContent = `本次搜尋共 ${dataLength} 筆資料`;

    }
}
  render(data);

  //監聽事件
addTicketBtn.addEventListener("click", addTicket);
regionSearchOption.addEventListener("change", regionSearch);
