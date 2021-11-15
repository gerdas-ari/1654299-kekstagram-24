const getServerData = (onSuccess) => {
  fetch('https://24.javascript.pages.academy/kekstagram/data',
    {
      method: 'GET',
      credintials: 'same-origin',
    },
  )
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://24.javascript.pages.academy/kekstagram/',
    {
      method: 'POST',
      credentials: 'same-origin',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getServerData, sendData};
