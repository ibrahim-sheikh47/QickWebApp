import React from "react";
import { Field, reduxForm } from "redux-form";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

// Import Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

// Import CSS
import "../CreateMerchantForm.css";

// Import Fields
import renderField from "../../../utils/fields/renderField.jsx";
import renderPhone from "../../../utils/fields/renderPhone.jsx";
import renderSelectField from "../../../utils/fields/renderSelectField.jsx";

// Import Normalizers
import normalizePhone from "../../../utils/normalizers/normalizePhone";

// Import sychronous validation
import validate from "../validation/validate.js";
import warn from "../validation/warn.js";

// Import Initial Values
import initialFieldValues from "../initializeValues";

const BusinessProfile = (props) => {
  const { handleSubmit } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <Container style={{ textAlign: "left", paddingTop: 20 }}>
        <h2>Business Profile </h2>
        <div className="subtitle">
          Tell us about your business. The information you provide will be used
          to verify your identity. Additional information may be requested.
        </div>
        <br />

        {/* Business Name */}
        <Field
          name="business_name"
          type="text"
          component={renderField}
          label="Business Name"
          placeholder_text="Hollywood Bicycles, LLC"
          tool_tip_text="Your full legal business name (If Individual Sole Proprietorship, please input first name, full legal last name and middle initial. (max 120 characters)"
          className="mb-3"
        />

        {/* Doing Business As */}
        <Field
          name="doing_business_as"
          type="text"
          component={renderField}
          label="Doing Business As"
          placeholder_text="Hollywood Electric Bicycles"
          tool_tip_text="Alternate name of the business. If no other name is used please use the same value for Business Name"
          className="mb-3"
        />

        {/* Website */}
        <Field
          name="website"
          type="text"
          component={renderField}
          label="Website"
          placeholder_text="www.hollywoodbicycles.io"
          tool_tip_text="Publicly available website (max 100 characters)"
          className="mb-3"
        />

        {/* Business Phone */}
        <Field
          name="business_phone"
          type="text"
          component={renderPhone}
          label="Business Phone"
          placeholder_text="800-231-1345"
          tool_tip_text="Customer service phone number where you can be reached at"
          normalize={normalizePhone}
          className="mb-3"
        />

        {/* Business Address Line 1 */}
        <Field
          name="business_address_line1"
          type="text"
          component={renderField}
          label="Business Address Line 1"
          placeholder_text="123 Main Street"
          tool_tip_text="Line 1 of your business address (max 35 characters)."
          className="mb-3"
        />

        {/* Business Address Line 2 */}
        <Field
          name="business_address_line2"
          type="text"
          component={renderField}
          label="Business Address Line 2"
          placeholder_text="Suite 101"
          tool_tip_text="Line 2 of your business address (max 35 characters)"
          className="mb-3"
        />

        <Row className="mb-3">
          <Col>
            {/* City */}
            <Field
              name="business_address_city"
              type="text"
              component={renderField}
              label="City"
              placeholder_text="Los Angeles"
              tool_tip_text="City (max 20 characters)"
            />
          </Col>
          <Col>
            <Form.Label>
              State{" "}
              <span
                data-tip="Select the state of your business address"
                data-for="business_state"
              >
                <FontAwesomeIcon color="#1A233B" icon="info-circle" />
              </span>
              <Tooltip
                id="business_state"
                place="right"
                type="dark"
                effect="solid"
              />{" "}
            </Form.Label>
            <Form.Group>
              {/* State */}
              <Field
                name="business_address_region"
                component={renderSelectField}
                className="mb-3"
              >
                <option />
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                {/* Add all other states */}
              </Field>
            </Form.Group>
          </Col>
          <Col>
            {/* Zip */}
            <Field
              name="business_address_postal_code"
              type="text"
              component={renderField}
              label="Zip"
              placeholder_text="90012"
              tool_tip_text="Zip or Postal code (max 7 characters)"
              className="mb-3"
            />
          </Col>
        </Row>

        {/* Action Button */}
        <div className="d-flex justify-content-center mt-4">
          <Button type="submit" className="next w-[30%]">
            Next
          </Button>
        </div>
      </Container>
    </Form>
  );
};

export default reduxForm({
  form: "createMerchantForm", // a unique identifier for this form
  initialValues: initialFieldValues,
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate, // <--- validation function given to redux-form
  warn, // <--- warning function given to redux-form
})(BusinessProfile);
