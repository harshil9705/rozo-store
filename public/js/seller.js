
const display = (data) =>{
    
    document.getElementById("ui").innerHTML=""
    data.map((ele)=>{
        const img = document.createElement("img")
        img.setAttribute("class","simage")
        img.src=ele.image

        let td1 = document.createElement("td")
        td1.append(img)

        let title  = document.createElement("h1")
        title.innerHTML=ele.title
        title.setAttribute("class","stitle")

        let category  = document.createElement("h3")
        category.innerHTML= ele.category
        category.setAttribute("class","scategory")
        
        let div2 = document.createElement("div")
        div2.append(title,category)
        div2.setAttribute("class","div2")

        let  td2 = document.createElement("td")
        td2.append(div2)
        
        let stock = document.createElement("input")
        stock.value=ele.stock
        stock.setAttribute("id",`sstock${ele._id}`)
        stock.setAttribute("class","sstock")

        let update = document.createElement("button")
        update.setAttribute("id","stockupdate")
        update.innerHTML="Update"

        update.addEventListener("click",()=>{
            location.reload();
            let updatedstock = document.getElementById(`sstock${ele._id}`).value

            // console.log(updatedstock);
            let data = {
                stock:updatedstock
            }
            fetch(`/product/stockupdate/${ele._id}`,{
                method:"PATCH",
                headers:{"Content-type":"application/json"},
                body:JSON.stringify(data)
            })
        })
        
        let td3 = document.createElement("td")
        td3.setAttribute("class","rd3")
        td3.append(stock,update)


        let td4  = document.createElement("td")
        td4.innerHTML=`₹ ${ele.price}.00`
        td4.setAttribute("class","sprice")

        let tr = document.createElement("tr")
        tr.setAttribute("class","tr")
        tr.append(td1,td2,td3,td4)
        document.getElementById("ui").append(tr);
    })
}


const products = async(req,res)=>{
   const data =  await fetch("/product/seller")
   const json =  await data.json();
   display(json);
}

products()