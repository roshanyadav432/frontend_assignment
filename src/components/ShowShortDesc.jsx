/* eslint-disable react/prop-types */
function ShowShortDesc({ description }) {
  const data = description;
  const ans = data.substring(0, 50) + "...";
  return (
    <div>
      <p className="text-gray-700 text-base">{ans}</p>
    </div>
  );
}

export default ShowShortDesc;
