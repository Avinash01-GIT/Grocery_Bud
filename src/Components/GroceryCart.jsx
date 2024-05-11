import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function GroceryCart() {
  const [data, setData] = useState("");
  const [localStoragedData, setLocalStorage] = useState(() => {
    const storedData = localStorage.getItem("data");
    return storedData ? JSON.parse(storedData) : [];
  });
  const [checkList, setCheckList] = useState(() =>
    Array(localStoragedData.length).fill(false)
  );

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(localStoragedData));
  }, [localStoragedData]);

  const searchbar = (e) => {
    setData(e.target.value);
  };

  function addItemToList() {
    if (data.trim() === "") {
      toast.error("Please provide a value", { position: "top-center" });
    } else {
      setLocalStorage([...localStoragedData, data]);
      setData("");
      toast.success("Item added to the list", { position: "top-center" });
    }
  }

  function deleteItem(index) {
    const newFilterData = localStoragedData.filter((_, idx) => idx !== index);
    setLocalStorage(newFilterData);
    toast.success("Item deleted", { position: "top-center" });
  }

  function toggleCheck(index) {
    setCheckList((prevCheckList) => {
      const newCheckList = [...prevCheckList];
      newCheckList[index] = !newCheckList[index];
      return newCheckList;
    });
  }

  return (
    <div className="app">
      <h2>Grocery Bud</h2>
      <div className="input-MainBox">
        <div className="input-box">
          <input type="text" onChange={searchbar} value={data} />
          <button className="additem" onClick={addItemToList}>
            Add item
          </button>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
          />
        </div>
        {localStoragedData.map((elem, index) => (
          <div className="text-box" key={index}>
            <div className="check-box">
              <input
                type="checkbox"
                checked={checkList[index]}
                onChange={() => toggleCheck(index)}
              />
              <p
                className="para"
                style={{
                  textDecoration: checkList[index] ? "line-through" : "none",
                }}
              >
                {elem}
              </p>
            </div>
            <button className="deleteItem" onClick={() => deleteItem(index)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GroceryCart;
