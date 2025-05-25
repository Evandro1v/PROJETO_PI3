
		function validateEsqueceu(form) {
			const email = form.email.value;
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			const errorSpan = document.querySelector('.span1');
			
			// Limpa mensagens de erro anteriores
			errorSpan.textContent = '';
			
			if (!emailRegex.test(email)) {
				errorSpan.textContent = "Por favor, insira um e-mail válido.";
				return false; // impede o envio do formulário
			}
			return true; // permite o envio do formulário se o e-mail for válido
		}