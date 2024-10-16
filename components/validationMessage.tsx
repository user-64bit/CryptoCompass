export const validationMessage = (field: string) => {
  return field.length > 0 ? (
    <span className="text-green-500 font-semibold flex items-center gap-1 ml-1">
      ✓
    </span>
  ) : (
    <span className="text-red-500 font-semibold flex items-center gap-1 ml-1">
      ✗
    </span>
  );
};