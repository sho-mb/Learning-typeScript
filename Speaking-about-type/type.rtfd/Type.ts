//Talking About Types

// ———————
function squareOf(n) {
  return n * n
}
squareOf(2)     // evaluates to 4
squareOf('z')   // evaluates to NaN
// ———————

// This function work for numbers, If you pass string to it ,the result will be invalid. 

// ———————
function squareOf(n: number) {
  return n * n
}
squareOf(2)     // evaluates to 4
squareOf('z')   // Error TS2345: Argument of type '"z"' is not assignable to
                // parameter of type 'number'.
// ———————

// Give type of Number to Args, Now TS complain right away, if you give not a number 

// Without a type annotation, squareOf is unconstrained in its parameter, and you can pass any type of argument to it. 
// Once we constrain it, TypeScript goes to work for us verifying that every place we call our function, 
// we call it with a compatible argument. In this example the type of 2 is number, 
// which is assignable to squareOf’s annotation number, so TypeScript accepts our code; 
// but 'z' is a string, which is not assignable to number, so TypeScript complains.

// The ABCs of Types

// any

// any is The Godfather. 
// It shows as default, when the TS not known what type is.
// This is a last resort type and Should avoid this when possible.

// *ESlint usually not allow to use any as type for type safe.

// ————————

// unknown

// unknown can be good and bad on both side.
// If you have really no idea what type ahead, just use unknown instead of any.

// TypeScript won’t let you use an unknown type until you refine it by checking what it is

let a: unknown = 30         // unknown
let b = a === 123           // boolean
let c = a + 10              // Error TS2571: Object is of type 'unknown'.
if (typeof a === 'number') {
  let d = a + 10            // number
}

// You can use unknown to limit the type

// ————————

boolean

let a = true                // boolean
var b = false               // boolean
const c = true              // true
let d: boolean = true       // boolean
let e: true = true          // true
let f: true = false         // Error TS2322: Type 'false' is not assignable
                            // to type 'true'.

// ————————

// number

// number is the set of all numbers: integers, floats, positives, negatives, Infinity, NaN, and so on. 

let a = 1234                // number
var b = Infinity * 0.10     // number
const c = 5678              // 5678
let d = a < b               // boolean
let e: number = 100         // number
let f: 26.218 = 26.218      // 26.218
let g: 26.218 = 10          // Error TS2322: Type '10' is not assignable
                            // to type '26.218'.

// ————————

// bigint

// bigint lets you work with large integers without running into rounding errors.

let a = 1234n               // bigint
const b = 5678n             // 5678n
var c = a + b               // bigint
let d = a < 1235            // boolean
let e = 88.5n              // Error TS1353: A bigint literal must be an integer.
let f: bigint = 100n        // bigint
let g: 100n = 100n          // 100n
let h: bigint = 100         // Error TS2322: Type '100' is not assignable
                            // to type 'bigint'.

// ————————

// string

let a = 'hello'             // string
var b = 'billy'             // string
const c = '!'               // '!'
let d = a + ' ' + b + c     // string
let e: string = 'zoom'      // string
let f: 'john' = 'john'      // 'john'
let g: 'john' = 'zoe'       // Error TS2322: Type "zoe" is not assignable
                            // to type "john".


// ————————

// symbol

// are used as an alternative to string keys in objects and maps, 
// in places where you want to be extra sure that people are using the right well-known key 
// and didn’t accidentally set the key—think setting a default iterator for your object
//  (Symbol.iterator), or overriding at runtime whether or not your object
//  is an instance of something (Symbol.hasInstance).


let a = Symbol('a')         // symbol
let b: symbol = Symbol('b') // symbol
var c = a === b             // boolean
let d = a + 'x'             // Error TS2469: The '+' operator cannot be applied
                            // to type 'symbol'.

// ————————

// Objects

	let a = {
	  b: 'x'
	}            // {b: string}
	a.b          // string

	let b = {
	  c: {
 	   d: 'f'
	  }
	}            // {c: {d: string}}

// You can specify the type nested like this 

	let a: {b: number} = {
 	 	b:12
	}            // {b: number}


// Can be set default after object type define and use constructor to create new value 

let c: {
  firstName: string
  lastName: string
} = {
  firstName: 'john',
  lastName: 'barrowman'
}

class Person {
  constructor(
    public firstName: string,   // public is shorthand for
                                // this.firstName = firstName
    public lastName: string
  ) {}
}
c = new Person('matt', 'smith') // OK

// ————————

// Optional (?) isn’t the only modifier you can use when declaring object types.

// You can also mark fields as read-only


let user: {
  readonly firstName: string
} = {
  firstName: 'abby'
}

