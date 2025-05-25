  //Código alterado para exibir todas as mensagens de erro em uma única div com a classe error-message.

  function addErrorMessage(message) {
    let errorDiv = document.querySelector('.error-message');

    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.classList.add('error-message');
        
        const form = document.querySelector('form[action="/cadastro"]'); // 🔹 Ajuste para outros formulários se necessário
        if (form) {
            form.insertBefore(errorDiv, form.firstChild); // 🔹 Garante que a div seja adicionada sem substituir elementos críticos
        }
    }

    errorDiv.innerHTML += `<p>${message}</p>`;
}



    
// Função para validação de campos no formulário de cadastro
function validateForm(event) {
    console.log("Função validateForm foi chamada!");
    let isFieldsValidated = true;

    let errorDiv = document.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.innerHTML = ''; // 🔹 Limpa mensagens anteriores
    }

    const nome = document.getElementById("firstname-id").value.trim();
    const telefone = document.getElementById("tel-id").value.trim();
    const email = document.getElementById("email-id").value.trim();
    const senha = document.getElementById("password-id").value.trim();

    // 🔹 Verificações de erro
    if (!nome || nome.length < 3) {
        addErrorMessage("Erro: Nome inválido!");
        isFieldsValidated = false;
    }
    if (!telefone || telefone.length < 10) {
        addErrorMessage("Erro: Telefone inválido!");
        isFieldsValidated = false;
    }
    if (!email || !email.includes("@")) {
        addErrorMessage("Erro: Email inválido!");
        isFieldsValidated = false;
    }
    if (!senha || senha.length < 6) {
        addErrorMessage("Erro: Senha curta!");
        isFieldsValidated = false;
    }

    console.log("Status final de isFieldsValidated:", isFieldsValidated);

    // 🔹 Bloqueia envio **apenas se houver erro**
    if (!isFieldsValidated) {
        console.log("Erro: O formulário contém campos inválidos, envio bloqueado!");
        if (event && event.preventDefault) {
            event.preventDefault();
        }
        return false;
    }

    console.log("Sucesso: Formulário validado corretamente!");
    return true; // ✅ Permite envio se tudo estiver válido
}




