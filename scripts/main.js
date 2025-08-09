/*
    ~~~
    AUTHOR: CODY WASHINGTON
    CREATED: 8.8.2025
    TITLE: A Portfolio: Cody Washington
    DESCRIPTION: Static portoflio website, showcasing several projects, my experience, and relevant skills
    ~~~
*/
document.addEventListener('mousemove', e => {
  document.documentElement.style.setProperty('--x', `${e.clientX}px`);
  document.documentElement.style.setProperty('--y', `${e.clientY}px`);
});

document.addEventListener('DOMContentLoaded', () => {
  const titleElement = document.getElementById('portfolio-title');
  const titlePhrases = [
    "Software Developer",
    "Controls Engineer",
    "Robotics Engineer",
    "Creative Problem Solver",
    "Author",
    "Hobbyist Photographer"
  ];

  const typeStates = {
    TYPE: 0,
    DELETE: 1,
    PAUSE: 2
  };
  const deleteSpeed = 150; 
  const typeSpeed = 200;    
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