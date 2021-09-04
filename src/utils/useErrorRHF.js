const useErrorRHF = (form, name) => {
  const { errors } = form;
  const hasError = errors[name]; /* && formState.touched[name]; */
  const errorMessage = errors[name]?.message;

  return {
    hasError: !!hasError,
    errorMessage,
  };
};

export default useErrorRHF;
