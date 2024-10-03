import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import NoteEditor from './components/NoteEditor';
import RealTimeUsers from './components/RealTimeUser';

const App: React.FC = () => {
  const noteId = 'note1'; // Hardcoded for simplicity
  const currentUser = 'User 1'; // Hardcoded for simplicity

  return (
    <Provider store={store}>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12 col-lg-8 mx-auto">
            <div className="card shadow-lg">
              <div className="card-header bg-primary text-white text-center">
                <h1 className="text-2xl md:text-3xl">Collaborative Note Editor</h1>
              </div>
              <div className="card-body p-4">
                <NoteEditor noteId={noteId} />
                <RealTimeUsers noteId={noteId} currentUser={currentUser} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default App;
