const GroupBox = ({ text }: { text: string }) => {
  return (
    <div className="group w-full h-48 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg shadow-lg overflow-hidden cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1">
      <div className="w-full h-full flex items-center justify-center transition-opacity duration-300 group-hover:opacity-90">
        <span className="text-white text-xl font-bold">{text}</span>
      </div>
    </div>
  );
};

const GroupGrid = ({ groups }: {
  groups: any[],
}) => (
  <div className="container mx-auto px-4 py-8">
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">
      {groups.map((_, index) => (
        <GroupBox key={index} text={`Group ${index + 1}`} />
      ))}
    </div>
  </div>
);

export { GroupBox, GroupGrid };