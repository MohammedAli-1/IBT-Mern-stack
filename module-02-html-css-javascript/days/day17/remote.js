export default async function getData() {
  try{
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();
     return data;
  }
  catch(error){
    console.log(error)
  }
}