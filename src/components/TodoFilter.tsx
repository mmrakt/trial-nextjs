function Filter({ value, onChange }) {
  const handleClick = (key, e) => {
    e.preventDefault();
    onChange(key);
  };
  return (
    <>
      <div>
        <a href="#" onClick={handleClick.bind(null, "ALL")}>
          ALL
        </a>
      </div>
      <div>
        <a href="#" onClick={handleClick.bind(null, "TODO")}>
          TODO
        </a>
      </div>
      <div>
        <a href="#" onClick={handleClick.bind(null, "DONE")}>
          DONE
        </a>
      </div>
    </>
  );
}

export default Filter;
