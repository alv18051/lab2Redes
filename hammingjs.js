//Algoritmo de envio de Hamming
function hammingSender(message) {
    let r = 0;
    while (Math.pow(2, r) < message.length + r + 1) {
      r++;
    }

    const encodedMessage = new Array(message.length + r);
  
    let originalIndex = 0;
    let redundantIndex = 0;

    for (let i = 1; i <= encodedMessage.length; i++) {
      if (i === Math.pow(2, redundantIndex)) {
        encodedMessage[i - 1] = 0;
        redundantIndex++;
      } else {
        encodedMessage[i - 1] = parseInt(message[originalIndex], 2);
        originalIndex++;
      }
    }

    for (let i = 0; i < r; i++) {
      const position = Math.pow(2, i);
      let count = 0;
      for (let j = position - 1; j < encodedMessage.length; j += position * 2) {
        for (let k = j; k < j + position && k < encodedMessage.length; k++) {
          count += encodedMessage[k];
        }
      }
      encodedMessage[position - 1] = count % 2;
    }

    const encodedString = encodedMessage.join('');
  
    return encodedString;
  }

  const originalMessage = '1011'; 
  const encodedMessage = hammingSender(originalMessage);
  console.log('Encoded Message:', encodedMessage);
  