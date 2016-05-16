import React from 'react'
import cards from '../src'
import {Foo, Bar, StatefulCounter, StatelessCounter, TodoList} from './components'
import * as testSimple from './test/simple'
import * as testComponents from './test/components'
import * as advancedTestComponents from './test/advanced'

const demo = cards('demo')
const abc = cards('ABC')

abc.card(<Foo message="yo" />, 'here is  a simple example')

demo.card(
  <Foo message="hello"/>, {
  doc:
  `## markdown doc
  you can use markdown for card documentation
  - foo
  - bar
  `
})

demo.card(<Foo message="hello world"/>)

demo.card(<Bar/>, {title: 'a bar card'})

demo.card(<StatefulCounter value={42}/>, {
  doc:
  `## Counter

  This is a stateful counter. If you change the value prop
  in the source file it will not update because the new prop will be ignored
  and instead the component local state is rendered.

  Implement *componentWillReceiveProps* and override the component local state
  if you want this to work as expected.`
})

demo.card(
  (state) =>
    <StatelessCounter
      value={state.get()}
      inc={() => state.update(x => x + 1)}
      dec={() => state.update(x => x - 1)}/>,
{
  init: 23,
  inspect: true,
  doc:
  `## Stateless Counter
  This example shows how to manage state when you have a stateless
  component. The card can also dump the current state as JSON if
  you set the *inspect* flag to true.`
})

demo.card(
  (state) =>
    <StatelessCounter
      value={state.get()}
      inc={() => state.update(x => x + 1)}
      dec={() => state.update(x => x - 1)}/>,
{
  init: 1337,
  history:true,
  doc:
  `## Undo/Redo
  Same example as before but with undo/redo controls added by the card.`
})

demo.card(
  (state) =>
    <TodoList items={state.get()}
      onSubmit={(text) => state.update(items => [...items, {text, done: false}])}
      onToggleItem={(index) => state.update(items => [
        ...items.slice(0, index),
        {...items[index], done: !items[index].done},
        ...items.slice(index + 1)
      ])}/>,
{
  init: [],
  history: true,
  inspect: true,
  doc:
  `## TodoList
  A simple todo list showing history and inspect feature
  with a little more interesting model than just a simple number.`
})

demo.markdown(`
# a markdown card
this is a simple markdown card
- lorem
- ipsum
`)

demo.test(testSimple, {title:'simple tests'})

demo.test(testComponents, {
  doc:
  `## component tests
  Here you can see the results of some component tests.`
})

demo.test(advancedTestComponents, { title: 'advanced component tests' })
