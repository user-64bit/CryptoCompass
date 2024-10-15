const GroupBox = ({
  text,
  onClick,
}: {
  text: string;
  onClick?: () => void;
}) => {
  return (
    <div
      className="group w-full h-48 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg shadow-lg overflow-hidden cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1"
      role="button"
      aria-label={`Group ${text}`}
      onClick={onClick}
    >
      <div className="w-full h-full flex items-center justify-center transition-opacity duration-300 group-hover:opacity-90">
        <span className="text-white text-xl font-bold">{text}</span>
      </div>
    </div>
  );
};

interface GroupProps {
  id: string;
  name: string;
  public_keys: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const GroupGrid = ({ groups }: { groups: GroupProps[] }) => (
  <div className="container mx-auto px-4 py-8">
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {groups.map((group, index) => (
        <GroupBox key={index} text={group.name} />
      ))}
    </div>
  </div>
);

export { GroupBox, GroupGrid };
