const cookiea = document.cookie;
document.getElementById("cart2").addEventListener("click",()=>{
    if(!cookiea){
        alert("registration first")
        setTimeout(() => {
            location.replace("/user/signup")
        }, 1000);
    }
    try {
        let url = window.location.href.split("/");
        let id = url[url.length - 1];
        console.log("sent to cart");
        fetch(`/cart/tocart/${id}`,{
            method:"POST",
            headers:{"content-type":"application/json"}
        })
        myFunction()
    } catch (error) {
        console.log(error.message);
    }
})

function myFunction() {
    document.getElementById("cart2").disabled = true;
    }

if(cookiea){
    const verify = cookiea.split(";")[1];
    const verify2= verify.split("=")[1];

    if(verify2 == "admin"){
        let a = document.getElementById("cart2").style.display="none"
        // console.log(a);
    }
}