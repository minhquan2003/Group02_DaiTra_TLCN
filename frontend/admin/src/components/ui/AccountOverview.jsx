import React from "react";
import useUser from "../../hooks/useUser";
import usePartner from "../../hooks/usePartner";
import useFeedback from "../../hooks/useFeedback";
import { HiOutlineUserGroup } from "react-icons/hi2";
import {
  AiOutlineUsergroupDelete,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import { VscFeedback } from "react-icons/vsc";

const AccountOverview = () => {
  const { accounts, bans } = useUser();
  const { partners } = usePartner();
  const { feedbackTotal } = useFeedback(); // Sử dụng feedbackTotal thay vì feedbacks

  return (
    <div className="container mx-auto p-4 bg-white rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Account Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="flex flex-col items-center border-r border-gray-300 pr-4">
          <div className="text-4xl mb-4 text-blue-500 bg-blue-100 p-1 rounded-lg">
            <HiOutlineUserGroup />
          </div>
          <div className="flex text-center items-center space-x-6">
            <div className="text-lg font-medium text-gray-700">{accounts}</div>
            <div className="text-sm text-gray-500">Accounts</div>
          </div>
        </div>
        <div className="flex flex-col items-center border-r border-gray-300 pr-4">
          <div className="text-4xl mb-4 text-red-600 bg-red-100 p-1 rounded-lg">
            <AiOutlineUsergroupDelete />
          </div>
          <div className="flex text-center items-center space-x-6">
            <div className="text-lg font-medium">{bans}</div>
            <div className="text-sm text-gray-500">Bans</div>
          </div>
        </div>
        <div className="flex flex-col items-center border-r border-gray-300 pr-4">
          <div className="text-4xl mb-4 text-green-500 bg-green-100 p-1 rounded-lg">
            <AiOutlineUsergroupAdd />
          </div>
          <div className="flex text-center items-center space-x-6">
            <div className="text-lg font-medium">{partners}</div>
            <div className="text-sm text-gray-500">Partners</div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-4xl mb-4 text-orange-500 bg-orange-100 p-1 rounded-lg">
            <VscFeedback />
          </div>
          <div className="flex text-center items-center space-x-6">
            <div className="text-lg font-medium">{feedbackTotal}</div>
            <div className="text-sm text-gray-500">Feedbacks</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountOverview;