user.firstName // string
user.firstName =
  'abbey with an e' // Error TS2540: Cannot assign to 'firstName' because it
                    // is a read-only property.


// ————————

// Type aliases

type Age = number

type Person = {
  name: string
  age: Age
}

// Age is but a number

// Type can not be duplicate

type Color = 'red'
type Color = 'blue'

// But if you not use in same judgment, you can pull value 

type Color = 'red'

let x = Math.random() < .5

if (x) {
  type Color = 'blue'  // This shadows the Color declared above.
  let b: Color = 'blue'
} else {
  let c: Color = 'red'
}

// ————————

// Union and intersection types

type Cat = {name: string, purrs: boolean}
type Dog = {name: string, barks: boolean, wags: boolean}
type CatOrDogOrBoth = Cat | Dog  //union
type CatAndDog = Cat & Dog  //intersection

// Union

let a: CatOrDogOrBoth = {
  name: 'Bonkers',
  purrs: true
}

// Dog
a = {
  name: 'Domino',
  barks: true,
  wags: true
}

// Both
a = {
  name: 'Donkers',
  barks: true,
  purrs: true,
  wags: true
} 

// intersection 

let b: CatAndDog = {
  name: 'Domino',
  barks: true,
  purrs: true,
  wags: true
}


// If the return value could be 2 different type use Union 

function trueOrNull(isTrue: boolean) {
  if (isTrue) {
    return 'true'
  }
  return null
}


type Returns = string | null


// ————————

// Arrays¥

let a = [1, 2, 3]           // number[]
var b = ['a', 'b']          // string[]
let c: string[] = ['a']     // string[]
let d = [1, 'a']            // (string | number)[]
const e = [2, 'b']          // (string | number)[]

let f = ['red']
f.push('blue')
f.push(true)                // Error TS2345: Argument of type 'true' is not
                            // assignable to parameter of type 'string'.

let g = []                  // any[]
g.push(1)                   // number[]
g.push('red')               // (string | number)[]

let h: number[] = []        // number[]
h.push(1)                   // number[]
h.push('red')               // Error TS2345: Argument of type '"red"' is not
                            // assignable to parameter of type 'number'.

// You can put multiple Items into array but you must constant only one type in the array.


let d = [1, 'a']

d.map(_ => {
  if (typeof _ === 'number') {
    return _ * 3
  }
  return _.toUpperCase()
})

// If you Use typeOf , you can check array’s value each times


function buildArray() {
  let a = []                // any[]
  a.push(1)                 // number[]
  a.push('x')               // (string | number)[]
  return a
}

let myArray = buildArray()  // (string | number)[]
myArray.push(true)          // Error 2345: Argument of type 'true' is not
                            // assignable to parameter of type 'string | number'.


// Add more then 2 value will complains


// ————————

// Tuples

// Tuples are subtypes of array
// They’re a special way to type arrays that have fixed lengths,

//  Unlike most other types, tuples have to be explicitly typed when you declare them

let a: [number] = [1]

// A tuple of [first name, last name, birth year]
let b: [string, string, number] = ['malcolm', 'gladwell', 1963]

b = ['queen', 'elizabeth', 'ii', 1926]  // Error TS2322: Type 'string' is not
                                        // assignable to type 'number'.

// Tuples support optional elements too. Just like in object types, ? means “optional”:

// An array of train fares, which sometimes vary depending on direction
let trainFares: [number, number?][] = [
  [3.75],
  [8.25, 7.70],
  [10.50]
]

// Equivalently:
let moreTrainFares: ([number] | [number, number])[] = [
  // ...
]

// Tuples also support rest elements, which you can use to type tuples with minimum lengths:

// A list of strings with at least 1 element
let friends: [string, ...string[]] = ['Sara', 'Tali', 'Chloe', 'Claire']

// A heterogeneous list
let list: [number, boolean, ...string[]] = [1, false, 'a', 'b', 'c']

// Not only do tuple types safely encode heterogeneous lists, but they also capture the length of the list they type. 
// These features buy you significantly more safety than plain old arrays—use them often.

// ————————

// Read-only arrays and tuples

// TypeScript comes with a readonly array type out of the box, which you can use to create immutable arrays. 

//  Read-only arrays are just like regular arrays, but you can’t update them in place. 

// Available to use nonmutating methods .concat and .slice instead of mutating ones like .push and .splice


let as: readonly number[] = [1, 2, 3]     // readonly number[]
let bs: readonly number[] = as.concat(4)  // readonly number[]
let three = bs[2]                         // number
as[4] = 5            // Error TS2542: Index signature in type
                     // 'readonly number[]' only permits reading.
as.push(6)           // Error TS2339: Property 'push' does not
                     // exist on type 'readonly number[]'.


