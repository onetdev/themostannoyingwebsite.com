const SliderVerification = () => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ].sort((a, b) => a.localeCompare(b));

  return (
    <form>
      <input type="range" min="0" max="2200" value="2020" />
      <select>
        {months.map((month) => (
          <option key={month}>{month}</option>
        ))}
      </select>
      <input type="range" min="1" max="31" value="31" />
    </form>
  );
};

export default SliderVerification;
