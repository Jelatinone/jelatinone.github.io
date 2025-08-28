/*
  ~~~
  AUTHOR: CODY WASHINGTON
  CREATED: 8.8.2025
  TITLE: A Portfolio: Cody Washington
  DESCRIPTION: Static portfolio website, showcasing several projects, my experience, and relevant skills
  ~~~
*/
document.addEventListener('mousemove', event => {
  document.documentElement.style.setProperty('--x', `${event.clientX}px`);
  document.documentElement.style.setProperty('--y', `${event.clientY}px`);
});

document.addEventListener('DOMContentLoaded', () => {
  const titleElement = document.getElementById('profile-title--tagline');
  const titlePhrases = [
    "Computer Engineering Student.",
    "Mastering Software Development.",
    "Empowering Through Innovation.",
    "Robotics Programmer.",
    "Aspiring Guitarist.",
    "Hobbyist Photographer.",
    "CAD Enthusiast.",
    "Creative Problem Solver.",
    "Hands-On Prototyper.",
    "Lifelong Tech Learner.",
    "Control Systems Fan.",
    "From Concept to Code.",
    "Passionate About Automation.",
    "Velocity: Comfort: Design.",
    "Engineering Solutions.",
    "Shaping Ideas Into Reality.",
    "Tinkerer & Maker.",
    "Turning Concepts into Machines.",
  ];

  const typeStates = {
    TYPE: 0,
    DELETE: 1,
    PAUSE: 2
  };
  const deleteSpeed = 150; 
  const typeSpeed = 100;    
  const pauseSpeed = 1500;  

  let titlePhraseIndex = 0;
  let titlePhraseState = typeStates.TYPE;
  let currentPhrase = "";

  function stepTitlePhrase() {
    const titlePhrase = titlePhrases[titlePhraseIndex];

    switch(titlePhraseState) {
      case typeStates.TYPE:
        currentPhrase = titlePhrase.substring(0, currentPhrase.length + 1);
        titleElement.innerText = currentPhrase;
        if(currentPhrase.length === titlePhrase.length) {
          titlePhraseState = typeStates.PAUSE;
          setTimeout(stepTitlePhrase, pauseSpeed);
        } else {
          setTimeout(stepTitlePhrase, typeSpeed);
        }
        break;

      case typeStates.DELETE:
        currentPhrase = titlePhrase.substring(0, currentPhrase.length - 1);
        titleElement.innerText = currentPhrase;
        if(currentPhrase.length === 0) {
          titlePhraseState = typeStates.TYPE;
          titlePhraseIndex = (titlePhraseIndex + 1) % titlePhrases.length;
          setTimeout(stepTitlePhrase, typeSpeed);
        } else {
          setTimeout(stepTitlePhrase, deleteSpeed);
        }
        break;

      case typeStates.PAUSE:
        titlePhraseState = typeStates.DELETE;
        setTimeout(stepTitlePhrase, deleteSpeed);
        break;
    }
  }

  stepTitlePhrase();
});
