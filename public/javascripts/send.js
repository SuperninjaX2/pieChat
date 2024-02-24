// Example JSON data

let btn = document.querySelector("button")
// Send POST request with JSON data
send=()=>{
  let msg = document.querySelector("#msg").value
  const jsonData = {
  "message": `${msg}`
};
fetch('/send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(jsonData)
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
})
.then(data => {
  console.log('Response:', data);
})
.catch(error => {
  console.error('Error:', error);
});
}
btn.addEventListener("click",send )
