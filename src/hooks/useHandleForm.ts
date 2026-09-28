import { useRef } from "react";

const useHandleForm = () => {
  const form = useRef<HTMLFormElement>(null);
  const name = useRef<HTMLInputElement>(null);
  const age = useRef<HTMLInputElement>(null);
  const male = useRef<HTMLInputElement>(null);
  const female = useRef<HTMLInputElement>(null);
  const newsSubscribe = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const data = {
      name: name.current?.value || "",
      age: age.current?.value || "",
      gender: male.current?.checked ? "男性" : female.current?.checked ? "女性" : "",
      subscribe: newsSubscribe.current?.checked || "",
    };

    console.log(data);

    form.current.reset();
  };

  return { form, name, age, male, female, newsSubscribe, handleSubmit };
};

export default useHandleForm;
