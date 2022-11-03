import React from "react";
import { useForm } from "react-hook-form";

const Test = () => {
  const {register, handleSubmit,
    formState: { errors }, } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  }; // your form submit function which will invoke after successful validation

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input defaultValue="test" {...register("example")} />
      <div>
      <input {...register("exampleRequired", { required: true })} />
      {errors.exampleRequired && <p>This field is required</p>}
      </div>
      <input type="submit" />
    </form>
  );
};

export default Test;
