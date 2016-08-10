export default function translator(translations) {
  return ({ dispatch }) => next => action => {
    next(action);

    const translation = translations[action.type];

    if (translation) {
      if (Array.isArray(translation)) {
        return translation.map(dispatch);
      }

      dispatch(translation);
    }
  };
}
