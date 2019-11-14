import React from "react";
import { Form, FormGroup, FormText } from "reactstrap";
import { ButtonWithLoader } from "../styled/ButtonWithLoader";

class UploadForm extends React.Component {
  state = {
    isDisabled: true,
    isLoading: false
  };

  handleChange = e => {
    let file = e.target.files[0];

    if (file) {
      this.props.handleFile(file);
      this.setState({
        isDisabled: false
      });
    } else {
      this.props.handleFile(null);
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.toggleLoading(true);
    this.props.handleSubmitFile(this.toggleLoading);
  };

  toggleLoading = isLoading => {
    this.setState({
      isLoading
    });
  };
  render() {
    const { isDisabled, isLoading } = this.state;
    return (
      <Form onSubmit={e => this.handleSubmit(e)}>
        <FormGroup>
          <input
            type="file"
            name="image-file"
            id="image-file"
            onChange={e => this.handleChange(e)}
          />

          <div className="d-flex flex-column align-items-center">
            <FormText color="muted">
              Make sure the image being uploaded is a supported format.
            </FormText>
            <ButtonWithLoader
              type="submit"
              color="primary"
              disabled={isDisabled}
              isLoading={isLoading}
            >
              Upload
            </ButtonWithLoader>
          </div>
        </FormGroup>
      </Form>
    );
  }
}

export default UploadForm;
