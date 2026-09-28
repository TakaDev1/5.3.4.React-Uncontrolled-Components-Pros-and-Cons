import React from "react";
import useHandleForm from "../hooks/useHandleForm";

const Form = () => {
  const { form, name, age, male, female, newsSubscribe, handleSubmit } = useHandleForm();

  return (
    <>
      <form ref={form} onSubmit={handleSubmit} className="flex flex-col gap-5">
        <label htmlFor="name">
          名前:
          <input id="name" type="text" ref={name} className="border bg-gray-300 text-black" />
        </label>
        <label htmlFor="age">
          年齢:
          <input id="age" type="number" ref={age} className="border bg-gray-300 text-black" />
        </label>
        <fieldset className="space-x-10 py-3 w-1/2 mx-auto border">
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

        <button
          onClick={handleSubmit}
          className="bg-gray-500 text-white w-1/5 mx-auto py-1 rounded-full hover:opacity-80 cursor-pointer"
        >
          送信
        </button>
      </form>
    </>
  );
};

export default Form;
