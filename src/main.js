
(function() {
  // Add in the email address. Probably not entirely necessary, 
  // but maybe it'll avoid some spam, plus it's more fun! :P 
  var emailElement = document.getElementById('email-div');
  var emailAddress = [
    'booking',
    '@',
    'thecreak',
    '.',
    'net'
  ].join('');
  emailElement.innerText = emailAddress;

  // Silly animation for the list text
  var listElement = document.getElementById('the-list-text');
  var listElements = [];
  var colors = [
    '#FF0000',
    '#FFF000',
    '#3AFF00',
    '#00FFF7',
    '#0004FF',
    '#CD00FF'
  ]
  var listText = [
    'T', 
    'h', 
    'e', 
    ' ',
    'L',
    'i',
    's',
    't'
  ];

  for (var index = 0; index < listText.length; index++) {
    (function() {
      var letter = listText[index];
      var element = document.createElement('span');
      element.innerText = letter;
      element.className = 'animate-color';
      listElements.push(element);
      listElement.appendChild(element);
    })();
  }

  setInterval(function() {
    var randomColorIndex = Math.floor(Math.random() * colors.length);
    var chosenColor = Math.random() > 0.35 ? 'black' : colors[randomColorIndex];
    var randomElementIndex = Math.floor(Math.random() * listElements.length);
    var selectedElement = listElements[randomElementIndex];
    selectedElement.style.color = chosenColor;
  }, 200);

  // Write The Creak and Gorlax to footer
  var footer = document.getElementById('footer');
  var footerText = [];

  while (footerText.length < 50) {
    footerText.push('THECREAKCHETREAK');
  }

  footerText.push('PRAISEGORLAX');
  footer.innerText = footerText.join('');
})()

