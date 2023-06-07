//arrow
const a1 = document.getElementById("arrow1")
const a2 = document.getElementById("arrow2")
const a3 = document.getElementById("arrow3")

const arrowAnimation = (A)=>{
    let num = 0
    let state = "above"
    let stay = {
        above: 0,
        under: 0
    }
    setInterval(()=>{
        A.style.transform = `translate(0, ${num}%)`
        if(num == -100 && stay.above < 100){
            stay.above++
        }
        else if(num == -100 && state == "above"){
            state = "under"
            num = 100
            stay.above = 0
            stay.under = 0
        }
        else if(num > 0 ){
            num--
        }
        else if(num == 0 && stay.under < 100 && state == "under"){
            stay.under++
        }
        else{
            state = "above"
            num-=2
        }
    }, 10)
}

arrowAnimation(a3)
setTimeout(()=>{
    arrowAnimation(a2)
}, 400)
setTimeout(()=>{
    arrowAnimation(a1)
}, 800)

//product
const product = document.getElementsByClassName("product")
let productArray = []
let queryString = {
    page: 1,
    sort: 0,
    search: "",
    type: ""
}

const getAPI = async ({page, sort, search, type})=>{
    const res = await fetch(`https://2023-engineer-camp.zeabur.app/api/v1/works?page=${page}&sort=${sort}${search ?`&search=${search}` :""}${type ?`&type=${type}` :""}`)
    const data = await res.json()
    const ai = await data.ai_works
    productArray = await ai.data
    productRender()
    pageBtnRender(ai)
}
getAPI(queryString)

const productRender = ()=>{
    product[0].innerHTML = null
    if(productArray.length == 0 && queryString.search == ""){
        product[0].innerHTML = "尚未推出，敬請期待"
    }
    else if(productArray.length == 0 && queryString.search !== ""){
        product[0].innerHTML = `抱歉找不到您所查詢的 "${queryString.search}"`
    }
    else{
        productArray.forEach((item)=>{
            product[0].innerHTML += `<li>
                <a href="${item.link}" class="productLink" target="_blank">
                    <div class="imgContainer">
                        <img src="${item.imageUrl}">
                    </div>
                    <div class="text">
                        <h4 class="fzH06 bold">
                            ${item.title}
                        </h4>
                        <p class="fzSmall regular">
                            ${item.description}
                        </p>
                    </div>
                    <div class="positionContainer">
                        <div class="info fzBody">
                            <h5 class="bold">AI 模型</h5>
                            <h5 class="regular">GPT3.5</h5>
                        </div>
                        <div class="type">
                            <h5 class="fzBody regular productType">
                                ${item.type}
                            </h5>
                            <a href="#">
                                <img src="https://github.com/hexschool/2022-web-layout-training/blob/main/2023web-camp/icons/share.png?raw=true">
                            </a>
                        </div>
                    </div>
                </a>
            </li>`
        })
    }
    
}
//productBtn
const pageBtn = document.getElementsByClassName("pageBtn")
const pageBtnRender = ({page})=>{
    if(page.current_page == 1 || productArray.length == 0){
        pageBtn[0].innerHTML = null
        for(let i = 1; i <= page.total_pages; i++){
            if(i == 1){
                pageBtn[0].innerHTML += `
                    <li class="btn selected">${i}</li>
                `
            }
            else{
                pageBtn[0].innerHTML += `
                    <li class="btn">${i}</li>
                `
            }
        }
    }
    const btn = Array.from(document.getElementsByClassName("btn"))
    btn.forEach((item, index)=>{
        item.addEventListener("click", (e)=>{
            const parent = e.target.parentNode
            const children = Array.from(parent.children)
            children.forEach((child)=>{
                if(child == e.target){
                    child.classList.add("selected")
                }
                else{
                    child.classList.remove("selected")
                }
            })
            queryString.page = index+1
            getAPI(queryString)
            if(window.innerWidth <= 950){
                window.scrollTo(0, 3650)
            }
            else{
                window.scrollTo(0, 3250)
            }
        })
    })
}

//WTcard
const cardBtn = document.getElementsByClassName("cardBtn")
const btn = Array.from(document.getElementsByClassName("c-btn"))
const card = document.getElementsByClassName("card")

cardBtn[0].addEventListener("click", (e)=>{
    btn.forEach((btn)=>{
        if(e.target == cardBtn[0]){
            return
        }
        else if(btn.innerHTML == e.target.innerHTML){
            btn.classList.add("clicked")
            card[Number(btn.innerHTML)-1].setAttribute("style", "display: block;")
        }
        else{
            btn.classList.remove("clicked")
            card[Number(btn.innerHTML)-1].setAttribute("style", "display: none;")
        }
    })
})

//searchInput
const input = document.getElementById("searchInput")
input.addEventListener("change", (e)=>{
    const value = e.target.value
    if(value !== ""){
        queryString.page = 1
        queryString.type = ""
        queryString.search = value
        getAPI(queryString)
        e.target.value = ""
        //把menu>ul的選擇圖樣去掉
        options.forEach((option)=>{
            option.classList.remove("selected")
        })
    }
})

