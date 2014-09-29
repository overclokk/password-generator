$(document).ready(function() {

	var extraCaracters = $( "#extra_caracters" );
	var inputLowerLetters = $( "#include_letters" );
	var inputUpperLetters = $( "#include_upper_letters" );
	var inputNumbers = $( "#include_numbers" );
	var inputPunctuation = $( "#include_punctuation" );		

	function verifyInput(){
	     // If is not selected lower and upper and numbers
	     if (!inputLowerLetters[0].checked && !inputUpperLetters[0].checked && !inputNumbers[0].checked && !inputPunctuation[0].checked){

	          alert('You need to choose the type of characters you want in your password');
	          return 0;
	     }

	     // If is not set password leght 
	     if(document.forms[0].elements[0].value==""){

	          alert('You must enter the desired length for your password, insert at least 8 characters for get secure password');
	          return 0;
	     }
	}


	function getRandomNum(lbound, ubound){

	     return (Math.floor(Math.random() * (ubound - lbound)) + lbound);
	}

	function getRandomChar(extra, lower, upper, number, punctuation){

		var lowerLetters = 'abcdefghijklmnopqrstuvwxyz';
		var upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		var numbers = '0123456789';
		var punctuations = ':;><!"£$%&/()=?^*°#_-@+[]{}|,.§ç';

		var charSet = extra;

		if (lower == true) charSet += lowerLetters;
		if (upper == true) charSet += upperLetters;
		if (number == true) charSet += numbers;
		if (punctuation == true) charSet += punctuations;

		return charSet.charAt( getRandomNum( 0, charSet.length ) );
	}

	function getPassword(length, extra, lower, upper, number, punctuation){

	     var pass = "";
	     length++;

	     // if (length > 0) pass = pass + getRandomChar(extraChars, firstNumber, firstAlpha, firstOther);

	     for (var idx = 1; idx < length; ++idx){

	          pass = pass + getRandomChar(extra, lower, upper, number, punctuation);
	     }
	     return pass;
	}				

	// Password strength meter v1.0
	// Matthew R. Miller - 2007
	// www.codeandcoffee.com
	// Based off of code from  http://www.intelligent-web.co.uk

	// Settings
	// -- Toggle to true or false, if you want to change what is checked in the password
	var bCheckNumbers = true;
	var bCheckUpperCase = true;
	var bCheckLowerCase = true;
	var bCheckPunctuation = true;
	var nPasswordLifetime = 365;

	// Check password
	function checkPassword(strPassword){

		// Reset combination count
		nCombinations = 0;
		
		// Check numbers
		if (bCheckNumbers){

			strCheck = "0123456789";
			if (doesContain(strPassword, strCheck) > 0){ 

				nCombinations += strCheck.length; 
			}
		}
		
		// Check upper case
		if (bCheckUpperCase){

			strCheck = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
			if (doesContain(strPassword, strCheck) > 0){

				nCombinations += strCheck.length; 
			}
		}
		
		// Check lower case
		if (bCheckLowerCase){

			strCheck = "abcdefghijklmnopqrstuvwxyz";
			if (doesContain(strPassword, strCheck) > 0){

				nCombinations += strCheck.length; 
			}
		}
		
		// Check punctuation
		if (bCheckPunctuation){

			strCheck = ";:-_=+\|//?^&!.@$£#*()%~<>{}[]";
			if (doesContain(strPassword, strCheck) > 0){

				nCombinations += strCheck.length; 
			}
		}
		
		// Calculate
		// -- 500 tries per second => minutes 
		var nDays = ((Math.pow(nCombinations, strPassword.length) / 500) / 2) / 86400;

		// Number of days out of password lifetime setting
		var nPerc = nDays / nPasswordLifetime;
		
		return nPerc;
	}

	// Runs password through check and then updates GUI 
	function runPassword(strPassword, strFieldID){

		// Check password
		nPerc = checkPassword(strPassword);
		
		 // Get controls
		 var ctlBar = document.getElementById(strFieldID + "_bar"); 
		 var ctlText = document.getElementById(strFieldID + "_text");
		 if (!ctlBar || !ctlText)
		 	return;

	    	// Set new width
	    	var nRound = Math.round(nPerc * 100);
	    	if (nRound < (strPassword.length * 5)){

	    		nRound += strPassword.length * 5; 
	    	}
	    	if (nRound > 100) nRound = 100;

	    	// Lenght of bar
	    	ctlBar.style.width = nRound + "%";

	 	// Color and text
	 	if (nRound > 90){

	 		strText = "Very Secure";
	 		strColor = "#3bce08";
	 	} else if (nRound > 66){

	 		strText = "Secure";
	 		strColor = "orange";
	 	} else if (nRound > 34){

	 		strText = "Mediocre";
	 		strColor = "#ffd801";
	 	} else {

	 		strText = "Insecure";
	 		strColor = "red";
	 	}
	 	ctlBar.style.backgroundColor = strColor;
	 	ctlText.innerHTML = "<span id='textBar' style='color: white;'>" + nRound + "% " + strText + "</span>";
	 }
	 
	// Checks a string for a list of characters
	function doesContain(strPassword, strCheck){

		nCount = 0; 

		for (i = 0; i < strPassword.length; i++){

			if (strCheck.indexOf(strPassword.charAt(i)) > -1){ 

				nCount++; 
			} 
		} 

		return nCount; 
	}

	// Check if the length for password is good enough
	function checkLength (length) {

		if ( length > 7 ) {

			$('#password_group').removeClass().addClass('form-group has-success');

		} else if ( length > 5 ) {

			$('#password_group').removeClass().addClass('form-group has-warning');

		} else{

			$('#password_group').removeClass().addClass('form-group has-error');

		};
	}

	var password = $('#password_length');
	checkLength( password.val() );

	password.keyup( function() {

		var passwordVal = password.val();

		//Check if password length include number.
		if ( !( passwordVal.match(/\d/) ) && passwordVal !== '' ) {
		     alert("Password length must include number.");
		}

		checkLength( passwordVal );

	});


	$('#create_pass').click( function(){
		verifyInput();

		var password = $('#password_length');

		var length = password.val();
		var extra = extraCaracters.val();
		var lower = inputLowerLetters[0].checked;
		var upper = inputUpperLetters[0].checked;
		var number = inputNumbers[0].checked;
		var punctuation = inputPunctuation[0].checked;

		var pass = getPassword(length, extra, lower, upper, number, punctuation);

		$('#getPassword').html(pass);

		runPassword(pass, 'getPassword');

	});

	// Reset text area
	$('#reset_fields').click( function(){
		// Remove password from textarea
		$('#getPassword').html('');
		// Set 0% width of password bar
		$('#getPassword_bar').css('width', '0%');
		// Remove text from text bar
		$('#textBar').remove();
		// Remove class from password group
		$('#password_group').removeClass().addClass('form-group');
		// Remove length value
		$('#password_length').val('');
		// Remove extra characters value
		$('#extra_caracters').val('');

		var passwordVal = password.val();
		checkLength( passwordVal );
	});


});