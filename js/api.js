const getServerData = (onSuccess) => {
  fetch('https://24.javascript.pages.academy/kekstagram/data',
    {
      method: 'GET',
    },
  )
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    });
};

const sendData = (onSuccess, onFail, body, closeForm) => {
  fetch(
    'https://24.javascript.pages.academy/kekstagram/',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    })
    .finally((closeForm()));
};

export {getServerData, sendData};
