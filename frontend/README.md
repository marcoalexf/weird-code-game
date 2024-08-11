# Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


# FAQ
 - Why no frontend unit testing on the components?
	 - In my humble prespective, the value extracted from such tests is not worth it. We should not blindly write tests for the sake of having an arbitrary "coverage" number close to another arbitrary value. Tests need to have meaning and inspire confidence. They also should have a good balance between value and maintainability. Writing a test that evaluates if a component is green after a certain api call might seem useful but not only the visual parts of the UI are volatile by nature and as such, the maintainability of such items is questioned, but also it might sometimes prove a lot difficult to test for. This case of a simple color might not but imagine testing a calendar with drag and drop functionality that makes api calls on drop? If we do have a component library then sure, we can test it but overall molecules (components with business logic and/or api calls) should be left to E2E testing.
- Why not use a component library?
	- They add a lot a unecessary boilerplate and configuration, taking precisous time to do the exercise. The goal of the exercise was not to see how pretty can something be. If it was a finalized design would need to be provided.
- Why use mongodb?
	- Great for prototyping, and has it's real world uses too. Could as easily use a relational database (postgres, sql server, wtvr) that could do the same. Why not got non-relational if we do not have relations to think about? If the question that now the reader must have is: "What if in the future it..." and I'm going to stop you right there. In the future we might have 100k users per second too, does it mean we need to already put this in a fully scalable cloud? In the future we might have strict data control policies, should I also already buy servers to have an in-house infrastructure? Permature optimizations are bad and also put a lot of cognitive load that is unecessary. If the problem might arrise, it will be accounted for and a solution planned and implemented. What we should do is make code that is easy to adapt to future changes.
- Why not go for all the marks and do websockets?
	- Honestly speaking no time. Thinking about it though don't know if this would be the correct case for such a protocol. Yes it can be done, yes it works but is it really necessary? I can see it for the code generation part but... meh. The typical, textbook scenario for it would be a chat room or a multiplayer game of some sorts. All subjective of course :)