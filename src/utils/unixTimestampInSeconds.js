const unixTimestampInSeconds = () => {
  const unixTimestamp = new Date().getTime();
  let result = Math.floor(unixTimestamp / 1000);

  return result;
};

export default unixTimestampInSeconds;
