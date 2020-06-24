<h1>Redux</h1>
Redux is a predictable state container for JavaScript applications. Redux divides the responsibilities of state management into a few separate units:

1) The store holds all your application state in a single object. (We’ll commonly refer to this object as the state tree.)
2) The store can be updated only with actions, an object describing an event.
3) Functions known as reducers specify how to transform application state. Reducers are functions that take the current state in the store and an action, then return the next state after applying any updates.

<h3>3 Principles</h3>
<ol>
  <li><strong>Single source of truth.</strong> Redux manages an entire application’s state in one object, inside one store.</li>
  <li><strong>State is read-only.</strong> Actions are the only way to initiate changes in application state. These actions don’t result in a mutation of the data in the store. Instead, each action results in a shiny, new instance of the state to replace the current one.</li>
  <li><strong>Changes are made with pure functions.</strong> Actions are received by reducers. It’s important that these reducers be pure functions. Pure functions are deterministic; they always produce the same output given the same inputs, and they don’t mutate any data in the process.</li>
</ol>

<h3>Actions</h3>
Actions are plain old JavaScript objects that represent an event in your application.

```
{
  type: 'CREATE_POST',
  payload: {
    body: 'All that is gold does not glitter'
  }
}
```

1) type — A string that represents the category of action being performed. By convention, this property is capitalized and uses underscores as delimiters.
2) payload — An object that provides the data necessary to perform the action. In your case, you only need one field: the contents of the message we want to post. The name “payload” is only a popular convention.

Actions have the advantage of serving as audits, which keep a historical record of everything happening in your application, including any data needed to complete a transaction. It’s hard to understate how valuable this is in maintaining a grasp on a complex application. 

Actions handle the what in this equation. They describe an event; they don’t know and don’t care what happens downstream.

<h3>Reducer</h3>
Reducers are functions responsible for updating your state in response to actions. They’re simple functions that take your current state and an action as arguments, and return the next state. Similar to all pure functions, they produce no side effects. They don’t affect the outside world in any way, and they’re referentially transparent. The same inputs will always yield the same return value.

More sizable applications frequently implement several reducer functions, each concerned with a different slice of the state tree. These reducers are combined, or composed, into a single “root reducer.” Reducers describe how to update state in response to an action, but they can’t modify state directly.

<h3>Store</h3>
In Redux, application state is stored in a single object. The store has a few main roles, which follow:
<ul>
  <li>Hold application state.</li>
  <li>Provide a way to access state.</li>
  <li>Provide a way to specify updates to state. The store requires an action be dispatched to modify state.</li>
  <li>Allow other entities to subscribe to updates (React components in this case). View bindings provided by react-redux will allow you to receive updates from the store and respond to them in your components.</li>
</ul>

<h3>Redux Architecture</h3>

![alt text](https://github.com/shakespete/redux/blob/dev/img/redux_arch.jpg)

<h3>react-redux</h3>
To connect Redux with React, you’ll use the React bindings from the react-redux package. Redux provides only the means to configure a store. react-redux bridges the gap between React and Redux by providing the ability to enhance a component, allowing it to read state from the store or dispatch actions. react-redux gives you two primary tools for connecting your Redux store to React:

<ol>
  <li><strong>Provider</strong> — A React component that you’ll render at the top of the React app. Any components rendered as children of Provider can be granted access to the Redux store.</li>
  <li><strong>connect</strong> — A function used as a bridge between React components and data from the Redux store.</li>
</ol>

Provider is a component that takes the store as a prop and wraps the top-level component in your app—in this case, App. Any child component rendered within Provider can access the Redux store, no matter how deeply it’s nested.

 <h3>mapStateToProps</h3>
 mapStateToProps function. Note that the name mapStateToProps is a convention, not a requirement. The name stuck for a reason: because it’s an effective descriptor of the role of this function. State refers to the data in the store, and props are what get passed to the connected component. Whatever you return from mapStateToProps will be passed to your component as props.