;(function () {
	let backdrop = document.querySelector('.backdrop');
	let contactsForm = document.getElementById('contactsForm');
	let firstname = document.getElementById('firstName').value;

//========================== Open/Close form section ==============================
	document.getElementById('openForm-btn').addEventListener("click", function () {
		contactsForm.style.display = "block";
		backdrop.style.display = "block";
	});
	document.getElementById('cancel-btn').addEventListener("click", function () {
		contactsForm.style.display = "none";
		backdrop.style.display = "none";
		clearForm();
	});
	backdrop.addEventListener("click", function () {
		contactsForm.style.display = "none";
		backdrop.style.display = "none";
	});

//========================== Open/Close form section ==============================


document.getElementById('add-form-btn').addEventListener('click', addToContactBook);


//=============================Phones============================

document.getElementById('add-phone-btn').addEventListener('click', function(){
	let phoneValue = document.getElementById('phone-input').value;
	let phonesList = document.getElementById('phonesList');
	let phoneField = document.querySelector('.phone-field');
	if(phoneValue) {
		let phoneItem = document.createElement('li');
		phoneItem.className = "phoneListItem";
		phoneItem.setAttribute('name', 'phone');
		phoneItem.innerText = phoneValue;

		let remove = document.createElement('button');
		remove.classList.add('removeButton');
		remove.innerHTML = '<img src="img/remove.png" alt="remove">';

		remove.addEventListener('click', removeItem);

		phoneItem.appendChild(remove);
		phonesList.appendChild(phoneItem);
		phoneField.value = '';
	}

	function removeItem(){
		let parent = this.parentNode.parentNode;
		let currentItem = this.parentNode;
		parent.removeChild(currentItem);
	}
});
//==================================Phones=======================================
function addToContactBook (event) {
	event.preventDefault();
	let id = Date.now();
	let firstname = document.getElementById('firstName').value;
	let lastname = document.getElementById('lastName').value;
	let email = document.getElementById('email').value;
	let phoneList = document.getElementById('phonesList');
	let outter = document.querySelectorAll('.outter-input');
	let empty = document.querySelector('.empty');
	let pattern = email.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i);

	if(firstname === '' || lastname === '' || email === ''){
		empty.style.display = 'block';
	} else if (email != pattern) {
		document.getElementById('email').style.borderColor = "red";
		return false;
	} else {
		let contactObj = {
		id: id,
		firstName: firstname,
		lastName: lastname,
		phones: [],
		email: email
		};

		for(let i = 0; i < document.getElementsByClassName('phoneListItem').length;i++){
			contactObj.phones[i] = document.getElementsByClassName('phoneListItem')[i].textContent;
		}

		console.log(contactObj);
		localStorage.setItem(contactObj.id, JSON.stringify(contactObj));
		clearForm();
		phoneList.innerHTML = '';
		contactsForm.style.display = "none";
		backdrop.style.display = "none";
		empty.style.display = 'none';

		saved();

		showContactBook();
	}

}


function showContactBook(){
	let contactsBox = document.querySelector('.contacts-book');
	contactsBox.innerHTML = '';
	for(let i = 0; i < localStorage.length; i++){
		let contactId = localStorage.key(i);
		let userId = localStorage.getItem(contactId);
		userId = JSON.parse(userId);

		let contactsBookItem = document.createElement('div');
		contactsBookItem.classList.add('contactsBookItem');
		contactsBookItem.innerHTML = '<span class="outter-input-firstname">' + userId.firstName + ' '  + userId.lastName + '</span>';

		let details = document.createElement('form');
		details.className = "details";
		details.setAttribute = ('id', userId);
		details.innerHTML = '<h3>Edit information</h3>' +
		'<p>first name</p>'+
		'<input type="text" name="firstname" class="firstnameD-' + userId.id+'" value="' + userId.firstName + '">' +
		'<p>last name</p>'+
		'<input type="text" name="lastname"  class="lastnameD-' + userId.id+'" value="' + userId.lastName + '">' +
		'<p>email</p>'+
		'<input type="text" name="email"  class="emailD-' + userId.id+'" value="' + userId.email + '">'+
		'<p>phones</p>';

		for(let n = 0; n < userId.phones.length; n++){
			let phoneInputBox = document.createElement('div');
			phoneInputBox.classList.add('phones-box');

			let phonesItem = document.createElement('input');
			phonesItem.classList.add('phonesItem-'+ userId.id);
			phonesItem.setAttribute('type', 'number');
			phonesItem.setAttribute('value', userId.phones[n]);

			let removePhone = document.createElement('button');
			removePhone.classList.add('removePhone');
			removePhone.innerHTML = '<img src="img/remove.png" alt="remove">';

			removePhone.addEventListener('click', removePhoneItem);

			details.appendChild(phoneInputBox);
			phoneInputBox.appendChild(phonesItem);
			phoneInputBox.appendChild(removePhone);

		}
		function removePhoneItem(){
			let parent = this.parentNode.parentNode;
			let currentItem = this.parentNode;
			parent.removeChild(currentItem);
		}


//Close button=================================================================
		let closeButton = document.createElement('button');
		closeButton.className = "close-btn";
		closeButton.innerHTML = '<div class="l1"></div><div class="l2"></div>';

		closeButton.addEventListener("click", function(){
			details.style.display = 'none';
			backdrop.style.display = 'none';
		});
//Close button=================================================================
//AddPhone button==============================================================
	let addPhoneButton = document.createElement('button');
	addPhoneButton.setAttribute('type', 'button');
	addPhoneButton.innerHTML = '<img src="img/add.png" alt="">';
	addPhoneButton.classList.add('addPhoneButton');

	details.appendChild(addPhoneButton)

	addPhoneButton.addEventListener('click', function(){
			let phoneInputBox = document.createElement('div');
			phoneInputBox.classList.add('phones-box');

			let phonesItem = document.createElement('input');
			phonesItem.classList.add('phonesItem-'+ userId.id);
			phonesItem.setAttribute('type', 'number');

			let removePhone = document.createElement('button');
			removePhone.classList.add('removePhone');
			removePhone.innerHTML = '<img src="img/remove.png" alt="remove">';

			removePhone.addEventListener('click', removePhoneItem);

			details.insertBefore(phoneInputBox, saveButton);
			phoneInputBox.appendChild(phonesItem);
			phoneInputBox.appendChild(removePhone);

	})
//AddPhone button==============================================================
//Save button==================================================================
		let saveButton = document.createElement('button');
		saveButton.className = "save-button";
		saveButton.innerHTML = 'save';

		saveButton.addEventListener('click', function(){
			backdrop.style.display = "none";
			details.style.display = "none";
			let firstname = document.querySelector('.firstnameD-'+userId.id).value;
			let lastname = document.querySelector('.lastnameD-'+userId.id).value;
			let email = document.querySelector('.emailD-'+userId.id).value;

			let editObj = {
				id: userId.id,
				firstName: firstname,
				lastName: lastname,
				phones: [],
				email: email
			};
			for(let i = 0; i < document.getElementsByClassName('phonesItem-'+ userId.id).length;i++){
				if(document.getElementsByClassName('phonesItem-'+ userId.id)[i].value){
					editObj.phones[i] = document.getElementsByClassName('phonesItem-'+ userId.id)[i].value;
				}
			}
			console.log(editObj);
			localStorage.setItem(userId.id, JSON.stringify(editObj));
			saved();
			showContactBook();
		});
//Save button==================================================================
//Edit button==================================================================
		let editButton = document.createElement('button');
		editButton.classList.add('edit-button');
		editButton.innerHTML = '<img src="img/edit.png" alt="editButton">';

		editButton.addEventListener('click', function(){
			details.style.display = 'block';
			backdrop.style.display = 'block';
		});
//Edit button==================================================================
//Remove button================================================================
		let remove = document.createElement('button');
		remove.classList.add('removeButton');
		remove.innerHTML = '<img src="img/remove.png" alt="remove">';

		remove.addEventListener("click", function(){
			contactsBox.removeChild(this.parentNode);
			localStorage.removeItem(contactId);
		});
//Remove button================================================================
		contactsBox.appendChild(contactsBookItem);
		contactsBookItem.appendChild(details);
		contactsBookItem.appendChild(editButton);
		contactsBookItem.appendChild(remove);
		details.appendChild(closeButton);
		details.appendChild(saveButton);
//Backdrop=====================================================================
		backdrop.addEventListener("click", function () {
			details.style.display = "none";
			backdrop.style.display = "none";
		});
//Backdrop=====================================================================
	}
}
showContactBook();

//======================Support functions====================
function clearForm(){
	let formFields = document.querySelectorAll('.formFields');
	for(let i in formFields){
		formFields[i].value = '';
	}
}
function saved(){
	let alert = document.createElement('div');
	alert.className = "alert";
	alert.textContent = 'Saved';

	document.body.appendChild(alert);

	setTimeout(function() {
		alert.parentNode.removeChild(alert);
	}, 1000);
}


let search = document.getElementById('search');
let outterFirstName = document.getElementsByClassName('outter-input-firstname');

search.addEventListener('input', function(){
	let searchInput = search.value;
	for(let i = 0; i < outterFirstName.length; i++){
		let result = outterFirstName[i].textContent.toLowerCase().indexOf(searchInput.toLowerCase());
		if(result === -1) {
			outterFirstName[i].parentNode.style.display = 'none';
		} else {
			outterFirstName[i].parentNode.style.display = 'block';
		}

	}
});

})();
