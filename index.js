import { Select } from "./select/select";
import "./select/styles.scss"

const select = new Select("#select", {
  placeholder: "Select",
  selectedId: 2,
  data: [
    {id: 0, value: "React"},
    {id: 1, value: "Angular"},
    {id: 2, value: "Vue"},
    {id: 3, value: "React Native"},
    {id: 4, value: "Nest"},
    {id: 5, value: "Bootstrap"},
    {id: 6, value: "Tailwind CSS"},
    {id: 7, value: "JavaScript"}
  ],
  // onSelect(item) {
  //   console.log("Selected item:", item)
  // }
})

window.s = select