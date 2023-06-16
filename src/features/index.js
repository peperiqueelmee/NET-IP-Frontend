export { default as authenticationReducer, addAuthentication } from './authentication/authenticationSlice';
export { default as changeStatusReducer, updateInfoChangeStatus } from './changeStatus/changeStatusSlice';
export { default as employeesReducer, updateInfoEmployees } from './employees/employeeSlice';
export {
  default as fetchReducer,
  updatePagePagination,
  addResults,
  updateTotalResults,
  updateResults,
  deleteResult,
} from './fetch/fetchSlice';
export { default as formValidationReducer, updateFormValidation } from './formValidations/formValidationSlice';
