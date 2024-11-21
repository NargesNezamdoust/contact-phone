import { SearchIcon } from "./Icons";

function Search() {
  return (
    <div className="border rounded-full p-3 w-1/2">
      <label className="flex gap-2">
        <SearchIcon />
        <input type="text" placeholder="Search" className="bg-transparent" />
      </label>
    </div>
  );
}

export default Search;
