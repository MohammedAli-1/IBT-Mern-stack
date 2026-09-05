// function CategoryBar({selectCategory}) {
//   const category = ["All", "chicken", "vegetarian", "beef"];
//   return (
//     <div>
//       {category.map((cat) => (
//         <button key={cat} onClick={() => selectCategory(cat)}>
//           {cat}
//         </button>
//       ))}
//     </div>
//   );
// }

// export default CategoryBar;

function CategoryBar({ selectCategory }) {
  const categories = ["All", "chicken", "vegetarian", "beef"];
  return (
    <div>
      {categories.map((cat) => {
        return (
          <button
            key={cat}
            onClick={() => {
              selectCategory(cat);
            }}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}

export default CategoryBar;
