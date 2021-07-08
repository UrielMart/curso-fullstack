
var $forms = document.querySelectorAll(".signup-form");

var getTemplate = () => {
  return fetch("./template.html").then((response) => response.text());
};

var sendEmailToApi = (address, template) => {
  fetch(`https://bedu-email-sender-api.herokuapp.com/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address: address,
      template: template,
    }),
  })
    .then((results) => {
      console.log(results);
      document.getElementById("email").value = ""
      alert("E-mail send!!!")
    })
    .catch((error) => {
      console.error(error);
      document.getElementById("email").value = ""
      alert("Send failed")
    });
};

var sendEmail = (event) => {
  event.preventDefault();
  const email = event.target.querySelector("input").value;
  getTemplate()
    .then((template) => {
      sendEmailToApi(email, template);
    })
    .catch((error) => {
      console.log(error, "error al convertir el template.");
    });
};

for (let i = 0; i < $forms.length; i++) {
  $forms[i].addEventListener("submit", sendEmail);
}
