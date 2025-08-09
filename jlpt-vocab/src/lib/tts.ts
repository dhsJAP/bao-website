export function speakJa(text: string) {
  if (typeof window === 'undefined') return;
  const synth = window.speechSynthesis;
  if (!synth) return;
  synth.cancel();
  const uttr = new SpeechSynthesisUtterance(text);
  const voices = synth.getVoices();
  const jaVoice = voices.find(v => v.lang.startsWith('ja'));
  if (jaVoice) uttr.voice = jaVoice;
  uttr.lang = 'ja-JP';
  synth.speak(uttr);
}

export function stopSpeak() {
  if (typeof window === 'undefined') return;
  window.speechSynthesis?.cancel();
}