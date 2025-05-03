import React, { Component } from "react";
import PropTypes from "prop-types";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, ProgressBar, Row } from "react-bootstrap";

// Import CSS
import "./CreateMerchantForm.css";

// Import Fields
import BusinessProfile from "./formPages/BusinessProfile";
import BusinessInformation from "./formPages/BusinessInformation";
import AdditionalUnderwritingData from "./formPages/AdditionalUnderwritingData";
import BankAccounts from "./formPages/BankAccount";
import Principals from "./formPages/Principals";
import ProcessingInformation from "./formPages/ProcessingInformation";

// Import Field Sets

class CreateMerchantForm extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 1,
    };
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  businessProfile() {
    this.setState({ page: 1 });
  }
  businessInformation() {
    this.setState({ page: 2 });
  }
  addPrincipals() {
    this.setState({ page: 3 });
  }
  additionalUnderwritingData() {
    this.setState({ page: 4 });
  }
  bankAccount() {
    this.setState({ page: 5 });
  }
  termsConditions() {
    this.setState({ page: 6 });
  }

  render() {
    const { onSubmit } = this.props;
    const { page } = this.state;

    // Helper function to apply active class
    const getStepClass = (stepNumber) => {
      return page === stepNumber
        ? "cursor-pointer text-center flex-1 text-blue-700 font-medium"
        : "cursor-pointer text-center flex-1 text-gray-500";
    };

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-5xl h-[90vh] flex flex-col">
          {/* Heading */}
          <div className="px-4 pt-6 text-center">
            <h1 className="text-2xl font-semibold text-gray-800">
              FINIX Onboarding Form for Facilities
            </h1>
          </div>

          {/* Progress bar */}
          <div className="pt-4 px-4">
            <ProgressBar now={(page / 6) * 100} />
          </div>

          {/* Navigation Steps */}
          <div className="flex text-sm px-4 py-2">
            <span
              onClick={this.businessProfile.bind(this)}
              className={getStepClass(1)}
            >
              1. Business Profile
            </span>
            <span
              onClick={this.businessInformation.bind(this)}
              className={getStepClass(2)}
            >
              2. Business Information
            </span>
            <span
              onClick={this.addPrincipals.bind(this)}
              className={getStepClass(3)}
            >
              3. Add Principals
            </span>
            <span
              onClick={this.additionalUnderwritingData.bind(this)}
              className={getStepClass(4)}
            >
              4. Additional Underwriting Data
            </span>
            <span
              onClick={this.bankAccount.bind(this)}
              className={getStepClass(5)}
            >
              5. Bank Account
            </span>
            <span
              onClick={this.termsConditions.bind(this)}
              className={getStepClass(6)}
            >
              6. Terms & Conditions
            </span>
          </div>

          {/* Scrollable Form Content */}
          <div className="overflow-y-auto px-6 pb-6 flex-1 max-h-[80vh]">
            {page === 1 && <BusinessProfile onSubmit={this.nextPage} />}
            {page === 2 && (
              <BusinessInformation
                previousPage={this.previousPage}
                onSubmit={this.nextPage}
              />
            )}
            {page === 3 && (
              <Principals
                previousPage={this.previousPage}
                onSubmit={this.nextPage}
              />
            )}
            {page === 4 && (
              <AdditionalUnderwritingData
                previousPage={this.previousPage}
                onSubmit={this.nextPage}
              />
            )}
            {page === 5 && (
              <BankAccounts
                previousPage={this.previousPage}
                onSubmit={this.nextPage}
              />
            )}
            {page === 6 && (
              <ProcessingInformation
                previousPage={this.previousPage}
                onSubmit={onSubmit}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

CreateMerchantForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default CreateMerchantForm;
