import React, { useState } from "react";
import _uniqueId from "lodash/uniqueId";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const RenderField = (field) => {
  const [id] = useState(_uniqueId("prefix-"));
  return (
    <Form.Group controlId={id}>
      <div>
        <Form.Label>
          {field.label}{" "}
          <span data-tip={field.tool_tip_text}>
            <FontAwesomeIcon color="#1A233B" icon="info-circle" />
          </span>
          <Tooltip place="right" type="dark" effect="solid" />
        </Form.Label>
      </div>

      <Form.Control
        {...field.input}
        placeholder={field.placeholder_text}
        normalize={field.normalize}
        format={field.format}
        type={field.type}
      />

      {field.meta.touched &&
        ((field.meta.error && (
          <span style={{ color: "red" }}>{field.meta.error}</span>
        )) ||
          (field.meta.warning && (
            <span style={{ color: "orange" }}>{field.meta.warning}</span>
          )))}
    </Form.Group>
  );
};

export default RenderField;
