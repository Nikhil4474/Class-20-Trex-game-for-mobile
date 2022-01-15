// // Switch
// var day = 6
// var dayname
// switch(day){
//     case 1: 
//     dayname = "Sunday";
//     break
//     case 2:
//     dayname = "Monday"
//     break
//     case 3:
//     dayname = "Tuesday"
//     break
//     case 4:
//     dayname = "Wednesday"
//     break
//     case 5:
//     dayname = "Thursday"
//     break
//     case 6:
//     dayname = "Friday"
//     break
//     case 7:
//     dayname = "Saturday"
//     break
//     default:
//       dayname = "invalid"
// }

// console.log(dayname)
// function time(number){
//     var hours = Math.floor(number/60)
//     var minutes = number% 60
//     return `${hours}hr ${minutes}min`
//   }
//   console.log(time(240))

// DataTypes - Number, String, Boolean, Null
// var value = 345
// console.log(value)

// var string = "Javascript"
// var data = true
// var a = null
// null means that null is empty 
// typeOf used to check what type of datatype a var is
// console.log(typeof(a))

// scope of variable - local scope and global scope
// Local scope
// function add(n1,n2){
//   sum = n1+n2
//   return sum
// }
// // console.log(add(10,10))
// // console.log(add(20,10))
// // console.log(add(30,10))
// total = 100+add(10,10)
// console.log(total)
// Global scope
var value
function multi(n1,n2){
  value = n1*n2
}
multi(10,10,10)
console.log(value)