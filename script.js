const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLessons(json.data));
};

const removeActive = () => {
  const lessonBtn = document.querySelectorAll(".btn-lesson");
  lessonBtn.forEach((btn) => btn.classList.remove("active"));
};

const loadWords = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      removeActive();
      const clickedBtn = document.getElementById(`btn-lesson-${id}`);
      clickedBtn.classList.add("active");
      displayWords(json.data);
    });
};

const displayWords = (words) => {
  const wordContainer = document.getElementById("words-container");
  wordContainer.innerHTML = "";

  if (words.length == 0) {
    wordContainer.innerHTML = `
        <div class="text-center col-span-full">
           <img src="./assets/alert-error.png" alt="" class="mx-auto">
           <br>
            <p class="font-bangla text-[#79716B] text-lg">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <br>
            <p class="font-bangla text-4xl font-medium">নেক্সট Lesson এ যান</p>
        </div>`;
  }

  for (let word of words) {
    const cards = document.createElement("div");
    cards.innerHTML = `<div class="rounded-xl bg-white card py-10 pt-[50px] pb-[10px] text-center space-y-4">
            <h2 class="inter font-bold text-[24px]">${word.word ? word.word : "word not found"}</h2>
            <p class="inter font-medium text-[16px]">Meaning /Pronounciation</p>
            <div class="font-bangla opacity-80 font-semibold text-[24px]">"${word.meaning ? word.meaning : "meaning not found"} / ${word.pronunciation ? word.pronunciation : "pronunciation not found"}"</div>
            <div class="flex justify-between items-center p-6">
            <button class="btn rounded-lg bg-[#1A91FF10] 
            hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
            <button class="btn rounded-lg bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
        </div>
        </div>`;
    wordContainer.append(cards);
  }
};

const displayLessons = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  for (let lesson of lessons) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
        <button id="btn-lesson-${lesson.level_no}" onclick="loadWords(${lesson.level_no})" class="btn btn-outline btn-primary btn-lesson"><i class="fa-solid fa-book-open"></i> Lesson -${lesson.level_no}</button>
        `;
    levelContainer.append(btnDiv);
  }
};

loadLessons();
