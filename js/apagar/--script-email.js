function addErrorMessage(message) {
	const errorDiv = document.querySelector('.error-message');
	errorDiv.innerHTML += `<p>${message}</p>`;
	errorDiv.style.display = 'block'; // Certifique-se de que a div de erro está visível
	}
	
	function validateEsqueceu(form) {
	const email = form.email.value;
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const errorDiv = document.querySelector('.error-message');
	
	// Limpa mensagens de erro anteriores
	errorDiv.textContent = '';
	errorDiv.style.display = 'none'; // Esconde a div de erro inicialmente
	
	if (!emailRegex.test(email)) {
	addErrorMessage("Por favor, insira um e-mail válido.");
	return false; // impede o envio do formulário
	}
	return true; // permite o envio do formulário se o e-mail for válido
	}