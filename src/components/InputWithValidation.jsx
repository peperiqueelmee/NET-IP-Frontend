import { IoMdCloseCircle, IoIosCheckmarkCircle } from "react-icons/io";
import { UserFill } from "../assets/icons";

const validateInput = (input) => {
    const { parentElement } = input;
    const isEmpty = !input.value;
    const isInvalidEmail = input.type === "email" && !validateEmail(input.value);
    const errorIcon = parentElement.querySelector(".error-icon");
    const successIcon = parentElement.querySelector(".success-icon");
    const errorMessage = parentElement.querySelector(".error-message");

    input.classList.toggle("border-red-500", isEmpty || isInvalidEmail);
    input.classList.toggle("border-emerald-500", !isEmpty && !isInvalidEmail);
    errorIcon.classList.toggle("hidden", !isEmpty && !isInvalidEmail);
    errorIcon.classList.toggle("flex", isEmpty || isInvalidEmail);
    successIcon.classList.toggle("hidden", isEmpty || isInvalidEmail);
    successIcon.classList.toggle("flex", !isEmpty && !isInvalidEmail);
    errorMessage.classList.toggle("invisible", !isEmpty && !isInvalidEmail);
};

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const InputWithValidation = ({ label, type, placeholder, errorMessage, value, onChange, icon }) => {
    const handleBlur = (e) => {
        validateInput(e.target);
    };

    const handleChange = (e) => {
        validateInput(e.target);
        removeFocus(e);
    };

    const handleFocus = (e) => {
        const { parentElement } = e.target;
        const errorIcon = parentElement.querySelector(".error-icon");
        const successIcon = parentElement.querySelector(".success-icon");
        const errorMessage = parentElement.querySelector(".error-message");

        errorMessage.classList.toggle("invisible", true);
        errorIcon.classList.toggle("flex", false);
        errorIcon.classList.toggle("hidden", true);
        successIcon.classList.toggle("flex", false);
        successIcon.classList.toggle("hidden", true);

        e.target.classList.add("focus:border-sky-500");
    };

    const removeFocus = (e) => {
        e.target.classList.remove("focus:border-sky-500");
    };

    return (
        <>
            <div className="relative mt-2">
                <label className="block mb-2 text-sm font-medium text-slate-600">
                    {label}
                    <span className="text-rose-500">*</span>
                </label>
                <input
                    type={type}
                    className="mt-2 border focus:outline-none text-gray-900 text-sm rounded-md w-full pl-10 p-2.5 shadow-sm focus:shadow-md bg-zinc-100"
                    value={value}
                    onChange={(e) => {
                        {
                            onChange(e.target.value);
                        }
                        handleChange(e);
                    }}
                    placeholder={placeholder}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    required=""
                />

                <div className="absolute inset-y-0 left-0 mt-12 items-center pl-3 pointer-events-none">
                    <div>{icon}</div>
                </div>
                <div className="absolute inset-y-0 right-0 mt-12 items-center pr-3 pointer-events-none">
                    <div className="error-icon hidden">
                        <IoMdCloseCircle className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="hidden success-icon">
                        <IoIosCheckmarkCircle className="h-5 w-5 text-emerald-500" />
                    </div>
                </div>

                <div className="text-xs text-red-500 ml-1 invisible error-message">{errorMessage}</div>
            </div>
        </>
    );
};

export default InputWithValidation;