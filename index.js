function maskPassword(pass){
    let str = ""
    for (let index = 0; index < pass.length; index++) {
        str  += "*"
    }
    return str
}


function copyText(txt) {
    navigator.clipboard.writeText(txt).then(
        () => {
          /* clipboard successfully set */
          document.getElementById("alert").style.display = "inline"
          setTimeout(() => {
            document.getElementById("alert").style.display = "none"
          }, 2000);

        },
        () => {
          /* clipboard write failed */
          alert("Clipboard copying failed")
        },
      );
  }
//Logic to detelte the website
const deletewebsite = (website) => {
    let data = localStorage.getItem("passwords");
    let arr = JSON.parse(data);
    arrupdated = arr.filter((e) => {
        return e.website != website;
    })
   

    localStorage.setItem('passwords', JSON.stringify(arrupdated));
    alert(`website deleted ${website}`);
    showpassword();

}






// Logic to fill the table
const showpassword = () => {
    let tb = document.querySelector("table")
    let data = localStorage.getItem("passwords")
    if (data == null || JSON.parse(data).length == 0) {
        tb.innerHTML = "No Data to show"
    }
    else {
        tb.innerHTML = ` <tr>
    <th>Website</th>
    <th>Username</th>
    <th>Password</th>
    <th></th>
</tr>
    `
        let arr = JSON.parse(data);
        let str = "";
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];

            str += `<tr>
<td>${element.website}<img onclick="copyText('${element.website}')" src="./copy.svg" alt="Copy Button" width="10" width="10" height="10"></td> 
<td>${element.username} <img onclick="copyText('${element.username}')" src="./copy.svg" alt="Copy Button" width="10" width="10" height="10"></td>
<td>${maskPassword(element.password)}<img onclick="copyText('${element.password}')" src="./copy.svg" alt="Copy Button" width="10" width="10" height="10"></td>
<td><button class="btn"onclick="deletewebsite('${element.website}')">Delete</button></td>
</tr>`

        }

        tb.innerHTML = tb.innerHTML + str;
    }
    website.value="";
    username.value="";
    password.value="";
}
console.log("working");
showpassword();
document.querySelector(".btn").addEventListener('click', (e) => {
    e.preventDefault()
    console.log("clicked..")
    console.log(username.value, password.value);
    let passwords = localStorage.getItem("passwords")
    console.log(passwords);
    if (passwords == null) {
        let json = []
        json.push({ website: website.value, username: username.value, password: password.value });
        alert("password has been saved");
        localStorage.setItem('passwords', JSON.stringify(json));
    console.log(json);
    }
    else {
        let json = JSON.parse(localStorage.getItem("passwords"))
        json.push({ website: website.value, username: username.value, password: password.value });
        alert("password has been saved");
        localStorage.setItem('passwords', JSON.stringify(json))
        showpassword();
    }

})