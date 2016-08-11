export const FORM_RESET = 'redux-form/RESET';

export function resetForm(form) {
  return {
    type: FORM_RESET,
    form: form,
  };
}
