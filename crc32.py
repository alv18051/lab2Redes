def verifyCRC32(data, crc):
    crcTable = [0] * 256
    polynomial = 0x04C11DB7

    for i in range(256):
        crc = i << 24
        for j in range(8):
            crc = (crc << 1) ^ (polynomial if (crc & 0x80000000) else 0)
        crcTable[i] = crc

    crc = 0xFFFFFFFF
    for byte in data:
        index = (crc ^ byte) & 0xFF
        crc = (crc >> 8) ^ crcTable[index]

    return crc == 0xFFFFFFFF - int(crc, 16)

received_message = "YourReceivedMessageWithCRC"
received_crc = int(received_message[-8:], 16)
received_data = bytes.fromhex(received_message[:-8])

if verifyCRC32(received_data, received_crc):
    print("CRC-32 Check: Passed")
    print("Received Data:", received_data.decode('utf-8'))
else:
    print("CRC-32 Check: Failed")
