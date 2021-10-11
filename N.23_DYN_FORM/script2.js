"use strict"

 var formDef1=
[
  {label:'Название сайта:',kind:'longtext',name:'sitename'},
  {label:'URL сайта:',kind:'longtext',name:'siteurl'},
  {label:'Посетителей в сутки:',kind:'number',name:'visitors'},
  {label:'E-mail для связи:',kind:'shorttext',name:'email'},
  {label:'Рубрика каталога:',kind:'combo',name:'division',
    variants:[{text:'здоровье',value:1},{text:'домашний уют',value:2},{text:'бытовая техника',value:3}]},
  {label:'Размещение:',kind:'radio',name:'payment',
    variants:[{text:'бесплатное',value:1},{text:'платное',value:2},{text:'VIP',value:3}]},
  {label:'Разрешить отзывы:',kind:'check',name:'votes'},
  {label:'Описание сайта:',kind:'memo',name:'description'},
  {caption:'Опубликовать',kind:'submit'},
];

var formDef2=
[
  {label:'Фамилия:',kind:'longtext',name:'lastname'},
  {label:'Имя:',kind:'longtext',name:'firstname'},
  {label:'Отчество:',kind:'longtext',name:'secondname'},
  {label:'Возраст:',kind:'number',name:'age'},
  {caption:'Зарегистрироваться',kind:'submit'},
];



  function dyn_form(tagForm, arr) {
    const hr = document.createElement('hr');
    const div = document.createElement('div');
          div.className = 'parent';
 arr.forEach(elem => {
  if (elem.kind === 'longtext') {
     const label = document.createElement('label');
           label.innerHTML = elem.label;
     const wrap = document.createElement('div');
           wrap.className = 'item_form';
     const inpText = document.createElement('input');
           inpText.type = 'text';
           inpText.name = elem.name;
           inpText.className = 'inp';
           label.append(inpText);
           wrap.append(label);
           div.append(wrap);
          
  }

  if (elem.kind === 'number') {
     const label = document.createElement('label');
           label.innerHTML = elem.label;
     const wrap = document.createElement('div');
           wrap.className = 'item_form';
     const inpNumb = document.createElement('input'); 
           inpNumb.type = 'number';
           inpNumb.name = elem.name;
           inpNumb.className = 'inp';
           label.append(inpNumb);
           wrap.append(label);
           div.append(wrap);
             
  }
    
   if (elem.kind === 'shorttext') {
     const label = document.createElement('label');
           label.innerHTML = elem.label;
     const wrap = document.createElement('div');
           wrap.className = 'item_form';
     const inpEmail = document.createElement('input'); 
           inpEmail.type = 'email';
           inpEmail.name = elem.name;
           inpEmail.className = 'inp';
           label.append(inpEmail);
           wrap.append(label);
           div.append(wrap);
         
   }
   
   if (elem.kind === 'combo') {
    const label = document.createElement('label');
          label.innerHTML = elem.label;
     const wrap = document.createElement('div');
           wrap.className = 'item_form';
     const inpSelect = document.createElement('select'); 
     const options = elem.variants;
           inpSelect.name = elem.name; 
           inpSelect.className = 'select_inp';
           
    options.forEach(option => {
      const inpOption= document.createElement('option'); 
            inpOption.value = option.value;
            inpOption.text = option.text;
        if (option.value === 3) {
            inpOption.selected = true;
        }
            inpSelect.append(inpOption); 
          });
            label.append(inpSelect);
            wrap.append(label);
            div.append(wrap);
    }
  
    if (elem.kind === 'radio') {
     const label = document.createElement('label');
           label.innerHTML = elem.label;
     const wrap = document.createElement('div');
           wrap.className = 'item_form';
     const radioButtons = elem.variants;
           wrap.append(label);

    radioButtons.forEach(radio => {
       const label = document.createElement('label');
             label.innerHTML = radio.text;
             label.className = 'label_cursiv';
       const inpRadio = document.createElement('input'); 
             inpRadio.type = 'radio';
             inpRadio.name = 'payment';
             inpRadio.value = radio.value;
             inpRadio.className = 'radio_btn';
             label.append(inpRadio);
             wrap.append(label);
             div.append(wrap); 
      });
       
   }
   if (elem.kind === 'check') {
     const label = document.createElement('label');
           label.innerHTML = elem.label;
     const wrap = document.createElement('div');
           wrap.className = 'item_form';
     const inpCheckBox = document.createElement('input'); 
           inpCheckBox.type = 'checkbox';
           inpCheckBox.className = 'checkbox_inp';
           inpCheckBox.name = elem.name;
           label.append(inpCheckBox);
           wrap.append(label);
           div.append(wrap);
      
     }
  
   if (elem.kind === 'memo') {
    const label = document.createElement('label');
          label.innerHTML = elem.label;
    const wrap = document.createElement('div');
          wrap.className = 'item_form';
    const inpTextaria = document.createElement('textarea'); 
          inpTextaria.name = elem.name;
          inpTextaria.className = 'textaria_inp';
          label.append(inpTextaria);
          wrap.append(label);
          div.append(wrap);
      
   }
   
   if (elem.kind === 'submit') {
    const wrap = document.createElement('div');
         wrap.className = 'item_form';
    const inpBtn = document.createElement('input'); 
         inpBtn.type = 'submit';
         inpBtn.value = elem.caption;
         inpBtn.className = 'btn';
         wrap.append(inpBtn);
         div.append(wrap,hr);
   }
         tagForm.append(div); 
  });
  
}
dyn_form(document.forms[0], formDef1);
dyn_form(document.forms[1], formDef2);

