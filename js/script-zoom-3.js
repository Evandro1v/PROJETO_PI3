			const increaseTextButton = document.getElementById('increaseText');
			const decreaseTextButton = document.getElementById('decreaseText');
			const content = document.querySelector('.content');
			let currentFontSize = 16; // Tamanho base da fonte
			
			increaseTextButton.addEventListener('click', () => {
				currentFontSize += 2; // Aumenta o tamanho da fonte em 2px
				content.style.fontSize = `${currentFontSize}px`;
			});
			
			decreaseTextButton.addEventListener('click', () => {
				if (currentFontSize > 6) { // Evita que o tamanho da fonte fique muito pequeno
					currentFontSize -= 2; // Diminui o tamanho da fonte em 2px
					content.style.fontSize = `${currentFontSize}px`;
				}
			});