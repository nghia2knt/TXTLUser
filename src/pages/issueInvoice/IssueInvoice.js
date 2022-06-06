import React from "react";
import InvoicesContent from "../../components/pages/invoices/InvoicesContent";
import IssueInvoicesContent from "../../components/pages/issueInvoice/IssueInvoicesContent";

import "./IssueInvoice.scss";

const IssueInvoices = () => {
  return (
    <div id="invoices">
        <IssueInvoicesContent></IssueInvoicesContent>
    </div>
  );
};

export default IssueInvoices;
