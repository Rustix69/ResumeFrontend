/**
 * API service for resume evaluation
 */

export async function evaluateResume(resumeFile: File, jobDescription: string) {
  try {
    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('jobDescription', jobDescription);
    
    // Use the environment variable for the backend URL
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const url = `${backendUrl}/api/evaluate`;
    
    // Configure request with proper fetch options that allow tracking upload progress
    const xhr = new XMLHttpRequest();
    
    // Create a promise to handle the XHR request
    const uploadPromise = new Promise((resolve, reject) => {
      xhr.open('POST', url);
      
      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const responseData = JSON.parse(xhr.responseText);
            resolve(responseData);
          } catch (e) {
            reject(new Error('Invalid JSON response'));
          }
        } else {
          try {
            const errorData = JSON.parse(xhr.responseText);
            reject(new Error(errorData.error || 'Evaluation failed'));
          } catch (e) {
            reject(new Error(`Request failed with status ${xhr.status}`));
          }
        }
      };
      
      xhr.onerror = function() {
        reject(new Error('Network error occurred'));
      };
      
      // Send the form data
      xhr.send(formData);
    });
    
    return await uploadPromise;
  } catch (error) {
    console.error('Evaluation error:', error);
    throw error;
  }
} 