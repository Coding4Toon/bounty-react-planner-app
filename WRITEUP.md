# Write up 

This document provides details and explanation regarding custom widget added to the Planner app in the context of bounty. 
<br>
Website link : https://toon-bounty-planner-app.web.app/
<br>
<br>

## Custom Widget - The Motivational Kanban Widget

### Description

This motivational kanban widget enhances the Planner app by integrating motivational quotes seamlessly into the task management experience. When users add a new task to their Kanban board, the widget automatically displays a motivational quote relevant to productivity, success, or personal growth. These quotes serve as reminders of the importance of staying motivated and focused on achieving goals while using the Planner app.

Additionally, users have the flexibility to reset the Kanban board at any time for a fresh start.

The overall user experience is enriched by combining practical task management features with inspirational elements. Our users will appreciate the seamless integration of motivational quotes, creating a more enjoyable and fulfilling experience while using the Planner app.

### Benefit

By incorporating motivational quotes, users are inspired and motivated whenever they add a new task. The quotes act as a source of encouragement, promoting a positive mindset and fostering a productive work environment.

The combination of Kanban task management and motivational quotes makes the Planner app more engaging for users. The quotes provide an additional element of interest and inspiration, making the task management process enjoyable and rewarding.

Motivational quotes have a proven impact on boosting productivity. With this innovative widget, users are not only organizing their tasks effectively but also receiving regular doses of motivation, leading to increased productivity and a greater sense of accomplishment.


### Code

1) The code is based on Kanban app created in last campaign with some change to fit the Planner app and enhancement to bring personal creativity.

2) Code start with template provided 
#### `MyCustomWidget.js`

3) We import Draggable to be used for our Kanban
#### `import Draggable from 'react-draggable'`

4) We import Quote to be used for our motivational quotes
#### `import { quote } from '../quote'`

5) New state implemented to display motivational quote
#### `const [myQuote, setMyQuote] = useState(1)`

6) New state implemented to display kanban board
#### `const [board, setBoard] = useState([])`

7) An initial state is defined and displayed in the Kanban board : 
- 3 sections to be displayed - TO DO, IN PROGRESS, COMPLETED
- 1 default task - NEW TASK

8) NEW TASK card is defined as draggable. The logic will detect the user cursor to determine the column. 
Then card is removed from original position to new one.
#### `const [board, setBoard] = useState([])`

9) One button is implemented to add NEW TASK card in the TO DO list (column 0). 
#### `temp_boards[0].cards.push({id: new Date().getTime(),title: 'New Task',})`

10) At the same time, a random id from 1 to 20 (quote length) is selected to display the associated quote and author.
#### `randomIndex = Math.floor(Math.random() * quote.length) + 1`

11) One button is implemented to reset kanban board from task added and come back to initial state. 
#### `const [board, setBoard] = useState([])`


### Improvement

Kanban widget only support "Main" position. 


