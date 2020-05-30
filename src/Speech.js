import Speech from "speak-tts";

export function readSpeech(language, result) {

  let setLanguage;
  let text;
  let voice;

  // read answers in language
  text = result.characters;

  if (language === "mando") {
    setLanguage = "zh-CN";
    voice = "Ting-Ting";
  } else if (language === "canto") {
    setLanguage = "zh-HK";
    voice = "Sin-ji";
  } else if (language === "japanese") {
    setLanguage = "ja-JP";
    voice = "Google 日本語";
  } else {
    setLanguage = "ko-KR";
    voice = "Google 한국의";
  }

  // read arguments in english
  if (!result.hasOwnProperty("characters")) {
    setLanguage = "en-US";
    text = result;
    voice = "Google US English";
  }

  const speech = new Speech();

  speech
    .init({
      volume: 1,
      lang: setLanguage,
      rate: 0.8,
      pitch: 1,
      voice: voice,
      splitSentences: false
    })
    .then(data => {
      console.log(data);
      speech
        .speak({
          text: text,
          queue: false
        })
    })
    .catch(e => {
      console.error("An error occured while initializing : ", e);
    });

  const browserSupportText = speech.hasBrowserSupport()
    ? "Hurray, your browser supports speech synthesis"
    : "Your browser does NOT support speech synthesis. Try using Chrome of Safari instead !";
  console.log(browserSupportText);
}
