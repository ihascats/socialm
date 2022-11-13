exports.fetchImage = async function (userInformation, setUserInformation) {
  if (!userInformation) return;
  fetch(`${process.env.REACT_APP_APILINK}/img/${await userInformation._id}`)
    //                         vvvv
    .then((response) => response.blob())
    .then((imageBlob) => {
      // Then create a local URL for that image and print it
      const imageObjectURL = URL.createObjectURL(imageBlob);
      const clone = structuredClone(userInformation);
      clone.profile_picture = imageObjectURL;
      setUserInformation(clone);
    });
};