// Like Array, TypeScript comes with a couple of longer-form ways to declare read-only arrays and tuples:


type A = readonly string[]           // readonly string[]
type B = ReadonlyArray<string>       // readonly string[]
type C = Readonly<string[]>          // readonly string[]

type D = readonly [number, string]   // readonly [number, string]
type E = Readonly<[number, string]>  // readonly [number, string]


// You can use any type above 


// ————————

// null, undefined, void, and never

// There are 2 values that you can say “nothing” in the value 

// One is null, one is undefined

// They’re both special types, because in TypeScript the only thing of type undefined is the value undefined,
//  and the only thing of type null is the value null.

// undefines : something hasn’t been defined yet

// null : an absence of a value (like if you tried to compute a value, but ran into an error along the way)

// Void and never are specific

// Void : Obviously not return value (like console.log)

// Never : Function that never return any value (function that throw error or recursive)

// (a) A function that returns a number or null
function a(x:number) {
  if (x < 10) {
    return x
  }
  return null
}

// (b) A function that returns undefined
function b() {
  return undefined
}

// (c) A function that returns void
function c() {
  let a = 2 + 2
  let b = a * a
}

// (d) A function that returns never
function d() {
  throw TypeError('I always error')
}

// (e) Another function that returns never
function e() {
  while (true) {
    doSomething()
  }
}



// Enums

// They are unordered data structures that map keys to values.

// There are two kinds of enums: enums that map from strings to strings, 
// and enums that map from strings to numbers.


enum Language {
  English,
  Spanish,
  Russian
}


// To retrieve a value from an enum, you access it with either dot or bracket notation

let myFirstLanguage = Language.Russian      // Language
let mySecondLanguage = Language['English']  // Language


// Enum can be however it’s better to practice to explicitly assign a value to each enum member:

enum Language {
  English = 0,
  Spanish = 1
}

enum Language {
  Russian = 2
} 


// You can use computed values, and you don’t have to define all of them 
// (TypeScript will do its best to infer what’s missing):


enum Language {
  English = 100,
  Spanish = 200 + 300,
  Russian                 // TypeScript infers 501 (the next number after 500)
}


// You can also use string values for enums, or even mix string and number values:

enum Color {
  Red = '#c10000',
  Blue = '#007ac1',
  Pink = 0xc10050,        // A hexadecimal literal
  White = 255             // A decimal literal
}

let red = Color.Red       // Color
let pink = Color.Pink     // Color


// TypeScript lets you access enums both by value and by key for convenience, but this can get unsafe quickly:


let a = Color.Red         // Color
let b = Color.Green       // Error TS2339: Property 'Green' does not exist
                          // on type 'typeof Color'.
let c = Color[0]          // string
let d = Color[6]          // string (!!!)


// You shouldn’t be able to get Color[6], but TypeScript doesn’t stop you! 
// We can ask TypeScript to prevent this kind of unsafe access by opting into a safer subset 
// of enum behavior with const enum instead. Let’s rewrite our Language enum from earlier:

const enum Language {
  English,
  Spanish,
  Russian
}

// Accessing a valid enum key
let a = Language.English  // Language

// Accessing an invalid enum key
let b = Language.Tagalog  // Error TS2339: Property 'Tagalog' does not exist
                          // on type 'typeof Language'.

// Accessing a valid enum value
let c = Language[0]       // Error TS2476: A const enum member can only be
                          // accessed using a string literal.

// Accessing an invalid enum value
let d = Language[6]       // Error TS2476: A const enum member can only be
                          // accessed using a string literal.


// A const enum doesn’t let you do reverse lookups, and so behaves a lot like a regular JavaScript object

// ————————


const enum Flippable {
  Burger,
  Chair,
  Cup,
  Skateboard,
  Table
}

function flip(f: Flippable) {
  return 'flipped it'
}

flip(Flippable.Chair)     // 'flipped it'
flip(Flippable.Cup)       // 'flipped it'
flip(12)                  // 'flipped it' (!!!)

// This pattern Enum can be entered number as well

// Let’s see howe we use 


const enum Flippable {
  Burger = 'Burger',
  Chair = 'Chair',
  Cup = 'Cup',
  Skateboard = 'Skateboard',
  Table = 'Table'
}

function flip(f: Flippable) {
  return 'flipped it'
}

flip(Flippable.Chair)     // 'flipped it'
flip(Flippable.Cup)       // 'flipped it'
flip(12)                  // Error TS2345: Argument of type '12' is not
                          // assignable to parameter of type 'Flippable'.
flip('Hat')               // Error TS2345: Argument of type '"Hat"' is not
                          // assignable to parameter of type 'Flippable'.


// All it takes is one pesky numeric value in your enum to make the whole enum unsafe.

