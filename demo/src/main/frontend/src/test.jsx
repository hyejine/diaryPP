import React from "react";
import { useForm, Controller } from "react-hook-form";
import {Checkbox} from "@mui/material";

const Test = (props) => {
  const {currnetUser} = props;
    const { handleSubmit, control, reset, register, errors } = useForm({
        defaultValues: {
          checkbox: false,
        }
      });
      const onSubmit = data => console.log(data);

      console.log(currnetUser);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <input defaultValue="test" {...register("example")} />
      {/* <input defaultValue="test" {...register("example")} />
      <div>
      <input {...register("exampleRequired", { required: true })} />
      {errors.exampleRequired && <p>This field is required</p>}
      </div> */}
      <Controller
        name="checkbox"
        control={control}
        rules={{ required: "This field is required<" }}
        render={({ field }) => <Checkbox {...field} />}
      />
      <input type="submit" />
    </form>
  );
};

export default Test;
