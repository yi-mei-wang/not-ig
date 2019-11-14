import React from "react";
import axios from "axios";
import UploadForm from "../components/UploadForm";
import { PreviewImage } from "../components/PreviewImage";

export default class UploadPage extends React.Component {
  state = {
    previewImage: "",
    imageFile: null,
    message: ""
  };

  handleFile = file => {
    if (file) {
      this.setState({
        previewImage: URL.createObjectURL(file),
        imageFile: file
      });
    } else {
      URL.revokeObjectURL(this.state.previewImage);
      this.setState({
        previewImage: "",
        imageFile: null
      });
    }
  };

  handleSubmitFile = toggleLoading => {
    // Prevent the default behaviour of the form submitting
    // TODO: GET JWT FROM STATE
    // Authorization of the user
    let authToken = localStorage.getItem("jwt");
    // Formdata object to hold the image file to send to the server
    let formData = new FormData();
    // Append the key:value pair to the formData object
    formData.append("image", this.state.imageFile);

    axios
      .post("https://insta.nextacademy.com/api/v1/images/", formData, {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      .then(resp => {
        if (resp.data.success) {
          this.setState({
            message: "Image Uploaded Successfully!",
            previewImage: null,
            imageFile: null
          });
          toggleLoading(false);
          this.props.history.push({
            pathname: "/users/me"
          });
        }
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  render() {
    const { previewImage, message } = this.state;

    return (
      <>
        <div
          style={{
            height: "70vh",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "2rem"
          }}
        >
          <div
            style={{
              width: "50vw",
              height: "50vh",
              minWidth: "300px",
              minHeight: "300px"
            }}
          >
            <PreviewImage previewImage={previewImage} message={message} />
            <UploadForm
              handleFile={this.handleFile}
              handleSubmitFile={this.handleSubmitFile}
            />
          </div>
        </div>
      </>
    );
  }
}
