const menuToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.site-nav');
const prevStep = document.getElementById('prevStep');
const nextStep = document.getElementById('nextStep');
const formSteps = document.querySelectorAll('.form-step');
const steps = document.querySelectorAll('.step');
let currentStep = 0;

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

if (nextStep && prevStep && formSteps.length) {
  const updateSteps = () => {
    formSteps.forEach((step, index) => {
      step.classList.toggle('active', index === currentStep);
    });
    steps.forEach((step, index) => {
      step.classList.toggle('active', index === currentStep);
    });
    prevStep.style.display = currentStep === 0 ? 'none' : 'inline-flex';
    nextStep.textContent = currentStep === formSteps.length - 1 ? 'Submit' : 'Continue';
  };

  updateSteps();

  nextStep.addEventListener('click', () => {
    if (currentStep < formSteps.length - 1) {
      currentStep += 1;
    } else {
      alert('Your valuation request has been submitted. A representative will contact you soon.');
      currentStep = 0;
      document.getElementById('sellForm').reset();
    }
    updateSteps();
  });

  prevStep.addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep -= 1;
      updateSteps();
    }
  });
}

const calcBtn = document.getElementById('calcBtn');
const resultEl = document.getElementById('paymentResult');

if (calcBtn && resultEl) {
  calcBtn.addEventListener('click', () => {
    const price = 214900;
    const down = Number(document.getElementById('downPayment').value) || 0;
    const months = Number(document.getElementById('loanTerm').value) || 60;
    const rate = Number(document.getElementById('interestRate').value) / 100 / 12;
    const principal = Math.max(price - down, 0);
    const payment = principal * (rate / (1 - Math.pow(1 + rate, -months)));
    const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(payment || 0);
    resultEl.innerHTML = `Estimated monthly payment: <strong>${formatted}</strong>`;
  });
}
