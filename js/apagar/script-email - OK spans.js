//A função validateEsqueceu é usada para validar o campo de e-mail de um formulário.
//Ela verifica se o e-mail tem um formato válido usando uma expressão regular.
//Se o e-mail for inválido, uma mensagem de erro é exibida e o envio do formulário é impedido.
//Se o e-mail for válido, o formulário é enviado normalmente.
function validateEsqueceu(form) {
	const email = form.email.value; //Obtém o valor do campo de e-mail do formulário
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //Define uma expressão regular (regex) para validar o formato do e-mail. Esta regex verifica se o e-mail tem um formato válido, como exemplo@dominio.com
	const errorSpan = document.querySelector('.span1'); //Seleciona o elemento HTML com a classe span1 onde as mensagens de erro serão exibidas.

	// Limpa mensagens de erro anteriores
	//Limpa qualquer mensagem de erro anterior que possa estar presente no elemento errorSpan.
	errorSpan.textContent = '';

	//Verifica se o valor do e-mail não corresponde ao padrão definido pela regex.
	if (!emailRegex.test(email)) {
		errorSpan.textContent = "Por favor, insira um e-mail válido. U Span"; //Define a mensagem de erro no elemento errorSpan.
		return false; // Impede o envio do formulário retornando false.
	}
	return true; // permite o envio do formulário se o e-mail for válido. Sendo o e-mail válido, a função retorna true, permitindo o envio do formulário.
}