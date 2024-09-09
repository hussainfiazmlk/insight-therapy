export const successResponse = (
  message: string,
  data?: any,
  success = true,
) => {
  return {
    success,
    message,
    data: data || null,
  };
};
