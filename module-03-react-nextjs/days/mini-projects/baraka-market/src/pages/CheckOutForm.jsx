import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useShema } from "../components/schema";
function CheckOutForm() {
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(useShema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      phone: "",
      area: "bole",
      note: "",
    },
  });
  async function placeOrder(data) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log("order Sucessfully");
    console.log(data);
  }
  const { errors, isSubmitting, touchedFields } = formState;
  return (
    <form onSubmit={handleSubmit(placeOrder)}>
      <label htmlFor="name">name:</label>
      <input type="text" id="name" {...register("name")} />
      {touchedFields && errors.name && <p>{errors.name.message}</p>}
      <br />
      <label htmlFor="phone">Phone:</label>
      <input type="tel" id="phone" {...register("phone")} />
      {touchedFields && errors.phone && <p>{errors.phone.message}</p>}
      <br />
      <label htmlFor="area">Area</label>
      <select id="area" {...register("area")}>
        <option value="bole">bole</option>
        <option value="summit">summit</option>
        <option value="gerji">gerji</option>
        <option value="CMC">CMC</option>
      </select>
      {touchedFields && errors.area && <p>{errors.area.message}</p>}
      <br />
      <label htmlFor="note">Desripton:</label>
      <textarea id="note" {...register("note")} />
      <br />
      <button type="submit" disabled={isSubmitting}>
        Place Order
      </button>
    </form>
  );
}

export default CheckOutForm;
