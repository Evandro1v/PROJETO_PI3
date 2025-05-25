function validateEsqueceu(form) {
	const email = form.email.value;
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const errorDiv = document.querySelector('.error-message');
	
	// Limpa mensagens de erro anteriores
	errorDiv.textContent = '';
	
	if (!emailRegex.test(email)) {
		errorDiv.textContent = "Por favor, insira um e-mail válido.";
		return false; // impede o envio do formulário
	}
	return true; // permite o envio do formulário se o e-mail for válido
}