'use strict'
{
  // 必要な要素の取得
  const question = document.getElementById('question');
  const btn = document.getElementById('btn');
  const choices = document.getElementById('choices');

  // クイズのデータの用意(配列)
  const quizSet = [
    // 配列の中にオブジェクトを用意
    {q: 'What is A', c: ['A0', 'A1', 'A2']},
    {q: 'What is B', c: ['B0', 'B1', 'B2']},
    {q: 'What is C', c: ['C0', 'C1', 'C2']},
    {q: 'What is D', c: ['D0', 'D1', 'D2']},
    {q: 'What is E', c: ['E0', 'E1', 'E2']},
  ];

  // 何問目のクイズを解いているか変数を定義
  let currentNum = 0;
  // 回答したかどうか変数を定義
  let isAnswered;



  // シャッフルの処理（フィッシャー・イェーツのシャッフル）
  function shuffle(arr) {

    // for分で囲ってループ処理
    for (let i = arr.length -1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // arrのi番目とj番目を入れ替えるために、分割代入する
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }
  // 正誤判定処理の実装
  function checkAnswer(li) {
    // 回答した時の処理
    if(isAnswered) {
      return;
    }
    isAnswered = true;

    if(li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add('correct'); //正解の処理
    } else {
      li.classList.add('wrong');//不正解の処理
    }

    // Nextボタンを押せるようにする
    btn.classList.remove('disabled');
  }

  // 選択肢シャッフルを関数の処理にまとめる
  function setQuiz() {
    // まだ回答していない
    isAnswered = false;
    question.textContent = quizSet[currentNum].q;

    // 次の問題に行くように、前の問題を消すループ処理を実装
    while (choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }


    // shuffle 関数を使って、選択肢をシャッフルしてから表示する
    // スプレッド演算子を使い元の選択肢の配列はそのままに、シャッフルされた配列を作る
    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    // 三択の選択肢の埋め込み
    // for eachを使った繰り替えし処理
    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () =>{
        checkAnswer(li);
      });
      choices.appendChild(li);
    });

    // スコアの表示
    if (currentNum === quizSet.length -1) {
      btn.textContent = 'Show Score';
    }
  }

  setQuiz();

  // Nextボタンをクリックした時の処理
  btn.addEventListener('click',() => {
    if (btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled');
    currentNum++;
    setQuiz();
  });
}
