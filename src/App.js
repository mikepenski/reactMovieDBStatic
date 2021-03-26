import React from 'react';
import './assets/css/style.css';
import './App.css';

import Header from './components/header/header.js';

//movies
import MovieData from './components/movies/moviedata.js';
import Movies from './components/movies/movies.js';

class App extends React.Component {


 /*

 constructor(props) {
    super(props)
    this.state = {
      inputValueState: '',
      movies : [],
      currentPageState: 1,
      pagevalue: 0,
      totalResultsState: '',
      currentOptionsState: [],
      totalPagesState: ''
    }
  }

 */

  state = {
    inputValueState: '',
    movies : MovieData,
    currentPageState: 1
  }
  

  componentDidMount(){

  }

  /*
* Order select 
*/

orderMovies(e) {
  const order = e.target.value;

  if (order === 'YEAR_OLD') {
    this.setState({
      movies: MovieData.sort((a, b) => a.year - b.year)
    })
  }

  if (order === 'YEAR_NEW') {
    this.setState({
      movies: MovieData.sort((a, b) => b.year - a.year)
    })
  }

  if (order === 'ASC') {
    
    this.setState({
      movies: MovieData.sort((a, b) => a.title.localeCompare(b.title))
    })
  }

  if (order === 'DESC') {
    this.setState({
      movies: MovieData.sort((a, b) => b.title.localeCompare(a.title))
    })
  }


}

  reset(e){
    this.setState({
      movies: []
    })
  }


  search(e){

    let inputValue = "";
    inputValue += e.target.value;
    inputValue.toLowerCase();

    this.setState({
      inputValueState: inputValue,
      movies: MovieData.filter(word => word.title.includes(inputValue))
    });

  }
  
  render(){

    return (

      <div className="App">

        <Header />

        <h3 className="mb-4 pt-6">Data from api</h3>
        
        <div className="container mb-4">

          <div className="row">

          <div className="col-md-8 col-lg-6 order-2 order-md-1">

              <div className="filterAPI">
                  <input type="text" value={this.state.inputValue} onChange={/*(e) => this.handleKeyDown(e),*/ (e) => this.search(e)} placeholder="Suchbegriff..." className="form-control w-100 w-md-50"  />
              </div>

            </div>

            <div className="col-md-4 col-lg-3 d-flex justify-content-md-end order-1 order-md-2 mb-2 mb-md-0">

              <select onChange={e => this.orderMovies(e)} className="form-control d-inline-block w-auto">
                <option value="YEAR_NEW">Neueste zuerst</option>
                <option value="YEAR_OLD">Ältere zuerst</option>
                <option value="ASC">A-Z</option>
                <option value="DESC">Z-A</option>
               </select>

            </div>

          </div>

        </div>
        
        <div className="my-2">TotalResults: {this.state.totalResultsState}</div>

        <div className="my-2">Page: {this.state.currentPageState} / {this.state.totalPagesState}</div>

          <div className="row">

              <div className="col-4">

              <button className="btn btn-primary" onClick={e => this.reset()}>Clear</button>

              </div>

          </div>

       <div className="container">
         <hr className="my-4" />
       </div>

        <h3 className="mb-4">Data from js file</h3>

        <Movies data={this.state.movies} />
        {this.state.movies.length === 0 && <p className="no-results">Leider keine Filme gefunden</p>}
       
      </div>
      );

  }

  
}


export default App;
