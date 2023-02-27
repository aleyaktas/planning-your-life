import React, { useEffect } from "react";
import { Form } from "react-bootstrap";

const ShowMessage = ({ errorMsg }) => {
  console.log("errorMsg", errorMsg);
  return (
    <div>
      <Form.Text
        style={{
          color: "red",
          margin: "0.5rem",
          fontStyle: "italic",
        }}
        variant="body2"
        component="p"
      >
        {errorMsg}
      </Form.Text>
    </div>
  );
};

export default ShowMessage;
