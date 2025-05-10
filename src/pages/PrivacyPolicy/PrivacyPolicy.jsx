import { useState } from "react";
import assets from "../../assets/assets";

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col w-full h-[100vh] bg-white rounded-[16px] p-8 overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center pb-6 border-b border-secondaryTwenty">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-secondaryTen flex items-center justify-center">
            <img src={assets.privacyPolicy} alt="Privacy" className="w-6 h-6" />
          </div>
          <h1 className="font-PJSbold text-[24px]">qick Privacy Policy</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 py-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <p className="font-PJSregular text-secondary mb-4">
              Last updated: 10/05/2025
            </p>
            <p className="font-PJSregular mb-6">
              At Qick, we take your privacy seriously. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your
              information when you use our mobile application.
            </p>
          </div>

          <div className="space-y-8">
            {/* Information Collection */}
            <div>
              <h2 className="font-PJSbold text-[20px] mb-3">
                1. Information We Collect
              </h2>
              <p className="font-PJSregular text-secondary mb-2">
                We may collect information about you in a variety of ways:
              </p>
              <ul className="list-disc pl-6 space-y-2 font-PJSregular text-secondary">
                <li>
                  Personal Data such as your name, email address, and phone
                  number that you voluntarily provide
                </li>
                <li>
                  Derivative Data such as IP address, browser type, and
                  operating system
                </li>
                <li>
                  Financial Data for payment processing (stored by our payment
                  processor)
                </li>
                <li>
                  Mobile Device Data including device ID, model, and
                  manufacturer
                </li>
              </ul>
            </div>

            {/* Use of Information */}
            <div>
              <h2 className="font-PJSbold text-[20px] mb-3">
                2. Use of Your Information
              </h2>
              <p className="font-PJSregular text-secondary mb-2">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2 font-PJSregular text-secondary">
                <li>Provide and maintain our service</li>
                <li>Notify you about changes to our service</li>
                <li>Allow you to participate in interactive features</li>
                <li>Provide customer support</li>
                <li>Gather analysis to improve our service</li>
                <li>Monitor usage of our service</li>
                <li>Detect and prevent technical issues</li>
              </ul>
            </div>

            {/* Data Sharing */}
            <div>
              <h2 className="font-PJSbold text-[20px] mb-3">
                3. Sharing Your Information
              </h2>
              <p className="font-PJSregular text-secondary">
                We may share your information in these situations:
              </p>
              <ul className="list-disc pl-6 space-y-2 font-PJSregular text-secondary mt-2">
                <li>
                  With service providers to monitor and analyze use of our
                  service
                </li>
                <li>For business transfers in case of merger or acquisition</li>
                <li>
                  With affiliates including our parent company and subsidiaries
                </li>
                <li>
                  With business partners to offer you certain products or
                  services
                </li>
                <li>With your consent for any other purpose disclosed by us</li>
              </ul>
            </div>

            {/* Data Security */}
            <div>
              <h2 className="font-PJSbold text-[20px] mb-3">
                4. Data Security
              </h2>
              <p className="font-PJSregular text-secondary">
                We use administrative, technical, and physical security measures
                to protect your personal information. However, no internet
                transmission or electronic storage is 100% secure.
              </p>
            </div>

            {/* Policy Changes */}
            <div>
              <h2 className="font-PJSbold text-[20px] mb-3">
                5. Changes to This Policy
              </h2>
              <p className="font-PJSregular text-secondary">
                We may update our Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the "Last updated" date.
              </p>
            </div>

            {/* Contact Us */}
            <div>
              <h2 className="font-PJSbold text-[20px] mb-3">6. Contact Us</h2>
              <p className="font-PJSregular text-secondary">
                If you have questions about this Privacy Policy, please contact
                us at:
              </p>
              <div className="flex gap-6 mt-4">
                <a
                  href="mailto:justin@qick.app"
                  className="flex items-center gap-2 font-PJSmedium"
                >
                  <img src={assets.mail} className="w-5 h-5" alt="Email" />
                  justin@qick.app
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
