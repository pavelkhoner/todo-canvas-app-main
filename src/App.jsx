import React from "react";
import { headline1} from '@sberdevices/plasma-tokens';
import { Button} from '@sberdevices/plasma-ui';
import { DeviceThemeProvider } from '@sberdevices/plasma-ui/components/Device';
import {
  createSmartappDebugger,
  createAssistant,
} from "@sberdevices/assistant-client";

import "./App.css";
import DocumentStyle from '../src/components/GlobalStyle';

const initializeAssistant = (getState/*: any*/) => {
  if (process.env.NODE_ENV === "development") {
    return createSmartappDebugger({
      token: process.env.REACT_APP_TOKEN ?? "",
      initPhrase: `Запусти ${process.env.REACT_APP_SMARTAPP}`,
      getState,
    });
  }
  return createAssistant({ getState });
};



export class App extends React.Component {

  constructor(props) {
    super(props);
    console.log('constructor');

    this.state = {
      notes: [],
    }

    this.assistant = initializeAssistant(() => this.getStateForAssistant() );
    this.assistant.on("data", (event/*: any*/) => {
      console.log(`assistant.on(data)`, event);
      const { action } = event
      this.dispatchAssistantAction(action);
    });
    this.assistant.on("start", (event) => {
      console.log(`assistant.on(start)`, event);
    });

  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  getStateForAssistant () {
    console.log('getStateForAssistant: this.state:', this.state)
    const state = {
      item_selector: {
        items: this.state.notes.map(
          ({ id, title }, index) => ({
            number: index + 1,
            id,
            title,
          })
        ),
      },
    };
    console.log('getStateForAssistant: state:', state)
    return state;
  }

  dispatchAssistantAction (action) {
    console.log('dispatchAssistantAction', action);
    if (action) {
      switch (action.type) {
        case 'add_note':
          return this.add_note(action);

        case 'done_note':
          return this.done_note(action);

        case 'delete_note':
          return this.delete_note(action);

        default:
          throw new Error();
      }
    }
  }

  add_note (action) {
    console.log('add_note', action);
    this.setState({
      notes: [
        ...this.state.notes,
        {
          id:        Math.random().toString(36).substring(7),
          title:     action.note,
          completed: false,
        },
      ],
    })
  }

  done_note (action) {
    console.log('done_note', action);
    this.setState({
      notes: this.state.notes.map((note) =>
        (note.id === action.id)
        ? { ...note, completed: !note.completed }
        : note
      ),
    })
  }

  delete_note (action) {
    console.log('delete_note', action);
    this.setState({
      notes: this.state.notes.filter(({ id }) => id !== action.id),
    })
  }

  render() {
    console.log('render');
    return ( <DeviceThemeProvider>
      <div className="container-name">
<h1 style={headline1}>Hello Stranger!</h1>
          </div>
          <div className="container-main">



          </div>
          <div className="container-bud">
<Button text="Бросить кубик" size="l" view="warning" pin="square-square" />
<Button text="Инфо" size="l" view="primary" pin="square-square" />
          </div>
</DeviceThemeProvider>
      )
   
  }


}

