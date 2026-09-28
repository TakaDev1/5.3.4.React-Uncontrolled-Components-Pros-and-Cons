import React from "react";
import useHandleForm from "../hooks/useHandleForm";

const Form = () => {
  const { form, name, age, male, female, newsSubscribe, handleSubmit } = useHandleForm();

  return (
    <>
      <form ref={form} onSubmit={handleSubmit}>
        <label htmlFor="name">
          名前:
          <input id="name" type="text" ref={name} />
        </label>
        <label htmlFor="age">
          年齢:
          <input id="age" type="number" ref={age} />
        </label>
        <fieldset>
          <legend>性別: </legend>
          <label htmlFor="male">
            男性:
            <input id="male" type="radio" name="gender" ref={male} />
          </label>
          <label htmlFor="female">
            女性:
            <input id="female" type="radio" name="gender" ref={female} />
          </label>
        </fieldset>
        <label htmlFor="newsSubscribe">
          ニュース購読:
          <input type="checkbox" ref={newsSubscribe} />
        </label>

        <button onClick={handleSubmit}>送信</button>
      </form>
    </>
  );
};

export default Form;
