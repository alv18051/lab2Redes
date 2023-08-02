#Algoritmo receptor de Hamming
def hamming_receiver(received_message):

    received_list = [int(bit) for bit in received_message]
    r = 0
    while 2 ** r < len(received_list):
        r += 1

    error_positions = []

    for i in range(r):
        position = 2 ** i
        count = 0
        for j in range(position - 1, len(received_list), position * 2):
            for k in range(j, min(j + position, len(received_list))):
                count += received_list[k]
        if count % 2 != received_list[position - 1]:
            error_positions.append(position)

    if len(error_positions) > 0:
        for position in error_positions:
            received_list[position - 1] = 1 - received_list[position - 1]

    decoded_message = [received_list[i] for i in range(len(received_list)) if not is_power_of_two(i + 1)]

    decoded_string = ''.join(str(bit) for bit in decoded_message)

    return decoded_string

def is_power_of_two(num):
    return num & (num - 1) == 0

received_message = '0110011'  
decoded_message = hamming_receiver(received_message)
print('Decoded Message:', decoded_message)