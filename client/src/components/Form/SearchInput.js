import React from 'react'
import { useSearch } from '../../context/search';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const SearchInput = () => {
  const [values, setValues] = useSearch()
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="searchdiv">
      <form
        className="d-flex search-form"
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          className="form-control me-2 search-bar"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="btn btn-outline-success search-button" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
