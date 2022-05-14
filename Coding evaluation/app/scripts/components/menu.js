/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 *
 */
import React from "react";
import data from "../../../server/data";

//I am applying for react role so did not use nodejs to write api and used mock data to implement the functionality
class Menu extends React.Component {
  /**
   * Main constructor for the Menu Class
   * @memberof Menu
   */
  constructor() {
    super();
    this.state = {
      showingSearch: false,
      filterSearchList: [],
      searchValue: "",
      showError: false,
    };
  }

  /**
   * Shows or hides the search container
   * @memberof Menu
   * @param e [Object] - the event from a click handler
   */
  showSearchContainer(e) {
    e.preventDefault();
    this.setState({
      showingSearch: !this.state.showingSearch,
    });
  }

  /**
   * Calls upon search change
   * @memberof Menu
   * @param e [Object] - the event from a text change handler
   */
  onSearch(e) {
    // Start Here
    // ...
    const filterList = data.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    this.setState({
      filterSearchList: filterList,
      searchValue: e.target.value,
      showError: filterList.length > 0 ? false : true,
    });
  }

  //to clear the filtered list and searchValue
  onClose() {
    this.setState({
      filterSearchList: [],
      searchValue: "",
      showError: false,
    });
  }

  /**
   * Renders the default app in the window, we have assigned this to an element called root.
   *
   * @returns JSX
   * @memberof App
   */
  render() {
    return (
      <header className="menu">
        <div className="menu-container">
          <div className="menu-holder">
            <h1>ELC</h1>
            <nav>
              <a href="#" className="nav-item">
                HOLIDAY
              </a>
              <a href="#" className="nav-item">
                WHAT'S NEW
              </a>
              <a href="#" className="nav-item">
                PRODUCTS
              </a>
              <a href="#" className="nav-item">
                BESTSELLERS
              </a>
              <a href="#" className="nav-item">
                GOODBYES
              </a>
              <a href="#" className="nav-item">
                STORES
              </a>
              <a href="#" className="nav-item">
                INSPIRATION
              </a>

              <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                <i className="material-icons search">search</i>
              </a>
            </nav>
          </div>
        </div>
        <div
          className={
            (this.state.showingSearch ? "showing " : "") + "search-container"
          }
        >
          <input
            type="text"
            onChange={(e) => this.onSearch(e)}
            value={this.state.searchValue}
          />
          <a href="#" onClick={(e) => this.showSearchContainer(e)}>
            <i className="material-icons close" onClick={() => this.onClose()}>
              close
            </i>
          </a>
        </div>

        <div className="filtered-container">
          {this.state.filterSearchList.map((item) => (
            <div className="filtered-list" key={item._id}>
              <img src={item.picture} width="100" height="150" />
              <div>
                <div className="filtered-name">{item.name}</div>
                <p className="filtered-price">{`Price: ${item.price}`}</p>
                <p className="filtered-description">{`Description: ${item.about}`}</p>
                {item.tags.map((tag, index) => (
                  <span className="filtered-tag" key={index}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {this.state.showError && (
          <div className="filtered-error">
            No results found please search with other text
          </div>
        )}
      </header>
    );
  }
}

// Export out the React Component
module.exports = Menu;