// Função para validação de campos no formulário de login
function validateResetPasswordForm(event) {
	event.preventDefault(); // Evita que o formulário seja enviado antes da validação

	// Resetando mensagens de erro
	const errorDiv = document.querySelector('.error-message');
	errorDiv.innerHTML = '';

	// Pegando o valor do campo de e-mail
	const email = document.getElementById("email-id").value.trim();

	let isFieldsValidated = true;

	// Validar se o campo de e-mail está vazio antes de verificar o formato
	// Verifica se o campo está vazio primeiro
	if (email === "") {
		addErrorMessage("Por favor, preencha o campo de e-mail333.");
		isFieldsValidated = false;
		return; // Se o campo está vazio, Interrompe a execução antes de validar o formato
	}
	

	// Validar formato do email
	const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!regexEmail.test(email)) {
		addErrorMessage("Email inválido, tente novamente.");
		isFieldsValidated = false;
	}

	if (isFieldsValidated) {
	// Se todas as validações passarem, o formulário é enviado
	event.target.submit();
	}
	}

	// Adicionando o evento de validação ao formulário de recuperação de senha
	//document.querySelector('form[action="/esqueceusenha"]').addEventListener('submit', validateResetPasswordForm);

	// Adicionando o evento de validação ao formulário de login
	//document.querySelector('form[action="/index_Op-Li"]').addEventListener('submit', validateLOGIN);
					 
	// Adicionando o evento de validação ao formulário de cadstro
		//document.querySelector('form[action="/paginadecadastro"]').addEventListener('submit', validateForm);

		//document.querySelector('form[action="/cadastro"]').addEventListener('submit', validateForm);
		
		document.addEventListener("DOMContentLoaded", function () {
			const formEsqueceuSenha = document.querySelector('form[action="/esqueceusenha"]');
			if (formEsqueceuSenha) {
				formEsqueceuSenha.addEventListener("submit", validateResetPasswordForm);
				console.log("Evento vinculado ao formulário de recuperação de senha!");
			} else {
				console.warn("Aviso: Formulário de recuperação de senha não encontrado.");
			}
		
			const formLogin = document.querySelector('form[action="/index_Op-Li"]');
			if (formLogin) {
				formLogin.addEventListener("submit", validateLOGIN);
				console.log("Evento vinculado ao formulário de login!");
			} else {
				console.warn("Aviso: Formulário de login não encontrado.");
			}
		
			const formPaginaCadastro = document.querySelector('form[action="/paginadecadastro"]');
			if (formPaginaCadastro) {
				formPaginaCadastro.addEventListener("submit", validateForm);
				console.log("Evento vinculado ao formulário de página de cadastro!");
			} else {
				console.warn("Aviso: Formulário de página de cadastro não encontrado.");
			}
		
			const formCadastro = document.querySelector('form[action="/cadastro"]');
			if (formCadastro) {
				formCadastro.addEventListener("submit", validateForm);
				console.log("Evento vinculado ao formulário de cadastro!");
			} else {
				console.warn("Aviso: Formulário de cadastro não encontrado.");
			}
		});
		






	/* Tornar validateForm globalmente acessível.
	Se a função estiver dentro de um escopo fechado e não for global,
	o navegador não consegue acessá-la. Esta linha no final do script
	procura garantir que a função seja encontrada. */
		//window.validateForm = validateForm;

		window.validateForm = function(event) {
			if (event && event.preventDefault) {
				event.preventDefault();
			}
			console.log("Função validateForm foi chamada!");
		
			let errorDiv = document.querySelector('.error-message');
			if (errorDiv) {
				errorDiv.innerHTML = ''; // 🔹 Limpa mensagens anteriores
			}
		
			const nome = document.getElementById("firstname-id").value.trim();
			const telefone = document.getElementById("tel-id").value.trim();
			const email = document.getElementById("email-id").value.trim();
			const senha = document.getElementById("password-id").value.trim();
		
			let isFieldsValidated = true;
			let allFieldsEmpty = !nome && !telefone && !email && !senha;
		
			// 🔹 Se todos os campos estiverem vazios, mostrar mensagem geral
			if (allFieldsEmpty) {
				addErrorMessage("Por favor, preencha os campos antes de continuar.");
				isFieldsValidated = false;
			} else {
				// 🔹 Verificações campo a campo
				if (!nome) {
					addErrorMessage("Por favor, insira um nome.");
					isFieldsValidated = false;
				} else if (nome.length < 3) {
					addErrorMessage("O nome é muito curto.");
					isFieldsValidated = false;
				}
		
				if (!telefone) {
					addErrorMessage("Por favor, insira um telefone.");
					isFieldsValidated = false;
				} else if (telefone.length < 10) {
					addErrorMessage("Telefone inválido, tente novamente.");
					isFieldsValidated = false;
				}
		
				if (!email) {
					addErrorMessage("Por favor, insira um e-mail.");
					isFieldsValidated = false;
				} else if (!email.includes("@")) {
					addErrorMessage("E-mail inválido, tente novamente.");
					isFieldsValidated = false;
				}
		
				if (!senha) {
					addErrorMessage("Por favor, insira uma senha.");
					isFieldsValidated = false;
				} else if (senha.length < 6) {
					addErrorMessage("Senha curta, use 6 caracteres ou mais.");
					isFieldsValidated = false;
				}
			}
		
			console.log("Status final de isFieldsValidated:", isFieldsValidated);
		
			if (!isFieldsValidated) {
				console.log("Erro: O formulário contém campos inválidos, envio bloqueado!");
				return false;
			}
		
			console.log("Sucesso: Formulário validado corretamente!");
			return true;
		};
		
		




// Evento submit
document.addEventListener("DOMContentLoaded", function () {
    const formCadastro = document.querySelector('form[action="/cadastro"]');
    
    if (formCadastro) {
        formCadastro.addEventListener("submit", function(event) {
            const validationResult = validateForm(event);
            
            if (!validationResult) {
                event.preventDefault(); // ❌ Bloqueia envio apenas se houver erro
                console.log("Envio bloqueado devido a erros!");
            } else {
                console.log("Sucesso: Enviando formulário...");
                formCadastro.submit(); // ✅ Envia o formulário quando válido
            }
        });
        console.log("Evento de submit vinculado ao formulário!");
    } else {
        console.warn("Aviso: Formulário de cadastro não encontrado.");
    }
});

		

