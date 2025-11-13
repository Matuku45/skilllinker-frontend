import React, { useState } from "react";
import { FaCheck, FaStar } from "react-icons/fa";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const plans = [
    {
      name: "Free",
      price: { monthly: 0, annual: 0 },
      description: "Perfect for getting started",
      features: [
        "Basic profile creation",
        "Browse opportunities",
        "Limited applications per month",
        "Basic support",
        "Community access"
      ],
      buttonText: "Get Started",
      popular: false
    },
    {
      name: "Professional",
      price: { monthly: 299, annual: 2990 },
      description: "For serious practitioners",
      features: [
        "Everything in Free",
        "Unlimited applications",
        "Advanced matching",
        "Priority support",
        "Profile analytics",
        "Direct messaging",
        "Project tracking"
      ],
      buttonText: "Start Professional",
      popular: true
    },
    {
      name: "Enterprise",
      price: { monthly: 999, annual: 9990 },
      description: "For large SDPs and organizations",
      features: [
        "Everything in Professional",
        "White-label solution",
        "API access",
        "Custom integrations",
        "Dedicated account manager",
        "Advanced analytics",
        "Bulk user management",
        "Custom reporting"
      ],
      buttonText: "Contact Sales",
      popular: false
    }
  ];

  const faqs = [
    {
      question: "Can I change my plan anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any charges."
    },
    {
      question: "Is there a setup fee?",
      answer: "No, there's no setup fee for any of our plans. You only pay the monthly or annual subscription fee."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact us for a full refund."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, and bank transfers. Enterprise customers can also opt for invoicing."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 text-blue-600">
          Choose Your Plan
        </h1>
        <p className="text-lg text-gray-700 mb-12 text-center">
          Select the perfect plan for your skills development needs. All plans include our core features with different levels of access and support.
        </p>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white p-1 rounded-lg shadow-md">
            <button
              className={`px-6 py-2 rounded-md font-semibold transition-colors ${
                billingCycle === "monthly"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:text-blue-500"
              }`}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly
            </button>
            <button
              className={`px-6 py-2 rounded-md font-semibold transition-colors ${
                billingCycle === "annual"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:text-blue-500"
              }`}
              onClick={() => setBillingCycle("annual")}
            >
              Annual
              <span className="ml-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Save 17%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-lg p-8 relative ${
                plan.popular ? "border-2 border-blue-500 transform scale-105" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                    <FaStar className="mr-1" />
                    Most Popular
                  </span>
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-6">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">
                  R{plan.price[billingCycle]}
                </span>
                {plan.price[billingCycle] > 0 && (
                  <span className="text-gray-600">
                    /{billingCycle === "monthly" ? "month" : "year"}
                  </span>
                )}
              </div>
              <ul className="mb-8 space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <FaCheck className="text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  plan.popular
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-gradient-to-r from-blue-500 to-green-500 text-white p-10 rounded-xl">
          <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
          <p className="mb-6 text-lg">
            Have specific requirements? Let's discuss a tailored plan for your organization.
          </p>
          <button className="bg-white text-blue-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Contact Our Sales Team
          </button>
        </section>
      </div>
    </div>
  );
};

export default Pricing;
