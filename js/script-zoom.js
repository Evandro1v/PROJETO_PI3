
//        function changeFontSize(action){
//            const elements = ['h1', 'p'];
//            elements.map(element=>{
                
//                const selector = document.querySelector(element);
//                let value = getComputedStyle(selector).getPropertyValue('font-size');
//                value = value.replace('px', '');
//                value = action === 'aumentar' ? parseInt(value) + 3 : parseInt(value) - 3;
//                selector.style.fontSize =  `${value}px`;
//            })
//        }

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


//			const zoomInButton = document.getElementById('zoomIn');
//			const zoomOutButton = document.getElementById('zoomOut');
//			const zoomButtons = document.querySelector('.zoom-buttons');
//			let currentZoom = 1;
			
//			zoomInButton.addEventListener('click', () => {
//				currentZoom += 0.1;
//				document.body.style.transform = `scale(${currentZoom})`;
//				document.body.style.transformOrigin = '0 0';
//				zoomButtons.style.transform = `scale(${1 / currentZoom})`;
//			});
			
//			zoomOutButton.addEventListener('click', () => {
//				if (currentZoom > 0.1) {
//					currentZoom -= 0.1;
//					document.body.style.transform = `scale(${currentZoom})`;
//					document.body.style.transformOrigin = '0 0';
//					zoomButtons.style.transform = `scale(${1 / currentZoom})`;
//				}
//			});

