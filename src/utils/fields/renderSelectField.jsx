import React, { useState } from "react";
import _uniqueId from "lodash/uniqueId";
import { Form } from "react-bootstrap"; // Importing Form from React-Bootstrap

const RenderSelectField = (field) => {
  const [id] = useState(_uniqueId("prefix-"));
  return (
    <div id={id}>
      <Form.Control as="select" {...field.input}>
        {field.children}
      </Form.Control>

      {field.meta.touched &&
        ((field.meta.error && (
          <span style={{ color: "red" }}>{field.meta.error}</span>
        )) ||
          (field.meta.warning && (
            <span style={{ color: "orange" }}>{field.meta.warning}</span>
          )))}
    </div>
  );
};

export default RenderSelectField;
