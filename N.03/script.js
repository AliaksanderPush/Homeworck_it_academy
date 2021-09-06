'use strict'
/*N.03 Домашнее задание ANKETA
Создать проект ANKETA. Спросить у пользователя:
фамилию, имя, отчество РАЗДЕЛЬНО (оператором prompt)
возраст в годах (оператором prompt)
пол (оператором confirm, например, "ваш пол - мужской?")
и вывести оператором alert анкету пользователя по примеру:

ваше ФИО: Иванов Иван Иванович
ваш возраст в годах: 20
ваш возраст в днях: 7300
через 5 лет вам будет: 25
ваш пол: мужской
вы на пенсии: нет
Должен быть контроль корректности вводимых пользователем данных (например, фамилия не должна быть пустой, возраст должен быть корректной цифрой и т.д.).
Оператор alert в коде должен использоваться ровно один раз. */

//___________________________________________________________________________________________________

const person = {
   name: '',
   surname: '',
   patronymic: '',
   age: '',
   sex: true,
   pensia: '',
   personName: function() {
      this.name = prompt('Введите Ваше имя', ''); 
      while (this.name == null || this.name == '') {
         this.name = prompt('Введите Ваше имя', ''); 
      }
   },
   personSurName: function() {
      this.surname = prompt('Введите Вашу фамилию', ''); 
      while (this.surname == null || this.surname == '') {
         this.surname = prompt('Введите Вашу фамилию', ''); 
      }
   },
   personPatronomic: function() {
      this.patronymic = prompt('Введите Ваше отчество', ''); 
      while (this.patronymic == null || this.patronymic == '') {
         this.patronymic = prompt('Введите Ваше отчество', ''); 
      }
   },
   personAge: function() {
      this.age = +prompt('Введите Ваш возраст', ''); 
      while (this.age == null || isNaN(this.age)) {
         this.age = +prompt('Введите Ваш  возраст', ''); 
      }
   },
   personSex: function() {
      this.sex = confirm('Ваш пол мужской?', '')
   },
   personCheckPencia: function(age, sex) {
   if (age >= 61 && sex) {
         this.sex;
         this.pensia = 'да';
      } else if (age <= 61 && sex) {
         this.sex;
         this.pensia = 'нет';
      } else  if (age <= 55 && !sex) {
         !this.sex;
         this.pensia = 'нет';
      } else if (age >= 55 && !sex) {
         !this.sex;
         this.pensia = 'да';
      }
   },
   personAnketa: function(name, surname, age, sex, status) {
      const anketa =   `ФИО : ${this.surname} ${this.name} ${this.patronymic}
                        Ваш возраст в годах : ${this.age}
                        Ваш возраст в днях : ${this.age*365}
                        Через 5 лет Вам будет: ${this.age+5}
                        Ваш пол : ${this.sex ? 'мужской':'женский'}  
                        Вы на пенсии: ${this.pensia}`;
   return  alert(anketa);
   } 
 
}
person.personName();
person.personSurName();
person.personPatronomic();
person.personAge();
person.personSex();
person.personCheckPencia(person.age, person.sex);
person.personAnketa(person.name, person.surname, person.age, person.personSex, person.pensia);


