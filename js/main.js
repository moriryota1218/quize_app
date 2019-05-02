'use strict'
{
  // 必要な要素の取得
  const question = document.getElementById('question');
  const btn = document.getElementById('btn');
  const choices = document.getElementById('choices');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result p');

  // クイズのデータの用意(配列)
  const quizSet = [
    // 配列の中にオブジェクトを用意
    {q: '猫の本当の大好物は?', c: ['肉', '魚', '麺']},
    {q: 'キリンの睡眠時間は?', c: ['20分', '寝ない', '7時間']},
    {q: 'ラクダのコブには何が詰まってる?', c: ['脂肪', '水', '油']},
    {q: '猫よけとして効果的な物は?', c: ['超音波', 'ペットボトル', '水']},
    {q: 'シマウマの鳴き声は?', c: ['ワンワン', 'にゃー', 'もー']},
  ];

  // 何問目のクイズを解いているか変数を定義
  let currentNum = 0;
  // 回答したかどうか変数を定義
  let isAnswered;
  // 正答数を変数で定義
  let score = 0;


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
      score++;
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

// 正解数を結果にだす処理
    if (currentNum === quizSet.length - 1) {
      // console.log(`Score: ${score} / ${quizSet.length}`);
      scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
      result.classList.add('show');
    } else {
      currentNum++;
      setQuiz();
    }
  });
}
