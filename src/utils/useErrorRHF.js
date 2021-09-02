const useErrorRHF = (form, name) => {
  const { errors, formState } = form;
  const hasError = formState.touched[name] && errors[name];
  const errorMessage = errors[name]?.message;

  return {
    hasError: !!hasError,
    errorMessage,
  };
};

export default useErrorRHF;
