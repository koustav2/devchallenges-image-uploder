/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react"
import { uploadToCloudinary } from "../cloudinary/cloudinary";
import DownloadImageButton from "./Downlode";
import { ShareButton } from "./Share";
import LoaderLine from "./LoderLine";
import LoaderSpinner from "./LoderSpinner";
import { toast } from "react-toastify";
import ChooseFile from "./FiletoUpload";
import DragAndDrop from "./DragAndDrop";

function Uploder({ themeMode }) {
  const [imgObj, setImgObj] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  const countOfFilesSupported = 1;
  const fileFormatsSupported = ["jpeg", "jpg", "png"];
  const [isHomePage, setIsHomePage] = useState(true);
  const [copied, setCopied] = useState(false);

  const onUpload = async (files) => {
    setLoading(true)
    const file = files[0];
    console.log(file.name);
    const uploadResult = await uploadToCloudinary(file);
    onUploadSuccess(uploadResult);

  };
  const onError = function () {
    toast.error("Getting error while Uploading", {
      theme: "colored",
    });
  };

  const onSuccess = function () {
    toast.success("Uploading Successfull", {
      theme: "colored",
    });
  };

  const onUploadSuccess = function (data) {
    onSuccess();
    setLoading(false)
    setIsUploadComplete(true);
    if (data) {
      setImgObj(data);
    } else {
      onError("Unable to get uploaded image");
    }
  };
  console.log(themeMode)

  return (
    <>
      <div className="App">
        {loading ? (
          <div className={
            "main-container uploading-container " + (themeMode === "dark" ? "dark-container" : "")
          }>
            <div className={
              "heading uploading-heading " + (themeMode === "dark"? "dark-color" : "")
            }>Uploading...</div>
            <div className="loader-container">
              <LoaderLine></LoaderLine>
            </div>
          </div>
        ) : isUploadComplete ? (
          <div className={
            "main-container upload-success-container" + (themeMode === "dark"? " dark-container" : "")
          }>
            <div className="check-icon-container">
              <span className="material-symbols-rounded check-icon">
                check_circle
              </span>
            </div>
            <div className={
              "heading uploaded-successfully-heading" + (themeMode === "dark"? " dark-heading" : "")
            }>
              Uploaded Successfully
            </div>
            <div className="uploaded-image-container">
              <img
                src={imgObj.secure_url}
                alt={imgObj.original_filename}
                className="uploaded-image"
              ></img>
            </div>
            <div className="copy-link-container">
              <div className="image-link">{imgObj.secure_url}</div>
              <button
                className="copy-link-button"
                onClick={() => {
                  navigator.clipboard.writeText(imgObj.secure_url);
                  setCopied(true);
                }}
              >
                {
                  copied ? "copied" : "copy"
                }
              </button>
            </div>
            <button
              className="upload-another-button"
              onClick={() => {
                setIsUploadComplete(false);
              }}
            >
              Upload Another
            </button>
            <DownloadImageButton imageUrl={imgObj.secure_url} name={imgObj.original_filename} />
            <ShareButton title={imgObj.original_filename} url={imgObj.secure_url} />
          </div>
        ) : isHomePage ? (
          <div className={
            "main-container " + (themeMode === "dark" ? " dark-container" : "")
          }>
            <div className="heading"></div>
            <div className="drag-drop-container">
              <DragAndDrop
                onUpload={onUpload}
                count={countOfFilesSupported}
                formats={fileFormatsSupported}
                handleError={onError}
                themeMode={themeMode}
              >
                <div className="placeholder-container">
                  <img
                    src="/logo-small.svg"
                    alt="placeholder"
                    className="placeholder-image"
                  ></img>
                </div>
                <p className="text-1">Drag & drop a file or <span>browse files</span>
                </p>
                <p className="text-2">JPG, PNG or GIF - Max file size 2MB</p>
              </DragAndDrop>
            </div>
            <div className="or-label">Or</div>
            <div>
              <ChooseFile
                className={"choose-file-button-container choose-file-button"}
                count={countOfFilesSupported}
                formats={fileFormatsSupported}
                onUpload={onUpload}
                handleError={onError}
              />
            </div>
          </div>
        ) : (
          <div className="main-container spinner-main-container">
            <div className="loader-spinner-container">
              <LoaderSpinner></LoaderSpinner>
            </div>
          </div>
        )}
      </div>

    </>
  )
}

export default Uploder
