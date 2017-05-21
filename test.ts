// interface Person {
//     firstName: string;
//     lastName: string;
// }

// function Greeter(person: Person) {
//     return "Hello, " + person.firstName + " " + person.lastName;
// }

// var user = { firstName: "Jane", lastName: "User" };

// document.body.innerHTML = Greeter(user);

// let isMe: [string, number] = ['xxx', 0];
// console.log(isMe[0].substr(1));

// isMe[3] = 'mdv';
// console.log(isMe[3]);

// enum Color {Red, Green, Blue};
// let c: Color = Color[1];
// console.log(c);
// console.log(Color);
// interface labelledValue {
//     label: string;
// }
// let printLabel = (labelledObj: labelledValue):void => {
//     console.log(labelledObj.label);
// }
// let myObj = { size: 10, label: "size 10 object" };
// printLabel(myObj);

// interface searchFunc {
//     (src: string, sub: string): boolean;
// }

// let mySearch: searchFunc;
// mySearch = (srcb, sub) => {
//     let res = srcb.search(sub);
//     if (res === -1) {
//         console.log('false');
//         return false;
//     } else {
//         console.log('true');
//         return true;
//     }
// }
// mySearch('aaaa', 'a');

// class Greeter {
//     greeting: string;
//     constructor(message: string) {
//         this.greeting = message;
//     }
//     greet() {
//         return "Hello, " + this.greeting;
//     }
// }

// let greeter = new Greeter("world");
// console.log(greeter.greet())

// class People {
//     name: string;
//     work: string;
//     constructor(theName: string, theWork: string) {
//         this.name = theName;
//         this.work = theWork;
//     }
//     getWork() {
//         console.log(`${this.name} is ${this.work}`);
        
//     }
// }

// class Student extends People {
//     constructor(name: string) {
//         super(name);
//         this.work = "student";
//     }
//     getWork() {
//         console.log('extend');
//         super.getWork();
//     }
// }

// let sam = new Student("sam")
// sam.getWork()
// console.log(sam.work);

// class Employee {
//   private _fullName: string;
//   get fullName(): string {
//     return this._fullName;
//   }
//   set fullName(newName: string) {
//     if (true) {
//       this._fullName = newName;
//     }
//   }
// }

// let employee =new Employee();
// employee.fullName = "name";

// class Grid {
//     static origin = {x: 0, y: 0};
//     calculateDistanceFromOrigin(point: {x: number; y: number;}) {
//         let xDist = (point.x - Grid.origin.x);
//         let yDist = (point.y - Grid.origin.y);
//         return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
//     }
//     constructor (public scale: number) { }
// }

// let grid1 = new Grid(1.0);  // 1x scale
// let grid2 = new Grid(5.0);  // 5x scale

// console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
// console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));

// abstract class Department {

//     constructor(public name: string) {
//     }

//     printName(): void {
//         console.log('Department name: ' + this.name);
//     }

//     abstract printMeeting(): void; // 必须在派生类中实现
// }

// class AccountingDepartment extends Department {

//     constructor() {
//         super('Accounting and Auditing'); // constructors in derived classes must call super()
//     }

//     printMeeting(): void {
//         console.log('The Accounting Department meets each Monday at 10am.');
//     }

//     generateReports(): void {
//         console.log('Generating accounting reports...');
//     }
// }

// let department: Department; // ok to create a reference to an abstract type
// department = new Department(); // error: cannot create an instance of an abstract class
// department = new AccountingDepartment(); // ok to create and assign a non-abstract subclass
// department.printName();
// department.printMeeting();
// department.generateReports(); // error: method doesn't exist on declared abstract type

// let myAdd = (x: number, y: number): number => {
//     return x + y;
// }

function buildUser(firstName: string, lastName?: string) {
  if(lastName) {
    return firstName + " " +lastName;
  } else {
    return firstName;
  }
}