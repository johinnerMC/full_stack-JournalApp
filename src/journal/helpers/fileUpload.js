
export const fileUpload = async(file) => {
    if (!file) throw new Error('file not found');

  const cloudUrl = 'https://api.cloudinary.com/v1_1/dxung9yrn/upload';
  
  const formData = new FormData();
  formData.append('upload_preset', 'Journal-app');
  formData.append('file', file)

  try{

    const resp = await fetch(cloudUrl, {
        method: 'POST',
        body: formData
    });

    if(!resp.ok) throw new Error('file upload failed');

    const cloudResp = await resp.json();

    return cloudResp.secure_url;

  } catch(error){
    console.log(error)
    throw new Error(error.message);
  }
}
