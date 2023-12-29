
const display = (data) =>{
    
    document.getElementById("ui").innerHTML=""
    data.map((ele)=>{
        if(ele.item){
            ele = ele.item
        }
        const img = document.createElement("img")
        img.setAttribute("class","image")
        img.src=ele.image

        const view = document.createElement("button")
        view.setAttribute("class","viewbtn")
        view.innerHTML="Quick View"
        
        const firdiv = document.createElement("div")
        firdiv.setAttribute("class","firdiv")
        firdiv.append(img,view)

        let title  = document.createElement("h1")
        title.innerHTML=ele.title
        title.setAttribute("class","title")

        let price  = document.createElement("h2")
        price.innerHTML=`₹ ${ele.price}.00`
        price.setAttribute("class","price")

        let list = document.createElement('div')
        list.setAttribute("class","list")
        list.append(firdiv,title,price)

        view.addEventListener("click",()=>{
            window.location.href=`/product/single/${ele._id}`
        })

        document.getElementById("ui").append(list);
    })
}

const filter = (data)=>{
    try {
        fetch(`http://localhost:8090/product/filter?category=${data}`)
        .then((res)=>res.json())
        .then((response)=>display(response));
    } catch (error) {
        console.log(error.message);
    }
}

const search = ()=>{
    let value = document.getElementById("search").value
    fetch(`/product/search?query=${value}`)
    .then((data)=>data.json())
    .then((res)=>display(res))
}

let input = document.getElementById("search").value

document.getElementById("all").addEventListener("click",()=>products())
document.getElementById("man").addEventListener("click",()=>filter("man"))
document.getElementById("woman").addEventListener("click",()=>filter("woman"))
document.getElementById("shoes").addEventListener("click",()=>filter("shoes"))
document.getElementById("watch").addEventListener("click",()=>filter("watch"))
document.getElementById("search").addEventListener("input",()=>{
    search()
})


const products = async(req,res)=>{
   const data =  await fetch("/product/show")
   const json =  await data.json();
   display(json);
}



products()