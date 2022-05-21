import React from "react";
import { useSelector } from "react-redux";
import CreateInvoiceContent from "../../components/pages/createInvoice/CreateInvoiceContent";
import "./CreateInvoice.scss";

const CreateInvoice = () => {
  return <div id="createInvoice">
      <CreateInvoiceContent></CreateInvoiceContent>
    </div>;
};

export default CreateInvoice;
