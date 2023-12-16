function separateBase64String(base64String) {
  const commaIndex = base64String.indexOf(",");

  if (commaIndex !== -1) {
    // const header = base64String.slice(0, commaIndex + 1);
    const body = base64String.slice(commaIndex + 1);

    return body;
  } else {
    // Handle jika string tidak mengandung koma
    return null;
  }
}

export default separateBase64String;
