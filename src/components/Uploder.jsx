/* eslint-disable no-unused-vars */
import { useState } from "react"
import { uploadToCloudinary } from "../cloudinary/cloudinary";
import DownloadImageButton from "./Downlode";
import { ShareButton } from "./Share";

function Uploder() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')

  const handleFileChange = async (e) => {
    setLoading(true)
    const file = e.target.files[0];
    console.log(file.name);
    const uploadResult = await uploadToCloudinary(file);
    setLoading(false)
    setUrl(uploadResult.secure_url);
    setName(uploadResult.original_filename);

  };
  return (
    <>
      <form>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {
        loading ? <p>Uploading...</p> : ''
      }
      {
        url && (
          <>
            <div>
              <img src={url} alt="uploaded" height={100} width={100} />
            </div>
            <DownloadImageButton imageUrl={url}  name={name}/>
            <ShareButton title={name} url={url} />
          </>
        )
      }


    </>
  )
}

export default Uploder
