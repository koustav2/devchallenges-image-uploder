
export const uploadToCloudinary = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET); // replace with your upload preset
      formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME); // replace with your upload preset
  
      const response = await fetch('https://api.cloudinary.com/v1_1/ds544u6mo/image/upload', { 
        method: 'POST',
        body: formData, 
      }); 
  
      if (!response.ok) {  
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const jsonResponse = await response.json();
        return jsonResponse;
      }
    } catch (err) {
      console.error(err)
      return null;
    }
  }
