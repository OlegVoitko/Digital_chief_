"use strict"

document.addEventListener('DOMContentLoaded', function() {
	const form = document.getElementById('form');	
	form.addEventListener('submit', formSend);
	
	async function formSend(e) {
		e.preventDefault()

		let error = formValidate(form);

		let formData = new FormData(form);

		if (error === 0) {
			
			let response = await fetch('sendmail.php', {
				method: 'POST',
				body: formData
			});
			if (response.ok) {
				let result = await response.json();
				alert(result.message);
				formPreview.innerHTML = '';
				form.reset();
			}else {
				alert('Сообщение отправлено');
				form.reset();
			}
		}else {			
			console.log('Заполните поля');
		}
	}
	
	function formValidate(form){
		let error = 0;
		let formReq = document.querySelectorAll('._req');
		
		for (let i = 0; i < formReq.length; i++) {
			const input = formReq[i];
			formRemoveError(input);

			if (input.classList.contains('_email')) {
				if (emailTest(input)){
					formAddError(input,'E-Mail в формате example@gmail.com');
					error++;
				}
			}else {
				if (input.value === '') {					
					formAddError(input, 'Напишите Ваше имя!');
					error++;
				}
			}

		}
		return error
	}
	
	function formAddError(input, text) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');

		const parent = input.parentNode;
		const errorLabel = document.createElement('span');

		errorLabel.classList.add('error-label')
		errorLabel.textContent = text

		parent.classList.add('error')

		parent.append(errorLabel)
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');

		const parent = input.parentNode;
		if(parent.classList.contains('error')){
			parent.querySelector('.error-label').remove()
			parent.classList.remove('error')
		}
	}
	function emailTest(input, text) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}
});
