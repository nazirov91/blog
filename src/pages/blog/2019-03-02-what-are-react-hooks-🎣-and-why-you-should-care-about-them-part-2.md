---
templateKey: blog-post
title: "What are React Hooks \U0001F3A3 and why you should care about them (Part 2)"
date: '2019-04-01T03:15:21+05:00'
description: (~10mins)
tags:
  - React
  - React Hooks
---
# What are React Hooks 🎣 and why you should care about them (Part 2)
(~10mins)

![header](https://drive.google.com/uc?export=view&id=1l-FHunuytQsURlqEmDz7AO6OdHA-VTJL)

* Required version of React: 16.8+

1. [Part 1](https://blog.sardor.io/blog/2019-03-02-what-are-react-hooks-%F0%9F%8E%A3-and-why-you-should-care-about-them-part-1/)
2. Part 2 (This article)

### Outline
1. Context Hook
2. Custom Hooks
3. Important Rules with Hooks
4. Sample application

---
In the first part of the blog, we discussed the main concepts of React Hooks and the reasons for using them. We compared the traditional ways of creating components and the new ways with hooks. In the second part, we will continue exploring the the different types of hooks, learn about the important rules and create a sample application. We have a lot to cover. Let's get started!

## Context Hook

### What is a context?
First of all, what is a context in React?

**Context** is a way to share global data across components without passing props. Usually, data in React application is passed from parent to child through props. Sometimes we have some data that should be delivered to a component deep inside the component tree. It is tedious to manually pass the same data over and over again through all components. Instead, we can create a central store that can be inserted into any component, just like in Redux.

How about we see an example code without Context API and identify the need for using it.

Let's say there is a banana 🍌 plantation called "App" and it sets the prices for all bananas in the world. Before bananas reach the end customers, they need to go through wholesalers and supermarkets first. After that we can go to the stores and buy them. But since wholesalers and supermarkets need to add their profit margins in the process, the cost of the bananas go up.

### Without Context API
```js
// App.js
import React, { useState } from 'react';

const App = () => {
  const [bananaPrice, setBananaPrice] = useState(2); // Original price: $2
  return <Wholesaler price={bananaPrice}/>;
}

const Wholesaler = (props) => {
  const price = props.price + 2;
  return <Supermarket price={price}/>;
}

const Supermarket = (props) => {
  const price = props.price + 3;
  return <Customer price={price}/>;
}

const Customer = (props) => {
  return (
	<div>
		<p>Plantation price: $2</p>
		<p>Final price: ${props.price} 😧</p>
	</div>
  );
}
```

![header](https://drive.google.com/uc?export=view&id=1KV1kTZhzdwY0YsZ3HFgWUcny5WiZIPTF)

What if we want to buy the bananas straight from the plantation and avoid the middlemen?

![header](https://drive.google.com/uc?export=view&id=10nBYpb0xukAZqobJqqFYs7BCPRRtxoo7)


Now, the same code with Context API
### With Context API

```js
// App.js
import React, { useState } from 'react';

// First we need to create a Context
const BananaContext = React.createContext();

// Second we need to create a Provider Component
const BananaProvider = (props) => {
  const [bananaPrice, setBananaPrice] = useState(2); // Original price: $2
  return (
    <BananaContext.Provider value={bananaPrice}>
      {props.children}
    </BananaContext.Provider>
  );
}

const App = () => {
  return ( // Wrap the component in Provider, just like in Redux
    <BananaProvider>
      <Wholesaler/>
    </BananaProvider>
  );
}

const Wholesaler = () => {
  return <Supermarket/>;
}

const Supermarket = () => {
  return <Customer/>;
}

const Customer = () => {
  return (
    <BananaContext.Consumer>
      {(context) => (
        <div>
          <p>Plantation price: $2</p>
          <p>Final price: ${context} 😃</p>
        </div>
      )}
    </BananaContext.Consumer>
  );
}
```

![diagram](https://drive.google.com/uc?export=view&id=1nh-Co5DJpQLQPtMg8OflNAuvQ5dowei4)

### useContext()
So how can we use Context API with hooks? With **useContext**!
```js
import React, { useState, useContext } from 'react';

// First we need to create a Context
const BananaContext = React.createContext();

// Then we need to a Provider Component
const BananaProvider = (props) => {
  const [bananaPrice, setBananaPrice] = useState(2); // Original price: $2
  return (
    <BananaContext.Provider value={bananaPrice}>
      {props.children}
    </BananaContext.Provider>
  );
}

const App = () => {
  return ( // Wrap the component in Provider, just like in Redux
    <BananaProvider>
      <Wholesaler/>
    </BananaProvider>
  );
}

const Wholesaler = () => {
  return <Supermarket/>;
}

const Supermarket = () => {
  return <Customer/>;
}

const Customer = () => {
  const context = useContext(BananaContext);
  return (
    <div>
      <p>Plantation price: $2</p>
      <p>Final price: ${context} 😃</p>
    </div>
  );
}
```

![with-context-hook-happy](https://drive.google.com/uc?export=view&id=1nh-Co5DJpQLQPtMg8OflNAuvQ5dowei4)

🔴 I know you could remove the line where you add the price to the cost of the banana and still get $2 at the end. But that is not the point. The point is that you have to do the *props drilling* when you don't use Context. Incrementing the price while passing the the components is sort of the cost to do the props drilling.

## Custom Hooks

### Why?

Why would we want to create our own hooks?
Because of 1 reason - **it makes component logic more reusable**. 

- **Custom hook = Reusable logic**

### How?

How do we create a custom hook?
Since hooks are just JavaScript functions, we can create a custom hook by just making a function. 

- The only difference is that the **function name must start with the word - use**. For example, *useFunctionName*, *useHungerStatus* etc.

- **Custom hooks can call other hooks**

### Example without custom hook

Say we want to create an application with multiple **Stopwatch timers** on a single page. How would we do that?

This is what I mean by multiple timers:

![timer-with-custom-hook](https://drive.google.com/uc?export=view&id=1itadydNa1V697Ii5LBNLhVwNvFZo89Yb)

Here is the code that implements hooks but does not reuse the logic for the timers
```js
import React, { useEffect, useState } from 'react';

const App = () => {
  const [timerOneStatus, setTimerOneStatus] = useState(false);
  const [timerOneElapsed, setTimerOneElapsed] = useState(0);

  const [timerTwoStatus, setTimerTwoStatus] = useState(false);
  const [timerTwoElapsed, setTimerTwoElapsed] = useState(0);

  useEffect(() => {
    let intervalOne;
    if (timerOneStatus) {
      intervalOne = setInterval(
        () => setTimerOneElapsed(prevTimerOneElapsed => prevTimerOneElapsed + 0.1),
        100
      );
    }
    return () => clearInterval(intervalOne);
  }, [timerOneStatus]);

  useEffect(() => {
    let intervalTwo;
    if (timerTwoStatus) {
      intervalTwo = setInterval(
        () => setTimerTwoElapsed(prevtimerTwoElapsed => prevtimerTwoElapsed + 0.1),
        100
      );
    }
    return () => clearInterval(intervalTwo);
   }, [timerTwoStatus]);

  const handleReset1 = () => {
    setTimerOneStatus(false);
    setTimerOneElapsed(0);
  };

  const handleReset2 = () => {
    setTimerTwoStatus(false);
    setTimerTwoElapsed(0);
  };

  return (
    <div>
      <div>
        <h2>Stopwatch 1</h2>
        <h1>{timerOneElapsed.toFixed(1)} s</h1>
        <button onClick={() => setTimerOneStatus(!timerOneStatus)}>
          {timerOneStatus ? "Stop" : "Start"}</button>
        <button onClick={handleReset1}>Reset</button>
      </div>
      <div>
        <h2>Stopwatch 2</h2>
        <h1>{timerTwoElapsed.toFixed(1)} s</h1>
        <button onClick={() => setTimerTwoStatus(!timerTwoStatus)}>
          {timerTwoStatus ? "Stop" : "Start"}</button>
        <button onClick={handleReset2}>Reset</button>
      </div>
    </div>
  );
}
```

As we can see,  we are not DRY coding here. Logic for the timers need to repeated every time we want to create a new timer. Imagine if we had 10 timers on one page 😐

### Example with custom hook
Now what we could do is to separate the timer logic as a custom hook and use that one hook for creating any number of timers. Each timer would have its own state and action items. In the main component we use the custom hook just like *useState* or *useEffect* and destructure returned parameters from the hook.

```js
import React, { useEffect, useState } from 'react';

const App = () => {
  const [timerOneStatus, setTimerOneStatus, timerOneElapsed, resetTimerOne] = useTimer();
  const [timerTwoStatus, setTimerTwoStatus, timerTwoElapsed, resetTimerTwo] = useTimer();

  return (
    <div>
      <div>
        <h2>Stopwatch 1</h2>
        <h1>{timerOneElapsed.toFixed(1)} s</h1>
        <button onClick={() => setTimerOneStatus(!timerOneStatus)}>
          {timerOneStatus ? "Stop" : "Start"}</button>
        <button onClick={() => resetTimerOne()}>Reset</button>
      </div>
      <div>
        <h2>Stopwatch 2</h2>
        <h1>{timerTwoElapsed.toFixed(1)} s</h1>
        <button onClick={() => setTimerTwoStatus(!timerTwoStatus)}>
          {timerTwoStatus ? "Stop" : "Start"}</button>
        <button onClick={() => resetTimerTwo()}>Reset</button>
      </div>
    </div>
  );
}

const useTimer = () => {
  const [status, setStatus] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
      let interval;
      if (status) {
        interval = setInterval(() =>
          setElapsedTime(prevElapsedTime => prevElapsedTime + 0.1),
          100
        );
      }
      return () => clearInterval(interval);
    },[status]);

  const handleReset = () => {
    setStatus(false);
    setElapsedTime(0);
  };

  return [status, setStatus, elapsedTime, handleReset];
}
```

![timer-with-custom-hook](https://drive.google.com/uc?export=view&id=1rlfsnUS2bfMgbN43Vmw-g-0u095sZ1uJ)


In this case, we can place the hook in another file with other custom hooks and call it from anywhere in our project. Much cleaner and more reusable! 😃

## Rules with Hooks

Even though hooks are just functions, react team recommends to follow certain rules when using them. If you are lazy or just want to make sure you are following the rules automagically, you can install this [linter](https://www.npmjs.com/package/eslint-plugin-react-hooks). However, it is important that we have some common knowledge about the rules.

#### Rule 1 - Call hooks only at the top level
What does that mean?

It means we should not call hooks inside conditions, loops or nested functions. Rather use them at the top level of React functions.

#### Rule 2 - Hooks cannot be called from regular JavaScript functions. Call them from React functions
 
You can call hooks from the following functions:
- Custom hooks
- React function components

#### Rule 3 - Always start your custom hooks' name with the word 'use'



## Sample application

Now let us build an application that takes advantage of the most hooks we have covered so far.

We will be building an application called **Caturday** and it will fetch pictures of random cats on the internet and allow us to vote on the pictures. It will keep count of our likes and dislikes. We will also add a button that can turn our page into dark mode (just change the background color of the page for simplicity). 

Here is what the final result will look like: [Link to Demo](https://angry-leakey-f5fc57.netlify.com/) | [Github](https://github.com/nazirov91/caturday)

![caturday-demo](https://drive.google.com/uc?export=view&id=1AHeUTBtp4r6I2nPN0itmoFZgQUAlTSTx)

#### Step 1
We start building our app by running

`$ create-react-app caturday`

(If you don't have `create-react-app` module installed, please run `npx create-react-app caturday`)

After navigating into the project folder, run 

`$ npm install semantic-ui-react --save` 

to install the [Semantic UI](https://react.semantic-ui.com/usage) design tool that will make dealing with CSS much easier.


#### Step 2
Create 3 files in the `/src` folder: 
- **Caturday.js**, 
- **Caturday.css**
- **customHooks.js**

![enter image description here](https://drive.google.com/uc?export=view&id=1PCChvn44gTkcs2OG7y6HAk9GhYxQayAG)

 #### Step 3
Open the **Caturday.css** file and copy paste the following:
```css
@media only screen and (max-width: 600px) {
  #image-container {
    width: 100%;
    padding-top: 50px;
  }
}
@media only screen and (min-width: 600px) {
  #image-container {
    width: 50%;
    margin: auto;
    padding-top: 50px;
  }
}
.dark-mode {
  background-color: #3b3939;
}
.main-img {
  margin: auto;
  height: 30em !important;
}
.main-placeholder {
  height: 30em !important;
}
```

#### Step 5
We create 2 custom hooks to use in our application. Open **customHooks.js** file and add these hooks
```js
import { useState, useEffect } from "react";

export const useFetchImage = (url, likeCount, mehCount) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(j => j.json())
      .then(data => {
        console.log(JSON.stringify(data))
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, [likeCount, mehCount]);
  return { data, loading };
};

export const useDarkMode = () => {
  const [enabled, setEnabled] = useState(false);
  useEffect(
    () => {
      enabled
        ? document.body.classList.add("dark-mode")
        : document.body.classList.remove("dark-mode");
    },
    [enabled] // Only re-runs when 'enabled' changes
  );
  return [enabled, setEnabled]; // Return state and setter
};
```

#### Step 5
We start constructing the primary file `Caturday.js` by importing the css file and creating a container for the app. We will also define the state of component and a customs hooks that update the image url when Like/Dislike buttons are clicked.

```js
import React, { useState, useEffect } from "react";
import { Header, Segment, Image, Placeholder, Button, Container, Label, Icon, Checkbox } from "semantic-ui-react";
import './Caturday.css';

const Caturday = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [mehCount, setMehCount] = useState(0);
  const [darkMode, setDarkMode] = useDarkMode();
  const {data, loading} = useFetchImage(
    "https://api.thecatapi.com/v1/images/search",
    likeCount,
    mehCount
  );
  
  return (
	<Container id="main-container">
      <Segment raised>
        // Header
        // Dark Mode toggle
        // Image container
        // Like and Dislike buttons
      </Segment>
    </Container>
  );
};

export default Caturday;
```

#### Step 6
Now when we define each element of our `Caturday` component and put all pieces together, our **Caturday.js** file should look like this.

```js
import React, { useState, useEffect } from "react";
import { Header, Segment, Image, Placeholder, Button, Container, Label, Icon, Checkbox } from "semantic-ui-react";
import './Caturday.css';
import {useDarkMode, useFetchImage} from './customHooks';

const Caturday = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [mehCount, setMehCount] = useState(0);

  const [darkMode, setDarkMode] = useDarkMode();
  const { data, loading } = useFetchImage(
    "https://api.thecatapi.com/v1/images/search",
    likeCount,
    mehCount
  );

  return (
    <Container id="image-container">
      <Segment raised>
      <Header className="ui basic segment centered">Caturday</Header>
        <Segment>
          <Checkbox onChange={() => setDarkMode(!darkMode)} toggle floated='right' label="Dark mode"/>
        </Segment>
        {
          loading ?
          <Placeholder fluid><Placeholder.Image className="main-placeholder"/></Placeholder> :
          <Image src={data[0] ? data[0].url : ''} className="main-img"/>
        }
        <Segment textAlign="center">
          <Button as="div" labelPosition="right">
            <Button onClick={() => setLikeCount(likeCount+1)} icon color="green">
              <Icon name="heart" />
              Like
            </Button>
            <Label as="a" basic pointing="left">
              {likeCount}
            </Label>
          </Button>
          <Button as="div" labelPosition="left">
            <Label as="a" basic pointing="right">
              {mehCount}
            </Label>
            <Button onClick={() => setMehCount(mehCount+1)} color="red" icon>
              <Icon name="thumbs down" />
              Meh
            </Button>
          </Button>
        </Segment>
      </Segment>
    </Container>
  );
};

export default Caturday;
```

#### Step 7
Open the `App.js` file and replace the return content with `Caturday` component
```js
import React from 'react';
import Caturday from './Caturday';

const App = () => {
	return (
      <Caturday/>
    );
}

export default App;
```

## Conclusion
We have covered most of the concepts about hooks and that should be enough for you to get started. If you have a project that you are working on right now that  implements states and components in a traditional way, it is absolutely fine. No need to convert everything into hooks. However, when you are about to create new components, just give the hooks a try. They are 100% compatible with regular components with classes. You will be surprised how many lines of code you will be avoiding to accomplish the same functionalities. If you need more information about hooks, please checkout the [official documentation](https://reactjs.org/docs/hooks-intro.html) by Facebook.


#### Thanks for spending your time to read the article!

## PREVIOUS > [What are React Hooks 🎣 and why you should care about them (Part 1)](https://blog.sardor.io/blog/2019-03-02-what-are-react-hooks-%F0%9F%8E%A3-and-why-you-should-care-about-them-part-1/)
