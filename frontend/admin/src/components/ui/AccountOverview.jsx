import React from "react";
import useUser from "../../hooks/useUser";
import usePartner from "../../hooks/usePartner";
import useFeedback from "../../hooks/useFeedback";

const AccountOverview = () => {
  const { accounts, bans } = useUser();
  const { partners } = usePartner();
  const { feedbacks } = useFeedback();

  return (
    <div className="container mx-auto p-4 bg-white rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Account Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="flex flex-col items-center">
          <div className="text-4xl mb-4">👤</div>
          <div className="text-lg font-medium">{accounts}</div>
          <div className="text-sm text-gray-500">Accounts</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-4xl mb-4">🚫</div>
          <div className="text-lg font-medium">{bans}</div>
          <div className="text-sm text-gray-500">Bans</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-4xl mb-4">🤝</div>
          <div className="text-lg font-medium">{partners}</div>
          <div className="text-sm text-gray-500">Partners</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-4xl mb-4">💬</div>
          <div className="text-lg font-medium">{feedbacks}</div>
          <div className="text-sm text-gray-500">Feedbacks</div>
        </div>
      </div>
    </div>
  );
};

export default AccountOverview;
