export const getErrorMessage = (error: any): string => {
  // Handle timeout errors
  if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
    return 'Request timed out. Please check your connection and try again.';
  }
  
  // Handle network errors
  if (error.message?.includes('Network Error') || error.message?.includes('ERR_NETWORK')) {
    return 'Network error. Please check your internet connection and try again.';
  }
  
  // Handle specific HTTP status codes
  if (error.response?.status) {
    switch (error.response.status) {
      case 400:
        return 'Invalid request. Please check your input and try again.';
      case 401:
        return 'Authentication failed. Please log in again.';
      case 403:
        return 'Access denied. You don\'t have permission to perform this action.';
      case 404:
        return 'Resource not found. Please check the URL and try again.';
      case 408:
        return 'Request timeout. Please try again.';
      case 429:
        return 'Too many requests. Please wait a moment and try again.';
      case 500:
        return 'Server error. Please try again later.';
      case 502:
        return 'Bad gateway. Please try again later.';
      case 503:
        return 'Service unavailable. Please try again later.';
      case 504:
        return 'Gateway timeout. Please try again later.';
      default:
        return `Request failed (${error.response.status}). Please try again.`;
    }
  }
  
  // Handle generic errors
  if (error.message) {
    return error.message;
  }
  
  // Fallback message
  return 'An unexpected error occurred. Please try again.';
};

export const isTimeoutError = (error: any): boolean => {
  return error.code === 'ECONNABORTED' || 
         error.message?.includes('timeout') || 
         error.response?.status === 408 ||
         error.response?.status === 504;
};

export const isNetworkError = (error: any): boolean => {
  return error.message?.includes('Network Error') || 
         error.message?.includes('ERR_NETWORK') ||
         !error.response;
}; 