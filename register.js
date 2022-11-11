let form = document.getElementById("form");
const retriveEntries = () => {
  let entries = localStorage.getItem("userEntry");
  if (entries) {
    entries = JSON.parse(entries);
  } else {
    entries = [];
  }
  return entries;
};
let Entries = retriveEntries();
const displayEntries = () => {
  const entries = retriveEntries();
  const rows = entries
    .map((entry) => {
      const name = `<td class="td">${entry.name}</td>`;
      const email = `<td class="td">${entry.email}</td>`;
      const password = `<td class="td">${entry.password}</td>`;
      const dob = `<td class="td">${entry.dob}</td>`;
      const acceptConditions = `<td class="td">${entry.acceptConditions}</td>`;
      const row = `<tr>${name} ${email} ${password} ${dob} ${acceptConditions}</tr>`;
      return row;
    })
    .join("\n");
  let table = document.getElementById("table");
  table.innerHTML = `<table class="table" border="2">
  <tr>
    <th class="th">Name</th>
    <th class="th">Email</th>
    <th class="th">Password</th>
    <th class="th">Dob</th>
    <th class="th">Accepted terms?</th>
  </tr>
    ${rows}
  </table>`;
};
const saveUserFrom = (event) => {
  event.preventDefault();
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let dob = document.getElementById("dob").value;
  let acceptConditions = document.getElementById("acceptTerms").checked;
  let entry_obj = {
    name,
    email,
    password,
    dob,
    acceptConditions,
  };
  Entries.push(entry_obj);
  localStorage.setItem("userEntry", JSON.stringify(Entries));

  displayEntries();
};
form.addEventListener("submit", saveUserFrom);
displayEntries();
const dob = document.getElementById("dob");
dob.addEventListener("change", () => validateDob(dob));
function validateDob(dob){
let Date1=dob.value.split("-");
let year=Date1[0];
let month=Date1[1];
let date=Date1[2];
let birthdate = new Date(year, month, date);
let today = new Date();
let currentYear= today.getFullYear();
let birthYear=birthdate.getFullYear()
let age = currentYear - birthYear;
let monthDiff = today.getMonth() - birthdate.getMonth();
if ((today.getDate() < birthdate.getDate())||monthDiff<0) 
{
age--;
}
if (age<18 || age>55) 
{
dob.setCustomValidity(" Oops! your age is not between 18 and 55 !");
dob.reportValidity();
}
else
{
dob.setCustomValidity("");
}
}
const email = document.getElementById("email");
email.addEventListener("input", () => validate(email));
function validate(ele) {
  if (ele.validity.typeMismatch) {
    ele.setCustomValidity("This Email is not valid!");
    ele.reportValidity();
  } else {
    ele.setCustomValidity("");
  }
}