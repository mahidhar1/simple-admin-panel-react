import { useState } from 'react';
import { setConstantValue } from 'typescript';
import './App.css';
import Button from './components/Button';
import Container from './components/Container';
import Greet from './components/Greet';
import Heading from './components/Heading';
import Input from './components/Input';
import Oscar from './components/Oscar';
import Person from './components/Person';
import PersonList from './components/PersonList';
import Box from './components/state/Box';
import Counter from './components/state/Counter';
import Status from './components/Status';
import { ThemeContextProvider } from './context/ThemeContext';

function App() {

  const [value, setValue] = useState(""); 
  const namesList = [
    {
      first: "Bruce", 
      last: "Wayne", 
    }, 
    {
      first: "Mahidhar", 
      last: "Superman", 
    }, 
    {
      first: "hulk", 
      last: "Angry man"
    }
  ]
  
  return (
    <div className="App">
      <Greet
        name={"mahidhar"}
        messageCount={10}
        isLoggedIn={false}
      />

      <Person
        name={
          {
            first: "Mahidhar",
            last: "Nyayapati",
          }
        }
      />

      <PersonList names={namesList} />
      
      <Status status={"success"} />
      <Heading>Children of heading component as a string</Heading>
      <Oscar>
        <Heading>Oscar goes to Mahidhar</Heading>
      </Oscar>
      <Greet name="mahidhar" isLoggedIn={true} />

      <Button
        handleClick={
          (event, id) => {
            console.log("button clicked", event, id);
          }
        }
      />
      <p>{ value }</p>
      <Input
        value={value}
        handleChange={(event) => setValue(event.target.value)}
      />

      <Container styles={{ border: '1px solid black', padding: '1rem' }} />
      <Counter />

      <ThemeContextProvider>
        <Box />
      </ThemeContextProvider>

    </div>
  );
}

export default App;
