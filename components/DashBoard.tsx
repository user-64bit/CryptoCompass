"use client";

import { CreateGroup } from "./CreateGroup";
import { GroupBox } from "./GroupBox";

export const Dashboard = ({ groups }: { groups: any[] }) => {
  return (
    <div className="">
      <div className="flex justify-end pt-6">
        <CreateGroup />
      </div>
      {!groups.length ? (
        <EmptyDashboard />
      ) : (
        <div className="mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group, index) => (
              <GroupBox key={index} text={group.name} groupId={group.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const EmptyDashboard = () => (
  <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] py-2">
    <div className="opacity-20 hover:opacity-50 transition-opacity duration-300 ease-in-out">
      <h1 className="text-3xl font-bold">Welcome to Dashboard</h1>
      <p className="text-lg text-center mt-2">
        Click on Create Group to start.
        <br />
        (Currently we only support Ethereum)
      </p>
    </div>
  </div>
);
