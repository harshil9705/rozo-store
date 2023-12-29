const cart  = async(req,res)=>{
    const data = await fetch(`/cart/showcart`)
    const json = await data.json()
    display(json)
}

const handlepayment = async(amount)=>{  
    console.log(amount)
    const data = await fetch("/cart/payment",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({amount:amount})
    })
    let order = await data.json()
    console.log(order)
    let option = {key : "rzp_test_2hrmtbKzfWFZov" , amount : order.amount}
    let razorpay = new Razorpay(option)
    razorpay.open()
}

var subtotal = 0
const display = (data)=>{
    document.getElementById("ui").innerHTML=""
    let prototal = 0
    data.map((element)=>{

        let ele = element.productId

        let tr = document.createElement("tr")
        tr.setAttribute("class","tr")

        // img

        let img = document.createElement("img")
        img.setAttribute("class","simage")
        img.src = ele.image
        
        let td1 = document.createElement("td")
        td1.setAttribute("class","td1")
        td1.append(img)
        
        //title
        
        let title = document.createElement("p")
        title.setAttribute("class","stitle")
        title.innerHTML=ele.title
        
        let td2 = document.createElement("td")
        td2.setAttribute("class","td2")
        td2.append(title)
        
        // price
        
        let price = document.createElement("h2")
        price.setAttribute("class","sprice")
        price.innerHTML = `₹ ${ele.price.toFixed(2)}`
        
        let td3 = document.createElement("td")
        td3.setAttribute("class","td3")
        td3.append(price)
        
        // quantity

        let inbtn = document.createElement("button")
        inbtn.setAttribute("class","plus")
        inbtn.addEventListener("click",()=>{
            quantity(element._id,+1)
            location.reload()
        })
        inbtn.innerHTML="+"
        
        let qty = document.createElement("input")
        qty.setAttribute("class","qty")
        qty.value = element.qty
        
        let dicbtn = document.createElement("button")
        dicbtn.setAttribute("class","minus")
        dicbtn.innerHTML="-"
        dicbtn.addEventListener("click",()=>{
            quantity(element._id,-1)
            location.reload()
        })
        
        let qtydiv = document.createElement("div")
        qtydiv.setAttribute("class","qtydiv")
        qtydiv.append(dicbtn,qty,inbtn)
        
        let td4 = document.createElement("td")
        td4.setAttribute("class","td4")
        td4.append(qtydiv)
        
        // total
        prototal = element.qty * ele.price
        
        
        let total = document.createElement("h5")
        total.setAttribute("class","total")
        total.innerHTML=`₹ ${prototal.toFixed(2)}`
        
        let td5 = document.createElement("td")
        td5.setAttribute("class","td5")
        td5.append(total)

        tr.append(td1,td2,td3,td4,td5)
        subtotal += element.qty * ele.price

        document.getElementById("ui").append(tr)
        document.getElementById("subtotal").innerHTML=`₹ ${subtotal.toFixed(2)}`
        document.getElementById("total").innerHTML=`₹ ${subtotal.toFixed(2)}`
    })
    document.getElementById("payment").addEventListener("click",()=>handlepayment(subtotal))
}
const quantity = (id,qty)=>{
    // console.log(id,qty);
    try {
        fetch(`http://localhost:8090/cart/manageqty/${id}`,{
            method:"PATCH",
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify({qty})
        })
        location.reload()
            
    } catch (error) {
        console.log(error.message);
    }
}


cart()