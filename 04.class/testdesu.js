// resolve と reject の使い方のサンプル

// ランダムな数値を生成する非同期関数
function generateRandomNumber() {
  return new Promise((resolve, reject) => {
    const randomNumber = Math.random();
    if (randomNumber > 0.5) {
      resolve(randomNumber);
    } else {
      reject(new Error("ランダムな数値が閾値未満です"));
    }
  });
}

// 使用例
generateRandomNumber()
  .then((result) => {
    console.log("成功:", result);
  })
  .catch((error) => {
    console.error("エラー:", error.message);
  });
