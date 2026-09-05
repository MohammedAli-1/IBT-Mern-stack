// import { useState } from "react";
// function OrderForm() {
//   const [form, setForm] = useState({
//     firstName: "",
//     phone: "",
//     area: "bole",
//   });
//   function controlChange(e) {
//     const { name, value } = e.target;
//     setForm({
//       ...form,
//       [name]: value,
//     });
//   }
//   function onFormSubmit(e) {
//     e.preventDefault();
//     console.log(form);
//   }
//   return (
//     <>
//       <h2>Customer Information</h2>
//       <div className="OrderForm">
//         <form action="" method="post" onSubmit={onFormSubmit}>
//           <label htmlFor="name"> Name:</label>
//           <input
//             type="text"
//             name="firstName"
//             value={form.firstName}
//             id="name"
//             onChange={controlChange}
//           />
//           <br />
//           <br />
//           <label htmlFor="phone">Phone:</label>
//           <input
//             type="text"
//             name="phone"
//             value={form.phone}
//             onChange={controlChange}
//           />
//           <br />
//           <br />
//           <label htmlFor="area">Area</label>
//           <select
//             name="area"
//             id="location"
//             onChange={controlChange}
//             value={form.area}
//           >
//             <option value="dessie">Dessie</option>
//             <option value="bole">Bole</option>
//             <option value="kaliti">Kaliti</option>
//             <option value="cmc">CMC</option>
//           </select>
//           <br />
//           <br />
//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     </>
//   );
// }

// export default OrderForm;
import { useState } from "react";

function OrderForm() {
  const [form, setForm] = useState({
    FullName: "",
    phone: "",
    department: "computer Science",
    email: "",
  });
  function controlChange(e) {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  }
  function onFormSubmit(e) {
    e.preventDefault();
    const phone = form.phone;
    const pattern = /^\+251\d{9}$/;
    if (!pattern.test(phone)) {
      return;
    }
    alert(`your name is ${form.FullName}`);
    console.log(form);
  }
  return (
    <div className="OrderForm">
      <form action="" onSubmit={onFormSubmit}>
        <label>Full Name: </label>
        <input
          type="text"
          name="FullName"
          onChange={controlChange}
          value={form.FullName}
        />
        <br />
        <br />
        <label>phone: </label>
        <input
          type="text"
          name="phone"
          onChange={controlChange}
          value={form.phone}
        />
        <br />
        <br />
        <label>Email: </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={controlChange}
        />
        <br />
        <br />
        <label>Department: </label>
        <select
          type="text"
          name="department"
          value={form.department}
          onChange={controlChange}
        >
          <option value="computerScience">Computer Science</option>
          <option value="Information Sciences">Information Sciences</option>
          <option value="Information Technology">Information Technology</option>
          <option value="Software engneering">Software engneering</option>
        </select>
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default OrderForm;
