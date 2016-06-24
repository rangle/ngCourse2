# Workshop 1 - Containers and Redux

Checkout the branch `workshop-1`.

```shell
$ git checkout -b workshop-1 origin/workshop-1
```

 You will get a copy of the application that has all of the components under the _*app/src/components*_ completed. For this part of the application, we will be focusing on creating the Containers for our application that will be used to handle listing tasks, adding tasks and editing existing tasks.

For now, we will not worry about authentication or consuming an API, and focus on creating containers for:

- Tasks
- Task Add
- Task Edit

The `Tasks Reducer` has been set up with an initial state and some hard-coded tasks for us to work with. For the first part of this workshop, we will be dealing with Redux actions in a synchronous way.

Other areas that will need to be completed:

- Task Reducer, handle the following actions:
  - TASKS_LOADED
  - TASK_ADDED
  - TASK_DELETED
  - TASK_UPDATED
  - TASK_MARKED
- Task action creators
  - Load Tasks
  - Add Task
  - Update Task
  - Mark Task
