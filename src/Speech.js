import Speech from "speak-tts";

export function readSpeech(language, result) {

  var setLanguage;
  if (language === "mando") {
    setLanguage = "zh-CN";
  } else {
    setLanguage = "zh-HK";
  }

  const speech = new Speech();

  speech
    .init({
      volume: 0.8,
      lang: setLanguage,
      rate: 0.8,
      pitch: 1,
      splitSentences: false
    })
    .then(data => {
      speech
        .speak({
          text: result.characters,
          queue: false
        })
    })
    .catch(e => {
      console.error("An error occured while initializing : ", e);
    });

  const text = speech.hasBrowserSupport()
    ? "Hurray, your browser supports speech synthesis"
    : "Your browser does NOT support speech synthesis. Try using Chrome of Safari instead !";
  console.log(text);
}