//menu>ul
const menu = document.getElementById("menu")
const options = Array.from(document.getElementsByClassName("option"))
let marginL = 3
//touch
let touchStart = 0
const move = (e)=>{
    if(e.movementX !== undefined){
        //mouse
        marginL += 0.1 * e.movementX
        if(marginL > 12){
            marginL = 12
        }
        else if(marginL < -39){
            marginL = -39
        }
        else{
            marginL
        }
        menu.setAttribute("style", `margin-left: ${marginL}%;`)
    }
    else if(window.innerWidth >= 550){
        //touch width>=550
        const touch = e.touches[0]
        const currentX = touch.clientX
        let moveX = currentX - touchStart
        marginL += 0.005 * moveX
        if(marginL > 12){
            marginL = 12
        }
        else if(marginL < -28){
            marginL = -28
        }
        else{
            marginL
        }
        menu.setAttribute("style", `margin-left: ${marginL}%;`)
    }
    else{
        //touch
        const touch = e.touches[0]
        const currentX = touch.clientX
        let moveX = currentX - touchStart
        marginL += 0.005 * moveX
        if(marginL > 12){
            marginL = 12
        }
        else if(marginL < -80){
            marginL = -80
        }
        else{
            marginL
        }
        menu.setAttribute("style", `margin-left: ${marginL}%;`)
    }
}
//menu選項點擊
options.forEach((option)=>{
    option.addEventListener("click", (e)=>{
        const parent = e.target.parentNode
        const children = Array.from(parent.children)
        children.forEach((child)=>{
            if(child == e.target){
                child.classList.add("selected")
            }
            else{
                child.classList.remove("selected")
            }
        })
        queryString.page = 1
        queryString.search = ""
        queryString.type = e.target.innerHTML == "全部"?"" :e.target.innerHTML
        getAPI(queryString)
    })
})
if(window.innerWidth <= 1060){
    menu.addEventListener("mousedown", (e)=>{
    menu.addEventListener("mousemove", move)
})
menu.addEventListener("mouseup", (e)=>{
    menu.removeEventListener("mousemove", move)
})
menu.addEventListener("touchstart", (e)=>{
    const touch = e.touches[0]
    touchStart = touch.clientX
    menu.addEventListener("touchmove", move)
})
menu.addEventListener("touchend", (e)=>{
    menu.removeEventListener("pointermove", move)
})
}


//menu>order
const order = document.getElementsByClassName("order")
const orderMenu = document.getElementsByClassName("orderMenu")
const orderMenuOption = Array.from(document.getElementsByClassName("orderMenu-option"))
const orderText = document.getElementsByClassName("orderText")
//點擊開始
order[0].addEventListener("click", ()=>{
    orderMenu[0].setAttribute("style", "display: block;")
    orderMenu[0].focus()
})
//點旁邊關閉
orderMenu[0].addEventListener("blur", ()=>{
    orderMenu[0].setAttribute("style", "display: none;")
})
//點擊選項 > 結果
orderMenuOption.forEach((option, index)=>{
    option.addEventListener("click", ()=>{
        orderText[0].innerHTML = option.innerHTML
        orderMenu[0].setAttribute("style", "display: none;")
        queryString.sort = index
        getAPI(queryString)
    })
})

//menu>filter
const filter = document.getElementsByClassName("filter")
const filterMenu = document.getElementsByClassName("filterMenu")
const filterText = document.getElementsByClassName("filterText")
const AImodule = document.getElementsByClassName("AImodule")
const AItype = document.getElementsByClassName("AItype")
const moduleOption = Array.from(document.getElementsByClassName("moduleOption"))
const typeOption = Array.from(document.getElementsByClassName("typeOption"))

filter[0].addEventListener("click", ()=>{
    if(filterMenu[0].style.display == "block"){
        filterMenu[0].setAttribute("style", "display: none;")
        filter[0].classList.remove("filterOpen")
    }
    else{
        filterMenu[0].setAttribute("style", "display: block;")
        filter[0].classList.add("filterOpen")
    }
})
let kind1 = ""
let kind2 = ""

AImodule[0].addEventListener("click", (e)=>{
    moduleOption.filter((option)=>{
        const oText = option.innerHTML
        const eText = e.target.innerHTML

        if(oText.length > 5 && oText == eText){
            return
        }
        else if(oText.length > 5){
            option.innerHTML = oText.substring(0, oText.indexOf("<"))
        }
        else if(oText == eText){
            option.innerHTML = `${oText}<img src="https://github.com/hexschool/2022-web-layout-training/blob/main/2023web-camp/icons/check.png?raw=true">`
            kind1 = oText
        }
        else{
            return
        }
    })
    filterText[0].innerHTML = kind1 + (kind2 == ""?"":"、") + kind2
})
AItype[0].addEventListener("click", (e)=>{
    typeOption.filter((option)=>{
        const oText = option.innerHTML
        const eText = e.target.innerHTML
        
        if(oText.length > 5 && oText == eText){
            return
        }
        else if(oText.length > 5){
            option.innerHTML = oText.substring(0, oText.indexOf("<"))
        }
        else if(oText == eText){
            option.innerHTML = `${oText}<img src="https://github.com/hexschool/2022-web-layout-training/blob/main/2023web-camp/icons/check.png?raw=true">`
            kind2 = oText
        }
        else{
            return
        }
    })
    filterText[0].innerHTML = kind1 + (kind1 == ""?"":"、") + kind2
})

//back to top
const toTop = document.getElementsByClassName("toTop")
toTop[0].addEventListener("click", ()=>{
    window.scroll(0, 0)
})
