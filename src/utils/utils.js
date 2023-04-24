const validateEmail = (email) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

const inputHasError = (input) => {
	const isEmpty = !input.value;
	const isInvalidEmail = input.type === 'email' && !validateEmail(input.value);

	return isEmpty || isInvalidEmail;
};

const RESPONSE_SERVER = {
	BAD_REQUEST: 'ERR_BAD_REQUEST',
};

export { inputHasError, RESPONSE_SERVER };