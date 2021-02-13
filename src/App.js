import React from 'react';
import './App.scss';
import NotesList from './components/pages/home/NotesList/NotesList';
import NoteWrapper from './components/pages/note/NoteWrapper/NoteWrapper';
import Button from './components/common/Button/Button';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="main">
              <div className="container">
                <Switch>
                  <Route exact path="/">
                    <h1>Заметки</h1>
                    <Link to={'note/new'}>
                      <Button 
                        className="button"
                        value="Create new Note"
                      />
                    </Link>
                    <NotesList />
                  </Route>
                  <Route path="/note/:id">
                    <NoteWrapper />
                  </Route>
                  <Redirect to="/" />
                </Switch>
              </div>
          </div>
      </Router>
    </div>
  );
}

export default App;
