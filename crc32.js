function calculateCRC32(data) {
    const crcTable = new Uint32Array(256);
    const polynomial = 0x04C11DB7;
  
    for (let i = 0; i < 256; i++) {
      let crc = i << 24;
      for (let j = 0; j < 8; j++) {
        crc = (crc << 1) ^ ((crc & 0x80000000) ? polynomial : 0);
      }
      crcTable[i] = crc;
    }
  
    let crc = 0xFFFFFFFF;
    for (let i = 0; i < data.length; i++) {
      const index = (crc ^ data[i]) & 0xFF;
      crc = (crc >>> 8) ^ crcTable[index];
    }
  
    return crc ^ 0xFFFFFFFF;
  }
  
  const message = "10100011";
  const crcValue = calculateCRC32(Buffer.from(message, 'utf8'));
  console.log("CRC-32:", crcValue.toString(16).toUpperCase());
  const fullMessage = message + crcValue.toString(16).toUpperCase();
  console.log("Full Message:", fullMessage);
  