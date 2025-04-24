const EitherSubjectInput = ({ params, handleChange }) => {
  return (
    <div>
      <label
        htmlFor="eitherSubject"
        className="block text-xs font-medium text-gray-700"
      >
        Either Subject
      </label>
      <input
        type="text"
        name="eitherSubject"
        id="eitherSubject"
        value={params.eitherSubject.value}
        onChange={handleChange}
        placeholder="Subject"
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};
export default EitherSubjectInput;
