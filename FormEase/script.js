const form = document.querySelector('.form-ease');
const messageBox = document.getElementById('formMessage');

function validateEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email);
}

function showMessage(msg, type) {
  messageBox.textContent = msg;
  messageBox.className = 'form-message ' + type;
  messageBox.style.opacity = 1;
  messageBox.style.animation = 'fadeIn 0.5s';
  setTimeout(() => {
    messageBox.style.animation = '';
  }, 500);
}

function clearForm() {
  form.reset();
}

function validateForm(e) {
  e.preventDefault();
  const name = form.elements['name'].value.trim();
  const email = form.elements['email'].value.trim();
  const subject = form.elements['subject'].value.trim();
  const message = form.elements['message'].value.trim();

  if (!name || !email || !subject || !message) {
    showMessage('Please fill in all fields.', 'error');
    return;
  }
  if (!validateEmail(email)) {
    showMessage('Please enter a valid email address.', 'error');
    return;
  }
  showMessage('Your message has been sent successfully!', 'success');
  clearForm();
}

form.addEventListener('submit', validateForm);
