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
    
    const response = await fetch(url, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Evaluation failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Evaluation error:', error);
    throw error;
  }
} 