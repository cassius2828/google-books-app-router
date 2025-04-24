const VolumeIdInput = ({params, handleChange}) => {
  return (
    <div>
    <label
      htmlFor="volumeId"
      className="block text-xs font-medium text-gray-700"
    >
      Volume ID
    </label>
    <input
      type="text"
      name="volumeId"
      id="volumeId"
      value={params.volumeId.value}
      onChange={handleChange}
      placeholder="e.g. F387XHkcflwC"
      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
    />
  </div>
  )
}
export default VolumeIdInput