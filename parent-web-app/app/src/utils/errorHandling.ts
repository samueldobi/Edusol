export const getErrorMessage = (error: unknown): string => {
  // Type guard to check if error is an object with properties
  if (error && typeof error === 'object') {
    const errorObj = error as { 
      code?: string; 
      message?: string; 
      response?: { status?: number } 
    };
    
    // Handle timeout errors
    if (errorObj.code === 'ECONNABORTED' || errorObj.message?.includes('timeout')) {
      return 'Request timed out. Please check your connection and try again.';
    }
    
    // Handle network errors
    if (errorObj.message?.includes('Network Error') || errorObj.message?.includes('ERR_NETWORK')) {
      return 'Network error. Please check your internet connection and try again.';
    }
    
    // Handle specific HTTP status codes
    if (errorObj.response?.status) {
          switch (errorObj.response.status) {
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
          return `Request failed (${errorObj.response.status}). Please try again.`;
      }
    }
    
    // Handle generic errors
    if (errorObj.message) {
      return errorObj.message;
    }
  }
  
  // Fallback message
  return 'An unexpected error occurred. Please try again.';
};

export const isTimeoutError = (error: unknown): boolean => {
  if (error && typeof error === 'object') {
    const errorObj = error as { 
      code?: string; 
      message?: string; 
      response?: { status?: number } 
    };
    return errorObj.code === 'ECONNABORTED' || 
           errorObj.message?.includes('timeout') || 
           errorObj.response?.status === 408 ||
           errorObj.response?.status === 504;
  }
  return false;
};

export const isNetworkError = (error: unknown): boolean => {
  if (error && typeof error === 'object') {
    const errorObj = error as { 
      message?: string; 
      response?: unknown 
    };
    return errorObj.message?.includes('Network Error') || 
           errorObj.message?.includes('ERR_NETWORK') ||
           !errorObj.response;
  }
  return false;
}; 