import React, { useEffect, useState } from "react";
import assets from "../../../assets/assets";
import finixLogo from "../../../assets/finix.png";
import seperator from "../../../assets/seperator.png";
import Loader from "../../../components/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { addBankAccount } from "../../../api/services/paymentService";
import { useStateContext } from "../../../context";

const TokenizationForm = () => {
  const navigate = useNavigate();
  const { type = "card" } = useParams();
  const [loading, setLoading] = useState(false);
  const { currentFacility, setCurrentFacility } = useStateContext();

  useEffect(() => {
    let form;
    const onSubmit = () => {
      if (type === "card" && !window.ReactNativeWebView) {
        return;
      }

      setLoading(true);

      form.submit(
        "sandbox",
        // import.meta.env.VITE_FINIX_APPLICATION,
        // "AP9Cr8VfoWBFCPg7QTdwbQn7", //prod environment
        "APgPDQrLD52TYvqazjHJJchM",
        async function (err, res) {
          const tokenData = res.data || {};
          const token = tokenData.id;

          if (type === "card" && window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(JSON.stringify({ token }));
            setLoading(false);
          } else {
            try {
              const resp = await addBankAccount({
                facilityId: currentFacility?._id,
                token,
              });

              setCurrentFacility(resp.data.facility);
              window.history.back();
            } catch (err) {
              console.log("Add Bank Account error: ", err);
            } finally {
              setLoading(false);
            }
          }
        }
      );
    };

    if (type === "card") {
      form = Finix.CardTokenForm("finix-form", {
        showAddress: true,
        showLabels: true,
        // set custom labels for each field
        labels: {
          // Supported Fields: "name", "number", "expiration_date", "security_code", "address_line1", "address_line2", "address_city", "address_state","address_region", "address_country", "address_postal_code"
          name: "Cardholder Name",
        },
        // turn on or off placeholder text in the fields (default is true)
        showPlaceholders: true,
        // set custom placeholders for each field, you can specify them here
        placeholders: {
          // Supported Fields: "name", "number", "expiration_date", "security_code", "address_line1", "address_line2", "address_city","address_state", "address_region", "address_country", "address_postal_code"
          name: "Cardholder Name",
        },
        // hide specific fields that you do not need
        hideFields: [
          // Supported Fields: "name", "security_code", "address_line1", "address_line2", "address_city", "address_state","address_region", "address_country", "address_postal_code", "address_country"
          // "name",
          // "address_line1",
          // "address_line2",
          // "address_city",
          // "address_region",
          //"address_state",
          // "address_country",
        ],
        // require any specific fields that are not required by default, you can specify them here
        requiredFields: [
          // Supported Fields: "name", "address_line1", "address_line2", "address_city", "address_state","address_region", "address_country", "address_postal_code"
          "name",
          "address_line1",
          "address_city",
          "address_region",
          "address_state",
          "address_country",
          "address_postal_code",
        ],
        // if you want to require a field, but not hide input error messages (default is false)
        hideErrorMessages: false,
        // set custom error messages for each field if you are showing error messages
        errorMessages: {
          // Supported Fields: "name", "number", "expiration_date", "security_code", "address_line1", "address_line2", "address_city", "address_state","address_region", "address_country", "address_postal_code"
          name: "Please enter a valid name",
          address_city: "Please enter a valid city",
        },
        // custom styles for the form inputs (optional but recommended)
        styles: {
          // default styling for all fields
          default: {
            color: "#000",
            border: "1px solid #CCCDCF",
            borderRadius: "8px",
            padding: "8px 16px",
            fontFamily: "'Poppins', sans-serif",
            fontSize: "16px",
            boxShadow:
              "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 2px 4px rgba(0, 0, 0, 0.03)",
          },
          // specific styling if the field is valid
          success: {
            // color: "#5cb85c",
          },
          // specific styling if the field has errors
          error: {
            // color: "#d9534f",
            border: "1px solid rgba(255,0,0, 0.3)",
          },
        },
        submitLabel: "Add Card",
        onSubmit,
      });
    } else {
      form = Finix.BankTokenForm("finix-form", {
        // show address fields in the form (default is false)
        showAddress: true,
        //show labels in the form (default is true)
        showLabels: true,
        // set custom labels for each field
        labels: {
          // Supported Fields: "name", "account_number", "bank_code", "account_type", "address_line1", "address_line2", "address_city", "address_state","address_region", "address_country", "address_postal_code"
          name: "Bank Account Name",
          account_number: "Bank Account Number",
        },
        // turn on or off placeholder text in the fields (default is true)
        showPlaceholders: true,
        // set custom placeholders for each field, you can specify them here
        placeholders: {
          // Supported Fields: "name", "account_number", "bank_code", "account_type", "address_line1", "address_line2", "address_city", "address_state","address_region", "address_country", "address_postal_code"
          name: "Bank Account Name",
          account_number: "Bank Account Number",
        },
        // hide specific fields that you do not need
        hideFields: [
          // Supported Fields: "address_line1", "address_line2", "address_city", "address_region", "address_country", "address_postal_code", "address_country"
          // "address_line1",
          // "address_line2",
          // "address_city",
          // "address_region",
          //"address_state",
          // "address_country",
        ],
        // require any specific fields that are not required by default, you can specify them here
        requiredFields: [
          // Supported Fields: "address_line1", "address_line2", "address_city", "address_state","address_region", "address_country", "address_postal_code"
          "address_line1",
          "address_city",
          "address_region",
          "address_state",
          "address_country",
          "address_postal_code",
        ],
        // if you want to require a field, but not hide input error messages (default is false)
        hideErrorMessages: false,
        // set custom error messages for each field if you are showing error messages
        errorMessages: {
          // Supported Fields: "name", "account_number", "bank_code", "account_type", "address_line1", "address_line2", "address_city", "address_state","address_region", "address_country", "address_postal_code"
          name: "Please enter a valid name",
          account_number: "Please enter a valid Account Number",
        },
        // custom styles for the form inputs (optional but recommended)
        styles: {
          // default styling for all fields
          default: {
            color: "#000",
            border: "1px solid #CCCDCF",
            borderRadius: "8px",
            padding: "8px 16px",
            fontFamily: "Helvetica",
            fontSize: "16px",
            boxShadow:
              "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 2px 4px rgba(0, 0, 0, 0.03)",
          },
          // specific styling if the field is valid
          success: {
            // color: "#5cb85c",
          },
          // specific styling if the field has errors
          error: {
            // color: "#d9534f",
            border: "1px solid rgba(255,0,0, 0.3)",
          },
        },
        submitLabel: "Add Bank Account",
        onSubmit,
      });
    }
  }, []);

  return (
    <div className="h-screen flex flex-col md:flex-row">
      {/* Left Block: Background Image with Blur */}
      <div
        className="w-full md:w-1/2 h-full bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${assets.splash})`,
          backgroundSize: "100% 100%", // Stretches the image
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="bg-white rounded-lg flex flex-wrap flex-row  items-center px-2 md:px-5 py-4 md:py-8 md:py-12 gap-4">
          <img
            className="h-[1.5rem] md:h-[3rem] w-[6rem] md:w-[10rem]"
            src={assets.logo}
            alt="Logo 1"
          />

          {/* Separator Image - Ensure it's responsive */}
          <img
            className="h-[1.2rem] md:h-[5rem]"
            src={seperator}
            alt="Separator"
          />

          <img
            className="h-[1.5rem] md:h-[3rem] w-[6rem] md:w-[10rem]"
            src={finixLogo}
            alt="Logo 2"
          />
        </div>
      </div>

      {/* Right Block: Finix Form (No Blur) */}
      <div className="w-full md:w-1/2 h-full flex flex-col px-4 bg-white">
        <label className="finix-header px-4 pt-4">{`${
          type === "card" ? "Add Credit/Debit Card" : "Add Bank Account"
        }`}</label>
        <div
          id="finix-form"
          className="w-full px-6 py-2 bg-white h-[80vh] md:h-[100vh] overflow-y-auto"
        />
      </div>

      {loading && <Loader />}
    </div>
  );
};

export default TokenizationForm;
