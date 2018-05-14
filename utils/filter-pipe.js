export const filterPipe = ({ initialData, isOnlineNow, isReachableNow, categoryName }) => {
  let data = false;
  if (isOnlineNow !== undefined)
    data = Object.keys(initialData)
    .filter((index) => initialData[index].general.open === isOnlineNow)
    .map((index) => initialData[index]);
  else if (!data) data = initialData;

  if (isReachableNow !== undefined)
    data = Object.keys(data)
    .filter((index) => data[index].general.reachable === isReachableNow)
    .map((index) => data[index]);
  else if (!data) data = initialData;

  if (categoryName !== undefined)
    data = Object.keys(data)
    .filter(index => data[index].categoriesArray.some(index => index === categoryName))
    .map(index => data[index]);
  else if (!data) data = initialData;

  return data;
};