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
      
      // Set timeout to 10 minutes (600000ms) for long-running analysis
      xhr.timeout = 600000;
      
      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const responseData = JSON.parse(xhr.responseText);
            resolve(responseData);
          } catch (e) {
            reject(new Error('Invalid JSON response'));
          }
        } else if (xhr.status === 504) {
          reject(new Error('Analysis timeout - The resume analysis is taking longer than expected. This may be due to high server load. Please try again in a few minutes.'));
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
      
      xhr.ontimeout = function() {
        reject(new Error('Request timeout - The analysis is taking longer than expected. This may be due to high server load or complex resume content. Please try again.'));
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