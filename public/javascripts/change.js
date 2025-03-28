let arr = document.querySelectorAll(".month")
const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
arr.forEach((monthE)=>{
    monthE.innerHTML = month[Number.parseInt(monthE.innerHTML)]
})
const logout = () => {
    window.location.href = "/logout"
}
const change = ()=>{
    document.getElementById("dpupload").click()
}
const submit = ()=>{
    document.getElementById("dpuploadform").submit()    
}
document.getElementById("dpupload").addEventListener("change", submit)