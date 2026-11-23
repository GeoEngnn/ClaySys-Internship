// let n =prompt('Enter the number :');
// let sum=0;

// for (let i=1 ; i<=n ; i++){
//     sum+=i
// }
// console.log(sum); // loop varibales value are valid till the loop finishes.........


// let i = 1;
// while(i<=5) {
//     console.log('While');
//     i++;
// }

//  

// let s = 'Hello';
// let cnt= 0;

// for (let str in s){
//     cnt +=1
// }
// console.log('The lenght of word is',cnt);


// const student = {
//     name: "Geo",
//     age: 22,
//     course: "Computer Science",
//     college: "College of Engineering Poonjar",
//     isGraduated: true
// };

// for (let obj in student){
//     console.log(student[obj])
// }



// i=0
// while (i<=100){
//     console.log(i)
//     i+=2
// }


// for (let i=0 ; i<=100 ; i+=2){
//     console.log(i)
// }


let game_num = 12;

while (true){
    let guess_num = Number(prompt("Enter the guessss number:"))
    if (guess_num === game_num){
        alert('Guessed right! , Game over')
        break
    }
    else{
        alert('Guessed Wrong! , Try again')
    }
}