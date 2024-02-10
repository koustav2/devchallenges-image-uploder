/* eslint-disable react/prop-types */
import { saveAs } from 'file-saver'
import {toast} from 'react-toastify'

const DownloadImageButton = ({ imageUrl,name }) => {

    const downloadImage = async (url) => {
        try {
            const response = await fetch(url);
            // console.log(response);
            const blob = await response.blob();
            saveAs(blob, name);
            toast.success('Image downloaded successfully');
        } catch (error) {
            toast.error("An error occurred while downloading the image: ", error.message);
        }
    };

    return (
        <button onClick={() => downloadImage(imageUrl)}>
            Download Image
        </button>
    )
}

export default DownloadImageButton;
